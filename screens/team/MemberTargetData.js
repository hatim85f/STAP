import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import BackArrow from "../../components/BackArrow";
import { Avatar } from "react-native-elements";
import { isTablet } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import numberWithComa from "../../components/helpers/numberWithComa";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import Card from "../../components/Card";
import AnimatedChevron from "../../components/AnimatedChevron";
import moment from "moment";
import MonthShape from "../../components/MonthShape";
import BackButton from "../../components/BackButton";
import * as authActions from "../../store/auth/authActions";
import * as targetActions from "../../store/target/targetActions";
import Loader from "../../components/Loader";

const MemberTargetData = (props) => {
  const { index, year } = props.route.params;

  const { teamTarget } = useSelector((state) => state.target);

  const [member, setMember] = useState({});
  const [memberTarget, setMemberTarget] = useState([]);
  const [emptyTarget, setEmptyTarget] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    dispatch(targetActions.getTeamTarget(year));
    dispatch(targetActions.businessTargets(year)).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, year]);

  useEffect(() => {
    const member = teamTarget && teamTarget.length > 0 && teamTarget[index];
    setMember(member);
    const memberTarget = member.target && member.target.productsTarget;

    if (!memberTarget || memberTarget.length === 0) {
      setEmptyTarget(true);
    } else {
      setEmptyTarget(false);
    }

    setMemberTarget(memberTarget);
  }, [teamTarget, index]);

  if (emptyTarget && !isLoading) {
    return (
      <View style={styles.container}>
        <BackButton route="/team/individual-target/" />
        <View style={styles.mainContainer}>
          <Text style={[styles.header, { textAlign: "center" }]}>
            No Target Data added yet for this year
          </Text>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return <Loader loadingMessage="Getting Target Data" center />;
  }

  return (
    <View style={styles.container}>
      <BackButton route="/team/individual-target/" />
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        contentContainerStyle={{
          width: globalWidth("75%"),
          alignSelf: "center",
        }}
      >
        <View style={styles.innerContainer}>
          <View style={styles.mainContainer}>
            <Image
              source={{ uri: member.profilePicture }}
              style={styles.avatarStyle}
            />
            {member && member.target && (
              <View style={styles.mainContainer}>
                <Text style={styles.header}>
                  {member.userName} target for selected year
                </Text>
                <Text style={styles.data}>
                  {numberWithComa(
                    +member.target?.productsTarget
                      .map((val) => val.totalValue)
                      .reduce((a, b) => a + b, 0)
                      .toFixed(0)
                  )}{" "}
                  {member.target.currencySymbol}
                </Text>
                <FlatList
                  data={memberTarget}
                  scrollEnabled={true}
                  scrollEventThrottle={16}
                  style={{ maxHeight: globalHeight("70%") }}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.productId}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.mainCard}
                        onPress={() => {
                          LayoutAnimation.configureNext(
                            LayoutAnimation.Presets.spring
                          );

                          setCurrentIndex(
                            index === currentIndex ? null : index
                          );
                        }}
                      >
                        <Card style={styles.card}>
                          <Text style={styles.itemName}>
                            {item.productNickName}
                          </Text>
                          <AnimatedChevron isOpen={index === currentIndex} />
                        </Card>
                        {index === currentIndex && (
                          <View style={styles.lowerContainer}>
                            <Text style={styles.date}>
                              Value :{" "}
                              <Text style={styles.details}>
                                {numberWithComa(item.totalValue)}{" "}
                                {member.target.currencySymbol}
                              </Text>
                            </Text>
                            <Text style={styles.date}>
                              Total Requested :{" "}
                              <Text style={styles.details}>
                                {numberWithComa(item.totalUnits)}{" "}
                              </Text>
                            </Text>
                            <View style={styles.monthsRow}>
                              {item.target &&
                                item.target.map((month, i) => {
                                  return (
                                    <MonthShape
                                      month={month.monthName}
                                      targetUnits={numberWithComa(
                                        parseInt(month.targetUnits)
                                      )}
                                      targetValue={numberWithComa(
                                        parseInt(month.targetValue)
                                      )}
                                      currencyCode={member.target.currencyCode}
                                      productPrice={numberWithComa(
                                        parseInt(item.costPrice)
                                      )}
                                      phasing={month.monthPhasing}
                                    />
                                  );
                                })}
                            </View>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    width: globalWidth("60%"),
    alignSelf: "center",
  },

  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "headers",
    color: Colors.font,
    fontSize: globalWidth("1.25%"),
    marginTop: 5,
  },
  data: {
    fontFamily: "numbers",
    color: Colors.primary,
    fontSize: globalWidth("1.5%"),
    marginTop: 5,
  },
  mainCard: {
    width: globalWidth("60%"),
    marginTop: 5,
    flexGrow: 1,
  },
  itemName: {
    fontFamily: "headers",
    color: Colors.primary,
    fontSize: globalWidth("1.25%"),
  },
  card: {
    borderWidth: 1,
    padding: 10,
    height: globalHeight("10%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
  },
  lowerContainer: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: globalHeight("1%"),
  },
  date: {
    fontFamily: "headers",
    color: Colors.font,
    fontSize: globalWidth("1.25%"),
    marginTop: 5,
  },
  details: {
    fontFamily: "numbers",
    color: Colors.primary,
    fontSize: globalWidth("1.25%"),
    marginTop: 5,
  },
  monthsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: globalHeight("2%"),
    flexWrap: "wrap",
  },
  avatarStyle: {
    height: globalHeight("15%"),
    width: globalHeight("15%"),
    borderRadius: globalHeight("7.5%"),
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: "#e8e8e8",
  },
});

export default MemberTargetData;
