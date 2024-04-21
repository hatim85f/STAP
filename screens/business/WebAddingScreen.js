import React, { Fragment, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import {
  Fontisto,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, CheckBox } from "react-native-elements";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import MainInput from "../../components/MainInput";
import Colors from "../../constants/Colors";

import * as businessActions from "../../store/business/businessActions";

import UploadImage from "../../components/helpers/UploadImages";
import Loader from "../../components/Loader";
import HeaderText from "../../components/HeaderText";
import MenuButton from "../../components/webComponents/menu/MenuButton";

import * as settingsActions from "../../store/settings/settingsActions";
import DropDownPicker from "react-native-dropdown-picker";

const WebAddingScreen = (props) => {
  const { currencyList } = useSelector((state) => state.settings);

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [checked, setChecked] = useState(false);
  const [hasWebSite, setHasWebSite] = useState(false);
  const [webSite, setWebSite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [currencyData, setCurrencyData] = useState([]);

  // refs
  const descriptionRef = useRef();
  const typeRef = useRef();
  const locationRef = useRef();
  const contactPersonRef = useRef();
  const contactEmailRef = useRef();
  const contactNumberRef = useRef();
  const employeesRef = useRef();

  const dispatch = useDispatch();

  // submitting user business
  const handleSubmitForm = async () => {
    setIsLoading(true);
    dispatch(
      businessActions.addBusiness(
        imageUrl,
        businessName,
        businessType,
        businessDescription,
        officeLocation,
        contactPerson,
        contactPersonEmail,
        contactNumber,
        numberOfEmployees,
        webSite,
        selectedCurrency.currencyCode,
        selectedCurrency.currencyName,
        selectedCurrency.currencySymbol
      )
    ).then(() => {
      dispatch(businessActions.getUserBusiness());
      setImageUrl("");
      setBusinessName("");
      setBusinessType("");
      setBusinessDescription("");
      setOfficeLocation("");
      setContactPerson("");
      setContactPersonEmail("");
      setContactNumber("");
      setNumberOfEmployees(0);
      setHasWebSite(false);
      setWebSite("");
      setSelectedCurrency("");
      setIsLoading(false);

      props.navigation.navigate("Dashboard");
    });
  };

  useEffect(() => {
    dispatch(settingsActions.getCurrencyList());
  }, [dispatch]);

  useEffect(() => {
    const updatedList = [...new Set(currencyList)];
    const currencyData = updatedList.map((currency) => {
      return {
        label: `${currency.countryName} - ${currency.currencyName}`,
        value: {
          currencyCode: currency.currencyCode,
          currencySymbol: currency.currencySymbol,
          countryFlag: currency.countryFlag,
          currencyName: currency.currencyName,
        },
        icon: () => (
          <Avatar
            source={{ uri: currency.countryFlag }}
            rounded
            size="small"
            containerStyle={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: Colors.primary,
            }}
          />
        ),
      };
    });

    setCurrencyData([...new Set(currencyData)]);
  }, [currencyList]);

  if (isLoading) {
    return <Loader center />;
  }
  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <View style={{ width: "100%" }}>
          <MenuButton navigation={props.navigation} />
        </View>
      )}
      {Platform.OS === "web" && <HeaderText text="Add New Business" />}
      <View style={styles.mainRow}>
        <View style={styles.leftSide}>
          <MainInput
            label="Business Name"
            style={styles.input}
            value={businessName}
            onChangeText={(text) => setBusinessName(text)}
            rightIcon={() => (
              <Fontisto name="shopping-store" size={24} color={Colors.font} />
            )}
          />

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Kind of Business</Text>
            <View style={styles.checkboxRow}>
              <View>
                <CheckBox
                  checked={businessType === "Goods"}
                  onPress={() => setBusinessType("Goods")}
                  size={30}
                  checkedColor={Colors.primary}
                />
                <Text style={styles.checkboxText}>Goods</Text>
              </View>

              <View>
                <CheckBox
                  checked={businessType === "Services"}
                  onPress={() => setBusinessType("Services")}
                  size={30}
                  checkedColor={Colors.primary}
                />
                <Text style={styles.checkboxText}>Services</Text>
              </View>
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <MainInput
              label="Logo URL"
              placeholder="Paste Logo URL"
              onChangeText={(text) => setImageUrl(text)}
              value={imageUrl}
            />
            <Text
              style={{
                textAlign: "center",
                fontFamily: "headers",
                fontSize: 16,
                color: Colors.font,
              }}
            >
              OR
            </Text>
            <UploadImage
              disabled={businessName.length === 0}
              getURL={(data) => setImageUrl(data)}
              imageName={businessName}
              subFolder="businesses_logo/"
            />
          </View>
          <MainInput
            label="Business Description"
            style={styles.input}
            value={businessDescription}
            onChangeText={(text) => setBusinessDescription(text)}
            rightIcon={() => (
              <MaterialIcons name="description" size={24} color={Colors.font} />
            )}
            ref={descriptionRef}
            onSubmitEditing={() => locationRef.current.focus()}
          />
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Select Currency</Text>
            <DropDownPicker
              searchable={true}
              items={currencyData}
              open={open}
              value={selectedCurrency}
              setOpen={setOpen}
              setValue={setSelectedCurrency}
              setItems={setCurrencyData}
              placeholder="Select Currency"
              placeholderStyle={{ color: "#6a6b6c" }}
              style={styles.listStyle}
              textStyle={styles.dropText}
              listChildContainerStyle={{
                borderRadius: 25,
                borderColor: Colors.primary,
              }}
            />
          </View>
        </View>
        <View style={styles.leftSide}>
          <MainInput
            label="Office Location"
            style={styles.input}
            value={officeLocation}
            onChangeText={(text) => setOfficeLocation(text)}
            rightIcon={() => (
              <Fontisto name="map-marker-alt" size={24} color={Colors.font} />
            )}
            ref={locationRef}
            onSubmitEditing={() => contactPersonRef.current.focus()}
          />

          <MainInput
            label="Contact Person"
            style={styles.input}
            value={contactPerson}
            onChangeText={(text) => setContactPerson(text)}
            rightIcon={() => (
              <AntDesign name="contacts" size={24} color={Colors.font} />
            )}
            ref={contactPersonRef}
            onSubmitEditing={() => contactEmailRef.current.focus()}
          />

          <MainInput
            label="Contact Person Email"
            style={styles.input}
            value={contactPersonEmail}
            onChangeText={(text) => setContactPersonEmail(text)}
            rightIcon={() => (
              <Fontisto name="email" size={24} color={Colors.font} />
            )}
            ref={contactEmailRef}
            onSubmitEditing={() => contactNumberRef.current.focus()}
          />

          <MainInput
            label="Contact Number"
            style={styles.input}
            value={contactNumber}
            onChangeText={(text) => setContactNumber(text)}
            rightIcon={() => (
              <Entypo name="phone" size={24} color={Colors.font} />
            )}
            ref={contactNumberRef}
            onSubmitEditing={() => employeesRef.current.focus()}
          />

          <MainInput
            label="Number of Employees"
            style={styles.input}
            value={numberOfEmployees.toString()}
            onChangeText={(text) => setNumberOfEmployees(parseInt(text))}
            keyboardType="numeric"
            rightIcon={() => (
              <AntDesign name="team" size={24} color={Colors.font} />
            )}
            ref={employeesRef}
          />
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Have A Website ? </Text>
            <View style={styles.checkboxRow}>
              <View>
                <CheckBox
                  checked={hasWebSite}
                  onPress={() => setHasWebSite(true)}
                  size={30}
                  checkedColor={Colors.primary}
                />
                <Text style={styles.checkboxText}>YES</Text>
              </View>

              <View>
                <CheckBox
                  checked={!hasWebSite}
                  onPress={() => setHasWebSite(false)}
                  size={30}
                  checkedColor={Colors.primary}
                />
                <Text style={styles.checkboxText}>NO</Text>
              </View>
            </View>
          </View>
          {hasWebSite && (
            <MainInput
              label="Website"
              onChangeText={(text) => setWebSite(text)}
              value={webSite}
              keyboardType="url"
              rightIcon={() => (
                <MaterialCommunityIcons
                  name="web"
                  size={24}
                  color={Colors.font}
                />
              )}
              style={styles.input}
            />
          )}
        </View>
      </View>
      <Button
        title="Submit"
        onPress={handleSubmitForm}
        titleStyle={styles.titleStyle}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "scroll",
  },
  header: {},
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: globalHeight("5%"),
  },
  leftSide: {
    width: "45%",
    padding: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
  },
  card: {
    marginTop: 15,
  },
  input: {
    width: Platform.OS === "web" ? globalWidth("40%") : globalWidth("80%"),
  },
  checkboxContainer: {
    marginTop: 15,
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    marginBottom: globalHeight("2%"),
    paddingBottom: globalHeight("2%"),
    paddingHorizontal:
      Platform.OS === "web" ? globalWidth("0.5%") : globalWidth("2%"),
  },
  checkboxLabel: {
    color: Colors.font,
    fontFamily: "headers",
    fontWeight: "bold",
    textAlign: "left",
  },
  checkboxRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    marginHorizontal: 25,
  },
  checkboxText: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: 16,
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    width: Platform.OS === "web" ? globalWidth("20%") : globalWidth("50%"),
    marginTop: 25,
    borderRadius: 10,
    marginBottom: 25,
    alignSelf: "center",
  },
  titleStyle: {
    color: "white",
    fontFamily: "headers",
  },
});

export const WebAddingScreenOptions = (navData) => {
  return {
    headerTitle: "WebAddingScreen",
  };
};

export default WebAddingScreen;
