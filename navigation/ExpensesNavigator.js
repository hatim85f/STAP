import { createStackNavigator } from "@react-navigation/stack";
import MainExpensesScreen from "../screens/expenses/MainExpensesScreen";
import ExpensesActions from "../screens/expenses/ExpensesActions";

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
      <MainExpensesNav.Screen
        name="expenses_actions"
        component={ExpensesActions}
        options={{
          title: "Expenses Actions",
          headerShown: false,
        }}
      />
    </MainExpensesNav.Navigator>
  );
};
