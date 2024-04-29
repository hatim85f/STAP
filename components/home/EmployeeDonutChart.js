import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Chart from "react-apexcharts";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import numberWithComa from "../../components/helpers/numberWithComa";

const EmployeeDonutChart = (props) => {
  const { series, labels, target, sales, currency } = props;

  const colors = ["#008FFB", "#FF4560"];

  const options = {
    series,
    labels,
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return parseFloat(val).toFixed(0) + "%";
      },
    },
    colors: colors,
    plotOptions: {
      pie: {
        size: globalWidth("30%"),
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              color: "#ff0055",
              offsetY: -10,
            },
            value: {
              show: false,
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              color: Colors.primary,
              offsetY: 16,
              formatter: function (val) {
                return parseFloat(val).toFixed(0) + "%";
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: "Achievement",
              color: "#008FFB",
              formatter: function () {
                return "Achievement";
              },
            },
            legend: {
              show: false,
            },
          },
        },
      },
    },
  };

  console.log(target);

  if (target === 0) {
    retun(<Text style={styles.note}>Target is not assigned yet... !</Text>);
  }

  return (
    <View style={styles.container}>
      <Chart
        options={options}
        series={options.series}
        type="donut"
        width={globalWidth("22%")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "28%",
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 0,
  },
  title: {
    fontSize: globalWidth("1%"),
    color: Colors.primary,
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: "Helvetica, Arial, sans-serif",
  },
});

export default EmployeeDonutChart;
