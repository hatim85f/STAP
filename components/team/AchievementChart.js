import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import numberWithComa from "../helpers/numberWithComa";

import Chart from "react-apexcharts";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

const AchievementChart = (props) => {
  const {
    details,
    name,
    yaxisName,
    xaxisName,
    achievement,
    secondColor,
    image,
    totalSales,
    totalTarget,
    currencySymbol,
    height,
    width,
    smallImage,
    secondLine,
  } = props;

  var options = {
    series: [
      {
        name,
        data: details,
      },
    ],
    chart: {
      height: height,
      type: "bar",

      dropShadow: {
        enabled: true,
        color: Colors.haizyColor,
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
      },
    },
    colors: [secondColor, Colors.primary],
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    distributed: true,
    title: {
      text: secondLine ? secondLine : name,
      align: "center",
    },
    grid: {
      borderColor: Colors.primary,
      row: {
        colors: [Colors.lightBG, "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ["Sales", "Target"],
      title: {
        text: xaxisName,
      },
    },
    yaxis: {
      title: {
        text: yaxisName,
      },
      labels: {
        formatter: function (value) {
          if (value >= 1e6) {
            return (value / 1e6).toFixed(0) + "M";
          } else if (value >= 1e3) {
            return (value / 1e3).toFixed(0) + "K";
          } else {
            return value.toFixed(0);
          }
        },
      },
    },
    responsive: [
      {
        breakpoint: undefined,
        options: {},
      },
    ],
    legend: {
      show: false,
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={image}
        style={smallImage ? styles.smallImage : styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text
          style={[
            styles.numbers,
            {
              color:
                achievement <= 30
                  ? "#FF0055"
                  : achievement <= 50 && achievement > 30
                  ? "#AB7E02"
                  : achievement > 50 && achievement <= 75
                  ? "#03FCDF"
                  : Colors.primary,
            },
          ]}
        >
          Sales : {numberWithComa(+totalSales)} {currencySymbol}{" "}
        </Text>
        <Text style={styles.numbers}>
          Target : {numberWithComa(+totalTarget)} {currencySymbol}{" "}
        </Text>
        {secondLine && (
          <Text style={[styles.name, { color: secondColor }]}> {name} </Text>
        )}
      </View>
      <div>
        <Chart
          options={options}
          series={options.series}
          type="bar"
          width={width}
          height={width}
        />
      </div>
      <Text
        style={[
          styles.text,
          { fontSize: smallImage ? globalWidth("0.8%") : globalWidth("1.2%") },
        ]}
      >
        Achievement :{" "}
        <Text
          style={{
            color:
              achievement <= 30
                ? "#FF0055"
                : achievement <= 50 && achievement > 30
                ? "#FCBA03"
                : achievement > 50 && achievement <= 75
                ? "#03FCDF"
                : Colors.primary,
          }}
        >
          {parseInt(achievement).toFixed(2)} %
        </Text>{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: globalWidth("6%"),
    height: globalWidth("6%"),
    borderRadius: globalWidth("3%"),
    borderWidth: 1,
    borderColor: Colors.primary,
    alignSelf: "center",
    marginBottom: globalHeight("1%"),
  },
  smallImage: {
    width: globalWidth("3%"),
    height: globalWidth("3%"),
    borderRadius: globalWidth("1.5%"),
    borderWidth: 1,
    borderColor: Colors.primary,
    alignSelf: "center",
    marginBottom: globalHeight("1%"),
  },
  text: {
    textAlign: "center",
    color: Colors.font,
    fontStyle: "italic",
    fontFamily: "sans-serif",
  },
  detailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: globalWidth("1%"),
  },
  numbers: {
    fontSize: globalWidth("0.9 %"),
    color: Colors.primary,
    fontFamily: "numbers",
    lineHeight: globalWidth("2.5%"),
  },
  name: {
    fontSize: globalWidth("1.2 %"),
    fontFamily: "numbers",
    lineHeight: globalWidth("2.5%"),
  },
});

export default AchievementChart;
