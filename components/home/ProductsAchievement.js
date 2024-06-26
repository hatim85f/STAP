import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import ColumnChart from "../charts/ColumnChart";
import numberWithComa from "../helpers/numberWithComa";

const ProductsAchievement = (props) => {
  const { performanceData } = props;

  const [maxScrollNumber, setMaxScrollNumber] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(globalWidth("2%"));

  useEffect(() => {
    if (performanceData && performanceData.length > 0) {
      setMaxScrollNumber(performanceData.length - 2);
    }
  }, [performanceData]);

  const scrollViewRef = useRef(null);

  const scrollLeft = () => {
    setMaxScrollNumber(performanceData?.length - 1);
    setScrollWidth(globalWidth("2%"));

    scrollViewRef.current?.scrollTo({
      x: (scrollViewRef.current?.scrollX || 0) - scrollWidth,
      animated: true,
    });
  };

  const scrollRight = () => {
    let newMaxScrollNumber = maxScrollNumber;

    if (newMaxScrollNumber === 0) {
      return;
    }

    setMaxScrollNumber(newMaxScrollNumber - 1);

    const newScrollWidth = scrollWidth;
    const appliedWidth = newScrollWidth + globalWidth("15%");
    setScrollWidth(appliedWidth);

    scrollViewRef.current?.scrollTo({
      x: (scrollViewRef.current?.scrollX || 0) + appliedWidth,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products Performance</Text>
      <View style={styles.mainRow}>
        <TouchableOpacity onPress={scrollLeft} style={styles.arrowContainer}>
          <AntDesign
            name="caretleft"
            size={globalWidth("2%")}
            color="#008FFB"
          />
        </TouchableOpacity>
        <ScrollView
          horizontal={true}
          scrollEnabled
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: globalWidth("55%") }}
          ref={scrollViewRef}
        >
          {performanceData?.map((product, index) => {
            return (
              <View key={index} style={styles.itemContainer}>
                <ColumnChart
                  categories={["Target", "Sales"]}
                  data={[
                    parseFloat(product.productTargetValue).toFixed(0),
                    parseFloat(product.salesValue).toFixed(0),
                  ]}
                  width={globalWidth("10%")}
                  height={globalHeight("15%")}
                />
                <Text style={styles.itemName}> {product.productNickName} </Text>
              </View>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={scrollRight}
          style={styles.arrowContainer}
          disabled={maxScrollNumber > 0 && maxScrollNumber < 1}
        >
          <AntDesign
            name="caretright"
            size={globalWidth("2%")}
            color="#008FFB"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "42%",
    borderColor: "black",
    borderWidth: 1,
    padding: globalWidth("1%"),
    height: globalHeight("30%"),
    backgroundColor: "#FFFFF3",
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 0,
  },
  header: {
    fontSize: globalWidth("1.8% "),
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-aroundehigh",
    alignItems: "center",
    marginTop: globalHeight("1%"),
  },
  arrowContainer: {
    width: globalWidth("2.5%"),
    height: globalWidth("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width: globalWidth("10%"),
    maxHeight: globalHeight("22%"),
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: globalWidth("1%"),
    borderRadius: 3,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: globalWidth("0.5%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  itemName: {
    fontFamily: "openSansBold",
    fontSize: globalWidth("0.8%"),
    color: Colors.font,
    marginBottom: globalHeight("0.5%"),
    fontStyle: "italic",
  },
});

export default ProductsAchievement;
