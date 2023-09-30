import { createStackNavigator } from "@react-navigation/stack";
import MainHome from "../screens/mainHome/MainHome";
import Documentation, {
  documentationOptions,
} from "../screens/mainHome/Documentations";
import AboutScreen, {
  aboutScreenOptions,
} from "../screens/mainHome/AboutScreen";
import WhySTAPPage, {
  whySTAPPageOptions,
} from "../screens/mainHome/WhySTAPPage";
import DevelopersPage, {
  developersPageOptions,
} from "../screens/mainHome/DevelopersPage";
import Pricing, { pricingPageOptions } from "../screens/mainHome/Pricing";
import PaymentDetails, {
  paymentOptions,
} from "../screens/mainHome/PaymentDetails";
import RequestDemoScreen, {
  requestDemoSCreenOptions,
} from "../screens/mainHome/RequestDemo";
import LoginScreen from "../screens/auth/LoginScreen";

const MainAppNavigator = createStackNavigator();

export const MainNavigator = () => {
  return (
    <MainAppNavigator.Navigator>
      <MainAppNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <MainAppNavigator.Screen
        name="STAP™"
        component={MainHome}
        options={{ headerShown: false }}
      />
      <MainAppNavigator.Screen
        name="Documentation"
        component={Documentation}
        options={documentationOptions}
      />
      <MainAppNavigator.Screen
        name="About"
        component={AboutScreen}
        options={aboutScreenOptions}
      />
      <MainAppNavigator.Screen
        name="Why STAP™"
        component={WhySTAPPage}
        options={whySTAPPageOptions}
      />
      <MainAppNavigator.Screen
        name="Developers"
        component={DevelopersPage}
        options={developersPageOptions}
      />
      <MainAppNavigator.Screen
        name="Pricing"
        component={Pricing}
        options={pricingPageOptions}
      />
      <MainAppNavigator.Screen
        name="Payment"
        component={PaymentDetails}
        options={paymentOptions}
      />
      <MainAppNavigator.Screen
        name="Request"
        component={RequestDemoScreen}
        options={requestDemoSCreenOptions}
      />
    </MainAppNavigator.Navigator>
  );
};
