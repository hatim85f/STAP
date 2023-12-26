import { createStackNavigator } from "@react-navigation/stack";
import SalesUploadScreen from "../screens/sales/SalesUploadScreen";
import MainSalesScreen from "../screens/sales/MainSalesScreen";
import ShowSalesScreen from "../screens/sales/ShowSalesScreen";
import ContributeSalesScreen from "../screens/sales/ContributeSalesScreen";

const MainSalesNavigator = createStackNavigator();

export const SalesNavigator = () => {
  return (
    <MainSalesNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainSalesNavigator.Screen
        name="main"
        component={MainSalesScreen}
        options={{
          title: "Sales",
          headerTitle: "Sales",
        }}
      />
      <MainSalesNavigator.Screen
        name="upload_sales"
        component={SalesUploadScreen}
        options={{
          title: "Upload Sales",
          headerTitle: "Upload Sales",
        }}
      />
      <MainSalesNavigator.Screen
        name="sales_show"
        component={ShowSalesScreen}
        options={{
          title: "Sales Show",
          headerTitle: "Sales Show",
        }}
      />
      <MainSalesNavigator.Screen
        name="contribute"
        component={ContributeSalesScreen}
        options={{
          title: "Contribute",
          headerTitle: "Contribute",
        }}
      />
    </MainSalesNavigator.Navigator>
  );
};
