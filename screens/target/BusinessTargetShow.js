import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { mainLink } from "../../store/mainLink";
import { isTablet } from "../../constants/device";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import Colors from "../../constants/Colors";
import numberWithComa from "../../components/helpers/numberWithComa";

import Loader from "../../components/Loader";
import AnimatedChevron from "../../components/AnimatedChevron";
import MonthShape from "../../components/MonthShape";
import Card from "../../components/Card";
import BackArrow from "../../components/BackArrow";
import BackButton from "../../components/BackButton";

const BusinessTargetShow = (props) => {
  const { businessId, year, value } = props.route.params;
  const { token } = useSelector((state) => state.auth);

  const [businessTarget, setBusinessTarget] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const dispatch = useDispatch();

  //   ===============================================GETTING BUSINESS TARGET DETAILS=============================================
  const fetchBusinessData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${mainLink}/api/userTarget/single-business-target/${businessId}/${year}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    setBusinessTarget(resData.businessTarget);
    setIsLoading(false);
  };

  useEffect(() => {
    if (businessId && year && token) {
      fetchBusinessData();
    }
  }, [businessId, year, token]);

  //   ===================================================================================================================

  if (isLoading) {
    return <Loader center loadingMessage="Loading Business Target Details" />;
  }

  return (
    <View style={styles.container}>
      <BackButton route="/team/individual-target/" />
      <View style={styles.innerContainer}>
        <View style={styles.businessDetails}>
          <Avatar
            rounded
            source={{ uri: businessTarget.businessLogo }}
            size={globalWidth("12%")}
            avatarStyle={styles.avatarStyle}
          />
          <Text style={styles.header}>{businessTarget.businessName}</Text>
          <Text style={styles.value}>
            {" "}
            {numberWithComa(parseFloat(value).toFixed(2))}{" "}
            {businessTarget.currencyCode}{" "}
          </Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={businessTarget.businessTarget}
            showsVerticalScrollIndicator={false}
            key={(item) => item.productId}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring
                    );
                    setCurrentIndex(index === currentIndex ? null : index);
                  }}
                >
                  <Card style={styles.card}>
                    <Avatar
                      source={{ uri: item.productImage }}
                      size={globalWidth("4.4%")}
                      rounded
                      avatarStyle={styles.avatarStyle}
                    />
                    <View style={{ width: "35%" }}>
                      <Text style={styles.name}> {item.productNickName} </Text>
                    </View>
                    <View style={{ width: "25%" }}>
                      <Text style={styles.value}>
                        {" "}
                        {numberWithComa(
                          parseFloat(item.target.totalValue).toFixed(2)
                        )}{" "}
                        {businessTarget.currencySymbol}{" "}
                      </Text>
                    </View>
                    <AnimatedChevron isOpen={index === currentIndex} />
                  </Card>
                  {index === currentIndex && (
                    <View style={styles.monthsRow}>
                      {item.target &&
                        item.target.yearTarget.map((month, i) => {
                          return (
                            <MonthShape
                              month={month.month}
                              targetUnits={numberWithComa(
                                parseInt(month.targetUnits)
                              )}
                              targetValue={numberWithComa(
                                parseInt(month.targetValue)
                              )}
                              currencyCode={businessTarget.currencyCode}
                              productPrice={numberWithComa(
                                parseInt(item.costPrice)
                              )}
                              phasing={
                                parseFloat(month.targetPhases).toFixed(0) + "%"
                              }
                            />
                          );
                        })}
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    overflow: "scroll",
  },
  innerContainer: {
    width: globalWidth("60%"),
    alignSelf: "center",
  },
  businessDetails: {
    justifyContent: "center",
    alignItems: "center",
  },

  itemContainer: {
    flexGrow: 1,
    marginTop: globalHeight("1%"),
  },
  header: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: globalWidth("1.25%"),
    marginTop: globalHeight("1.5%"),
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    alignItems: "center",
    width: globalWidth("55%"),
    height: globalHeight("10%"),
    borderRadius: 15,
    alignSelf: "center",
    paddingHorizontal: globalWidth("2%"),
  },

  name: {
    fontFamily: "headers",
    color: Colors.font,
    fontSize: globalWidth("1.25%"),
    textAlign: "center",
  },
  value: {
    fontFamily: "numbers",
    color: Colors.primary,
    fontSize: globalWidth("1.25%"),
  },
  monthsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: globalHeight("2%"),
    flexWrap: "wrap",
  },
  listContainer: {
    marginBottom: globalHeight("22%"),
  },
});

export default BusinessTargetShow;
