import { createStackNavigator } from "@react-navigation/stack";
import MainExpensesScreen from "../screens/expenses/MainExpensesScreen";

const MainExpensesNav = createStackNavigator();

export const ExpensesNavigator = () => {
  return (
    <MainExpensesNav.Navigator>
      <MainExpensesNav.Screen
        name="Expenses"
        component={MainExpensesScreen}
        options={{
          headerShown: false,
        }}
      />
    </MainExpensesNav.Navigator>
  );
};
