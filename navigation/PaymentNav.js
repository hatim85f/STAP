import { createStackNavigator } from "@react-navigation/stack";
import Payment from "../screens/pricing/Payment";
import PricingDetails from "../screens/pricing/PricingDetails";
import CompletePayment from "../screens/pricing/CompletePayment";
import TestPayment from "../screens/pricing/TestPayment";
import UpgradeDetails from "../screens/pricing/UpgradeDetails";
import UpgradePricing from "../components/pricing/UpgradePricing";
import UpgradePayment from "../screens/pricing/UpgradePayment";
import MakeUpgrade from "../screens/pricing/MakeUpgrade";

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
      <PaymentNavigation.Screen
        name="Make_Payment"
        title="Payment Details"
        component={CompletePayment}
        options={{
          title: "Payment Details",
          headerShown: false,
        }}
      />
      <PaymentNavigation.Screen
        name="Test_Payment"
        component={TestPayment}
        options={{
          title: "Test Payment",
          headerShown: false,
        }}
      />
      <PaymentNavigation.Screen
        name="Upgrade"
        component={UpgradeDetails}
        options={{
          headerShown: false,
        }}
      />
      <PaymentNavigation.Screen
        name="Upgrade_Payment"
        component={UpgradePayment}
        options={{
          headerShown: false,
          title: "Upgrade Payment",
        }}
      />
      <PaymentNavigation.Screen
        name="Make_Upgrade"
        component={MakeUpgrade}
        options={{
          headerShown: false,
          title: "Make Upgrade",
        }}
      />
    </PaymentNavigation.Navigator>
  );
};
