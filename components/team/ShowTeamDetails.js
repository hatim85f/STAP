import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Animated,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Easing,
} from "react-native";
import { useDispatch } from "react-redux";

import Card from "../Card";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import EditMember from "./EditMember";

import * as businessActions from "../../store/business/businessActions";

const ShowTeamDetails = (props) => {
  const { team, getEditing } = props;

  const editHeight = useRef(new Animated.Value(-globalHeight("200%"))).current;

  const [finalTeam, setFinalTeam] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const finalTeam =
      team && team.length > 0 && team.map((item) => item.teamMembers);
    setFinalTeam(finalTeam.flat(1));
  }, [team]);

  useEffect(() => {
    getEditing(editing);
  }, [editing]);

  const editUser = (user) => {
    setSelectedMember(user);
    setEditing(true);

    Animated.timing(editHeight, {
      toValue: 0,
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  const closeModal = () => {
    setEditing(false);

    Animated.timing(editHeight, {
      toValue: -globalHeight("200%"),
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start(() => {
      setSelectedMember(null);
      dispatch(businessActions.getUserBusiness());
    });
  };

  return (
    <View style={styles.container}>
      {finalTeam && finalTeam.length > 0 && (
        <FlatList
          data={finalTeam}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.mainContainer}>
                <TouchableOpacity
                  style={{ cursor: "pointer" }}
                  onPress={() => editUser(item)}
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
                <Card style={styles.mainCard} key={index}>
                  <View style={styles.card}>
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
                  </View>
                  {(item.userType === "Business Admin" ||
                    item.isAuthorized) && (
                    <View style={styles.lowRow}>
                      {item.userType === "Business Admin" && (
                        <MaterialIcons
                          name="admin-panel-settings"
                          size={
                            Platform.OS === "web"
                              ? globalWidth("3.5%")
                              : globalWidth("6%")
                          }
                          color={Colors.primary}
                          style={{ marginRight: 3 }}
                        />
                      )}
                      {/* we need to add , to the end of each item and , and before the last item */}
                      {item.isAuthorized && (
                        <Text style={styles.auth}>
                          Authorized for :{" "}
                          <Text style={styles.authDetails}>
                            {item.authority.join(", ")}
                          </Text>
                        </Text>
                      )}
                    </View>
                  )}
                </Card>
              </View>
            );
          }}
        />
      )}
      {selectedMember && (
        <Animated.View
          style={[styles.editView, { transform: [{ translateY: editHeight }] }]}
        >
          <ScrollView
            scrollEnabled
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ height: globalHeight("100%") }}>
              <EditMember member={selectedMember} close={closeModal} />
            </View>
          </ScrollView>
        </Animated.View>
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
    overflow: "scroll",
  },
  mainCard: {
    marginVertical: globalHeight("0.5%"),
    width: Platform.OS === "web" ? globalWidth("50%") : globalWidth("98%"),
    borderWidth: 1.5,
    padding: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    height: globalHeight("8%"),
    width: globalHeight("8%"),
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
  lowRow: {
    borderTopColor: Colors.accent,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginTop: 5,
  },
  auth: {
    fontFamily: "headers",
    color: Colors.font,
    fontSize: Platform.OS === "web" ? globalWidth("1%") : globalWidth("3%"),
  },
  authDetails: {
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  editView: {
    position: "absolute",
    height: globalHeight("70%"),
    width: Platform.OS === "web" ? globalWidth("60%") : globalWidth("98%"),
    backgroundColor: "#8363d6",
    top: -globalHeight("10%"),
    bottom: 0,
    borderRadius: 10,
    padding: 25,
    flex: 1,
    zIndex: 100,
  },
});

export default ShowTeamDetails;
