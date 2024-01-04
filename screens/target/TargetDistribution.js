import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as businessActions from "../../store/business/businessActions";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { isTablet, isWeb } from "../../constants/device";
import { FlatList } from "react-native";
import Card from "../../components/Card";
import { FontAwesome } from "@expo/vector-icons";
import CustomInput from "../../components/appComponents/Input/Input";
import numberWithComa from "../../components/helpers/numberWithComa";

import Loader from "../../components/Loader";
import * as Progress from "react-native-progress";
import { Alert } from "react-native";
import { Platform } from "react-native";
import * as authActions from "../../store/auth/authActions";
import * as targetActions from "../../store/target/targetActions";
import { Entypo } from "@expo/vector-icons";
import { Modal } from "react-native";

const TargetDistribution = (props) => {
  const { visible, product, year, closeModal } = props;

  const { team } = useSelector((state) => state.team);

  const [teamDetails, setTeamDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(businessActions.getUserBusiness());
  }, [dispatch]);

  // preparing team details
  useEffect(() => {
    if (team) {
      const teamDetails = team.map((t) => t.teamMembers).flat(1);
      const neededMembers = teamDetails.filter(
        (a) => a.businessId === product.businessId
      );

      neededMembers.forEach((member) => {
        member.targetUnits = 0;
        member.targetValue = 0;
        member.productId = product.productId;
      });

      setTeamDetails(neededMembers);
    }
  }, [team]);

  // setting target to the backend
  const setTarget = (text, index) => {
    let newTeamDetails = teamDetails;

    if (text.length === 0) {
      newTeamDetails[index].targetUnits = 0;
      newTeamDetails[index].targetValue = 0;
      setTeamDetails(newTeamDetails.map((a) => a));
      return;
    }

    newTeamDetails[index].targetUnits = +(
      (parseInt(text) / 100) *
      product.target.totalUnits
    ).toFixed(0);
    newTeamDetails[index].targetValue = +(
      (parseInt(text) / 100) *
      product.target.totalValue
    ).toFixed(0);

    setTeamDetails(newTeamDetails.map((a) => a));
  };

  useEffect(() => {
    const totalUnits = product.target.totalUnits;
    const usedUnits = teamDetails
      .map((a) => a.targetUnits)
      .reduce((a, b) => a + b, 0);

    let newProgress = usedUnits / totalUnits;
    setProgress(newProgress);
  }, [product, teamDetails]);

  const submitTarget = () => {
    setIsLoading(true);
    dispatch(targetActions.addTeamTarget(teamDetails, year)).then(() => {
      setIsLoading(false);
      closeModal();
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.closeContainer}>
          <Entypo name="cross" size={globalWidth("2.5%")} color="red" />
        </TouchableOpacity>
        <View style={styles.productDetailsContainer}>
          <Avatar
            source={{ uri: product.imageURL }}
            rounded
            size={globalWidth("5%")}
            avatarStyle={styles.avatarStyle}
          />
          <Text style={styles.name}>{product.productNickName}</Text>
          <Text style={styles.name}> {product.category} </Text>
          <Text style={styles.name}>
            {" "}
            {product.currencyCode} {product.costPrice}{" "}
          </Text>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {" "}
            Distributed : {parseFloat(progress * 100).toFixed(0)}%{" "}
          </Text>
          <Text style={styles.progressText}>
            {" "}
            Remaining : {100 - (parseFloat(progress) * 100).toFixed(0)} %{" "}
          </Text>

          <Progress.Bar
            progress={parseFloat(progress)}
            width={isWeb() ? globalWidth("40%") : globalWidth("90%")}
            height={globalHeight("1.5%")}
            color={
              progress === 1
                ? Colors.primary
                : progress >= 0.8
                ? "green"
                : progress >= 0.6
                ? "yellow"
                : progress >= 0.4
                ? "orange"
                : progress >= 0.2
                ? "red"
                : "black"
            }
            style={{
              borderRadius: 50,
              borderWidth: 0,
              marginTop: globalHeight("1.5%"),
            }}
          />
        </View>
        <ScrollView scrollEnabled scrollEventThrottle={16}>
          {teamDetails.length > 0 &&
            teamDetails.map((item, index) => {
              return (
                <Card style={styles.card} key={index}>
                  <View style={styles.userContainer}>
                    <Avatar
                      source={{ uri: item.profilePicture }}
                      rounded
                      size={globalWidth("6%")}
                    />
                    <Text style={styles.name}>{item.userName}</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <CustomInput
                      placeholder="%"
                      inputMode="numeric"
                      onChangeText={(text) => setTarget(text, index)}
                      label="Target %"
                    />
                    <View style={styles.lowerRow}>
                      <Text style={styles.targetUnits}>
                        {" "}
                        Target Units :{" "}
                        {numberWithComa(parseInt(item.targetUnits))}
                      </Text>
                      <Text style={styles.targetUnits}>
                        {" "}
                        Target Value :{" "}
                        {numberWithComa(parseInt(item.targetValue))}{" "}
                        {product.currencyCode}
                      </Text>
                    </View>
                  </View>
                </Card>
              );
            })}
        </ScrollView>
        {isLoading ? (
          <View style={{ marginTop: 10 }}>
            <Loader />
          </View>
        ) : (
          <Button
            title="Set Target"
            onPress={submitTarget}
            buttonStyle={styles.button}
            titleStyle={styles.btnTitle}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: globalHeight("80%"),
    width: globalWidth("95%"),
    alignSelf: "center",
    backgroundColor: "white",
    marginTop: globalHeight("15%"),
    borderRadius: 10,
    borderColor: "gold",
    borderWidth: 2.5,
  },
  closeContainer: {
    width: globalWidth("95%"),
    alignItems: "flex-end",
  },
  header: {
    textAlign: "center",
    marginTop: 10,
    color: Colors.font,
    fontSize: globalWidth("1.5%"),
    fontFamily: "headers",
    width: globalWidth("80%"),
    alignSelf: "center",
  },
  productDetailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  name: {
    fontSize: globalWidth("1.25%"),
    fontFamily: "headers",
    color: Colors.font,
    marginTop: 10,
  },
  card: {
    borderWidth: 1.5,
    marginTop: 5,
    width: globalWidth("60%"),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  userContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
  },
  lowerRow: {
    justifyContent: "center",
    alignItems: "center",
  },
  targetUnits: {
    fontFamily: "headers",
    color: Colors.font,
    fontSize: globalWidth("1%"),
  },
  button: {
    marginBottom: 5,
    width: "30%",
    alignSelf: "center",
    backgroundColor: Colors.primary,
    marginTop: 10,
    borderRadius: 10,
  },
  btnTitle: {
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
  },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  progressText: {
    fontFamily: "headers",
    color: Colors.font,
  },
});

export const TargetDistributionOptions = (navData) => {
  return {
    headerTitle: "TargetDistribution",
  };
};

export default TargetDistribution;
