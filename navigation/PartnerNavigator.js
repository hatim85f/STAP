import { createStackNavigator } from "@react-navigation/stack";
import PartnerScreen from "../screens/partners/PartnerScreen";

const PartnerMainNavigator = createStackNavigator();

export const PatnerNavigator = () => {
  return (
    <PartnerMainNavigator.Navigator screenOptions={{ headerShown: false }}>
      <PartnerMainNavigator.Screen name="Partners" component={PartnerScreen} />
    </PartnerMainNavigator.Navigator>
  );
};
