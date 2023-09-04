import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card";
import { Image } from "react-native";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const ShowTeamDetails = (props) => {
  const { team } = props;

  const [finalTeam, setFinalTeam] = useState([]);

  useEffect(() => {
    const finalTeam =
      team && team.length > 0 && team.map((item) => item.teamMembers);
    setFinalTeam(finalTeam.flat(1));
  }, [team]);

  const deleteUser = (id) => {};

  console.log(team);
  return (
    <View style={styles.container}>
      {finalTeam && (
        <FlatList
          data={finalTeam}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.mainContainer}>
                <TouchableOpacity
                  style={{ cursor: "pointer" }}
                  onPress={() => {}}
                >
                  <FontAwesome
                    name="edit"
                    size={
                      Platform.OS === "web"
                        ? globalHeight("4%")
                        : globalWidth("6%")
                    }
                    color={Colors.font}
                    style={{
                      alignSelf: "flex-end",
                      marginRight: 10,
                      marginTop: 10,
                    }}
                  />
                </TouchableOpacity>
                <Card style={styles.card} key={index}>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{ uri: item.profilePicture }}
                    />
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.name}>{item.userName}</Text>
                    <Text style={styles.role}> {item.designation} </Text>
                  </View>
                  <View style={styles.details}>
                    <Image
                      style={styles.logo}
                      source={{ uri: item.businessLogo }}
                    />
                    <Text style={styles.name}>{item.businessName}</Text>
                  </View>
                </Card>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -100,
    marginTop: globalHeight("5%"),
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: globalHeight("0.5%"),
    width: Platform.OS === "web" ? globalWidth("50%") : globalWidth("98%"),
    borderWidth: 1.5,
    padding: 10,
  },
  image: {
    height: globalHeight("10%"),
    width: globalHeight("10%"),
    borderRadius: 50,
  },
  details: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: globalHeight("5%"),
    width: globalHeight("5%"),
  },
  name: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: globalHeight("2%"),
  },
  role: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: globalHeight("1.5%"),
    fontStyle: "italic",
  },
});

export default ShowTeamDetails;
