import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/auth/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import { MainDrawerNavigator } from "./DrawerNavigator";
import { useSelector } from "react-redux";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import { MainNavigator } from "./HomeNavigator";
import { Platform } from "react-native";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
    height: 120,
  },
  headerShown: false,
};

const MainAppNav = createStackNavigator();

export const FullAppNavigator = () => {
  return (
    <MainAppNav.Navigator screenOptions={defaultNavOptions}>
      <MainAppNav.Screen
        name="Intro"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      <MainAppNav.Screen
        name="Main"
        component={MainNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainAppNav.Screen
        name="Verify"
        component={VerifyEmailScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainAppNav.Screen name="Home" component={MainDrawerNavigator} />
    </MainAppNav.Navigator>
  );
};
