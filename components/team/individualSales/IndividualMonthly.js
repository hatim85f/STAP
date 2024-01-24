import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../Loader";
import Colors from "../../../constants/Colors";

import { globalHeight, globalWidth } from "../../../constants/globalWidth";

import * as salesActions from "../../../store/sales/salesActions";

import moment from "moment";

import NativeContainer from "./NativeContainer";
import AchievementChart from "../AchievementChart";

const IndividualMonthly = (props) => {
  const { memberAchievement } = useSelector((state) => state.sales);

  // ==============================================MANAGEMENT OF STATE====================================================

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [monthNumber, setMonthNumber] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(
    moment(new Date()).format("YYYY")
  );

  // ==========================================================GETTING DATA===============================================

  const dispatch = useDispatch();

  const search = () => {
    setIsLoading(true);
    setLoadingMessage("Getting Member's Sales...");
    dispatch(
      salesActions.getMemberAchievement(
        selectedMember,
        monthNumber,
        selectedYear
      )
    ).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  };

  // ==========================================================HELPER FUNCTIONS===============================================

  const secondColor = (achievement) => {
    if (achievement <= 30) {
      return "#FF0055";
    } else if (achievement <= 50 && achievement > 30) {
      return "#AB7E02";
    } else if (achievement > 50 && achievement <= 75) {
      return "#03FCDF";
    } else {
      return Colors.primary;
    }
  };

  console.log(memberAchievement);

  // =========================================================RETURN JSX=============================================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <NativeContainer
        getSelectedMonth={(month) => setSelectedMonth(month)}
        getSelectedYear={(year) => setSelectedYear(year)}
        getSelectedMember={(member) => setSelectedMember(member)}
        search={search}
      />
      {memberAchievement && memberAchievement.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.itemsContainer}
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainRow}>
            {memberAchievement.map((item, index) => {
              return (
                <View style={styles.achContainer} key={index}>
                  <AchievementChart
                    details={[
                      `${parseInt(item.totalSalesValue).toFixed(2)}`,
                      `${parseInt(item.totalTargetValue).toFixed(2)}`,
                    ]}
                    name={item.userName}
                    yaxisName="Value $"
                    xaxisName=""
                    image={item.profilePicture}
                    totalSales={item.totalSalesValue}
                    totalTarget={item.totalTargetValue}
                    achievement={item.totalAchievement}
                    secondColor={() => secondColor(item.totalAchievement)}
                    currencySymbol={item.currencySymbol}
                    height={globalHeight("35%")}
                    width={globalWidth("20%")}
                    secondLine={`${item.designation} - ${item.businessName}`}
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.smallRow}>
            {memberAchievement &&
              memberAchievement.length > 0 &&
              memberAchievement[0].salesData.map((product, indx) => {
                return (
                  <View style={styles.smallAchContainer} key={indx}>
                    <AchievementChart
                      details={[
                        `${parseInt(parseInt(product.salesValue)).toFixed(2)}`,
                        `${parseInt(product.targetValue).toFixed(2)}`,
                      ]}
                      name={product.productNickName}
                      yaxisName="Value $"
                      xaxisName=""
                      image={product.productImage}
                      totalSales={parseInt(product.salesValue)}
                      totalTarget={parseInt(product.targetValue)}
                      achievement={product.achievement}
                      secondColor={() => secondColor(product.achievement)}
                      currencySymbol={product.currencySymbol}
                      height={globalHeight("30%")}
                      width={globalWidth("12%")}
                      smallImage
                    />
                  </View>
                );
              })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  teamRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  teamContainer: {
    width: "20%",
    backgroundColor: Colors.lightBG,
    borderRadius: 10,
    marginVertical: globalHeight("1%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: globalWidth("3%"),
    borderColor: Colors.primary,
    borderWidth: 1,
    padding: globalWidth("2%"),
  },
  image: {
    width: globalWidth("5%"),
    height: globalWidth("5%"),
    borderRadius: globalWidth("2.5%"),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  nameContainer: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1.25%"),
    color: Colors.font,
    fontStyle: "italic",
    textAlign: "center",
  },
  designation: {
    fontFamily: "HelveticaNeue",
    fontSize: globalWidth("1%"),
    color: Colors.primary,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: globalHeight("0.5%"),
  },
  itemsContainer: {
    flex: 1,
    marginTop: globalHeight("3%"),
  },
  achContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    height: "100%",
  },
  smallRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    height: "100%",
    marginTop: globalWidth("40%"),
    paddingHorizontal: globalWidth("2%"),
  },
  smallAchContainer: {
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: globalHeight("1%"),
    width: globalWidth("16%"),
    height: globalHeight("55%"),
    padding: globalHeight("1%"),
  },
});

export default IndividualMonthly;
