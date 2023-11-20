import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Platform,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as targetActions from "../../store/target/targetActions";
import { years } from "../../components/helpers/years";
import DropPicker from "../../components/DropPicker";
import { TouchableOpacity } from "react-native";
import { isTablet } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Card from "../../components/Card";
import numberWithComa from "../../components/helpers/numberWithComa";
import { useRef } from "react";
import Colors from "../../constants/Colors";
import TabBarNavigator from "../../components/tabBar/TabBarNavigator";
import * as authActions from "../../store/auth/authActions";

const IndividualTargetScreen = (props) => {
  const { teamTarget, businessTargets } = useSelector((state) => state.target);

  const [selectedYear, setSelectedYear] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [teamTargetValue, setTeamTargetValue] = useState(null);
  const [currencyCode, setCurrencyCode] = useState(null);

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
    dispatch(targetActions.getTeamTarget(selectedYear));
    dispatch(targetActions.businessTargets(selectedYear));
  }, [dispatch, selectedYear]);

  // getting total team target value
  useEffect(() => {
    if (teamTarget) {
      const teamTargetValue = teamTarget
        .map((a) => a.target && a.target)
        .filter((target) => target !== undefined);

      const targetData = teamTargetValue
        .map((target) => {
          return target.productsTarget;
        })
        .flat(1);

      const value = targetData
        .map((x) => x.totalValue)
        .reduce((a, b) => a + b, 0)
        .toFixed(0);

      setTeamTargetValue(value);
    }
  }, [teamTarget]);

  if (!selectedYear || teamTarget.length === 0) {
    return (
      <View style={styles.container}>
        <DropPicker
          list={years}
          placeholder="Select Year"
          valueSelected={(value) => setSelectedYear(value)}
          showingValue={selectedYear}
          isOpened={(value) => setIsOpened(value)}
        />
        <TabBarNavigator route="individual-target" />
      </View>
    );
  }

  // business target will show the details of business targets separately
  // then show the flatlist of team target

  console.log(teamTarget);
  return (
    <View style={styles.container}>
      <DropPicker
        list={years}
        placeholder="Select Year"
        valueSelected={(value) => setSelectedYear(value)}
        showingValue={selectedYear}
        isOpened={(value) => setIsOpened(value)}
      />
      {!isOpened && (
        <View style={styles.detailsContainer}>
          {businessTargets && businessTargets.length > 0 && (
            <View style={styles.businessRow}>
              {businessTargets.map((item, index) => {
                return (
                  <View style={styles.businessContainer} key={index}>
                    <Avatar
                      source={{ uri: item.businessLogo }}
                      rounded
                      size={globalWidth("15%")}
                    />
                    <Text style={styles.businessName}>{item.businessName}</Text>
                    <Text style={styles.businessValue}>
                      {numberWithComa(+item.targetValue)} {item.currencySymbol}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
          <FlatList
            data={teamTarget}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            numColumns={4}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.itemContainer}
                >
                  <View style={styles.avatarContainer}>
                    <Avatar
                      rounded
                      source={{ uri: item.profilePicture }}
                      avatarStyle={[styles.avatarStyle]}
                      size={globalWidth("7%")}
                    />
                  </View>
                  <Card style={styles.card}>
                    <Text style={styles.name}>{item.userName}</Text>
                    <Text style={styles.name}>{item.userType}</Text>
                    {item.target && (
                      <Text style={styles.value}>
                        {numberWithComa(
                          item.target.productsTarget
                            .map((val) => val.totalValue)
                            .reduce((a, b) => a + b, 0)
                            .toFixed(0)
                        )}{" "}
                        {item.target.currencySymbol}
                      </Text>
                    )}
                    {!item.target && (
                      <Text style={styles.note}>getting target...</Text>
                    )}
                  </Card>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
      <TabBarNavigator route="individual-target" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailsContainer: {
    height: "88%",
    alignItems: "center",
  },
  businessRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: globalHeight("2%"),
  },
  businessContainer: {
    width: globalWidth("30%"),
    justifyContent: "center",
    alignItems: "center",
  },
  avatarStyle: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  businessName: {
    fontFamily: "headers",
    color: Colors.font,
    fontSize: globalHeight("2%"),
    marginTop: globalHeight("1%"),
  },
  businessValue: {
    fontFamily: "numbers",
    fontSize: globalHeight("2%"),
    marginTop: globalHeight("1%"),
  },
  itemContainer: {
    width: globalWidth("15%"),
    marginLeft: globalWidth("1%"),
    marginRight: globalWidth("1%"),
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderWidth: 1.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    minHeight: globalHeight("20%"),
    marginBottom: globalHeight("2%"),
  },
  avatarContainer: {
    marginBottom: -globalHeight("2%"),
    zIndex: 100,
  },
  name: {
    fontFamily: "Courier",
    fontSize: globalHeight("2%"),
    color: Colors.font,
    marginTop: globalHeight("1%"),
  },
  value: {
    fontFamily: "numbers",
    fontSize: globalHeight("2%"),
    color: Colors.primary,
    marginTop: globalHeight("1%"),
  },
});

export default IndividualTargetScreen;
