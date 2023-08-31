import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from "../screens/products/ProductsScreen";
import AddProductScreen from "../screens/products/AddProductScreen";

const ProductNavigator = createStackNavigator();

export const MainProductNavigator = () => {
  return (
    <ProductNavigator.Navigator screenOptions={{ headerShown: false }}>
      <ProductNavigator.Screen
        name="main_products_nav"
        component={ProductsScreen}
        options={{
          title: "Products",
          headerTitle: "Products",
        }}
      />
      <ProductNavigator.Screen
        name="add_product"
        component={AddProductScreen}
        options={{
          title: "Add Products",
          headerTitle: "Add Products",
        }}
      />
    </ProductNavigator.Navigator>
  );
};
