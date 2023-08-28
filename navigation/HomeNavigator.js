import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen, { homeScreenOptions } from "../screens/home/HomeScreen";

export const HomeMainNavigator = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeMainNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeMainNavigator.Screen
        name="home"
        component={HomeScreen}
        options={{ title: "Dashboard" }}
      />
    </HomeMainNavigator.Navigator>
  );
};
