import { createStackNavigator } from "@react-navigation/stack";
import Payment from "../screens/pricing/Payment";
import PricingDetails from "../screens/pricing/PricingDetails";

const PaymentNavigation = createStackNavigator();

export const PaymentNav = () => {
  return (
    <PaymentNavigation.Navigator>
      <PaymentNavigation.Screen
        name="Pricing"
        component={PricingDetails}
        options={{
          headerShown: false,
        }}
      />
      <PaymentNavigation.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      />
    </PaymentNavigation.Navigator>
  );
};
