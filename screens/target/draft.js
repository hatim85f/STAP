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
import * as targetActions from "../../store/target/targetActions";
import Loader from "../../components/Loader";
import * as Progress from "react-native-progress";
import { Alert } from "react-native";
import { Platform } from "react-native";
import * as authActions from "../../store/auth/authActions";
import * as targetActions from "../../store/target/targetActions";

const TargetDistribution = (props) => {
  //   const { team } = useSelector((state) => state.team);

  const { targetId, year } = props.route.params;

  const [teamDetails, setTeamDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [progress, setProgress] = useState(0);

  console.log(year);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(targetActions.getTarget(year));
    console.log("Hey");
  }, [dispatch, year]);

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

  // getting team members
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
    if (progress > 1) {
      Alert.alert("Error", "Target cannot be more than 100%", [
        { text: "Okay" },
      ]);
      return;
    }
    setIsLoading(true);
    dispatch(targetActions.addTeamTarget(teamDetails, year)).then(() => {
      setIsLoading(false);
      props.navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.buttonContainer}
      >
        <Ionicons
          name="arrow-back-sharp"
          size={30}
          color={Colors.primary}
          style={{ marginLeft: 10, marginTop: 5 }}
        />
      </TouchableOpacity>
      <Text style={styles.header}>
        To Distribute your team target set the percentage value
      </Text>

      <View style={styles.productDetailsContainer}>
        <Avatar
          source={{ uri: product.imageURL }}
          rounded
          size={isTablet() ? globalWidth("15%") : globalWidth("25%")}
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
                    size={isTablet() ? globalWidth("10%") : globalWidth("15%")}
                  />
                  <Text style={styles.name}>{item.userName}</Text>
                </View>
                <View style={styles.inputContainer}>
                  <CustomInput
                    placeholder="%"
                    keyboardType="numeric"
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
        <Loader />
      ) : (
        <Button
          title="Set Target"
          onPress={submitTarget}
          buttonStyle={styles.button}
          titleStyle={styles.btnTitle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    textAlign: "center",
    marginTop: 10,
    color: Colors.font,
    fontSize: isTablet() ? globalWidth("3%") : globalWidth("4%"),
    fontFamily: "headers",
    width: globalWidth("80%"),
    alignSelf: "center",
  },
  productDetailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  avatarStyle: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  name: {
    fontSize: isTablet() ? globalWidth("2%") : globalWidth("3%"),
    fontFamily: "headers",
    color: Colors.font,
    marginTop: 10,
  },
  card: {
    borderWidth: 1.5,
    marginTop: 5,
    width: globalWidth("95%"),
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
    fontSize: isTablet() ? globalWidth("2%") : globalWidth("3%"),
  },
  button: {
    marginBottom: 5,
    width: "60%",
    alignSelf: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
  },
  btnTitle: {
    fontFamily: "headers",
    fontSize: isTablet() ? globalWidth("2%") : globalWidth("3%"),
  },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default TargetDistribution;
