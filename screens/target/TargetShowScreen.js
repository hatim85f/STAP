import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Avatar } from "react-native-elements";

import { FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons";
import numberWithComa from "../../components/helpers/numberWithComa";

import Card from "../../components/Card";
import Colors from "../../constants/Colors";
import Loader from "../../components/Loader";

import * as targetActions from "../../store/target/targetActions";
import * as authActions from "../../store/auth/authActions";

import { isTablet, isWeb } from "../../constants/device";
import { useDispatch, useSelector } from "react-redux";
import { years } from "../../components/helpers/years";
import DropPicker from "../../components/DropPicker";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { Platform } from "react-native";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import TargetDistribution from "./TargetDistribution";
import WebAlert from "../../components/webAlert/WebAlert";

const TargetShowScreen = (props) => {
  const { target } = useSelector((state) => state.target);

  const [selectedYear, setselectedYear] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading Target");

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
    setIsLoading(true);
    dispatch(targetActions.getTarget(selectedYear)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, selectedYear]);

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} center />;
  }

  const deleteTarget = () => {
    setIsLoading(true);
    setLoadingMessage("Deleting Target");
    dispatch(targetActions.deleteTarget(selectedId, selectedYear)).then(() => {
      setIsLoading(false);
      setShowAlert(false);
    });
  };

  const avatarSize = isWeb()
    ? globalWidth("6%")
    : isTablet()
    ? globalWidth("15%")
    : globalWidth("20%");

  // console.log(target);

  console.log(target);

  if (target === undefined || (target && target.length === 0)) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
        <DropPicker
          list={years}
          placeholder="Select a year"
          valueSelected={(data) => setselectedYear(data)}
          dropContainerStyle={styles.dropContainerStyle}
          showingValue={selectedYear}
          isOpened={(data) => setIsOpened(data)}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => props.navigation.navigate("upload_target")}
            style={styles.uploadContainer}
          >
            <AntDesign
              name="upload"
              size={globalWidth("3%")}
              color={Colors.primary}
            />
            <Text style={styles.uploadText}>Upload Target Manually</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      <DropPicker
        list={years}
        placeholder="Select a year"
        valueSelected={(data) => setselectedYear(data)}
        dropContainerStyle={styles.dropContainerStyle}
        showingValue={selectedYear}
        isOpened={(data) => setIsOpened(data)}
      />
      <ScrollView scrollEnabled={true} scrollEventThrottle={16}>
        {target && target.length > 0 && !isOpened && (
          <View style={styles.listContainer}>
            {target.map((item, index) => {
              return (
                <View style={styles.itemContainer} key={index}>
                  <Card style={styles.detailsContainer}>
                    <View style={styles.avatarContainer}>
                      <TouchableOpacity onPress={() => setSelectedItem(item)}>
                        <Avatar
                          source={{ uri: item.imageURL }}
                          rounded
                          size={avatarSize}
                          avatarStyle={[styles.avatarStyle]}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ zIndex: 1000 }}>
                      <TouchableOpacity
                        style={styles.btnContainer}
                        onPress={() => setSelectedItem(item)}
                      >
                        <FontAwesome5
                          name="divide"
                          size={globalWidth("1.2%")}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("item_target", {
                          product: item,
                          year: selectedYear,
                        })
                      }
                      style={styles.dataContainer}
                    >
                      <Text style={styles.name}> {item.productNickName} </Text>
                      <Text style={styles.name}>
                        {" "}
                        {numberWithComa(parseInt(item.costPrice))}{" "}
                        {item.currencyCode}{" "}
                      </Text>
                      <Text style={styles.name}>{item.category} </Text>
                      <Text style={styles.details}>
                        Target :{" "}
                        <Text style={styles.number}>
                          {isNaN(item.target.totalUnits)
                            ? "0.00"
                            : numberWithComa(parseInt(item.target.totalUnits))}
                        </Text>
                      </Text>
                      <Text style={styles.details}>
                        Value :{" "}
                        <Text style={styles.number}>
                          {numberWithComa(parseInt(item.target.totalValue))}{" "}
                          {item.currencyCode}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedId(item.productId);
                        setShowAlert(true);
                      }}
                      style={{
                        alignItems: "flex-end",
                        paddingRight: globalWidth("2%"),
                      }}
                    >
                      <MaterialIcons
                        name="delete-sweep"
                        size={globalWidth("2.5%")}
                        color="#ff0055"
                      />
                    </TouchableOpacity>
                  </Card>
                </View>
              );
            })}
          </View>
        )}
        <View style={{ height: globalHeight("10%") }} />
      </ScrollView>
      {target && target.length > 0 && selectedItem && (
        <View style={styles.distributionModal}>
          <TargetDistribution
            product={selectedItem}
            year={selectedYear}
            visible={selectedItem}
            closeModal={() => setSelectedItem(null)}
          />
        </View>
      )}
      <WebAlert
        showAlert={showAlert}
        title="Delete Target"
        message="Are you sure you want to delete this target?"
        okText="Yes"
        cancelText="No"
        onCancel={() => {
          setShowAlert(false);
          setSelectedId(null);
        }}
        onOk={deleteTarget}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  dropContainerStyle: {
    width: globalWidth("80%"),
    alignSelf: "center",
  },
  listContainer: {
    marginTop: globalHeight("5%"),
    height: globalHeight("80%"),
    width: globalWidth("95%"),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: globalHeight("10%"),
  },
  itemContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: globalWidth("1%"),
    marginLeft: globalWidth("1%"),
    marginTop: globalHeight("8%"),
  },
  imageContainer: {
    // width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -globalHeight("5%"),
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: -globalHeight("5%"),
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    shadowOpacity: 0.26,
    elevation: 10,
    borderRadius: "50%",
    borderColor: Colors.primary,
    borderWidth: 2.5,
    backgroundColor: "white",
  },

  detailsContainer: {
    width: "100%",
    borderWidth: 1,
    padding: 5,
    paddingBottom: 15,
  },
  dataContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: globalHeight("15%"),
  },
  name: {
    color: Colors.font,
    fontFamily: "headers",
    textAlign: "center",
  },
  details: {
    fontFamily: "headers",
    color: Colors.primary,
  },
  number: {
    fontFamily: "numbers",
    color: Colors.font,
  },
  btnContainer: {
    width: "80%",
    alignItems: "flex-end",
  },
  uploadText: {
    fontFamily: "headers",
    color: Colors.font,
    fontSize: globalWidth("1.1%"),
    textAlign: "center",
    marginTop: globalHeight("1%"),
  },
  uploadContainer: {
    cursor: "pointer",
    alignItems: "center",
  },
});

export const TargetShowScreenOptions = (navData) => {
  return {
    headerTitle: "TargetShowScreen",
  };
};

export default TargetShowScreen;
