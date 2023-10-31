import React, { useState, useEffect, useMemo } from "react";
import { Platform, StyleSheet, Text, View, Pressable } from "react-native";
import { Button, CheckBox, Header } from "react-native-elements";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
  Foundation,
  AntDesign,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MenuButton from "../../components/webComponents/menu/MenuButton";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import HeaderText from "../../components/HeaderText";
import MainInput from "../../components/MainInput";
import Card from "../../components/Card";
import UploadImage from "../../components/helpers/UploadImages";
import Loader from "../../components/Loader";
import Colors from "../../constants/Colors";

import * as productsActions from "../../store/products/productsActions";
import * as authActions from "../../store/auth/authActions";
import numberWithComa from "../../components/helpers/numberWithComa";
import { isWeb } from "../../constants/device";

const EditProductScreen = (props) => {
  const { productId, businessId } = props.route.params;

  const { products } = useSelector((state) => state.products);

  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productNickName, setProductNickName] = useState("");
  const [costPrice, setCostPrice] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [maximumDiscount, setMaximumDiscount] = useState(0);
  const [minimumDiscount, setMinimumDiscount] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // returning user back in if he refreshes the page
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
          dispatch(authActions.getUserIn(parsedUserDetails));
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  // getting the products of the business
  useEffect(() => {
    dispatch(productsActions.getBusinessProducts(businessId));
  }, [businessId, dispatch]);

  // getting the product that is needed to be edited
  useEffect(() => {
    const product = products.find((product) => product._id === productId);
    if (product) {
      setProductType(product.productType);
      setProductName(product.productName);
      setProductNickName(product.productNickName);
      setCostPrice(product.costPrice);
      setRetailPrice(product.retailPrice);
      setSellingPrice(product.sellingPrice);
      setDescription(product.description);
      setImageUrl(product.imageURL);
      setMaximumDiscount(product.maximumDiscount);
      setMinimumDiscount(product.minimumDiscount);
      setCategory(product.category ? product.category : "");
      setQuantity(product.quantity ? product.quantity : 0);
    }

    return () => {
      console.log("cleaned up");
    };
  }, [productId, products]);

  const handleSubmitForm = () => {
    setIsLoading(true);
    dispatch(
      productsActions.editProduct(
        productId,
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
        quantity
      )
    ).then(() => {
      setIsLoading(false);
      dispatch(productsActions.getBusinessProducts(businessId));
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
      <Pressable
        onPress={() => props.navigation.navigate("main_products_nav")}
        style={styles.touchable}
      >
        <AntDesign name="arrowleft" size={35} color={Colors.primary} />
      </Pressable>
      <HeaderText
        style={{ alignSelf: "center" }}
        text={`Editing ${productName}`}
      />
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
            value={numberWithComa(costPrice)}
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
            value={numberWithComa(retailPrice)}
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
            value={numberWithComa(sellingPrice)}
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
          <MainInput
            label="Available Qunatity"
            style={styles.input}
            value={numberWithComa(quantity)}
            onChangeText={(text) => setQuantity(text)}
            rightIcon={() => (
              <MaterialCommunityIcons
                name="numeric"
                size={24}
                color={Colors.font}
              />
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
            value={numberWithComa(maximumDiscount)}
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
            value={numberWithComa(minimumDiscount)}
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
    width: Platform.OS === "web" ? "50%" : "95%",
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
    paddingHorizontal:
      Platform.OS === "web" ? globalHeight("0.5%") : globalWidth("2%"),
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
    width: Platform.OS === "web" ? globalWidth("20%") : globalWidth("50%"),
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

export default EditProductScreen;
