import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Chart from "react-apexcharts";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

const ColumnChart = (props) => {
  const { categories, data, width, height } = props;

  // set colors an array of 12 colors
  const colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#3F51B5",
    "#546E7A",
    "#D4526E",
    "#8D5B4C",
    "#F86624",
    "#D7263D",
    "#1B998B",
  ];

  var options = {
    series: [
      {
        data: data,
      },
    ],
    chart: {
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.8,
      },
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: 0,
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          labels: {
            style: {
              colors: ["#ff0055"],
              fontSize: "12px",
            },
          },
        },
        grid: {
          borderColor: "#f1f1f1",
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 8,
        width: 15,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },

    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: categories,
    },
  };

  return (
    <View style={styles.container}>
      <Chart
        options={options}
        series={options.series}
        type="bar"
        width={width ? width : globalWidth("30%")}
        height={height ? height : globalHeight("15%")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
});

export const ColumnChartOptions = (navData) => {
  return {
    headerTitle: "ColumnChart",
  };
};

export default ColumnChart;
