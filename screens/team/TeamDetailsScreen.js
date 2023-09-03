import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import HeaderText from "../../components/HeaderText";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import BusinessSelection from "../../components/BusinessSelection";
import { globalHeight } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const TeamDetailsScreen = (props) => {
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [businessId, setBusinessId] = useState("");

  console.log({ selectedBusiness, businessId });

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <View style={{ width: "100%", alignItems: "flex-start" }}>
          <MenuButton navigation={props.navigation} />
        </View>
      )}
      <View style={styles.innerContainer}>
        <HeaderText
          text={selectedBusiness ? `${selectedBusiness} Team` : "Team Details"}
        />
        <BusinessSelection
          getBusinessId={(id) => setBusinessId(id)}
          getSelectedBusiness={(business) => setSelectedBusiness(business)}
        />
      </View>
      {businessId && (
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
