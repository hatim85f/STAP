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

import { Entypo } from "@expo/vector-icons";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";
import Colors from "../../../constants/Colors";
import TableComp from "../../TableComp";
import FinalTableComp from "../../FinalTableComp";
import numberWithComa from "../../helpers/numberWithComa";

const TableToShow = (props) => {
  const { data, currencySymbol } = props;

  const [indexToShow, setIndexToShow] = useState(0);

  //   ==============================================TABLE HEAD AND DATA=================================================

  const tableHead = [
    "SN",
    "Item Name",
    "CIF",
    "Target U",
    "Target V",
    "Sales U",
    "Sales V",
    "Ach %",
  ];

  const widthArr = [
    globalWidth("3%"),
    globalWidth("8.5%"),
    globalWidth("5%"),
    globalWidth("8.5%"),
    globalWidth("8.5%"),
    globalWidth("8.5%"),
    globalWidth("8.5%"),
    globalWidth("8.5%"),
  ];

  //   ==============================================CHANGING THE INDEX=================================================

  const reduceIndex = () => {
    if (indexToShow === 0) {
      setIndexToShow(data.length - 1);
    } else {
      setIndexToShow(indexToShow - 1);
    }
  };

  const increaseIndex = () => {
    if (indexToShow === data.length - 1) {
      setIndexToShow(0);
    } else {
      setIndexToShow(indexToShow + 1);
    }
  };

  console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={reduceIndex} style={styles.touch}>
          <Entypo
            name="arrow-bold-left"
            size={globalWidth("2.5%")}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tableContainer}>
        {data.map((item, index) => {
          return (
            <ScrollView
              contentContainerStyle={{
                width: globalWidth("60%"),
                alignItems: "center",
              }}
              key={index}
              scrollEnabled
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
            >
              {index === indexToShow && (
                <View style={styles.mainItemView}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.teamName}>{item.teamName}</Text>
                  </View>
                  <FinalTableComp
                    widthArr={widthArr}
                    tableHead={tableHead}
                    data={item.salesData.map((item, index) => [
                      index + 1,
                      item.itemName,
                      item.cif,
                      numberWithComa(parseFloat(item.targetU).toFixed(0)),
                      currencySymbol +
                        " " +
                        numberWithComa(parseFloat(item.targetV).toFixed(0)),
                      numberWithComa(parseFloat(item.salesU).toFixed(0)),
                      currencySymbol +
                        " " +
                        numberWithComa(parseFloat(item.salesV).toFixed(0)),
                      item.ach,
                    ])}
                    showTotal={true}
                    totalData={[
                      "",
                      "Total",
                      "",
                      "",
                      currencySymbol +
                        " " +
                        numberWithComa(
                          parseFloat(item.totalTargetValue).toFixed(0)
                        ),
                      "",
                      currencySymbol +
                        " " +
                        numberWithComa(
                          parseFloat(item.totalSalesValue).toFixed(0)
                        ),
                      item.totalAchievement,
                    ]}
                  />
                </View>
              )}
              <View style={{ height: globalHeight("10%") }} />
            </ScrollView>
          );
        })}
      </View>
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={increaseIndex} style={styles.touch}>
          <Entypo
            name="arrow-bold-right"
            size={globalWidth("2.5%")}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touch: {
    alignSelf: "center",
  },
  arrowContainer: {
    width: globalWidth("3%"),
    height: globalHeight("72%"),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  tableContainer: {
    width: globalWidth("68%"),
    alignItems: "center",
    maxHeight: globalHeight("70%"),
  },
  titleContainer: {
    width: globalWidth("20%"),
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    paddingBottom: globalHeight("0.5%"),
  },
  teamName: {
    fontSize: globalWidth("1.4%"),
    color: Colors.font,
    fontFamily: "HelveticaNeue",
    fontStyle: "italic",
  },
  mainItemView: {
    width: globalWidth("68%"),
    alignItems: "center",
  },
});

export const TableToShowOptions = (navData) => {
  return {
    headerTitle: "TableToShow",
  };
};

export default TableToShow;
