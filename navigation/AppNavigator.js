import React, { useContext, useState, useEffect } from "react";
import {
  NavigationContainer,
  useRoute,
  useNavigationState,
} from "@react-navigation/native";
import { FullAppNavigator } from "./MainNaviagtor";
import { NavigationContext } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { Modal, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import * as authActions from "../store/auth/authActions";
import { Platform } from "react-native";
import { Alert } from "react-native";
import SearchBar from "../components/SearchBar";
import { globalHeight } from "../constants/globalWidth";

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

const AppNavigator = () => {
  const [initialState, setInitialState] = useState();
  const [isReady, setIsReady] = useState(false);
  const navigationContext = useContext(NavigationContext);

  const { error, errorMessage, user } = useSelector((state) => state.auth);

  const prefix = Linking.createURL("stap://");

  const config = {
    screens: {
      Intro: "intro",
      Login: "login",
      Verify: "verify_email_address",
      Home: {
        screens: {
          Profile: "profile",
          Dashboard: "dashboard",
          businesses: "businesses",
          add_businesses: "add_businesses",
          products: {
            screens: {
              main_products_nav: {
                path: "/products/show-products",
              },
              add_product: {
                path: "/products/add-products/:businessId",
              },
              edit_product: {
                path: "/products/edit-product/:productId/:businessId",
              },
            },
          },
          team: {
            screens: {
              team_details: {
                path: "/team/team-details/",
              },
              add_member: {
                path: "/team/invite-new-member/:businessId",
              },
            },
          },
          settings: {
            path: "/settings",
          },
        },
      },
    },
  };

  const linking = {
    prefixes: [prefix],
    config,
  };

  useEffect(() => {
    const restoreState = async () => {
      const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
      const state = savedStateString ? JSON.parse(savedStateString) : undefined;
      if (state !== undefined) {
        setInitialState(state);
      }
    };

    restoreState();
  }, []);

  // if (!isReady) {
  //   return <Loader />;
  // }
  function ConditionalComponent() {
    const navigation = useNavigation();
    const activeRouteName = navigation.getCurrentRoute();

    // Conditionally render a component based on the active route
    if (
      activeRouteName &&
      activeRouteName.name !== "Intro" &&
      activeRouteName.name !== "Login"
    ) {
      return (
        <View style={styles.mainView}>
          <SearchBar />
        </View>
      );
    }
    return null;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        if (Platform.OS === "web") {
          storedUserDetails = window.localStorage.getItem("userDetails");
        } else {
          storedUserDetails = await AsyncStorage.getItem("userDetails");
        }

        if (storedUserDetails) {
          const parsedUserDetails = JSON.parse(storedUserDetails);

          if (parsedUserDetails.user) {
            dispatch(authActions.getUserIn(parsedUserDetails));
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  useEffect(() => {
    if (error && Platform.OS !== "web") {
      Alert.alert(error, errorMessage, [
        { text: "Okay", onPress: () => dispatch(authActions.clearError()) },
      ]);
    }
  }, [error, errorMessage]);

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Text>Loading...</Text>}
      context={navigationContext}
      initialState={initialState}
      onStateChange={(state) => setInitialState(state)}
    >
      {Platform.OS === "web" && user.emailVerified && <ConditionalComponent />}
      <FullAppNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: globalHeight("10%"),
    width: "100%",
  },
});

export default AppNavigator;
