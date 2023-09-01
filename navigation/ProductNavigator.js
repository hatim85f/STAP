import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from "../screens/products/ProductsScreen";
import AddProductScreen from "../screens/products/AddProductScreen";
import EditProductScreen from "../screens/products/EditProductScreen";

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
      <ProductNavigator.Screen
        name="edit_product"
        component={EditProductScreen}
        options={{
          title: "Edit Product",
          headerTitle: "Edit Product",
        }}
      />
    </ProductNavigator.Navigator>
  );
};
