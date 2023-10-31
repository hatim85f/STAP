import { createStackNavigator } from "@react-navigation/stack";
import ClientsShowScreen from "../screens/clients/ClientsShowScreen";
import ClientsAddScreen from "../screens/clients/ClientsAddScreen";
import ClientsEditScreen from "../screens/clients/ClientsEditScreen";

const MainClientsNavigation = createStackNavigator();

export const ClientsNavigation = () => {
  return (
    <MainClientsNavigation.Navigator>
      <MainClientsNavigation.Screen
        name="Clients"
        component={ClientsShowScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainClientsNavigation.Screen
        name="addClinets"
        component={ClientsAddScreen}
        options={{
          headerShown: false,
          title: "Add Clients",
        }}
      />
      <MainClientsNavigation.Screen
        name="clientEdit"
        component={ClientsEditScreen}
        options={{
          headerShown: false,
          title: "Edit Clients",
        }}
      />
    </MainClientsNavigation.Navigator>
  );
};
