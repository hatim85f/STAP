import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

import * as businessActions from "../../store/business/businessActions";
import * as clientsActions from "../../store/clients/clientsActions";
import * as authActions from "../../store/auth/authActions";

import { isTablet, isWeb } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import Colors from "../../constants/Colors";
import Loader from "../../components/Loader";
import InputsContainer from "../../components/appComponents/auth/InputsContainer";
import CustomInput from "../../components/appComponents/Input/Input";
import UploadImage from "../../components/helpers/UploadImages";

const ClientsAddScreen = (props) => {
  const { businessId } = props.route.params;
  const { user } = useSelector((state) => state.auth);
  const { team } = useSelector((state) => state.team);

  const [clientName, setClientName] = useState("");
  const [clientType, setClientType] = useState("");
  const [address, setAddress] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [contactPersonPhone, setContactPersonPhone] = useState("");
  const [logoURL, setLogoURL] = useState("");
  const [personInHandle, setPersonInHandle] = useState(null);
  const [open, setOpen] = useState(false);
  const [teamIsOpen, setTeamIsOpen] = useState(false);
  const [teamList, setTeamList] = useState([{ label: "", value: "" }]);
  const [isLoading, setIsLoading] = useState(false);

  const contactNameRef = useRef();
  const contactEmailRef = useRef();
  const contactPhoneRef = useRef();

  const clientTypeList = [
    { label: "Big Business", value: "Big Business" },
    { label: "Medium Business", value: "Medium Business" },
    { label: "Small Business", value: "Small Business" },
    { label: "Individual", value: "Individual" },
  ];

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
    dispatch(businessActions.getUserBusiness());
  }, [dispatch]);

  useEffect(() => {
    if (team && team.length > 0) {
      const teamDetails = team[0].teamMembers.map((item) => {
        return {
          label: item.userName,
          value: item._id,
        };
      });

      setTeamList(teamDetails);
    }
  }, [team]);

  const addClientHandler = () => {
    setIsLoading(true);
    dispatch(
      clientsActions.addClient(
        clientName,
        businessId,
        clientType,
        address,
        contactPersonName,
        contactPersonEmail,
        contactPersonPhone,
        logoURL,
        personInHandle ? personInHandle : user._id
      )
    ).then(() => {
      dispatch(clientsActions.getClients());
      setIsLoading(false);
      window.location.href = "/clients/show-clients";
    });
  };

  useEffect(() => {
    if (clientType.length > 0 && clientType === "Individual") {
      setContactPersonName(clientName);
      setAddress("Individual");
    }
  }, [clientType]);

  return (
    <View style={styles.container}>
      {/* show back button */}
      {Platform.OS === "ios" && (
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{ top: 10, left: 10 }}
        >
          <AntDesign name="arrowleft" size={24} color={Colors.primary} />
        </TouchableOpacity>
      )}
      <View style={{ width: "60%", alignSelf: "center", flex: 1 }}>
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <InputsContainer
            style={{
              height: globalHeight("150%"),
              marginTop: 20,
              width: "95%",
              borderRadius: 10,
            }}
          >
            <CustomInput
              label="Cusomter Name"
              onChangeText={(text) => setClientName(text)}
              keyboardType="name"
              rightIcon={() => (
                <Ionicons name="person" size={24} color="black" />
              )}
            />
            <DropDownPicker
              open={open}
              value={clientType}
              items={clientTypeList}
              setOpen={setOpen}
              setValue={setClientType}
              setItems={setClientType}
              placeholder="Select Client Type"
              placeholderStyle={{ color: "#6a6b6c" }}
              style={styles.listStyle}
              textStyle={styles.dropText}
              dropDownContainerStyle={styles.dropListStyle}
            />
            {clientType !== "Individual" && (
              <CustomInput
                label="Address"
                onChangeText={(text) => setAddress(text)}
                onEndEditing={() => contactNameRef.current.focus()}
                keyboardType="name"
                rightIcon={() => (
                  <Ionicons name="location" size={24} color="black" />
                )}
              />
            )}
            {clientType !== "Individual" && (
              <CustomInput
                label="Contact Person Name"
                onChangeText={(text) => setContactPersonName(text)}
                onEndEditing={() => contactEmailRef.current.focus()}
                value={contactPersonName}
                keyboardType="name"
                ref={contactNameRef}
                rightIcon={() => (
                  <Ionicons name="person" size={24} color="black" />
                )}
              />
            )}
            <CustomInput
              label={
                clientType === "Individual" ? "Email" : "Contact Person Email"
              }
              onChangeText={(text) => setContactPersonEmail(text)}
              onEndEditing={() => contactPhoneRef.current.focus()}
              keyboardType="email-address"
              ref={contactEmailRef}
              rightIcon={() => <Ionicons name="mail" size={24} color="black" />}
            />
            <CustomInput
              label={
                clientType === "Individual" ? "Phone" : "Contact Person Phone"
              }
              onChangeText={(text) => setContactPersonPhone(text)}
              keyboardType="phone-pad"
              placeholder="+00 000 000 0000"
              ref={contactPhoneRef}
              rightIcon={() => <Ionicons name="call" size={24} color="black" />}
            />
            <UploadImage
              imageName={clientName}
              getURL={(data) => setLogoURL(data)}
              disabled={clientName.length === 0}
              subFolder="clients"
            />
            {user.userType === "Business Owner" && (
              <DropDownPicker
                open={teamIsOpen}
                value={personInHandle}
                items={teamList}
                setOpen={setTeamIsOpen}
                setValue={setPersonInHandle}
                setItems={setPersonInHandle}
                placeholder="Select Team Member"
                placeholderStyle={{ color: "#6a6b6c" }}
                style={styles.listStyle}
                textStyle={styles.dropText}
                dropDownContainerStyle={styles.dropListStyle}
              />
            )}
            {isLoading ? (
              <Loader />
            ) : (
              <Button
                buttonStyle={styles.submitButton}
                titleStyle={styles.buttonTitleStyle}
                title="Add Client"
                onPress={addClientHandler}
                disabled={
                  clientName.length === 0 ||
                  clientType.length === 0 ||
                  address.length === 0 ||
                  contactPersonName.length === 0 ||
                  contactPersonEmail.length === 0 ||
                  contactPersonPhone.length === 0 ||
                  logoURL.length === 0
                }
                disabledStyle={styles.disabledButton}
                disabledTitleStyle={styles.disabledButtonStyle}
              />
            )}
          </InputsContainer>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {},
  listStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    width: isWeb() ? "80%" : "95%",
    alignSelf: "center",
    borderWidth: 0,
    height: globalWidth("3.5%"),
    zIndex: 100,
    borderWidth: 1.5,
    borderColor: "#6a6b6c",
    marginBottom: 60,
  },
  dropText: {
    fontFamily: "headers",
    color: "black",
    fontSize: isWeb() ? globalWidth("1.1%") : globalWidth("3.5%"),
  },
  dropListStyle: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: Colors.primary,
    width: isWeb() ? "80%" : "95%",
    alignSelf: "center",
    zIndex: 10000,
  },
  submitButton: {
    width: isWeb() ? globalWidth("10%") : globalWidth("40%"),
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  buttonTitleStyle: {
    fontFamily: "headers",
    color: "white",
    fontSize: isWeb()
      ? globalWidth("1.1%")
      : isTablet()
      ? globalWidth("2.5%")
      : globalWidth("3.5%"),
  },
  disabledButton: {
    borderColor: "white",
    borderWidth: 1.5,
  },
  disabledButtonStyle: {
    color: "white",
  },
});

export default ClientsAddScreen;
