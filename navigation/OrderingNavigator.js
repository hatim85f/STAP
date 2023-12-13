import { createStackNavigator } from "@react-navigation/stack";
import OrderCreationScreen from "../screens/orders/OrderCreationScreen";
import OrdersShowScreen from "../screens/orders/OrdersShowScreen";
import SingleOrderDetails from "../screens/orders/SingleOrderDetails";

const OrderingNavigator = createStackNavigator();

export const OrderingMainNavigator = () => {
  return (
    <OrderingNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OrderingNavigator.Screen
        name="order_creation"
        component={OrderCreationScreen}
        options={{
          headerTitle: "OrderCreationScreen",
          title: "Order Creation",
        }}
      />
      <OrderingNavigator.Screen
        name="orders_show"
        component={OrdersShowScreen}
        options={{
          headerTitle: "OrdersShowScreen",
          title: "Orders Show",
        }}
      />
      <OrderingNavigator.Screen
        name="single_order_details"
        component={SingleOrderDetails}
        options={{
          headerTitle: "Order Details",
          title: "Single Order Details",
        }}
      />
    </OrderingNavigator.Navigator>
  );
};
