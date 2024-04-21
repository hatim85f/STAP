import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import Colors from "../../constants/Colors";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import moment from "moment";

import { months } from "../../components/helpers/months";
import { years } from "../../components/helpers/years";

import * as profitActions from "../../store/profit/profitActions";
import * as productActions from "../../store/products/productsActions";
import DropWithButton from "../../components/DropWithButton";
import SalesChartEmployee from "../../components/home/SalesChartEmployee";
import EmployeeDonutChart from "../../components/home/EmployeeDonutChart";
import ItemsChartHome from "../../components/home/ItemsChartHome";
import ProductsAchievement from "../../components/home/ProductsAchievement";
import SalesDetails from "../../components/home/SalesDetails";

const EmployeeHome = (props) => {
  const { userName } = props;

  const { userPerformance } = useSelector((state) => state.profit);
  const { products } = useSelector((state) => state.products);

  //   =====================================================MANAGING STATE=====================================================

  const [startMonth, setStartMonth] = useState(moment(new Date()).format("MM"));
  const [endMonth, setEndMonth] = useState(moment(new Date()).format("MM"));
  const [year, setYear] = useState(moment(new Date()).format("YYYY"));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [buttonIsOpened, setButtonIsOpened] = useState(false);

  //   =====================================================GETTING PRODUCTS DETAILS=====================================================

  const dispatch = useDispatch();

  useEffect(() => {
    setSearchIsLoading(true);
    dispatch(productActions.getBusinessProducts()).then(() => {
      setSearchIsLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const productsList = products.map((product) => {
        return {
          label: product.productNickName,
          value: product._id,
        };
      });

      setProductsList(productsList);
    }
  }, [products]);

  // ===================================================GETTING FILTERED SALES====================================================

  const changeStartDate = (date) => {
    const startDate = months.findIndex((month) => month === date);
    const newStart = startDate + 1;
    setStartMonth(newStart < 10 ? `0${newStart}` : newStart.toString());
  };

  const changeEndDate = (date) => {
    const endDate = months.findIndex((month) => month === date);
    const newEnd = endDate + 1;
    setEndMonth(newEnd < 10 ? `0${newEnd}` : newEnd.toString());
  };

  //   ============================================================SEARCH===============================================================

  useEffect(() => {
    setSearchIsLoading(true);
    dispatch(profitActions.getUserPerformance(startMonth, endMonth, year)).then(
      () => {
        setSearchIsLoading(false);
      }
    );
  }, [startMonth, endMonth, year, dispatch]);

  const search = () => {
    setSearchIsLoading(true);
    dispatch(profitActions.getUserPerformance(startMonth, endMonth, year)).then(
      () => {
        setSearchIsLoading(false);
      }
    );
  };

  console.log(userPerformance);

  //   ============================================================RETURN===============================================================

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <View style={styles.innerContainer}>
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.filtersRow}>
            <View style={[styles.rowItem, { height: "100%" }]}>
              <Text style={styles.direction}>From</Text>
            </View>
            <View
              style={[styles.rowItem, { borderWidth: 0, borderBottomWidth: 1 }]}
            >
              <DropWithButton
                list={months.map((a) => ({ label: a, value: a }))}
                buttonTitle={
                  startMonth ? months[parseInt(startMonth) - 1] : "Start Month"
                }
                getSelection={changeStartDate}
                width={globalWidth("11%")}
                margin={5}
                isOpened={setButtonIsOpened}
              />
            </View>
            <View style={[styles.rowItem, { height: "100%" }]}>
              <Text style={styles.direction}>To</Text>
            </View>
            <View
              style={[styles.rowItem, { borderWidth: 0, borderBottomWidth: 1 }]}
            >
              <DropWithButton
                list={months.map((a) => ({ label: a, value: a }))}
                buttonTitle={
                  endMonth ? months[parseInt(endMonth) - 1] : "End Month"
                }
                getSelection={changeEndDate}
                width={globalWidth("11%")}
                margin={5}
                isOpened={setButtonIsOpened}
              />
            </View>
            <View style={[styles.rowItem, { height: "100%" }]}>
              <Text style={styles.direction}>For</Text>
            </View>
            <View
              style={[styles.rowItem, { borderWidth: 0, borderBottomWidth: 1 }]}
            >
              <DropWithButton
                list={years}
                buttonTitle={year ? year : "Year"}
                getSelection={setYear}
                width={globalWidth("11%")}
                margin={5}
                isOpened={setButtonIsOpened}
              />
            </View>
            <View style={[styles.rowItem, { height: "100%" }]}></View>
            <View
              style={[styles.rowItem, { borderWidth: 0, borderBottomWidth: 1 }]}
            >
              <DropWithButton
                list={productsList}
                getSelection={setSelectedProduct}
                buttonTitle={
                  selectedProduct
                    ? productsList.find(
                        (product) => product.value === selectedProduct
                      ).label
                    : "Product"
                }
                width={globalWidth("11%")}
                margin={5}
                isOpened={setButtonIsOpened}
              />
            </View>

            <View style={styles.rowItem}>
              {searchIsLoading ? (
                <View
                  style={[
                    styles.button,
                    {
                      justifyContent: "center",
                      backgroundColor: "white",
                      alignItems: "center",
                    },
                  ]}
                >
                  <ActivityIndicator size="small" color={Colors.primary} />
                </View>
              ) : (
                <Button
                  title="Search"
                  buttonStyle={styles.button}
                  titleStyle={styles.title}
                  onPress={search}
                />
              )}
            </View>
          </View>
          <View style={styles.upperRow}>
            <View style={{ width: globalWidth("70%") }}>
              {userPerformance?.length > 0 && (
                <SalesChartEmployee
                  userName={userName}
                  performance={userPerformance}
                />
              )}
            </View>
            <View style={{ width: globalWidth("28%") }}>
              {userPerformance?.length > 0 && (
                <EmployeeDonutChart
                  series={[
                    userPerformance[0]?.totalSalesValue,
                    userPerformance[0]?.totalProductTargetValue -
                      userPerformance[0]?.totalSalesValue,
                  ]}
                  labels={["Achievement", "Remaining"]}
                />
              )}
            </View>
          </View>
          <View style={styles.lowerRow}>
            <ItemsChartHome
              target={userPerformance[0]?.totalProductTargetValue}
              sales={userPerformance[0]?.totalSalesValue}
              currency={userPerformance[0]?.performanceData[0].currencySymbol}
            />
            <ProductsAchievement />
            <SalesDetails />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#000",
    borderWidth: 1.5,
    borderColor: Colors.font,
    borderRadius: 5,
    margin: globalWidth("0.5%"),
  },
  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: Colors.lightBG,
  },
  rowItem: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.font,
    width: globalWidth("10.8%"),
  },
  button: {
    width: globalWidth("10.8%"),
    backgroundColor: Colors.primary,
    height: globalHeight("3.8%"),
  },
  title: {
    fontFamily: "robotoRegular",
    color: "white",
    fontSize: globalWidth("0.8%"),
    fontStyle: "italic",
    textAlign: "center",
  },
  direction: {
    fontFamily: "robotoRegular",
    color: Colors.font,
    fontSize: globalWidth("0.9%"),
    fontStyle: "italic",
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lowerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: globalWidth("1%"),
  },
});

export const EmployeeHomeOptions = (navData) => {
  return {
    headerTitle: "EmployeeHome",
  };
};

export default EmployeeHome;
