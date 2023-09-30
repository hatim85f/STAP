import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  Fontisto,
  Entypo,
} from "@expo/vector-icons";
import { StyleSheet, Image, ScrollView } from "react-native";

import { logOut } from "../store/auth/authActions";
import { View } from "react-native";
import { Platform } from "react-native";

import AddNewBusinessScreen from "../screens/business/AddNewBusinessScreen";
import HomeScreen from "../screens/home/HomeScreen";
import UploadImage from "../screens/test/UploadImage";
import BusinessesScreen from "../screens/business/BusinessesScreen";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import ProductsScreen from "../screens/products/ProductsScreen";
import Icon from "react-native-vector-icons/Feather";

import { MainProductNavigator } from "./ProductNavigator";
import { TeamNavigator } from "./TeamNavigator";
import ProfileScreen from "../screens/profile/ProfileScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { isTablet, isWeb } from "../constants/device";
import { PaymentNav } from "./PaymentNav";

const defaultNavOptions = {
  headerShown: Platform.OS !== "web",
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
  },
  headerTitleStyle: {
    fontSize: 22,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "headers",
  },
  headerBackgroundContainerStyle: {
    backgroundColor: Colors.primary,
  },
  drawerInactiveTintColor: "black",
  drawerActiveTintColor: "white",
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    height: hp("15%"),
    width: hp("15%"),
  },

  logoutButton: {
    backgroundColor: "#FA5454",
    width: "95%",
    height: isWeb() ? hp("5.5%") : hp("6%"),
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 10,
  },
});

export const MainDrawer = createDrawerNavigator();

export const MainDrawerNavigator = () => {
  return (
    <MainDrawer.Navigator
      drawerContent={(props) => {
        const dispatch = useDispatch();
        return (
          <ScrollView scrollEnabled scrollEventThrottle={16}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/icon.png")}
                  style={styles.icon}
                />
              </View>

              <DrawerItemList
                {...props}
                itemStyle={(focused) => ({
                  ...styles.drawerItem,
                  color: focused ? "white" : "black",
                })}
              />
              <Button
                title="Logout"
                buttonStyle={styles.logoutButton}
                onPress={() => {
                  dispatch(logOut()).then(() => {
                    if (Platform.OS === "web") {
                      // Use web-specific navigation logic here
                      // For example, you can use window.location.href to redirect to the login page
                      window.location.href = "/login";
                    } else {
                      // Use mobile-specific navigation logic here
                      props.navigation.navigate("Login");
                    }
                  });
                }}
                icon={() => (
                  <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color="white"
                  />
                )}
                iconPosition="left"
                titleStyle={{
                  color: "white",
                  fontFamily: "headers",
                  fontSize: isWeb()
                    ? wp("1.5%")
                    : isTablet()
                    ? wp("3%")
                    : wp("4%"),
                }}
              />
            </SafeAreaView>
          </ScrollView>
        );
      }}
      screenOptions={{
        drawerInactiveBackgroundColor: "white",
        drawerActiveTintColor: "rgba(116, 41, 255, 1)",
        drawerPosition: "left",
        drawerType: "front",
        drawerStyle: {
          paddingTop: hp("3%"),
        },
        drawerAllowFontScaling: true,
        headerShown: false,
        drawerIcon: { focused: true },
        drawerActiveBackgroundColor: Colors.primary,
        drawerLabelStyle: {
          fontSize: isTablet() ? wp("3%") : isWeb() ? wp("1%") : wp("4%"),
        },
        drawerItemStyle: {
          borderRadius: 15,
          justifyContent: "center",
          borderWidth: 2,
          borderColor: "#bcc6d6",
          // height: Platform.OS === "web" ? hp("5.5%") : hp("6%"),
          marginTop: hp("0.5%"),
        },
      }}
      initialRouteName="Dashboard"
    >
      <MainDrawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          ...defaultNavOptions,
          title: "Profile",
          headerTitle: "Profile",
          drawerIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="person"
                size={hp("2.5%")}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
      />
      <MainDrawer.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          ...defaultNavOptions,
          headerTitle: "Dashoboard", // adding heraderTitle for mobile only name not web
          drawerIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                size={hp("2.5%")}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
      />
      <MainDrawer.Screen
        name="businesses"
        component={BusinessesScreen}
        options={{
          ...defaultNavOptions,
          title: "Businesses",
          headerTitle: "Businesses",
          drawerIcon: ({ focused }) => {
            return (
              <Fontisto
                name="shopping-store"
                size={24}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
      />
      <MainDrawer.Screen
        name="add_businesses"
        component={AddNewBusinessScreen}
        options={{
          ...defaultNavOptions,
          title: "Add New Business",
          headerTitle: "Add New Business",
          drawerIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="library-add"
                size={hp("2.5%")}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
      />
      <MainDrawer.Screen
        name="products"
        component={MainProductNavigator}
        options={{
          ...defaultNavOptions,
          title: "Products",
          headerTitle: "Products",
          drawerIcon: ({ focused }) => {
            return (
              <Icon
                name="package"
                size={hp("2.5%")}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
      />
      <MainDrawer.Screen
        name="team"
        component={TeamNavigator}
        options={{
          ...defaultNavOptions,
          title: "Team",
          headerTitle: "Team",
          drawerIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="people-alt"
                size={24}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
      />
      <MainDrawer.Screen
        name="packages"
        component={PaymentNav}
        options={{
          ...defaultNavOptions,
          title: "Packages",
          headerTitle: "Packages",
          drawerIcon: ({ focused }) => {
            return (
              <Entypo
                name="price-tag"
                size={24}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
      />
      <MainDrawer.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          ...defaultNavOptions,
          title: "Settings",
          headerTitle: "Settings",
          drawerIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="settings"
                size={24}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
      />
    </MainDrawer.Navigator>
  );
};
