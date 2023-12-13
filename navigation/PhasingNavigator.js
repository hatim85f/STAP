import { createStackNavigator } from "@react-navigation/stack";
import PhasingScreen from "../screens/phasing/PhasingScreen";

const PhasingNavigator = createStackNavigator();

export const PhasingNav = () => {
  return (
    <PhasingNavigator.Navigator screenOptions={{ headerShown: false }}>
      <PhasingNavigator.Screen
        name="phasing"
        component={PhasingScreen}
        options={{
          headerTitle: "Phasing",
        }}
      />
    </PhasingNavigator.Navigator>
  );
};
