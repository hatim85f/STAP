import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import moment from "moment";

import ExcelIcons from "../../components/sales/ExcelIcons";
import WebAlert from "../../components/webAlert/WebAlert";
import CustomInput from "../../components/webComponents/Input/Input";
import Loader from "../../components/Loader";

import * as productsActions from "../../store/products/productsActions";
import * as authActions from "../../store/auth/authActions";
import * as salesActions from "../../store/sales/salesActions";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import DateRangePicker from "../../components/DateRangePicker";
import TopBar from "./TopBar";

const SalesUploadScreen = (props) => {
  const { products } = useSelector((state) => state.products);

  const [productsData, setProductsData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [salesVersion, setSalesVersion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("");
  const [startPeriod, setStartPeriod] = useState(null);
  const [endPeriod, setEndPeriod] = useState(null);
  const dispatch = useDispatch();

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
    dispatch(productsActions.getBusinessProducts());
  }, [dispatch]);

  useEffect(() => {
    const productsData = products.map((product) => {
      return {
        "Product Name": product.productNickName,
        "Product Price": product.costPrice,
        "Business ID": product.businessId,
        "Product ID": product._id,
        "Selling Price": product.sellingPrice,
      };
    });

    setProductsData(productsData);
  }, [products]);

  const submitSales = async () => {
    if (salesVersion === "") {
      setShowAlert(true);
      setAlertMessage("Please enter a version name");
      return;
    }

    if (!startPeriod || !endPeriod) {
      setShowAlert(true);
      setAlertMessage("Please set start and end date");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Uploading Sales Data");

    const salesData = finalData.reduce((acc, data) => {
      const found = acc.find((item) => item.businessId === data.businessId);

      if (!found) {
        acc.push({
          businessId: data.businessId,
          salesValue: data.sellingPrice * data.quantity,
          sales: [
            {
              productId: data.productId,
              productName: data.productName,
              sellingPrice: data.sellingPrice,
              productPrice: data.productPrice,
              quantity: data.quantity,
              date: data.date,
              status: data.status,
              bonus: data.bonus,
              bonusType: data.bonusType,
              clientName: data.clientName,
              businessId: data.businessId,
            },
          ],
        });
      } else {
        found.salesValue += data.sellingPrice * data.quantity;
        found.sales.push({
          productId: data.productId,
          productName: data.productName,
          sellingPrice: data.sellingPrice,
          productPrice: data.productPrice,
          quantity: data.quantity,
          date: data.date,
          status: data.status,
          bonus: data.bonus,
          bonusType: data.bonusType,
          clientName: data.clientName,
          businessId: data.businessId,
        });
      }

      return acc;
    }, []);

    try {
      // Use Promise.all to wait for all dispatch calls to complete
      await Promise.all(
        salesData.map((data) =>
          dispatch(
            salesActions.addSales(data, salesVersion, startPeriod, endPeriod)
          )
        )
      );

      // All dispatch calls have completed
      setIsLoading(false);
      setFinalData([]);
      setSalesVersion("");
      setLoadingMessage("");
    } catch (error) {
      // Handle any errors that occurred during the dispatch calls
      console.error("Error uploading sales data:", error);
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  if (isLoading) {
    return <Loader loadingMessage={loadingMessage} center />;
  }

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <TopBar />
      {productsData.length > 0 && (
        <ExcelIcons
          upload={true}
          download={true}
          header={[
            "Product Name",
            "Client Name",
            "Quantity",
            "Price",
            "Bonus",
            "Bonus Type",
            "Date",
            "Status",
            "Business ID",
            "Product ID",
            "Selling Price",
          ]}
          sheetName={"Sales"}
          templateName={"Sales Template"}
          secondData={productsData}
          getData={(data) => setFinalData(data)}
        />
      )}
      {finalData.length > 0 && (
        <View style={styles.versionContainer}>
          <Text style={styles.header}>
            Total Items Uploaded: {finalData.length}
          </Text>
          <Text style={styles.header}>Start Date</Text>
          <DateRangePicker getDate={(date) => setStartPeriod(date)} />
          <Text style={styles.header}>End Date</Text>
          <DateRangePicker getDate={(date) => setEndPeriod(date)} />
          <CustomInput
            label="Version Name"
            placeholder={`Enter Version Name for this sales data like ${moment(
              new Date()
            ).format("DD/MM/YYYY")}`}
            value={salesVersion}
            onChangeText={(text) => setSalesVersion(text)}
          />
          <Button
            title="Submit"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            onPress={submitSales}
          />
        </View>
      )}
      <WebAlert
        showAlert={showAlert}
        title="Alert"
        message={alertMessage}
        cancelText="Cancel"
        okText="Ok"
        onCancel={() => setShowAlert(false)}
        onOk={() => setShowAlert(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    overflow: "scroll",
  },
  versionContainer: {
    width: globalWidth("50%"),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: globalHeight("15%"),
  },
  buttonStyle: {
    width: globalWidth("25%"),
    borderRadius: 10,
    backgroundColor: Colors.primary,
    marginTop: globalHeight("2%"),
  },
  titleStyle: {
    fontFamily: "open-sans",
    fontSize: globalWidth("1.2%"),
  },
  header: {
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: globalWidth("1.5%"),
    marginBottom: globalHeight("2%"),
    color: Colors.primary,
  },
});

export default SalesUploadScreen;
