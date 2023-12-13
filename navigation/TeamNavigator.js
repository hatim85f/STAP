import { createStackNavigator } from "@react-navigation/stack";
import TeamDetailsScreen from "../screens/team/TeamDetailsScreen";
import AddMemberScreen from "../screens/team/AddMemberScreen";
import IndividualTargetScreen from "../screens/team/IndividualTargetScreen";
import IndividualSalesScreen from "../screens/team/IndividualSalesScreen";
import IndividualAchievementScreen from "../screens/team/IndividualAchievementScreen";
import MemberTargetData from "../screens/team/MemberTargetData";
import MonthlyTargetScreen from "../screens/monthly/MonthlyTargetScreen";
import MonthlyAchievementScreen from "../screens/monthly/MonthlyAchievementScreen";
import MonthlyContainerScreen from "../screens/monthly/MonthlyContainerScreen";

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
        component={AddMemberScreen}
        options={{
          title: "Invite New Member",
        }}
      />
      <TeamNav.Screen
        name="individual_target"
        component={IndividualTargetScreen}
        options={{
          title: "Individual Target",
        }}
      />
      <TeamNav.Screen
        name="indiviudal_sales"
        component={IndividualSalesScreen}
        options={{
          title: "Individual Sales",
        }}
      />
      <TeamNav.Screen
        name="individual_achievement"
        component={IndividualAchievementScreen}
        options={{
          title: "Individual Achievement",
        }}
      />
      <TeamNav.Screen
        name="member_target_data"
        component={MemberTargetData}
        options={{
          title: "Member Target",
        }}
      />
      <TeamNav.Screen
        name="monthly_target"
        component={MonthlyTargetScreen}
        options={{
          title: "Monthly Target",
        }}
      />
      <TeamNav.Screen
        name="monthly_achievement"
        component={MonthlyAchievementScreen}
        options={{
          title: "Monthly Achievement",
        }}
      />
      <TeamNav.Screen
        name="monthly_sales"
        component={MonthlyAchievementScreen}
        options={{
          title: "Monthly Sales",
        }}
      />
      <TeamNav.Screen
        name="monthly_container"
        component={MonthlyContainerScreen}
        options={{
          title: "Monthly Container",
        }}
      />
    </TeamNav.Navigator>
  );
};
