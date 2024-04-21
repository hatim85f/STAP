import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as partnersActions from "../../store/partners/partnersActions";
import Loader from "../Loader";
import { Image } from "react-native";
import moment from "moment";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import { Entypo, MaterialIcons } from "@expo/vector-icons";

import numberWithComa from "../../components/helpers/numberWithComa";

const PartnerList = (props) => {
  const { partners } = useSelector((state) => state.partners);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting Partners List");
    dispatch(partnersActions.getPartners()).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  }, [dispatch]);

  const deletePartner = (id) => {
    setIsLoading(true);
    setLoadingMessage("Deleting Partner");
    dispatch(partnersActions.deletePartner(id)).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  };

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <ScrollView
      scrollEnabled
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {partners &&
          partners.length > 0 &&
          partners.map((item, index) => {
            return (
              <View style={styles.cardContainer} key={index}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: item.profileImage }}
                />
                <Text style={styles.itemText}> {item.name} </Text>
                <Text style={styles.itemText}>
                  {" "}
                  {moment(item.DOB).format("DD/MM/YYYY")}{" "}
                </Text>
                <Text style={styles.itemText}> {item.address} </Text>
                <View style={styles.smallRow}>
                  <Entypo
                    name="email"
                    size={globalWidth("1.5%")}
                    color={Colors.font}
                  />
                  <View style={{ width: "80%" }}>
                    <Text style={styles.itemText}> {item.email} </Text>
                  </View>
                </View>
                <View style={styles.smallRow}>
                  <Entypo
                    name="phone"
                    size={globalWidth("1.5%")}
                    color={Colors.font}
                  />
                  <View style={{ width: "80%" }}>
                    <Text style={styles.itemText}> {item.phone} </Text>
                  </View>
                </View>
                <View style={styles.partnershipContainer}>
                  <Text style={styles.title}>Partnership Details</Text>
                  <Text style={styles.titleText}>
                    Investement :{" "}
                    <Text style={styles.value}>
                      {" "}
                      {numberWithComa(item.investementAmount)}{" "}
                      {item.businessCurrency}
                    </Text>{" "}
                  </Text>
                  <Text style={styles.titleText}>
                    Business :{" "}
                    <Text style={styles.value}> {item.businessName} </Text>{" "}
                  </Text>
                  <Text style={styles.titleText}>
                    Date Of Start :{" "}
                    <Text style={styles.value}>
                      {" "}
                      {moment(item.dateOfStart).format("DD/MM/YYYY")}{" "}
                    </Text>{" "}
                  </Text>
                  <Text style={styles.titleText}>
                    Percentage :{" "}
                    <Text style={styles.value}> {item.percentage * 100}% </Text>{" "}
                  </Text>
                  {item.responsibilities &&
                    item.responsibilities.length > 0 &&
                    item.responsibilities.map((responsibility, index) => {
                      return (
                        <Text key={index} style={styles.titleText}>
                          Responsibility :{" "}
                          <Text style={styles.value}> {responsibility} </Text>{" "}
                        </Text>
                      );
                    })}
                  <TouchableOpacity
                    onPress={() => deletePartner(item._id)}
                    style={{
                      alignSelf: "flex-end",
                      marginTop: globalHeight("1%"),
                    }}
                  >
                    <MaterialIcons
                      name="delete-sweep"
                      size={globalWidth("2%")}
                      color="#ff0055"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  cardContainer: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.26,
    elevation: 5,
    width: globalWidth("30%"),
    marginTop: globalHeight("4%"),
    padding: globalHeight("1%"),
  },
  profileImage: {
    width: globalWidth("6%"),
    height: globalWidth("6%"),
    borderRadius: globalWidth("3%"),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "black",
    marginTop: -globalHeight("4%"),
  },
  itemText: {
    textAlign: "center",
    marginTop: globalHeight("0.5%"),
    color: Colors.font,
    fontFamily: "open-sans",
    fontSize: globalWidth("1.1%"),
    fontStyle: "italic",
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    alignSelf: "center",
    marginTop: globalHeight("0.5%"),
  },
  partnershipContainer: {
    marginTop: globalHeight("2%"),
  },
  title: {
    fontFamily: "highlight",
    fontSize: globalWidth("1.2%"),
    color: Colors.appBlue,
    textDecorationColor: Colors.appBlue,
    textDecorationLine: "underline",
  },
  titleText: {
    fontFamily: "open-sans",
    fontSize: globalWidth("1%"),
    color: Colors.font,
    lineHeight: globalHeight("3%"),
  },
  value: {
    fontFamily: "open-sans",
    fontSize: globalWidth("1%"),
    color: Colors.primary,
  },
});

export default PartnerList;
