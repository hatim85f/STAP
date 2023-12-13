import { createStackNavigator } from "@react-navigation/stack";
import SalesUploadScreen from "../screens/sales/SalesUploadScreen";

const MainSalesNavigator = createStackNavigator();

export const SalesNavigator = () => {
  return (
    <MainSalesNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainSalesNavigator.Screen
        name="upload_sales"
        component={SalesUploadScreen}
        options={{
          title: "Upload Sales",
          headerTitle: "Upload Sales",
        }}
      />
    </MainSalesNavigator.Navigator>
  );
};
