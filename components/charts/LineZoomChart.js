import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

const LineZoomChart = (props) => {
  const { data, color } = props;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const options = {
    series: [
      {
        name: "Sales Value",
        data: data,
      },
    ],
    chart: {
      height: 150,
      type: "line",
      dropShadow: {
        enabled: false,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: months,
    },
    colors: [color],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },

    markers: {
      size: 1,
    },

    yaxis: {
      title: {
        text: "Sales Values",
      },
      show: false, // Hide the left axis
      min: 5,
      max: Math.max(...data.map((a) => a)) + 5,
    },
  };

  return (
    <View style={styles.container}>
      <Chart
        options={options}
        series={options.series}
        type="line"
        width={globalWidth("24%")}
        height={globalHeight("15%")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: -globalHeight("1%"),
  },
  header: {},
});

export default LineZoomChart;
