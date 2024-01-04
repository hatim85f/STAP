import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import numberWithComa from "../../helpers/numberWithComa";
import { Entypo } from "@expo/vector-icons";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";
import Colors from "../../../constants/Colors";
import TableComp from "../../TableComp";
import { Table, Row, Rows } from "react-native-table-component";

const ItemSalesDetails = (props) => {
  const { sales, currencySymbol } = props;

  const [salesData, setSalesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    let itemSales = [];
    let itemTargets = [];

    if (sales && sales.length > 0) {
      const salesDetails = sales.map((item) => {
        const totalSales = item.salesData
          .map((a) => a.salesValue)
          .reduce((a, b) => a + b, 0);
        const targetData = item.salesData.map((a) => a.targetValue);
        const targetValuesData = targetData.reduce((a, b) => a + b, 0);
        itemTargets.push({
          userName: item.userName,
          targetValuesData,
          targetData,
        });
        const totalTarget = item.salesData
          .map((a) => a.targetValue)
          .reduce((a, b) => a + b, 0);

        return {
          userId: item.userId,
          userSalesId: item.userSalesId,
          userName: item.userName,
          designation: item.designation,
          salesData: item.salesData.sort((a, b) =>
            a.productNickName > b.productNickName ? 1 : -1
          ),
          totalSales: totalSales.toFixed(2),
          totalTarget: totalTarget.toFixed(2),
          achievement: (totalSales / totalTarget) * 100,
          profilePicture: item.profilePicture,
        };
      });

      setSalesData(salesDetails);
    }
  }, [sales]);

  const AchievementArrow = ({ achievement }) => {
    if (achievement >= 85) {
      return <Entypo name="arrow-up" size={globalHeight("3%")} color="green" />;
    } else if (achievement >= 50) {
      return (
        <Entypo name="arrow-up" size={globalHeight("3%")} color="orange" />
      );
    } else if (achievement >= 25) {
      return (
        <Entypo name="arrow-down" size={globalHeight("3%")} color="#999900" />
      );
    } else {
      return <Entypo name="arrow-down" size={globalHeight("3%")} color="red" />;
    }
  };

  // ==========================================================PREPARING FOR TABLE=============================================================

  const header = [
    "#",
    "Product",
    "Target Unit",
    "Target Value",
    "Sales Unit",
    "Sales Value",
    "Achievement",
  ];

  const widthArr = [
    globalWidth("2.5%"),
    globalWidth("10%"),
    globalWidth("6%"),
    globalWidth("6%"),
    globalWidth("6%"),
    globalWidth("6%"),
    globalWidth("6.5%"),
  ];

  const checkItem = (item) => {
    console.log(
      item.salesData.map((a, index) => [
        index + 1,
        a.productNickName,
        numberWithComa(a.targetUnits.toFixed(0)),
        numberWithComa(a.targetValue.toFixed(2)),
        numberWithComa(a.quantity),
        numberWithComa(a.salesValue.toFixed(2)),
        a.achievement.toFixed(2) + "%",
      ])
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {salesData && salesData.length > 0 && (
          <View
            style={[
              styles.salesContainer,
              { backgroundColor: Colors.primary, height: globalHeight("2.5%") },
            ]}
          >
            <View style={{ width: "5%" }}>
              <Text style={[styles.number, { color: "white" }]}> # </Text>
            </View>
            <View style={[styles.smallRow, { width: "40%" }]}>
              <Text style={[styles.name, { color: "white" }]}> Name </Text>
            </View>
            <View style={{ width: "20%" }}>
              <Text style={[styles.salesData, { color: "white" }]}>
                {" "}
                Sales{" "}
              </Text>
            </View>
            <View style={{ width: "20%" }}>
              <Text style={[styles.salesData, { color: "white" }]}>
                {" "}
                Target{" "}
              </Text>
            </View>
            <View style={[styles.smallRow, { width: "15%" }]}>
              <Text style={[styles.achievement, { color: "white" }]}>
                {" "}
                Achievement{" "}
              </Text>
            </View>
          </View>
        )}
        {salesData &&
          salesData.length > 0 &&
          salesData.map((item, index) => {
            return (
              <View style={styles.mainItemContainer} key={index}>
                <View
                  style={[styles.salesContainer, styles.lowerSalesContainer]}
                >
                  <View style={{ width: "5%" }}>
                    <Text style={styles.number}> {index + 1}) </Text>
                  </View>
                  <View
                    style={[
                      styles.smallRow,
                      { width: "40%", justifyContent: "center" },
                    ]}
                  >
                    <Image
                      source={{ uri: item.profilePicture }}
                      style={styles.image}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setCurrentIndex(index === currentIndex ? null : index)
                      }
                    >
                      <Text style={styles.name}> {item.userName} </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "20%" }}>
                    <Text style={styles.salesData}>
                      {" "}
                      {currencySymbol} {numberWithComa(item.totalSales)}{" "}
                    </Text>
                  </View>
                  <View style={{ width: "20%" }}>
                    <Text style={styles.salesData}>
                      {" "}
                      {currencySymbol} {numberWithComa(item.totalTarget)}{" "}
                    </Text>
                  </View>
                  <View style={[styles.smallRow, { width: "15%" }]}>
                    <AchievementArrow achievement={item.achievement} />
                    <Text style={styles.achievement}>
                      {" "}
                      {item.achievement.toFixed(2)} %{" "}
                    </Text>
                  </View>
                </View>
                {index === currentIndex && (
                  <View style={styles.tableContainer}>
                    <Table
                      borderStyle={{
                        borderWidth: 2,
                        borderColor: Colors.primary,
                        borderRadius: 10,
                      }}
                      widthArr={widthArr}
                    >
                      <Row
                        data={header}
                        style={[
                          styles.head,
                          { backgroundColor: Colors.haizyColor },
                        ]}
                        textStyle={styles.text}
                        widthArr={widthArr}
                      />
                      {item.salesData.map((rowData, index) => {
                        return (
                          <Row
                            key={index}
                            data={[
                              index + 1,
                              rowData.productNickName,
                              numberWithComa(rowData.targetUnits.toFixed(0)),
                              numberWithComa(rowData.targetValue.toFixed(2)),
                              numberWithComa(rowData.quantity),
                              numberWithComa(rowData.salesValue.toFixed(2)),
                              <View style={styles.smallRow}>
                                <AchievementArrow
                                  achievement={rowData.achievement}
                                />
                                <Text style={styles.achievement}>
                                  {rowData.achievement.toFixed(2) + "%"}
                                </Text>
                              </View>,
                            ]}
                            style={[
                              styles.rows,
                              {
                                backgroundColor:
                                  index % 2 === 0
                                    ? Colors.lightBG
                                    : Colors.white,
                              },
                            ]}
                            textStyle={styles.text}
                            widthArr={widthArr}
                          />
                        );
                      })}
                    </Table>
                  </View>
                )}
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
  mainItemContainer: {
    width: "100%",
    marginVertical: globalHeight("1%"),
    borderBottomColor: Colors.haizyColor,
    borderBottomWidth: 1.5,
    paddingBottom: globalHeight("1.5%"),
  },
  salesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: globalHeight("1%"),
    width: "80%",
    alignSelf: "center",
    borderRadius: 4,
  },
  number: {
    fontFamily: "open-sans-bold",
    fontSize: globalHeight("2%"),
  },
  smallRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    height: globalWidth("3%"),
    width: globalWidth("3%"),
    borderRadius: globalWidth("1.5%"),
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: globalHeight("2%"),
    marginLeft: globalWidth("1%"),
    color: Colors.font,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: Colors.primary,
  },
  salesData: {
    fontFamily: "open-sans-bold",
    fontSize: globalHeight("2%"),
  },
  achievement: {
    fontFamily: "open-sans-bold",
    fontSize: globalHeight("2%"),
  },
  lowerSalesContainer: {
    marginVertical: 0,
    marginTop: globalHeight("1.5%"),
  },
  tableContainer: {
    width: "100%",
    alignSelf: "center",
    marginTop: globalHeight("1%"),
    marginBottom: globalHeight("2%"),
    alignItems: "center",
    justifyContent: "center",
  },
  rows: {
    justifyContent: "center",
    height: globalHeight("7.5%"),
    overflow: "visible",
    elevation: 10,
    zIndex: 1000,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: globalWidth("0.8%"),
    color: Colors.font,
  },
  head: {
    height: globalHeight("5%"),
    // justifyContent: "center",
  },
});

export const ItemSalesDetailsOptions = (navData) => {
  return {
    headerTitle: "ItemSalesDetails",
  };
};

export default ItemSalesDetails;
