import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";

import MenuButton from "../../components/webComponents/menu/MenuButton";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";

import * as businessActions from "../../store/business/businessActions";
import * as authActions from "../../store/auth/authActions";
import * as productsActions from "../../store/products/productsActions";

import HeaderText from "../../components/HeaderText";
import ProductsShow from "../../components/products/ProductsShow";

const ProductsScreen = (props) => {
  const { userType } = useSelector((state) => state.auth.user);
  const { user, token } = useSelector((state) => state.auth);
  const { business } = useSelector((state) => state.business);
  const { products } = useSelector((state) => state.products);

  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessValue, setBusinessValue] = useState(null);

  // getting user businesses to show them a list of their businesses to select from them
  // with an option of selecting them all
  // when showing the products
  // will show businessName and businessLogo as well

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(businessActions.getUserBusiness());
    }
  }, [dispatch, token]);

  // preparing list for selection
  const businessList = useMemo(() => {
    const list = [];
    business.map((item) => {
      list.push({
        label: item.business.businessName,
        value: item.business._id,
      });
    });
    return list;
  }, [business]);

  // getting business value then find the selected business to show in list placeholder

  useEffect(() => {
    if (businessValue) {
      const selected = business.find(
        (item) => item.business._id === businessValue
      );
      setSelectedBusiness(selected.business.businessName);
    }
  }, [businessValue]);

  // getting business Products upon selecting a business

  useEffect(() => {
    if (businessValue) {
      dispatch(productsActions.getBusinessProducts(businessValue));
    }
  }, [businessValue]);

  // check if user selected business before navigating him to products screen

  const goToAdd = () => {
    if (businessValue) {
      props.navigation.navigate("add_product", {
        businessId: businessValue,
      });
    } else {
      if (Platform.OS === "web") {
        dispatch(
          authActions.setError("Error !", "Please select a business first")
        );
      } else {
        Alert.alert("Error !", "Please select a business first", [
          { text: "Okay" },
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <View style={{ width: "100%", alignItems: "flex-start" }}>
          <MenuButton navigation={props.navigation} />
        </View>
      )}
      <View style={styles.innerContainer}>
        {Platform.OS === "web" && <HeaderText text="Products" />}
        {(userType === "Business Owner" || "Admin") && (
          <Button
            onPress={goToAdd}
            title="Add Products"
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
          />
        )}
        <DropDownPicker
          open={open}
          value={businessValue}
          items={businessList}
          setOpen={setOpen}
          setValue={setBusinessValue}
          setItems={setBusinessValue}
          placeholder="Select Business"
          placeholderStyle={{ color: "#6a6b6c" }}
          style={styles.listStyle}
          textStyle={styles.dropText}
          dropDownContainerStyle={styles.dropListStyle}
        />
        {businessValue && products.length > 0 && (
          <ProductsShow
            products={products}
            businessId={businessValue}
            navigation={props.navigation}
          />
        )}
        {businessValue && products.length === 0 && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: globalHeight("50%"),
            }}
          >
            <Text style={styles.noProducts}>
              No Products Found under {selectedBusiness} data
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  innerContainer: {
    width: Platform.OS === "web" ? "50%" : "95%",
    marginTop: 10,
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    marginTop: 5,
    borderRadius: 5,
    marginRight: 10,
    width: Platform.OS === "web" ? globalWidth("20%") : globalWidth("40%"),
    marginBottom: 15,
  },
  buttonTitle: {
    fontFamily: "headers",
    fontSize:
      Platform.OS === "web" ? globalWidth("1.5   %") : globalWidth("4%"),
    color: "white",
  },
  listStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    width: Platform.OS === "web" ? "80%" : "95%",
    alignSelf: "center",
    borderWidth: 0,
    height: globalWidth("3.5%"),
    zIndex: 100,
    borderWidth: 1.5,
    borderColor: "#6a6b6c",
    marginBottom: 40,
  },
  dropText: {
    fontFamily: "headers",
    color: "black",
    fontSize: Platform.OS === "web" ? globalWidth("1.1%") : globalWidth("3.5%"),
  },
  dropListStyle: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: Colors.primary,
    width: Platform.OS === "web" ? "80%" : "95%",
    alignSelf: "center",
    zIndex: 100,
    elevation: 10,
  },
  noProducts: {
    fontFamily: "headers",
    fontSize: Platform.OS === "web" ? globalWidth("1.1%") : globalWidth("3.5%"),
    color: "red",
    marginTop: 20,
  },
});

export default ProductsScreen;
