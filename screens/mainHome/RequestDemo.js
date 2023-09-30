import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";
import {
  FontAwesome,
  Entypo,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { isPhone, isTablet, isWeb } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import DropDownPicker from "react-native-dropdown-picker";
import MainInput from "../../components/MainInput";

const RequestDemoScreen = (props) => {
  const [email, setEmail] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);
  const [name, setName] = useState("");
  const [nameHasError, setNameHasError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageHasError, setMessageHasError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneHasError, setPhoneHasError] = useState(false);
  const [businessSize, setBusinessSize] = useState("");
  const [businessTypeValue, setBusinessTypeValue] = useState("");
  const [businessSizeValue, setBusinessSizeValue] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [country, setCountry] = useState("");
  const [countryHasError, setCountryHasError] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [secondType, setSecondType] = useState("");
  const [secondTypeHasError, setSecondTypeHasError] = useState(false);

  const businessTypeList = [
    { label: "Services", value: "Services" },
    { label: "Goods", value: "Goods" },
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Retail", value: "Retail" },
    { label: "Wholesale", value: "Wholesale" },
    { label: "Other", value: "Other" },
  ];

  const businessSizeList = [
    { label: "1-10", value: "1-10" },
    { label: "11-50", value: "11-50" },
    { label: "51-100", value: "51-100" },
    { label: "101-500", value: "101-500" },
    { label: "501-1000", value: "501-1000" },
    { label: "1000+", value: "1000+" },
  ];

  // checking validity of the input fields
  const chekVaidity = (field) => {
    if (field === "name") {
      if (name.trim().length === 0) {
        setNameHasError(true);
      } else {
        setNameHasError(false);
      }
    } else if (field === "email") {
      if (email.trim().length === 0 || !email.includes("@")) {
        setEmailHasError(true);
      } else {
        setEmailHasError(false);
      }
    } else if (field === "message") {
      if (message.trim().length === 0) {
        setMessageHasError(true);
      } else {
        setMessageHasError(false);
      }
    } else if (field === "phone") {
      if (phone.trim().length === 0) {
        setPhoneHasError(true);
      } else {
        setPhoneHasError(false);
      }
    } else if (field === "country") {
      if (country.trim().length === 0) {
        setCountryHasError(true);
      } else {
        setCountryHasError(false);
      }
    } else if (field === "secondType") {
      if (secondType.trim() === 0) {
        setSecondTypeHasError(true);
      } else {
        setSecondTypeHasError(false);
      }
    }
  };

  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  // submit the form
  // check first if any of the items has error return

  const submitForm = async () => {
    setIsLoading(true);
    if (
      nameHasError ||
      emailHasError ||
      messageHasError ||
      phoneHasError ||
      countryHasError
    ) {
      setIsLoading(false);
      return;
    }
    const response = await fetch(
      "https://stapbe-69c67889a1ba.herokuapp.com/api/mails/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          businessType: businessType === "Other" ? secondType : businessType,
          businessSize,
          country,
          message,
        }),
      }
    );
    const resData = await response.json();

    const responseMessage = resData.message;
    setResponseMessage(responseMessage);

    if (resData.status === "success") {
      alert("Your Request has been sent successfully");
      setName("");
      setEmail("");
      setPhone("");
      setBusinessType("");
      setBusinessSize("");
      setCountry("");
      setMessage("");
      setIsLoading(false);
      props.navigation.navigate("Home");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <View style={styles.innerContainer}>
        <View style={styles.formContainer}>
          <MainInput
            placeholder="Name"
            rightIcon={() => (
              <Ionicons name="person" size={28} color={Colors.font} />
            )}
            showError={nameHasError}
            error="Name Field is Required"
            value={name}
            onChangeText={(text) => setName(text)}
            onSubmitEditing={() => chekVaidity("name")}
            onFocus={() => setNameHasError(false)}
          />
          <MainInput
            placeholder="Email"
            rightIcon={() => (
              <MaterialIcons name="email" size={28} color={Colors.font} />
            )}
            showError={emailHasError}
            error="Email Field is Required"
            value={email}
            onChangeText={(text) => setEmail(text)}
            onSubmitEditing={() => chekVaidity("email")}
            onFocus={() => setEmailHasError(false)}
          />
          <MainInput
            placeholder="Phone"
            rightIcon={() => (
              <Entypo name="phone" size={24} color={Colors.font} />
            )}
            showError={phoneHasError}
            error="Phone Field is Required"
            value={phone}
            onChangeText={(text) => setPhone(text)}
            onSubmitEditing={() => chekVaidity("phone")}
            onFocus={() => setPhoneHasError(false)}
          />
          <DropDownPicker
            open={open}
            value={businessType}
            items={businessTypeList}
            setOpen={setOpen}
            setValue={setBusinessType}
            setItems={setBusinessTypeValue}
            placeholder="Business Type"
            placeholderStyle={{ color: "#6a6b6c" }}
            dropDownDirection="TOP"
            style={styles.listStyle}
            textStyle={styles.dropText}
            dropDownContainerStyle={styles.dropListStyle}
          />
          {businessType === "Other" && (
            <View style={{ marginTop: 15 }}>
              <MainInput
                placeholder="Please specify your kind of business"
                showError={secondTypeHasError}
                value={secondType}
                error="This field can not be empty"
                onChangeText={(text) => setSecondType(text)}
                onFocus={() => setSecondTypeHasError(false)}
              />
            </View>
          )}
          <DropDownPicker
            open={openSize}
            value={businessSize}
            items={businessSizeList}
            setOpen={setOpenSize}
            setValue={setBusinessSize}
            setItems={setBusinessSizeValue}
            placeholder="Business Size"
            placeholderStyle={{ color: "#6a6b6c" }}
            dropDownDirection="TOP"
            style={styles.listStyle}
            textStyle={styles.dropText}
            dropDownContainerStyle={styles.dropListStyle}
          />

          <MainInput
            placeholder="Country"
            rightIcon={() => (
              <Entypo name="globe" size={24} color={Colors.font} />
            )}
            showError={countryHasError}
            error="Country Field is Required"
            value={country}
            onChangeText={(text) => setCountry(text)}
            onSubmitEditing={() => chekVaidity("country")}
            onFocus={() => setCountryHasError(false)}
          />
          <MainInput
            placeholder="Message"
            rightIcon={() => (
              <Entypo name="message" size={24} color={Colors.font} />
            )}
            showError={messageHasError}
            error="Message Field is Required"
            value={message}
            onChangeText={(text) => setMessage(text)}
            onSubmitEditing={() => chekVaidity("message")}
            onFocus={() => setMessageHasError(false)}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Button
              title="Submit"
              onPress={submitForm}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTitleStyle}
            />
          )}
          {responseMessage && (
            <View
              style={[
                styles.responseContainer,
                {
                  borderColor: responseMessage.includes("Something Went Wrong")
                    ? "red"
                    : "green",
                },
              ]}
            >
              <Text
                style={[
                  styles.responseText,
                  {
                    color: responseMessage.includes("Something Went Wrong")
                      ? "red"
                      : "green",
                  },
                ]}
              >
                {responseMessage}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.dataContainer}>
          <Text
            style={[styles.details, { marginBottom: 15, textAlign: "center" }]}
          >
            For more information or quesries, please contact us at:
          </Text>
          <View style={styles.smallRow}>
            <View style={styles.iconContainer}>
              <Entypo name="phone" size={28} color={Colors.primary} />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={styles.details}
                onPress={() => openLink("tel: +971561452526")}
              >
                {" "}
                +971 56 145 2526{" "}
              </Text>
            </View>
          </View>
          <View style={styles.smallRow}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name="whatsapp"
                size={28}
                color="#075e54"
                onPress={() => openLink("https://wa.me/971561452526")}
              />
            </View>
            <View style={styles.textContainer}>
              <Text
                style={styles.details}
                onPress={() => openLink("tel: +971561452526")}
              >
                {" "}
                +971 56 145 2526{" "}
              </Text>
            </View>
          </View>
          <View style={styles.smallRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="email" size={28} color={Colors.font} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.details}>info@stap-crm.com</Text>
              <Text style={styles.details}>info@codexpandit.com</Text>
            </View>
          </View>
        </View>
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
  icon: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  innerContainer: {
    flex: 1,
    flexDirection: isWeb() ? "row" : "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  logo: {
    height: isTablet()
      ? globalHeight("10%")
      : isPhone()
      ? globalHeight("10%")
      : globalHeight("15%"),
    width: isTablet()
      ? globalWidth("15%")
      : isPhone()
      ? globalWidth("15%")
      : globalWidth("7.5%"),
    marginTop: isWeb() ? 0 : globalHeight("5%"),
    marginBottom: 15,
    alignSelf: "center",
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  details: {
    fontFamily: "headers",
    fontSize: isWeb() ? 18 : 14,
    color: Colors.font,
  },
  dataContainer: {
    width: isWeb() ? "30%" : "80%",
    padding: 40,
    // justifyContent: "center",
    // alignItems: "center",
  },
  formContainer: {
    width: isWeb() ? "40%" : "80%",
  },
  listStyle: {
    marginTop: 25,
    elevation: 5,
    zIndex: 100,
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    width: isWeb() ? "20%" : isTablet ? "30%" : "40%",
    alignSelf: "center",
  },
  buttonTitleStyle: {
    fontFamily: "headers",
    fontSize: isWeb() ? 18 : 14,
    color: "white",
  },
  responseContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  responseText: {
    fontFamily: "headers",
    fontSize: isWeb() ? 16 : 13,
    textAlign: "center",
  },
  dropText: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: isWeb() ? 18 : 14,
  },
});

export const requestDemoSCreenOptions = (navData) => {
  return {
    headerTitle: "Request Demo",
    headerStyle: {
      backgroundColor: "rgba(135, 0, 243, 0.18)",
      height: 100,
    },
    headerTintColor: Colors.font,
    headerTitleStyle: {
      fontSize: 22,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "headers",
    },

    headerLeft: () => {
      return (
        <Pressable
          onPress={() => {
            navData.navigation.navigate("Login");
          }}
        >
          <Image
            source={require("../../assets/icon.png")}
            style={styles.icon}
          />
        </Pressable>
      );
    },
  };
};

export default RequestDemoScreen;
