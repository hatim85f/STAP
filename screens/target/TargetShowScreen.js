import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";

import { FontAwesome5 } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
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

const TargetShowScreen = (props) => {
  const { target } = useSelector((state) => state.target);

  const [selectedYear, setselectedYear] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
    return (
      <Loader
        loadingMessage={`Loading ${selectedYear ? selectedYear : ""} Target`}
        center
      />
    );
  }

  const avatarSize = isWeb()
    ? globalWidth("6%")
    : isTablet()
    ? globalWidth("15%")
    : globalWidth("20%");

  // console.log(target);

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
      {target && target.length > 0 && !isOpened && (
        <View style={styles.listContainer}>
          {target.map((item, index) => {
            return (
              <View style={styles.itemContainer} key={index}>
                <Card style={styles.detailsContainer}>
                  <View style={styles.avatarContainer}>
                    <Avatar
                      source={{ uri: item.imageURL }}
                      rounded
                      size={avatarSize}
                      avatarStyle={[styles.avatarStyle]}
                    />
                  </View>

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
                </Card>
              </View>
            );
          })}
        </View>
      )}
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
    height: globalHeight("80%"),
    width: globalWidth("95%"),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
  },
  itemContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: globalWidth("1%"),
    marginLeft: globalWidth("1%"),
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
});

export const TargetShowScreenOptions = (navData) => {
  return {
    headerTitle: "TargetShowScreen",
  };
};

export default TargetShowScreen;
