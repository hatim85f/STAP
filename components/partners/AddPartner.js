import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Easing,
  Animated,
  ScrollView,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesome, Fontisto, AntDesign } from "@expo/vector-icons";

import Loader from "../../components/Loader";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import PersonalDetails from "./PersonalDetails";

import BusinessAddition from "./BusinessAddition";
import IDAddition from "./IDAddition";
import BankDetails from "./BankDetails";
import PartnerShip from "./PartnerShip";
import Revision from "./Revision";

const AddPartner = (props) => {
  // ===========================================personal details state=======================================================

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [DOB, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [personalIsComplete, setPersonalIsComplete] = useState(false);

  useEffect(() => {
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      email.length > 0 &&
      phone.length > 0 &&
      address.length > 0 &&
      profileImage.length > 0 &&
      DOB.length > 0 &&
      password.length > 0
    ) {
      setPersonalIsComplete(true);
    } else {
      setPersonalIsComplete(false);
    }
  }, [firstName, lastName, email, phone, address, profileImage, DOB, password]);

  // ==========================================business details state=======================================================

  const [business, setBusiness] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [businessIsComplete, setBusinessIsComplete] = useState(false);

  useEffect(() => {
    if (business && businessName.length > 0) {
      setBusinessIsComplete(true);
    } else {
      setBusinessIsComplete(false);
    }
  }, [business, businessName]);

  // ====================================ID DETAILS STATE===================================================================

  const [idImage, setIdImage] = useState("");
  const [idType, setIdType] = useState("");
  const [idList, setidList] = useState([
    {
      label: "Passport",
      value: "passport",
    },
    {
      label: "National ID",
      value: "national",
    },
  ]);
  const [idNumber, setIdNumber] = useState(null);
  const [idExpire, setIdExpire] = useState("");

  const [idIsComplete, setIdIsComplete] = useState(false);

  useEffect(() => {
    if (
      idImage.length > 0 &&
      idType.length > 0 &&
      idNumber &&
      idExpire.length > 0
    ) {
      setIdIsComplete(true);
    } else {
      setIdIsComplete(false);
    }
  }, [idImage, idType, idNumber, idExpire]);

  // ====================================BANK DETAILS STATE===================================================================

  const [bankName, setBankName] = useState("");
  const [bankIBAN, setBankIBAN] = useState("");
  const [bankIsComplete, setBankIsComplete] = useState(false);

  useEffect(() => {
    if (bankName.length > 0 && bankIBAN.length > 0) {
      setBankIsComplete(true);
    } else {
      setBankIsComplete(false);
    }
  }, [bankName, bankIBAN]);

  // ====================================PARTNERSHIP DETAILS STATE===================================================================

  const [percentage, setPercentage] = useState(null);
  const [dateOfStart, setDateOfStart] = useState("");
  const [investAmount, setInvestAmount] = useState(null);
  const [responsiblitites, setResponsiblitites] = useState([]);
  const [partnerIsComplete, setPartnerIsComplete] = useState(false);

  useEffect(() => {
    if (
      investAmount &&
      percentage &&
      dateOfStart.length > 0 &&
      responsiblitites.length > 0
    ) {
      setPartnerIsComplete(true);
    } else {
      setPartnerIsComplete(false);
    }
  }, [investAmount, percentage, dateOfStart, responsiblitites]);

  // ====================================OTHER STATE===================================================================
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  // ======================================================ANIMATING PERSONAL DETAILS========================================================

  // animating entrance of personal details form left to right

  const personalDetailsPosition = useRef(
    new Animated.Value(-globalWidth("200%"))
  ).current;

  const animatePersonalDetails = () => {
    Animated.timing(personalDetailsPosition, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const animatingPersonalOut = () => {
    Animated.timing(personalDetailsPosition, {
      toValue: -globalWidth("200%"),
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  useEffect(() => {
    if (selected === "personal") {
      animatePersonalDetails();
    } else {
      animatingPersonalOut();
    }
  }, [selected]);

  // =================================================ANIMATING BUSINESS DETAILS========================================================

  // animating entrance of business details form right to left

  const businessDetailsPosition = useRef(
    new Animated.Value(globalWidth("200%"))
  ).current;

  const animateBusinessDetails = () => {
    Animated.timing(businessDetailsPosition, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  const animatingBusinessOut = () => {
    Animated.timing(businessDetailsPosition, {
      toValue: globalWidth("200%"),
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bezier(0.5, 0.5, 0.5, 0.5),
    }).start();
  };

  useEffect(() => {
    if (selected === "business") {
      animateBusinessDetails();
    } else {
      animatingBusinessOut();
    }
  }, [selected]);

  // ====================================================ID CHANGE========================================================

  const idContainerPosition = useRef(
    new Animated.Value(-globalWidth("200%"))
  ).current;

  const animateIDDetails = () => {
    Animated.timing(idContainerPosition, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  const animatingIDOut = () => {
    Animated.timing(idContainerPosition, {
      toValue: -globalWidth("200%"),
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };

  useEffect(() => {
    if (selected === "id") {
      animateIDDetails();
    } else {
      animatingIDOut();
    }
  }, [selected]);

  // ====================================================BANK CHANGE========================================================

  const bankContainerPosition = useRef(
    new Animated.Value(globalWidth("200%"))
  ).current;

  const animateBankDetails = () => {
    Animated.timing(bankContainerPosition, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.poly(4),
    }).start();
  };

  const animatingBankOut = () => {
    Animated.timing(bankContainerPosition, {
      toValue: globalWidth("200%"),
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bezier(0.5, 0.5, 0.5, 0.5),
    }).start();
  };

  useEffect(() => {
    if (selected === "bank") {
      animateBankDetails();
    } else {
      animatingBankOut();
    }
  }, [selected]);

  // =================================================ANIMATING PARTNERSHIP========================================================

  const partnershipContainerPosition = useRef(
    new Animated.Value(-globalWidth("200%"))
  ).current;

  const animatePartnershipDetails = () => {
    Animated.timing(partnershipContainerPosition, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start();
  };

  const animatingPartnershipOut = () => {
    Animated.timing(partnershipContainerPosition, {
      toValue: -globalWidth("200%"),
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bezier(0.5, 0.5, 0.5, 0.5),
    }).start();
  };

  useEffect(() => {
    if (selected === "partnership") {
      animatePartnershipDetails();
    } else {
      animatingPartnershipOut();
    }
  }, [selected]);

  // ==============================================ANIMATING REVISION========================================================

  const revisionContainerPosition = useRef(
    new Animated.Value(-globalWidth("200%"))
  ).current;

  const animateRevisionDetails = () => {
    Animated.timing(revisionContainerPosition, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start();
  };

  const animatingRevisionOut = () => {
    Animated.timing(revisionContainerPosition, {
      toValue: -globalWidth("200%"),
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bezier(0.5, 0.5, 0.5, 0.5),
    }).start();
  };

  useEffect(() => {
    if (selected === "revision") {
      animateRevisionDetails();
    } else {
      animatingRevisionOut();
    }
  }, [selected]);

  //   ====================================================RENDERING========================================================

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} center />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerView}>
          <View style={styles.itemsRow}>
            <TouchableOpacity
              onPress={() =>
                setSelected(selected === "business" ? null : "business")
              }
              style={[
                styles.item,
                {
                  backgroundColor:
                    selected === "business"
                      ? Colors.primary
                      : businessIsComplete
                      ? Colors.lightBG
                      : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  {
                    color: selected === "business" ? "white" : "black",
                  },
                ]}
              >
                Business Details
              </Text>
              {businessIsComplete ? (
                <AntDesign
                  name="checkcircle"
                  size={globalWidth("2%")}
                  color="#25D366"
                />
              ) : (
                <FontAwesome
                  name="building"
                  size={globalWidth("2%")}
                  color={selected === "business" ? "white" : "black"}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setSelected(selected === "personal" ? null : "personal")
              }
              disabled={!businessIsComplete}
              style={[
                styles.item,
                {
                  backgroundColor:
                    selected === "personal"
                      ? Colors.primary
                      : personalIsComplete
                      ? Colors.lightBG
                      : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  {
                    color: selected === "personal" ? "white" : "black",
                  },
                ]}
              >
                Personal Details
              </Text>
              {personalIsComplete ? (
                <AntDesign
                  name="checkcircle"
                  size={globalWidth("2%")}
                  color="#25D366"
                />
              ) : (
                <FontAwesome
                  name="user"
                  size={globalWidth("2%")}
                  color={selected === "personal" ? "white" : "black"}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelected(selected === "id" ? null : "id")}
              disabled={!personalIsComplete && !businessIsComplete}
              style={[
                styles.item,
                {
                  backgroundColor:
                    selected === "id"
                      ? Colors.primary
                      : idIsComplete
                      ? Colors.lightBG
                      : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  {
                    color: selected === "id" ? "white" : "black",
                  },
                ]}
              >
                ID Details
              </Text>
              {idIsComplete ? (
                <AntDesign
                  name="checkcircle"
                  size={globalWidth("2%")}
                  color="#25D366"
                />
              ) : (
                <AntDesign
                  name="idcard"
                  size={globalWidth("2%")}
                  color={selected === "id" ? "white" : "black"}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelected(selected === "bank" ? null : "bank")}
              style={[
                styles.item,
                {
                  backgroundColor:
                    selected === "bank"
                      ? Colors.primary
                      : bankIsComplete
                      ? Colors.lightBG
                      : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  {
                    color: selected === "bank" ? "white" : "black",
                  },
                ]}
              >
                Bank Details
              </Text>
              {bankIsComplete ? (
                <AntDesign
                  name="checkcircle"
                  size={globalWidth("2%")}
                  color="#25D366"
                />
              ) : (
                <FontAwesome
                  name="bank"
                  size={globalWidth("2%")}
                  color={selected === "bank" ? "white" : "black"}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setSelected(selected === "partnership" ? null : "partnership")
              }
              style={[
                styles.item,
                {
                  backgroundColor:
                    selected === "partnership"
                      ? Colors.primary
                      : partnerIsComplete
                      ? Colors.lightBG
                      : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  {
                    color: selected === "partnership" ? "white" : "black",
                  },
                ]}
              >
                Partnership Details
              </Text>
              {partnerIsComplete ? (
                <AntDesign
                  name="checkcircle"
                  size={globalWidth("2%")}
                  color="#25D366"
                />
              ) : (
                <FontAwesome
                  name="handshake-o"
                  size={globalWidth("2%")}
                  color={selected === "partnership" ? "white" : "black"}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setSelected(selected === "revision" ? null : "revision")
              }
              disabled={
                !personalIsComplete &&
                !businessIsComplete &&
                !idIsComplete &&
                !bankIsComplete &&
                !partnerIsComplete
              }
              style={[
                styles.item,
                {
                  backgroundColor:
                    selected === "revision" ? Colors.primary : "white",
                },
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  { color: selected === "revision" ? "white" : "black" },
                ]}
              >
                Revision
              </Text>
              <Fontisto
                name="nav-icon-grid-a"
                size={globalWidth("2%")}
                color={selected === "revision" ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={[
            styles.personalContainer,
            { transform: [{ translateX: idContainerPosition }] },
          ]}
        >
          <IDAddition
            getIDImage={setIdImage}
            getIDType={setIdType}
            getIDNumber={setIdNumber}
            getIDExpire={setIdExpire}
            businessName={businessName}
            businessId={business}
            firstName={firstName}
            lastName={lastName}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.personalContainer,
            { transform: [{ translateX: personalDetailsPosition }] },
          ]}
        >
          <PersonalDetails
            getFirstName={setFirstName}
            getLastName={setLastName}
            getEmail={setEmail}
            getPhone={setPhone}
            getAddress={setAddress}
            getProfileImage={setProfileImage}
            getDOB={setDOB}
            getPassword={setPassword}
            businessName={businessName}
            businessId={business}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.personalContainer,
            { transform: [{ translateX: businessDetailsPosition }] },
          ]}
        >
          <BusinessAddition
            getBusinessId={(businessId) => setBusiness(businessId)}
            getSelectedBusiness={(businessName) =>
              setBusinessName(businessName)
            }
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.personalContainer,
            { transform: [{ translateX: bankContainerPosition }] },
          ]}
        >
          <BankDetails getBankName={setBankName} getBankIBAN={setBankIBAN} />
        </Animated.View>
        <Animated.View
          style={[
            styles.personalContainer,
            { transform: [{ translateX: partnershipContainerPosition }] },
          ]}
        >
          <PartnerShip
            getInvestAmount={setInvestAmount}
            getPercentage={setPercentage}
            getDateOfStart={setDateOfStart}
            getResponsiblitites={setResponsiblitites}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.personalContainer,
            { transform: [{ translateX: revisionContainerPosition }] },
          ]}
        >
          <Revision
            businessId={business}
            businessName={businessName}
            firstName={firstName}
            lastName={lastName}
            email={email}
            phoneNumber={phone}
            profileImage={profileImage}
            address={address}
            DOB={DOB}
            idType={idType}
            idImage={idImage}
            idNumber={idNumber}
            idExpiryDate={idExpire}
            bankName={bankName}
            bankIBAN={bankIBAN}
            investementAmount={investAmount}
            percentage={percentage}
            dateOfStart={dateOfStart}
            responsibilities={responsiblitites}
            password={password}
          />
        </Animated.View>
      </ScrollView>
      <View style={{ height: globalHeight("5%") }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: globalWidth("2%"),
    width: globalWidth("85%"),
    alignSelf: "center",
  },
  item: {
    width: globalWidth("10%"),
    height: globalWidth("6.5%"),
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    borderColor: "#ccc",
    borderWidth: 2.5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  },
  itemText: {
    fontSize: globalWidth("1.2%"),
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
  personalContainer: {
    alignSelf: "center",
    width: globalWidth("100%"),
    flex: 1,
    position: "absolute",
    top: globalWidth("10%"),
  },
});

export const AddPartnerOptions = (navData) => {
  return {
    headerTitle: "AddPartner",
  };
};

export default AddPartner;
