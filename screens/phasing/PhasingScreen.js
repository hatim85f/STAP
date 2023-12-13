import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as targetActions from "../../store/target/targetActions";
import Loader from "../../components/Loader";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import PhasingModal from "./PhasingModal";
import LineChart from "../../components/charts/LineChart";
import Card from "../../components/Card";
import moment from "moment";
import * as authActions from "../../store/auth/authActions";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import { MaterialIcons } from "@expo/vector-icons";
import WebAlert from "../../components/webAlert/WebAlert";
import { Pressable } from "react-native";

const PhasingScreen = (props) => {
  const { phasing } = useSelector((state) => state.target);
  const { token } = useSelector((state) => state.auth);

  const [showError, setShowError] = useState(false);
  const [phasingName, setPhasingName] = useState("");
  const [phasingId, setPhasingId] = useState(null);

  //   ================================RETURNING USER IF NOT LOGGED IN==================================

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        if (Platform.OS === "web") {
          storedUserDetails = window.localStorage.getItem("userDetails");
        } else {
          storedUserDetails = await AsyncStorage.getItem("userDetails");

          console.log(storedUserDetails, "Details");
        }

        if (storedUserDetails) {
          const parsedUserDetails = JSON.parse(storedUserDetails);

          if (parsedUserDetails.user) {
            dispatch(authActions.getUserIn(parsedUserDetails));
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  //   ======================================STATE MANAGEMENT===========================================

  const [openPhasing, setOpenPhasing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   =====================================GETTING PHASING DATA=======================================

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      dispatch(targetActions.getPhasing()).then(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, token]);

  // ====================================DELETE PHASING============================================

  const deletePhasing = (id) => {
    setShowError(false);
    setIsLoading(true);
    dispatch(targetActions.deletePhasing(phasingId)).then(() => {
      dispatch(targetActions.getPhasing());
      setIsLoading(false);
    });
  };

  //   ====================================RETURN IF NO PHASING============================================

  if (phasing && phasing.length === 0) {
    return (
      <View style={styles.container}>
        <MenuButton navigation={props.navigation} />
        <Text style={styles.header}>You didn't add phasing yet</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Add Phasing"
            onPress={() => setOpenPhasing(true)}
            buttonStyle={styles.button}
            titleStyle={styles.title}
          />
        </View>
        <PhasingModal
          open={openPhasing}
          closeModal={() => setOpenPhasing(false)}
        />
      </View>
    );
  }

  //   ====================================RETURN IF LOADING =========================================

  if (isLoading) {
    return <Loader center loadingMessage="Getting your phasing ready" />;
  }

  // ===============================================RETURN IF PHASING============================================

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <Text style={styles.header}>Your Current Phasing</Text>
      <Button
        title="Add New Phasing Data"
        onPress={() => setOpenPhasing(true)}
        buttonStyle={[
          styles.button,
          {
            marginBottom: globalHeight("2.5%"),
            marginTop: globalHeight("2.5%"),
          },
        ]}
        titleStyle={styles.title}
      />
      <FlatList
        data={phasing}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <Card style={styles.card}>
              <Pressable
                style={styles.deleteContainer}
                onPress={() => {
                  setPhasingName(item.phasingName);
                  setPhasingId(item._id);
                  setShowError(true);
                }}
              >
                <MaterialIcons
                  name="delete-sweep"
                  size={globalWidth("2.5%")}
                  color="#ff0055"
                />
              </Pressable>
              <LineChart
                details={item.phasingPercentage}
                name={item.phasingName}
                yaxisName="Phasing Percentage"
                xaxisName="Months"
              />
              <Text style={styles.title}>
                Added In :{" "}
                <Text style={styles.data}>
                  {moment(item.addedIn).format("DD / MM /YYYY")}
                </Text>{" "}
              </Text>
              {moment(item.updatedIn).format("DD/MM/YY") !==
                moment(item.addedIn).format("DD/MM/YY") && (
                <Text style={styles.title}>
                  Updated In :{" "}
                  <Text style={styles.data}>
                    {moment(item.updatedIn).format("DD / MM / YYYY")}
                  </Text>{" "}
                </Text>
              )}
            </Card>
          );
        }}
      />
      <View style={{ height: globalHeight("5%") }} />
      <PhasingModal
        open={openPhasing}
        closeModal={() => setOpenPhasing(false)}
      />
      <WebAlert
        showAlert={showError}
        title="Delete Phasing"
        message={`Are you sure you want to delete ${phasingName}?`}
        closeModal={() => setShowError(false)}
        onOk={deletePhasing}
        onCancel={() => setShowError(false)}
        okText="Delete"
        cancelText="Cancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: globalWidth("1.5%"),
    textAlign: "center",
    marginTop: globalHeight("5%"),
  },
  buttonContainer: {
    marginBottom: 5,
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    width: "40%",
    alignSelf: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontFamily: "headers",
    fontSize: globalWidth("1.25%"),
    textAlign: "center",
  },
  card: {
    width: "60%",
    alignSelf: "center",
    borderWidth: 1.5,
    marginTop: globalHeight("2.5%"),
  },
  data: {
    color: Colors.primary,
  },
  lowerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "40%",
    alignSelf: "center",
    marginBottom: globalHeight("1%"),
    marginTop: globalHeight("1%"),
  },
  avatarStyle: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  deleteContainer: {
    width: "5%",
    alignSelf: "flex-end",
    cursor: "pointer",
  },
});

export default PhasingScreen;
