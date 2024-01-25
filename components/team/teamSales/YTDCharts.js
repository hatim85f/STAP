import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Card from "../../Card";

import numberWithComma from "../../helpers/numberWithComa";
import Colors from "../../../constants/Colors";
import CustomChart from "../../charts/Chart";
import AchievementChart from "../AchievementChart";
import { globalHeight, globalWidth } from "../../../constants/globalWidth";
import PieChart from "../../charts/PieChart";
import LineZoomChart from "../../charts/LineZoomChart";
import Chart from "../../charts/Chart";

const YTDCharts = (props) => {
  const {
    totalTeamsSales,
    totalTeamTarget,
    currencySymbol,
    series,
    labels,
    targetData,
    salesData,
    productsSales,
    salesChartTitle,
    targetChartTitle,
    achievementChartTitle,
    individual,
  } = props;

  const [totalSales, setTotalSales] = useState(null);
  const [totalTarget, setTotalTarget] = useState(null);

  useEffect(() => {
    const sales = salesData.map((a) => a).reduce((a, b) => a + b, 0);
    const target = targetData.map((a) => a).reduce((a, b) => a + b, 0);

    setTotalSales(parseFloat(sales).toFixed(2));
    setTotalTarget(parseFloat(target).toFixed(2));
  }, [salesData, targetData]);

  const calculateAchievement = (salesData, targetData) => {
    const result = salesData.map((sales, index) => {
      const target = targetData[index];
      // Check if sales is 0 to avoid division by zero
      const achievement = sales === 0 ? 0 : (sales / target) * 100;
      return +parseFloat(achievement).toFixed(2);
    });

    return result;
  };

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

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={styles.mainContainer}>
          <Card style={styles.card}>
            <Text style={styles.text}>
              {" "}
              {salesChartTitle ? salesChartTitle : "Total Team Sales"}{" "}
            </Text>
            <Text style={[styles.number, { color: Colors.font }]}>
              {" "}
              {currencySymbol}{" "}
              {numberWithComma(parseFloat(totalTeamsSales).toFixed(2))}{" "}
            </Text>
            <LineZoomChart data={salesData} color={Colors.primary} />
          </Card>
          <Card style={styles.card}>
            <Text style={styles.text}>
              {" "}
              {targetChartTitle ? targetChartTitle : "Total Team Target"}{" "}
            </Text>
            <Text style={[styles.number, { color: Colors.font }]}>
              {" "}
              {currencySymbol}{" "}
              {numberWithComma(parseFloat(totalTeamTarget).toFixed(2))}{" "}
            </Text>
            <LineZoomChart data={targetData} color="#fcba03" />
          </Card>
          <Card style={styles.card}>
            <Text style={styles.text}>
              {" "}
              {achievementChartTitle
                ? achievementChartTitle
                : "Total Team Achievement"}{" "}
            </Text>
            <Text style={[styles.number, { color: Colors.font }]}>
              {((totalTeamsSales / totalTeamTarget) * 100).toFixed(2)} %
            </Text>
            <LineZoomChart
              data={calculateAchievement(salesData, targetData)}
              color="#ff0055"
            />
          </Card>
        </View>
        <View style={styles.totalsRow}>
          <Card style={styles.card}>
            <PieChart series={series} labels={labels} />
          </Card>
          <Card style={styles.card}>
            <Chart
              id="chart"
              categories={["Target", "Sales"]}
              series={[
                {
                  name: "Sales",
                  data: [totalTeamTarget, totalTeamsSales],
                },
              ]}
              colors={[
                Colors.primary,
                () => secondColor((totalSales / totalTarget) * 100),
              ]}
            />
          </Card>
        </View>
        <View style={styles.chartsRow}>
          {productsSales.map((item, index) => {
            return (
              <View style={styles.achContainer} key={index}>
                <AchievementChart
                  details={[
                    `${parseInt(item.productSalesValue).toFixed(2)}`,
                    `${parseInt(item.productTargetValue).toFixed(2)}`,
                  ]}
                  name={item.productNickName}
                  yaxisName="Value $"
                  xaxisName=""
                  image={item.productImage}
                  totalSales={parseFloat(item.productSalesValue).toFixed(0)}
                  totalTarget={parseFloat(item.productTargetValue).toFixed(0)}
                  achievement={item.productAchievement}
                  secondColor={() => secondColor(item.productAchievement)}
                  currencySymbol={currencySymbol}
                  height={globalHeight("35%")}
                  width={globalWidth("20%")}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: globalHeight("1%"),
  },
  card: {
    borderWidth: 0.5,
    height: globalHeight("22%"),
    width: globalWidth("25%"),
    borderRadius: 5,
    padding: globalWidth("0.25%"),
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: globalWidth("2%"),
  },
  text: {
    fontSize: globalWidth("0.8%"),
    fontFamily: "robotoRegular",
    color: Colors.primary,
    textAlign: "left",
    marginLeft: globalWidth("2%"),
    marginVertical: globalHeight("0.5%"),
    fontStyle: "italic",
  },
  number: {
    fontSize: globalWidth("1.4%"),
    fontFamily: "robotoRegular",
    color: Colors.font,
    fontStyle: "italic",
    textAlign: "left",
    marginLeft: globalWidth("3%"),
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: globalHeight("2%"),
    width: globalWidth("55%"),
    alignSelf: "center",
  },
  achContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.font,
    borderRadius: 10,
    padding: globalWidth("0.5%"),
    marginHorizontal: globalWidth("0.5%"),
    marginTop: globalHeight("1%"),
  },
  chartsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    height: "100%",
    marginTop: globalWidth("2%"),
    paddingHorizontal: globalWidth("2%"),
  },
});

export const YTDChartsOptions = (navData) => {
  return {
    headerTitle: "YTDCharts",
  };
};

export default YTDCharts;
