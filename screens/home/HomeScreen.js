import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { globalHeight, globalWidth } from "../../constants/globalWidth";

import Loader from "../../components/Loader";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import DropWithButton from "../../components/DropWithButton";
import numberWithComa from "../../components/helpers/numberWithComa";

import Colors from "../../constants/Colors";

import * as profitActions from "../../store/profit/profitActions";
import * as authActions from "../../store/auth/authActions";
import * as productsActions from "../../store/products/productsActions";
import * as businessActions from "../../store/business/businessActions";

import { months } from "../../components/helpers/months";
import { years } from "../../components/helpers/years";
import ProfitTopRow from "./ProfitTopRow";
import PorductsDetails from "./PorductsDetails";
import PartnersShow from "./PartnersShow";
import EmployeeHome from "./EmployeeHome";

const HomeScreen = (props) => {
  const { profit } = useSelector((state) => state.profit);
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { busiessesDetails } = useSelector((state) => state.business);

  const dispatch = useDispatch();

  // ================================================MANAGING STATES====================================================

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [startMonth, setStartMonth] = useState(moment(new Date()).format("MM"));
  const [endMonth, setEndMonth] = useState(moment(new Date()).format("MM"));
  const [year, setYear] = useState(moment(new Date()).format("YYYY"));
  const [startIsOpened, setStartIsOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsList, setProductsList] = useState([]);
  const [businessList, setBusinessList] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [profitValue, setProfitValue] = useState(0);

  // getting user back if he is logged out for any reason except he pressed logout button
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails;
        if (Platform.OS === "web") {
          storedUserDetails = window.localStorage.getItem("userDetails");
        } else {
          storedUserDetails = await AsyncStorage.getItem("userDetails");
        }

        if (storedUserDetails) {
          const parsedUserDetails = JSON.parse(storedUserDetails);

          if (parsedUserDetails.user) {
            dispatch(authActions.getUserIn(parsedUserDetails));
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting Profit Details...");

    if (selectedProduct && !selectedBusiness) {
      dispatch(
        profitActions.getProfitForProduct(
          startMonth,
          endMonth,
          year,
          selectedProduct
        )
      ).then(() => {
        setIsLoading(false);
        setLoadingMessage("");
      });
    } else if (selectedBusiness && !selectedProduct) {
      dispatch(
        profitActions.getBusinessProfit(
          startMonth,
          endMonth,
          year,
          selectedBusiness
        )
      ).then(() => {
        setIsLoading(false);
        setLoadingMessage("");
      });
    } else {
      dispatch(profitActions.getProfit(startMonth, endMonth, year)).then(() => {
        setIsLoading(false);
        setLoadingMessage("");
      });
    }
  }, [selectedProduct, selectedBusiness, startMonth, endMonth, year]);

  // ====================================================GETTING PROFIT DETAILS====================================================

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting Profit Details...");

    dispatch(profitActions.getProfit(startMonth, endMonth, year))
      .then(() => {
        setIsLoading(false);
        setLoadingMessage("");
      })
      .then(() => {
        setIsLoading(false);
        setLoadingMessage("");
      });
  }, [dispatch, startMonth, endMonth, year, selectedProduct]);

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

  //  ===================================================GET PRODUCTS LIST====================================================

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting Products List...");
    dispatch(productsActions.getBusinessProducts()).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const productsList = products.map((product) => ({
        label: product.productNickName,
        value: product._id,
      }));

      const allList = [
        {
          label: "All Products",
          value: null,
        },
      ];

      allList.push(...productsList);

      setProductsList(allList);
    }
  }, [products]);

  // =================================================GETTING BUSINESS DETAILS====================================================

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Getting Business Details...");
    dispatch(businessActions.getBusinessesDetails()).then(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  }, [dispatch]);

  useEffect(() => {
    if (busiessesDetails && busiessesDetails.length > 0) {
      const businessList = busiessesDetails.map((business) => ({
        label: business.businessName,
        value: business.businessId,
      }));

      const allList = [
        {
          label: "All Businesses",
          value: null,
        },
      ];

      allList.push(...businessList);

      setBusinessList(allList);
    }
  }, [busiessesDetails]);

  // ======================================================== PROFIT VALUES====================================================

  useEffect(() => {
    if (profit) {
      const total = profit.map((a) => a.totalProfit);
      const value = total.reduce((a, b) => a + b, 0);

      setProfitValue(value);
    }
  }, [profit]);

  // ====================================================RENDERING====================================================

  if (user.userType === "Employee") {
    return (
      <EmployeeHome navigation={props.navigation} userName={user.userName} />
    );
  }

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} center />;
  }

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <View style={styles.filterContainer}>
        <Text style={styles.header}>Filter</Text>
        <View style={styles.filtersRow}>
          <DropWithButton
            list={months.map((a) => ({ label: a, value: a }))}
            buttonTitle={
              startMonth ? months[parseInt(startMonth) - 1] : "Start Month"
            }
            getSelection={changeStartDate}
            width={globalWidth("10%")}
            margin={5}
            rounded
            isOpened={setStartIsOpened}
          />
          <DropWithButton
            list={months.map((a) => ({ label: a, value: a }))}
            buttonTitle={
              endMonth ? months[parseInt(endMonth) - 1] : "End Month"
            }
            getSelection={changeEndDate}
            width={globalWidth("10%")}
            margin={5}
            rounded
            isOpened={setStartIsOpened}
          />
          <DropWithButton
            list={years}
            buttonTitle={year ? year : "Year"}
            getSelection={setYear}
            width={globalWidth("10%")}
            margin={5}
            rounded
            isOpened={setStartIsOpened}
          />
          <DropWithButton
            list={businessList}
            getSelection={setSelectedBusiness}
            buttonTitle={
              selectedBusiness
                ? businessList.find(
                    (business) => business.value === selectedBusiness
                  ).label
                : "Business"
            }
            width={globalWidth("10%")}
            margin={5}
            rounded
            isOpened={setStartIsOpened}
          />
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
            width={globalWidth("10%")}
            margin={5}
            rounded
            isOpened={setStartIsOpened}
          />
        </View>
      </View>
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {profit && profit.length > 0 && <ProfitTopRow profit={profit} />}
        {profit && profit.length > 0 && (
          <View style={styles.lowerRow}>
            <PorductsDetails
              products={profit.map((a) => a.products).flat()}
              totalProfit={profitValue}
              currencySymbol={profit[0].currencySymbol}
            />
            <PartnersShow
              partners={profit.map((a) => a.partners).flat()}
              profit={profitValue}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  filterContainer: {
    paddingHorizontal: globalWidth("1%"),
    paddingVertical: globalHeight("0.5%"),
    borderRadius: 10,
    margin: globalWidth("2%"),
    borderWidth: 1,
    borderColor: Colors.font,
    paddingBottom: globalHeight("1%"),
  },
  header: {
    fontFamily: "openSansBold",
    fontSize: globalWidth("1.5%"),
    color: Colors.appBlue,
    marginBottom: globalHeight("1%"),
    fontStyle: "italic",
  },
  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  button: {
    width: globalWidth("10%"),
    backgroundColor: Colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.font,
    height: globalHeight("3.8%"),
  },
  title: {
    fontFamily: "robotoRegular",
    color: "white",
    fontSize: globalWidth("0.8%"),
    fontStyle: "italic",
  },
  lowerRow: {
    padding: globalWidth("1%"),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default HomeScreen;
