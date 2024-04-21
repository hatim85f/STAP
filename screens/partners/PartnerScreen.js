import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import PartnerList from "../../components/partners/PartnerList";
import AddPartner from "../../components/partners/AddPartner";

import Loader from "../../components/Loader";

import * as businessActions from "../../store/business/businessActions";
import * as authActions from "../../store/auth/authActions";

const PartnerScreen = (props) => {
  const { token } = useSelector((state) => state.auth);

  const [selectedNav, setSelectedNav] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const dispatch = useDispatch();

  //=========================================================GET USER BACK========================================================

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails = window.localStorage.getItem("userDetails");

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

  //   ========================================================GET USER BUSINESSES========================================================

  useEffect(() => {
    if (token.length > 0) {
      console.log("getting Business");
      setIsLoading(true);
      setLoadingMessage("Fetching Business Details");
      dispatch(businessActions.getBusinessesDetails()).then(() => {
        setIsLoading(false);
        setLoadingMessage("");
      });
    }
  }, [dispatch, token]);

  const ShowElement = () => {
    if (selectedNav === "show_partners") {
      return <PartnerList navigation={props.navigation} />;
    } else if (selectedNav === "add_partner") {
      return <AddPartner navigation={props.navigation} />;
    } else {
      return (
        <View style={styles.innerContainer}>
          <Text style={styles.note}>Please select an option to continue</Text>
          <ul>
            <li style={styles.listPoint}>
              <Text style={styles.listItem}>
                Partners List will show your business partners
              </Text>
            </li>
            <li style={styles.listPoint}>
              <Text style={styles.listItem}>
                Add Partner will allow you to add a new partner
              </Text>
            </li>
          </ul>
        </View>
      );
    }
  };

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} center />;
  }

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <View style={styles.buttonsRow}>
        <Button
          buttonStyle={
            selectedNav === "show_partners"
              ? styles.selectedButton
              : styles.button
          }
          title="Partners List"
          onPress={() =>
            setSelectedNav(
              selectedNav === "show_partners" ? null : "show_partners"
            )
          }
          titleStyle={
            selectedNav === "show_partners"
              ? styles.selectedTitle
              : styles.title
          }
        />
        <Button
          buttonStyle={
            selectedNav === "add_partner"
              ? styles.selectedButton
              : styles.button
          }
          title="Add Partner"
          onPress={() =>
            setSelectedNav(selectedNav === "add_partner" ? null : "add_partner")
          }
          titleStyle={
            selectedNav === "add_partner" ? styles.selectedTitle : styles.title
          }
        />
      </View>
      <ShowElement />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
    width: globalHeight("50%"),
    alignSelf: "center",
  },
  button: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    width: globalHeight("20%"),
  },
  selectedButton: {
    backgroundColor: Colors.primary,
    width: globalHeight("20%"),
  },
  title: {
    color: "black",
    fontFamily: "open-sans",
  },
  selectedTitle: {
    color: "white",
    fontFamily: "open-sans",
  },
  innerContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  note: {
    fontFamily: "Helvetica",
    fontSize: globalWidth("1.2%"),
    marginBottom: 20,
    color: Colors.font,
    fontStyle: "italic",
  },
  listItem: {
    fontFamily: "Helvetica",
    fontSize: globalWidth("1%"),
    marginBottom: 20,
    color: Colors.primary,
  },
  listPoint: {
    marginBottom: 20,
    color: Colors.primary,
  },
});

export default PartnerScreen;
