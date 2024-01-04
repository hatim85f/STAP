import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import TabBarNavigator from "../../components/tabBar/TabBarNavigator";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import { globalHeight } from "../../constants/globalWidth";
import LeftMenu from "./LeftMenu";
import Colors from "../../constants/Colors";

import TeamOverview from "../../components/team/teamSales/TeamOverview";
import TeamMonthly from "../../components/team/teamSales/TeamMonthly";
import TeamYTD from "../../components/team/teamSales/TeamYTD";
import TeamFullYear from "../../components/team/teamSales/TeamFullYear";
import IndividualOverview from "../../components/team/individualSales/IndividualOverview";
import IndividualMonthly from "../../components/team/individualSales/IndividualMonthly";
import IndividualYTD from "../../components/team/individualSales/IndividualYTD";
import IndividualFullYear from "../../components/team/individualSales/IndividualFullYear";

const IndividualAchievementScreen = (props) => {
  const [direction, setDirection] = useState(null);

  const ShownItem = () => {
    if (direction === "team-overview") {
      return <TeamOverview />;
    } else if (direction === "team-monthly") {
      return <TeamMonthly />;
    } else if (direction === "team-ytd") {
      return <TeamYTD />;
    } else if (direction === "team-full-year") {
      return <TeamFullYear />;
    } else if (direction === "individual-overview") {
      return <IndividualOverview />;
    } else if (direction === "individual-monthly") {
      return <IndividualMonthly />;
    } else if (direction === "individual-ytd") {
      return <IndividualYTD />;
    } else if (direction === "individual-full-year") {
      return <IndividualFullYear />;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.leftRow}>
            <LeftMenu
              navigation={props.navigation}
              getDirection={(dir) => setDirection(dir)}
            />
            <View style={styles.border} />
          </View>
        </View>
        <View style={styles.rightContainer}>
          <ShownItem />
        </View>
      </View>
      <TabBarNavigator route="individual-achievement" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: "20%",
    height: globalHeight("85%"),
    backgroundColor: Colors.haizyColor,
  },
  rightContainer: {
    flex: 1,
    width: "80%",
    height: globalHeight("85%"),
    backgroundColor: "white",
  },
  leftRow: {
    flexDirection: "row",
    width: "100%",
  },
  border: {
    backgroundColor: Colors.primary,
    height: globalHeight("85%"),
    width: "2%",
    marginRight: 0,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 5,
  },
});

export default IndividualAchievementScreen;
