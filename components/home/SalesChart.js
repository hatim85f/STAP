import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Chart from "react-apexcharts";

import { globalHeight, globalWidth } from "../../constants/globalWidth";

const SalesChart = (props) => {
  const { data, categories } = props;

  const colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#546E7A",
    "#26a69a",
    "#D10CE8",
    "#FF66C3",
    "#00C7FF",
    "#FFC300",
    "#3300FF",
    "#FF00CC",
    "#FF3300",
    "#FF33FF",
    "#FFCC00",
    "#FF6600",
    "#FF0066",
    "#FF3300",
    "#FF00FF",
    "#FF99FF",
    "#FFCCFF",
    "#FF99CC",
    "#FF99FF",
    "#FF99FF",
  ];

  const series = [
    {
      data,
    },
  ];

  var options = {
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: colors,
          fontSize: "12px",
        },
      },
    },
  };
  return (
    <View style={styles.container}>
      <div style={styles.cahrt}>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={globalHeight("25%")}
        />
      </div>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const SalesChartOptions = (navData) => {
  return {
    headerTitle: "SalesChart",
  };
};

export default SalesChart;
