import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { isPhone, isTablet, isWeb } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { iconSizes } from "../../constants/sizes";

import Card from "../Card";
import Loader from "../Loader";

import * as clientsActions from "../../store/clients/clientsActions";
import WebAlert from "../webAlert/WebAlert";

const ClientsShow = (props) => {
  const { clients } = props;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState("");

  const avatarSize = isWeb()
    ? globalWidth("6%")
    : isTablet()
    ? globalWidth("15%")
    : globalWidth("20%");

  const avatarContainerSize = isWeb()
    ? globalWidth("6.2%")
    : isTablet()
    ? globalWidth("15%")
    : globalWidth("20%");
  // stars rating
  const StarIcon = ({ size = 18, color }) => {
    return <AntDesign name="star" size={size} color="white" />;
  };

  const StarRating = ({ clientType, color }) => {
    const numberOfStars =
      clientType === "Big Business"
        ? 5
        : clientType === "Medium Business"
        ? 3
        : 1;

    const stars = Array(numberOfStars)
      .fill(null)
      .map((_, index) => <StarIcon key={index} color={color} />);

    return <View style={{ flexDirection: "row" }}>{stars}</View>;
  };

  const color = (clientType) => {
    if (clientType === "Small Business") {
      return "#ff0066";
    } else if (clientType === "Medium Business") {
      return "#cc9900";
    } else if (clientType === "Big Business") {
      return Colors.primary;
    } else {
      return "navy";
    }
  };

  // create linking function to send email
  const sendEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  // create linking function to make call
  const makeCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const navigate = (clientId) => {
    window.location.href = `/clients/edit-clients/${clientId}`;
  };

  const dispatch = useDispatch();

  const deleteClient = () => {
    setShowAlert(false);
    setAlertMessage("");
    setIsLoading(true);
    dispatch(clientsActions.deleteClient(clientId));
    dispatch(clientsActions.getClients()).then(() => {
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return <Loader center loadingMessage="Deleting Client" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={clients}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: globalHeight("2%") }}
        numColumns={4}
        renderItem={({ item }) => {
          return (
            <View style={styles.mainItemContainer}>
              <Card
                style={[styles.card, { borderColor: color(item.clientType) }]}
              >
                <View style={styles.header}>
                  <View
                    style={[
                      styles.topView,
                      { backgroundColor: color(item.clientType) },
                    ]}
                  >
                    <View style={[styles.sizeContainer]}>
                      {item.clientType === "Individual" ? (
                        <AntDesign name="user" size={24} color="white" />
                      ) : (
                        <StarRating
                          clientType={item.clientType}
                          color="white"
                        />
                      )}
                    </View>
                    <Text style={styles.name}>{item.clientName}</Text>
                    <Text style={styles.address}> {item.address} </Text>
                    <TouchableOpacity
                      style={styles.editContainer}
                      onPress={() => navigate(item._id)}
                    >
                      <AntDesign
                        name="edit"
                        size={globalWidth("1.5%")}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      styles.avatarContainer,
                      {
                        width: avatarContainerSize,
                        height: avatarContainerSize,
                        backgroundColor: color(item.clientType),
                      },
                    ]}
                  >
                    <Avatar
                      source={{ uri: item.logoURL }}
                      size={avatarSize}
                      avatarStyle={[
                        styles.avatarStyle,
                        { borderColor: color(item.clientType) },
                      ]}
                      rounded
                    />
                  </View>
                  {item.contactPerson && (
                    <View style={styles.contactContainer}>
                      <View style={styles.smallContainer}>
                        <MaterialIcons
                          name="person"
                          size={24}
                          color={color(item.clientType)}
                        />
                        <Text style={styles.data}>
                          {" "}
                          {item.contactPerson.name}{" "}
                        </Text>
                      </View>
                      <View style={styles.smallContainer}>
                        <TouchableOpacity
                          onPress={() => sendEmail(item.contactPerson.email)}
                        >
                          <MaterialIcons
                            name="email"
                            size={24}
                            color={color(item.clientType)}
                          />
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.data,
                            { fontSize: globalWidth("0.9%") },
                          ]}
                        >
                          {" "}
                          {item.contactPerson.email}{" "}
                        </Text>
                      </View>
                      <View style={styles.smallContainer}>
                        <TouchableOpacity
                          onPress={() => makeCall(item.contactPerson.phone)}
                        >
                          <MaterialIcons
                            name="phone"
                            size={24}
                            color={color(item.clientType)}
                          />
                        </TouchableOpacity>
                        <Text style={styles.data}>
                          {" "}
                          {item.contactPerson.phone}{" "}
                        </Text>
                      </View>
                    </View>
                  )}
                  <View style={styles.handled}>
                    <Text style={[styles.data, { textAlign: "center" }]}>
                      Handled By: {item.personInHandle}
                    </Text>
                  </View>
                  <View style={styles.businessContent}>
                    <Avatar
                      source={{ uri: item.businessLogo }}
                      size={globalWidth("4%")}
                      rounded
                      containerStyle={{
                        borderWidth: 2.5,
                        borderColor: color(item.clientType),
                      }}
                    />
                    <Text
                      style={[
                        styles.businessName,
                        { color: color(item.clientType) },
                      ]}
                    >
                      {item.businessName}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.deleteContainer}
                  onPress={() => {
                    setShowAlert(true);
                    setClientId(item._id);
                    setAlertMessage(
                      `Are you sure you want to delete ${item.clientName}?`
                    );
                  }}
                >
                  <MaterialIcons
                    name="delete-sweep"
                    size={iconSizes()}
                    color="#ff0055"
                  />
                </TouchableOpacity>
              </Card>
            </View>
          );
        }}
      />
      <WebAlert
        message={alertMessage}
        okText="Yes"
        cancelText="No"
        onOk={deleteClient}
        onCancel={() => setShowAlert(false)}
        showAlert={showAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  mainItemContainer: {
    width: globalWidth("18%"),
    marginHorizontal: globalWidth("1.25%"),
  },
  card: {
    borderRadius: 10,
    borderWidth: 1.5,
    minHeight: globalHeight("60%"),
    maxHeight: globalHeight("60%"),
    overflow: "hidden",
    marginBottom: globalHeight("2%"),
  },
  topView: {
    height: globalHeight("20%"),
    padding: 10,
  },
  sizeContainer: {
    alignItems: "flex-end",
  },
  name: {
    fontFamily: "Courier",
    color: "white",
    fontSize: globalWidth("1.2%"),
    textAlign: "center",
    marginTop: globalHeight("1%"),
  },
  address: {
    fontFamily: "Courier",
    color: "white",
    fontSize: globalWidth("0.8%"),
    textAlign: "center",
    flexWrap: "wrap",
    marginTop: globalHeight("1%"),
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
  },
  avatarStyle: {
    borderWidth: 1.5,
  },
  editContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    flex: 1,
  },

  contactContainer: {
    justifyContent: "center",
    paddingHorizontal: globalWidth("1%"),
    marginTop: globalHeight("1%"),
  },
  smallContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    width: "100%",
    alignItems: "flex-start",
  },
  data: {
    fontSize: globalWidth("1%"),
    fontFamily: "headers",
    color: Colors.font,
    marginLeft: globalWidth("1%"),
    marginTop: globalHeight("0.5%"),
  },
  handled: {
    width: "100%",
    justifyContent: "center",
    alginItems: "center",
    height: globalHeight("8%"),
  },
  businessContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  businessName: {
    fontFamily: "headers",
    fontSize: globalWidth("1%"),
    marginLeft: globalWidth("1%"),
  },
  deleteContainer: {
    alignItems: "flex-end",
    marginHorizontal: globalWidth("1%"),
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default ClientsShow;
