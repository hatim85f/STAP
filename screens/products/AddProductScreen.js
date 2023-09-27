import React, { useState, useEffect, useMemo } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Foundation,
  AntDesign,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import MenuButton from "../../components/webComponents/menu/MenuButton";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import HeaderText from "../../components/HeaderText";
import MainInput from "../../components/MainInput";
import Card from "../../components/Card";
import UploadImage from "../../components/helpers/UploadImages";
import Loader from "../../components/Loader";
import Colors from "../../constants/Colors";

import * as productsActions from "../../store/products/productsActions";
import { isWeb } from "../../constants/device";

const AddProductScreen = (props) => {
  const { businessId } = props.route.params;
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productNickName, setProductNickName] = useState("");
  const [costPrice, setCostPrice] = useState(null);
  const [retailPrice, setRetailPrice] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [maximumDiscount, setMaximumDiscount] = useState(null);
  const [minimumDiscount, setMinimumDiscount] = useState(null);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // submitting form

  const handleSubmitForm = () => {
    setIsLoading(true);
    dispatch(
      productsActions.addProduct(
        businessId,
        productName,
        productNickName,
        productType,
        costPrice,
        retailPrice,
        sellingPrice,
        description,
        imageUrl,
        minimumDiscount,
        maximumDiscount,
        category,
        productType
      )
    ).then(() => {
      setIsLoading(false);
      props.navigation.navigate("main_products_nav");
    });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && <MenuButton navigation={props.navigation} />}
      <TouchableOpacity
        onPress={() => props.navigation.navigate("main_products_nav")}
        style={styles.touchable}
      >
        <AntDesign name="arrowleft" size={35} color={Colors.primary} />
      </TouchableOpacity>
      <HeaderText text="Add Product" />
      <Card style={styles.card}>
        <ScrollView
          scrollEnabled
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={isWeb() && false}
        >
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Type Of Product</Text>
            <View style={styles.checkboxRow}>
              <View>
                <CheckBox
                  checked={productType === "Physical"}
                  onPress={() => setProductType("Physical")}
                  size={30}
                  checkedColor={Colors.primary}
                />
                <Text style={styles.checkboxText}>Physical</Text>
              </View>

              <View>
                <CheckBox
                  checked={productType === "Service"}
                  onPress={() => setProductType("Service")}
                  size={30}
                  checkedColor={Colors.primary}
                />
                <Text style={styles.checkboxText}>Service</Text>
              </View>
            </View>
          </View>
          <MainInput
            label="Product Name"
            style={styles.input}
            value={productName}
            onChangeText={(text) => setProductName(text)}
            rightIcon={() => (
              <MaterialCommunityIcons
                name="alpha-p-box"
                size={24}
                color={Colors.font}
              />
            )}
          />
          <MainInput
            label="Product Nick Name"
            style={styles.input}
            value={productNickName}
            onChangeText={(text) => setProductNickName(text)}
            rightIcon={() => (
              <MaterialCommunityIcons
                name="alpha-p-circle"
                size={24}
                color={Colors.font}
              />
            )}
          />
          <MainInput
            label="Cost Price"
            style={styles.input}
            value={costPrice}
            onChangeText={(text) => setCostPrice(text)}
            keyboardType="numeric"
            rightIcon={() => (
              <FontAwesome5
                name="money-bill-wave"
                size={24}
                color={Colors.font}
              />
            )}
          />
          <MainInput
            label="Retail Price"
            style={styles.input}
            value={retailPrice}
            onChangeText={(text) => setRetailPrice(text)}
            keyboardType="numeric"
            rightIcon={() => (
              <MaterialIcons
                name="attach-money"
                size={24}
                color={Colors.font}
              />
            )}
          />
          <MainInput
            label="Selling Price"
            style={styles.input}
            value={sellingPrice}
            onChangeText={(text) => setSellingPrice(text)}
            keyboardType="numeric"
            rightIcon={() => (
              <Ionicons name="ios-pricetags" size={24} color={Colors.font} />
            )}
          />
          <MainInput
            label="Description"
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
            rightIcon={() => (
              <Foundation name="comment" size={24} color={Colors.font} />
            )}
          />
          <View style={styles.checkboxContainer}>
            <MainInput
              label="Image URL"
              placeholder="Paste Image URL"
              onChangeText={(text) => setImageUrl(text)}
              value={imageUrl}
              rightIcon={() => (
                <Ionicons name="images-sharp" size={24} color={Colors.font} />
              )}
            />
            <Text
              style={{
                textAlign: "center",
                fontFamily: "headers",
                fontSize: 16,
                color: Colors.font,
              }}
            >
              OR
            </Text>
            <UploadImage
              disabled={productName.length === 0}
              getURL={(data) => setImageUrl(data)}
              imageName={productName}
              subFolder={`businesses_products/${businessId}/`}
            />
          </View>
          <MainInput
            label="Category"
            style={styles.input}
            value={category}
            onChangeText={(text) => setCategory(text)}
            rightIcon={() => (
              <MaterialIcons name="category" size={24} color={Colors.font} />
            )}
          />
          <MainInput
            label="Maximum Discount"
            style={styles.input}
            value={maximumDiscount}
            onChangeText={(text) => setMaximumDiscount(text)}
            keyboardType="numeric"
            rightIcon={() => (
              <MaterialCommunityIcons
                name="percent"
                size={24}
                color={Colors.font}
              />
            )}
          />
          <MainInput
            label="Minimum Discount"
            style={styles.input}
            value={minimumDiscount}
            onChangeText={(text) => setMinimumDiscount(text)}
            keyboardType="numeric"
            rightIcon={() => (
              <MaterialCommunityIcons
                name="percent"
                size={24}
                color={Colors.font}
              />
            )}
          />
          <Button
            title="Submit"
            onPress={handleSubmitForm}
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
          />
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  touchable: {
    marginLeft: 10,
    cursor: "pointer",
  },
  card: {
    flex: 1,
    width: isWeb() ? "50%" : "95%",
    alignSelf: "center",
    marginTop: 10,
  },
  checkboxContainer: {
    marginTop: 15,
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    marginBottom: globalHeight("2%"),
    paddingBottom: globalHeight("2%"),
    paddingHorizontal: isWeb() ? globalHeight("0.5%") : globalWidth("2%"),
  },
  checkboxLabel: {
    color: Colors.font,
    fontFamily: "headers",
    fontWeight: "bold",
    textAlign: "left",
  },
  checkboxRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    marginHorizontal: 25,
    alignItems: "center",
  },
  checkboxText: {
    color: Colors.font,
    fontFamily: "headers",
    fontSize: 16,
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: Colors.primary,
    width: isWeb() ? globalWidth("20%") : globalWidth("50%"),
    marginTop: 25,
    borderRadius: 10,
    marginBottom: 25,
    alignSelf: "center",
  },
  titleStyle: {
    color: "white",
    fontFamily: "headers",
  },
});

export default AddProductScreen;
