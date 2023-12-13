import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/webComponents/menu/MenuButton";

import ExcelIcons from "../../components/sales/ExcelIcons";

import * as productsActions from "../../store/products/productsActions";
import * as authActions from "../../store/auth/authActions";

const SalesUploadScreen = (props) => {
  const { products } = useSelector((state) => state.products);

  const [productsData, setProductsData] = useState([]);

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
      };
    });

    setProductsData(productsData);
  }, [products]);

  console.log(productsData);

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      <ExcelIcons
        header={[
          "Product Name",
          "Client Name",
          "Quantity",
          "Price",
          "Date",
          "Status",
          "Business ID",
          "Product ID",
        ]}
        secondData={productsData}
        sheetName="Sales"
        templateName="Sales Template"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {},
});

export default SalesUploadScreen;
