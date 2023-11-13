import { createStackNavigator } from "@react-navigation/stack";
import TargetShowScreen from "../screens/target/TargetShowScreen";
import TargetAddScreen from "../screens/target/TargetAddScreen";
import ItemTargetScreen from "../screens/target/ItemTargetScreen";
import TargetDistribution from "../screens/target/TargetDistribution";

const MainTargetNavigator = createStackNavigator();

export const TargetNavigator = () => {
  return (
    <MainTargetNavigator.Navigator initialRouteName="target_show">
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
      <MainTargetNavigator.Screen
        name="item_target"
        component={ItemTargetScreen}
        options={{
          headerShown: false,
          title: "Item Target",
          headerTitle: "Item Target",
        }}
      />
      <MainTargetNavigator.Screen
        name="target_distribution"
        component={TargetDistribution}
        options={{
          headerShown: false,
          title: "Target Distribution",
          headerTitle: "Target Distribution",
        }}
      />
    </MainTargetNavigator.Navigator>
  );
};
