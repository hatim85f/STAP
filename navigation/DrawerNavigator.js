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
    height: Platform.OS === "web" ? hp("5.5%") : hp("6%"),
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
                  dispatch(logOut());
                  props.navigation.navigate("Login");
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
                  fontSize: Platform.OS === "web" ? wp("1.5%") : wp("4%"),
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
        drawerLabelStyle: {
          fontFamily: "headers",
          fontSize: Platform.OS === "web" ? wp("1%") : wp("4%"),
        },
        drawerIcon: { focused: true },
        drawerActiveBackgroundColor: Colors.primary,
        drawerLabelStyle: {
          fontSize: Platform.isPad
            ? wp("3%")
            : Platform.OS === "web"
            ? wp("1%")
            : wp("4%"),
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
    >
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
    </MainDrawer.Navigator>
  );
};
