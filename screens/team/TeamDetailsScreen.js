import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import HeaderText from "../../components/HeaderText";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import BusinessSelection from "../../components/BusinessSelection";
import { globalHeight } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import Loader from "../../components/Loader";
import ShowTeamDetails from "../../components/team/ShowTeamDetails";

const TeamDetailsScreen = (props) => {
  const { team } = useSelector((state) => state.team);
  const { token } = useSelector((state) => state.auth);

  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [businessId, setBusinessId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (businessId) {
      setSelectedTeam(team.filter((item) => item.businessId === businessId));
    } else {
      setSelectedTeam(team);
    }
  }, [businessId, team]);

  if (isLoading) {
    return <Loader center />;
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <View style={{ width: "100%", alignItems: "flex-start" }}>
          <MenuButton navigation={props.navigation} />
        </View>
      )}
      <View style={styles.innerContainer}>
        <BusinessSelection
          getBusinessId={(id) => setBusinessId(id)}
          getSelectedBusiness={(business) => setSelectedBusiness(business)}
        />
        <View style={{ zIndex: -500 }}>
          <HeaderText
            text={
              selectedBusiness ? `${selectedBusiness} Team` : "Team Details"
            }
          />
        </View>
        {selectedTeam && selectedTeam.length > 0 && (
          <ShowTeamDetails
            team={selectedTeam}
            getEditing={(data) => setEditing(data)}
          />
        )}
      </View>

      {businessId && !editing && (
        <Button
          title="Invite New Team Member"
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
          onPress={() =>
            props.navigation.navigate("add_member", { businessId })
          }
          iconRight={true}
          icon={
            <FontAwesome
              name="plus"
              size={24}
              color={Colors.primary}
              style={{ marginLeft: 10 }}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: globalHeight("100%"),
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    // zIndex: -100,
  },
  buttonStyle: {
    backgroundColor: "#fff",
    borderColor: "#6a6b6c",
    borderWidth: 2,
    borderRadius: 10,
    width: Platform.OS === "web" ? "30%" : Platform.isPad ? "50%" : "80%",
    alignSelf: "center",
    bottom: 0,
    marginBottom: globalHeight("5%"),
  },
  titleStyle: {
    color: Colors.primary,
    fontFamily: "headers",
  },
});

export default TeamDetailsScreen;
