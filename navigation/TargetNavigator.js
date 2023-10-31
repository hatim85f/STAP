import { createStackNavigator } from "@react-navigation/stack";
import TargetShowScreen from "../screens/target/TargetShowScreen";
import TargetAddScreen from "../screens/target/TargetAddScreen";

const MainTargetNavigator = createStackNavigator();

export const TargetNavigator = () => {
  return (
    <MainTargetNavigator.Navigator>
      <MainTargetNavigator.Screen
        name="target_show"
        component={TargetShowScreen}
        options={{
          headerShown: false,
          title: "Target Show",
          headerTitle: "Target Show",
        }}
      />
      <MainTargetNavigator.Screen
        name="target_add"
        component={TargetAddScreen}
        options={{
          headerShown: false,
          title: "Target Add",
          headerTitle: "Target Add",
        }}
      />
    </MainTargetNavigator.Navigator>
  );
};
