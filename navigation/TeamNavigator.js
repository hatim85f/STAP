import { createStackNavigator } from "@react-navigation/stack";
import TeamDetailsScreen from "../screens/team/TeamDetailsScreen";
import AddminMemberScreen from "../screens/team/AddMemberScreen";

const TeamNav = createStackNavigator();

export const TeamNavigator = () => {
  return (
    <TeamNav.Navigator screenOptions={{ headerShown: false }}>
      <TeamNav.Screen
        name="team_details"
        component={TeamDetailsScreen}
        options={{
          title: "Team Details",
        }}
      />
      <TeamNav.Screen
        name="add_member"
        component={AddminMemberScreen}
        options={{
          title: "Invite New Member",
        }}
      />
    </TeamNav.Navigator>
  );
};
