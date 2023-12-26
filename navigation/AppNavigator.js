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
      Main: {
        screens: {
          Login: "login",
          "STAP™": "main_home",
          Documentation: "documentation",
          About: "about",
          "Why STAP™": "why",
          Developers: "developers",
          Pricing: "pricing",
          Payment: "payment/:packageId/:type",
          Request: "request_demo",
        },
      },
      Verify: "verify_email_address",
      Terms: {
        path: "/terms_and_conditions",
      },
      Home: {
        screens: {
          Account: {
            screens: {
              Profile: {
                path: "/profile",
              },
              Upgrade: {
                path: "/profile/upgrade-details/:packageId",
              },
              Upgrade_Payment: {
                path: "/profile/upgrade-payment/:packageId/:type",
              },
              Make_Upgrade: {
                path: "/profile/make-upgrade/:packageId/:type/:payment",
              },
            },
          },
          Dashboard: "dashboard",
          businesses: "businesses",
          add_businesses: "add_businesses",
          clients: {
            screens: {
              Clients: {
                path: "/clients/show-clients",
              },
              addClients: {
                path: "/clients/add-clients/:businessId",
              },
              clientEdit: {
                path: "/clients/edit-clients/:clientId",
              },
            },
          },
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
              add_excel: {
                path: "/products/upload-excel/:businessId",
              },
            },
          },

          target: {
            screens: {
              target_show: {
                path: "/target/target-show/",
              },
              target_add: {
                path: "/target/target-add/:productIndex",
              },
              item_target: {
                path: "/target/item-target/:product",
              },
              target_distribution: {
                path: "/target/target-distribution/:product/:year",
              },
              business_target: {
                path: "/target/business-target/:businessId/:year/:value",
              },
              upload_target: {
                path: "/target/upload-target/",
              },
            },
          },
          target_phasing: {
            screens: {
              phasing: {
                path: "/target/phasing/",
              },
            },
          },
          ordering: {
            screens: {
              order_creation: {
                path: "/ordering/order-creation/",
              },
              orders_show: {
                path: "/ordering/orders-show/",
              },
              single_order_details: {
                path: "/ordering/orders-details/:details/:status:/startDate/:endDate",
              },
            },
          },
          sales: {
            screens: {
              main: {
                path: "/sales",
              },
              upload_sales: {
                path: "/sales/sales-upload/",
              },
              sales_show: {
                path: "/sales/sales-show/",
              },
              contribute: {
                path: "/sales/contribute/",
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
              individual_target: {
                path: "/team/individual-target/",
              },
              indiviudal_sales: {
                path: "/team/individual-sales/",
              },
              individual_achievement: {
                path: "/team/individual-achievement/",
              },
              member_target_data: {
                path: "/team/member-target-data/:index/:year",
              },
              monthly_target: {
                path: "/team/monthly-target/",
              },
              monthly_achievement: {
                path: "/team/monthly-achievement/",
              },
              monthly_sales: {
                path: "/team/monthly-sales/",
              },
              monthly_container: {
                path: "/team/monthly-container/",
              },
            },
          },
          packages: {
            screens: {
              Pricing: {
                path: "/packages/pricing-details",
              },
              Payment: {
                path: "/packages/payment/:packageId/:type",
              },
              Make_Payment: {
                path: "/packages/complete-payment/:packageId/:type/:email",
              },
              Test_Payment: {
                path: "/packages/test-payment",
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
