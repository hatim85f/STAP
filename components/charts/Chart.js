import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

const CustomChart = (props) => {
  const { id, categories, series, colors } = props;
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  const options = {
    chart: {
      id,
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.8,
      },
    },
    colors: [Colors.primary],
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories,
    },
  };

  return (
    <View style={styles.container}>
      <div style={styles.cahrt}>
        <Chart
          options={options}
          series={series}
          type="bar"
          width={globalWidth("60%")}
          height={globalHeight("30%")}
        />
      </div>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {},
  cahrt: {
    width: globalWidth("60%"),
    alignSelf: "center",
  },
});

export const ChartOptions = (navData) => {
  return {
    headerTitle: "Chart",
  };
};

export default CustomChart;
