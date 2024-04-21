import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import * as businessActions from "../../store/business/businessActions";
import * as authActions from "../../store/auth/authActions";

import Colors from "../../constants/Colors";
import { globalHeight } from "../../constants/globalWidth";
import { fontSize, iconSizes } from "../../constants/sizes";

import BusinessItem from "../../components/business/BusinessItem";
import ChangeBusinessCurrency from "../../components/business/ChangeBusinessCurrency";
import ChangeContactPerson from "../../components/business/ChangeContactPerson";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import HeaderText from "../../components/HeaderText";
import { isTablet, isWeb } from "../../constants/device";

const BusinessesScreen = (props) => {
  const { business } = useSelector((state) => state.business);

  const [isLoading, setIsLoading] = useState(false);
  const [businessData, setBusinessData] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  // getting user in again if logged out specially on web
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
        } else {
          props.navigation.navigate("Login");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  // getting user business
  useEffect(() => {
    setIsLoading(true);
    try {
      dispatch(businessActions.getUserBusiness()).then(() => {
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  }, [dispatch]);

  // preparing business data to show
  useEffect(() => {
    if (business && business.length > 0) {
      const neededBusiness = business.map((x) => x.business);
      setBusinessData(neededBusiness);
    }
  }, [business]);

  if (isLoading) {
    return <Loader center />;
  }

  const editBusiness = (business, changedField, newValue) => {
    const newBusiness = {
      ...business,
      [changedField]: newValue,
    };

    setIsLoading(true);
    dispatch(
      businessActions.editBusiness(
        newBusiness.businessLogo,
        newBusiness.businessName,
        newBusiness.businessType,
        newBusiness.businessDescription,
        newBusiness.officeLocation,
        newBusiness.contactPerson,
        newBusiness.contactPersonEmail,
        newBusiness.contactNumber,
        newBusiness.numberOfEmployees,
        newBusiness.webSite,
        business._id,
        newBusiness.currencyCode,
        newBusiness.currencyName,
        newBusiness.currencySymbol
      )
    ).then(() => {
      setIsLoading(false);
    });
    setOpenModal(false);
  };

  const businessCurrencyChange = (business, data) => {
    const { currencyCode, currencyName, currencySymbol } = data;

    setIsLoading(true);
    dispatch(
      businessActions.editBusiness(
        business.businessLogo,
        business.businessName,
        business.businessType,
        business.businessDescription,
        business.officeLocation,
        business.contactPerson,
        business.contactPersonEmail,
        business.contactNumber,
        business.numberOfEmployees,
        business.webSite,
        business._id,
        currencyCode,
        currencyName,
        currencySymbol
      )
    ).then(() => {
      setIsLoading(false);
    });
  };

  const changePerson = (business, newValue) => {
    const { userName, email, contactNumber } = newValue;
    setIsLoading(true);
    dispatch(
      businessActions.editBusiness(
        business.businessLogo,
        business.businessName,
        business.businessType,
        business.businessDescription,
        business.officeLocation,
        userName,
        email,
        contactNumber,
        business.numberOfEmployees,
        business.webSite,
        business._id,
        business.currencyCode,
        business.currencyName,
        business.currencySymbol
      )
    ).then(() => {
      setIsLoading(false);
    });
  };

  const deleteBusiness = (businessId) => {
    if (Platform.OS === "web") {
      confirm("Are you sure you want to delete this business?");
      if (confirm) {
        setIsLoading(true);
        dispatch(businessActions.deleteBusiness(businessId)).then(() => {
          setIsLoading(false);
        });
        setOpenModal(false);
      } else {
        setOpenModal(false);
      }
    } else {
      Alert.alert(
        "Are you sure?",
        "Are you sure you want to delete this business?",
        [
          {
            text: "No",
            style: "default",
          },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              setIsLoading(true);
              dispatch(businessActions.deleteBusiness(businessId)).then(() => {
                setIsLoading(false);
              });
              setOpenModal(false);
            },
          },
        ]
      );
    }
  };

  console.log(businessData);

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      {Platform.OS === "web" && <HeaderText text="Business Deatils" />}
      {businessData && businessData.length > 0 && (
        <ScrollView scrollEnabled scrollEventThrottle={16}>
          <View style={styles.mainContainer}>
            {businessData.map((item, index) => {
              return (
                <Card style={styles.businessContainer} key={index}>
                  <View style={styles.businessHeader}>
                    <Text style={styles.businessName}>{item.businessName}</Text>
                    <Pressable
                      onPress={() => {
                        setSelectedBusiness(item);
                        setOpenModal(true);
                      }}
                    >
                      <Entypo
                        name="dots-three-horizontal"
                        size={iconSizes()}
                        color="white"
                      />
                    </Pressable>
                  </View>
                  <BusinessItem
                    placeholder="Edit Business Description"
                    editedValue={(newValue) =>
                      editBusiness(item, "businessDescription", newValue)
                    }
                  >
                    <Text style={styles.description}>
                      {" "}
                      {item.businessDescription}{" "}
                    </Text>
                  </BusinessItem>
                  <BusinessItem
                    imageUpload
                    businessName={item.businessName}
                    editedValue={(newValue) =>
                      editBusiness(item, "businessLogo", newValue)
                    }
                  >
                    <Image
                      source={{ uri: item.businessLogo }}
                      style={styles.image}
                    />
                  </BusinessItem>
                  <BusinessItem
                    check
                    placeholder="Edit Business Type (Services or Goods) "
                    editedValue={(newValue) =>
                      editBusiness(item, "businessType", newValue)
                    }
                  >
                    <Text style={styles.description}>
                      Business Type :{" "}
                      <Text style={styles.type}>{item.businessType}</Text>
                    </Text>
                  </BusinessItem>
                  <BusinessItem
                    placeholder="Edit Contact Number (+92xxxxxxxxxx)"
                    editedValue={(newValue) =>
                      editBusiness(item, "contactNumber", newValue)
                    }
                  >
                    <Text style={styles.description}>
                      Contact Number :{" "}
                      <Text style={styles.type}> {item.contactNumber}</Text>
                    </Text>
                  </BusinessItem>
                  <ChangeContactPerson
                    placeholder="Edit Contact Person"
                    editedValue={(newValue) => changePerson(item, newValue)}
                    team={business[index].teamMembers}
                  >
                    <Text style={styles.description}>
                      Contact Person :{" "}
                      <Text style={styles.type}> {item.contactPerson}</Text>
                    </Text>
                  </ChangeContactPerson>
                  <BusinessItem
                    placeholder="Edit Contact Email"
                    editedValue={(newValue) =>
                      editBusiness(item, "contactPersonEmail", newValue)
                    }
                  >
                    <Text style={styles.description}>
                      Contact Email :{" "}
                      <Text style={styles.type}>
                        {" "}
                        {item.contactPersonEmail}
                      </Text>
                    </Text>
                  </BusinessItem>
                  <BusinessItem
                    placeholder="Edit Office Location"
                    editedValue={(newValue) =>
                      editBusiness(item, "officeLocation", newValue)
                    }
                  >
                    <Text style={styles.description}>
                      Office Location :{" "}
                      <Text style={styles.type}> {item.officeLocation}</Text>
                    </Text>
                  </BusinessItem>
                  <BusinessItem hideEditButton>
                    <Text style={styles.description}>
                      Number of Employees (NOE) :{" "}
                      <Text style={styles.type}> {item.numberOfEmployees}</Text>
                    </Text>
                  </BusinessItem>
                  <BusinessItem hideEditButton>
                    <Text style={styles.description}>
                      Number of Partners (NOP) :{" "}
                      <Text style={styles.type}> {item.numberOfPartners}</Text>
                    </Text>
                  </BusinessItem>
                  <BusinessItem
                    placeholder="Edit Website"
                    editedValue={(newValue) =>
                      editBusiness(item, "webSite", newValue)
                    }
                  >
                    <Text style={styles.description}>
                      Website : <Text style={styles.type}> {item.webSite}</Text>
                    </Text>
                  </BusinessItem>
                  <ChangeBusinessCurrency
                    changeCurrency
                    editedValue={(newValue) =>
                      businessCurrencyChange(item, newValue)
                    }
                  >
                    <Text style={styles.description}>
                      Currency :{" "}
                      <Text style={styles.type}>
                        {" "}
                        {item.currencyName} - {item.currencyCode} -{" "}
                        {item.currencySymbol}{" "}
                      </Text>
                    </Text>
                  </ChangeBusinessCurrency>
                </Card>
              );
            })}
          </View>
        </ScrollView>
      )}
      <View style={{ height: globalHeight("5%") }}></View>
      <Modal
        transparent={true}
        visible={openModal}
        animationType="slide"
        style={{ backgroundColor: "transparent" }}
      >
        <View style={styles.innerModal}>
          <Image
            source={{ uri: selectedBusiness.businessLogo }}
            style={[
              styles.image,
              {
                alignSelf: "center",
                marginTop: 25,
                borderRadius: isWeb()
                  ? globalHeight("5%")
                  : isTablet()
                  ? globalHeight("6%")
                  : globalHeight("7.5%"),
              },
            ]}
          />
          <View style={styles.modalContainer}>
            <BusinessItem
              editedValue={(newValue) =>
                editBusiness(selectedBusiness, "businessName", newValue)
              }
            >
              <Text style={styles.description}>
                {selectedBusiness.businessName}
              </Text>
            </BusinessItem>
            <View style={styles.rowOfModal}>
              <Text style={styles.textOfModal}>Delete Business</Text>
              <Pressable onPress={() => deleteBusiness(selectedBusiness._id)}>
                <MaterialIcons
                  name="delete-sweep"
                  size={iconSizes()}
                  color="#ff0055"
                />
              </Pressable>
            </View>
          </View>
          <Button
            title="Close"
            onPress={() => setOpenModal(false)}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  mainContainer: {
    flexDirection: isWeb() ? "row" : "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: isWeb() ? "80%" : "95%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 25,
  },
  businessContainer: {
    width: isWeb() ? "48%" : "100%",
    borderWidth: 1.5,
    alignSelf: "center",
    overflow: "hidden",
    marginTop: 10,
    borderRadius: 10,
  },
  businessHeader: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: globalHeight("5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  businessName: {
    color: "white",
    fontFamily: "headers",
    fontSize: fontSize(),
  },
  description: {
    fontFamily: "headers",
    fontWeight: "bold",
  },
  type: {
    fontWeight: "normal",
    color: Colors.primary,
  },
  image: {
    width: isWeb()
      ? globalHeight("10%")
      : isTablet()
      ? globalHeight("12%")
      : globalHeight("15%"),
    height: isWeb()
      ? globalHeight("10%")
      : isTablet()
      ? globalHeight("12%")
      : globalHeight("15%"),
  },
  innerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    width: isWeb() ? "50%" : "95%",
    alignSelf: "center",
    marginTop: 25,
    borderRadius: 10,
    padding: 15,
  },
  rowOfModal: {
    flexDirection: "row",
    marginTop: 15,
    width: "40%",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  textOfModal: {
    marginLeft: 15,
    color: "#ff0055",
    fontFamily: "headers",
    fontWeight: "bold",
    fontSize: fontSize(),
  },
  buttonStyle: {
    backgroundColor: "#ff0055",
    width: isWeb() ? "25%" : "40%",
    borderRadius: 10,
    marginTop: 35,
    alignSelf: "center",
  },
  titleStyle: {
    fontFamily: "headers",
  },
});

export default BusinessesScreen;
