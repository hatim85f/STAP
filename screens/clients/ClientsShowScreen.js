import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { isTablet, isWeb } from "../../constants/device";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import ClientsShow from "../../components/clients/ClientsShow";
import WebAlert from "../../components/webAlert/WebAlert";
import BusinessSelection from "../../components/BusinessSelection";
import MenuButton from "../../components/webComponents/menu/MenuButton";

import * as clientsActions from "../../store/clients/clientsActions";
import * as authActions from "../../store/auth/authActions";
import * as businessActions from "../../store/business/businessActions";

const ClientsShowScreen = (props) => {
  const { clients } = useSelector((state) => state.clients);
  const { user, token } = useSelector((state) => state.auth);
  const { userBusiness } = useSelector((state) => state.business);

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessId, setBusinessId] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        if (Platform.OS === "web") {
          storedUserDetails = window.localStorage.getItem("userDetails");
        } else {
          storedUserDetails = await AsyncStorage.getItem("userDetails");
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

  useEffect(() => {
    dispatch(clientsActions.getClients());
  }, [dispatch]);

  const navigateToAdd = () => {
    if (!businessId && user.userType === "Business Owner") {
      setShowAlert(true);
      setErrorMessage("To Add Clients, you need to Select Business First");

      return;
    }

    props.navigation.navigate("addClinets", {
      businessId:
        user.userType === "Business Owner"
          ? businessId
          : userBusiness.businessId,
    });
  };

  useEffect(() => {
    if (user.userType !== "Business Owner") {
      dispatch(businessActions.getEmployeeBusiness());
    }
  }, [user.userType, dispatch]);

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      <Button
        title="Add Client"
        onPress={navigateToAdd}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
      />
      {user.userType === "Business Owner" && (
        <View style={{ width: "100%", zIndex: 100 }}>
          <BusinessSelection
            getBusinessId={(data) => setBusinessId(data)}
            getSelectedBusiness={(data) => setSelectedBusiness(data)}
          />
        </View>
      )}
      <Text style={styles.header}> {selectedBusiness} Clients</Text>
      {clients && clients.length > 0 ? (
        <ClientsShow
          clients={
            businessId
              ? clients.filter((a) => a.businessId === businessId)
              : clients
          }
        />
      ) : (
        <View style={styles.noteContainer}>
          {!selectedBusiness && (
            <Text style={styles.noteText}>
              Your List of Clients still Empty
            </Text>
          )}
        </View>
      )}
      <WebAlert
        message={errorMessage}
        okText="Okay"
        onOk={() => setShowAlert(false)}
        showAlert={showAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1.1%")
      : isTablet()
      ? globalWidth("2.5%")
      : globalWidth("4.5%"),
  },
  buttonStyle: {
    marginTop: 10,
    marginBottom: 10,
    width: isWeb()
      ? globalWidth("10%")
      : isTablet()
      ? globalWidth("30%")
      : globalWidth("40%"),
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor:
      Platform.OS === "web"
        ? Colors.primary
        : Platform.OS === "ios"
        ? Colors.primary
        : "white",
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  titleStyle: {
    fontFamily: "headers",
    color:
      Platform.OS === "web"
        ? "white"
        : Platform.OS === "ios"
        ? "white"
        : Colors.primary,
    fontSize: isWeb()
      ? globalWidth("1.1%")
      : isTablet()
      ? globalWidth("2.5%")
      : globalWidth("4.5%"),
  },
  noteContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noteText: {
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1.1%")
      : isTablet()
      ? globalWidth("2.5%")
      : globalWidth("4.5%"),
  },
});

export default ClientsShowScreen;
