import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Card from "../Card";
import {
  Fontisto,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { Button, CheckBox } from "react-native-elements";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import MainInput from "../MainInput";
import Colors from "../../constants/Colors";

const AddNewBusiness = (props) => {
  const { focused } = props;

  // states
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

  // refs
  const descriptionRef = useRef();
  const typeRef = useRef();
  const locationRef = useRef();
  const contactPersonRef = useRef();
  const contactEmailRef = useRef();
  const contactNumberRef = useRef();
  const employeesRef = useRef();

  // uploading user business image
  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking image: ", error);
    }
  };

  // submitting user business
  const handleSubmitForm = () => {};

  return (
    <Card style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled
        scrollEventThrottle={16}
        contentContainerStyle={styles.scroll}
      >
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
          <CheckBox
            center
            title={
              selectedImage ? "Click to Remove Image" : "Click to Add Image"
            }
            iconRight
            iconType="material"
            checkedIcon="clear"
            uncheckedIcon="add"
            checkedColor="red"
            checked={selectedImage}
            onPress={handleImageUpload}
          />
          <Text style={styles.note}>Accepting Only JPEG or PNG files</Text>
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
            keyboardType="url"
            rightIcon={() => (
              <MaterialCommunityIcons
                name="web"
                size={24}
                color={Colors.font}
              />
            )}
            style={styles.input}
            value={contactNumber}
          />
        )}
        <Button
          title="Submit"
          onPress={handleSubmitForm}
          titleStyle={styles.titleStyle}
          buttonStyle={styles.buttonStyle}
        />
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    width: Platform.OS === "web" ? globalWidth("50%") : globalWidth("95%"),
    alignSelf: "center",
    borderWidth: Platform.OS === "web" ? 0 : 2,
    borderRadius: Platform.OS === "web" ? 10 : 25,
  },
  scroll: {
    width: Platform.OS === "web" ? globalWidth("50%") : globalWidth("95%"),
    marginTop: 5,
    alignItems: "center",

    paddingTop: 25,
  },
  input: {
    width: Platform.OS === "web" ? globalWidth("45%") : globalWidth("80%"),
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
    fontSize: 16,
    fontWeight: "bold",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
  },

  checkboxLabel: {
    color: Colors.font,
    fontFamily: "headers",
    fontWeight: "bold",
    textAlign: "left",
    fontSize:
      Platform.OS === "web"
        ? globalWidth("0.8")
        : Platform.isPad
        ? globalWidth("2.5%")
        : globalWidth("4%"),
  },
  checkboxRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    // backgroundColor: "red",
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
  note: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize:
      Platform.OS === "web"
        ? globalWidth("1.2%")
        : Platform.isPad
        ? globalWidth("2%")
        : globalWidth("3.5%"),
    color: Colors.font,
    marginTop: 15,
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    width: Platform.OS === "web" ? globalWidth("20%") : globalWidth("50%"),
    marginTop: 25,
    borderRadius: 10,
    marginBottom: 25,
  },
  titleStyle: {
    color: "white",
    fontFamily: "headers",
  },
});

export default AddNewBusiness;
