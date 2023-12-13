import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import * as productsActions from "../../store/products/productsActions";
import { useDispatch, useSelector } from "react-redux";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Image } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import numberWithComma from "../helpers/numberWithComa";
import { Dimensions } from "react-native";
import Card from "../Card";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Alert } from "react-native";
import Loader from "../Loader";
import { isWeb } from "../../constants/device";

const isTablet = () => {
  const { width, height } = Dimensions.get("window");
  if (Platform.OS === "ios") {
    return width > 768 && height > 1024;
  } else if (Platform.OS === "android") {
    return width > 500 && height > 700;
  }
  return false; // Default case
};

const ProductsShow = (props) => {
  const { products, businessId } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [neededProducts, setNeededProducts] = useState([]);

  const dispatch = useDispatch();

  // getting all business Products
  const getProducts = () => {
    dispatch(productsActions.getBusinessProducts(businessId));
  };

  // deleting a product
  const deleteItem = (id, productName) => {
    setIsLoading(true);
    if (Platform.OS === "web") {
      if (confirm(`Are you sure you want to delete ${productName}`)) {
        dispatch(productsActions.deleteItem(id));
      }
    } else {
      Alert.alert(
        "Delete Product",
        `Are you sure you want to delete ${productName}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => dispatch(productsActions.deleteItem(id)),
            style: "destructive",
          },
        ],
        { cancelable: false }
      );
    }
    getProducts();
    setIsLoading(false);
  };

  // editing itms
  const editItem = (id) => {
    props.navigation.navigate("edit_product", {
      productId: id,
      businessId,
    });
  };

  // getting all categories to show in filter
  useEffect(() => {
    const categories = products.map((product) => product.category);
    const uniqueCategories = [...new Set(categories)];

    setCategories(uniqueCategories);
  }, [products]);

  // showing product as per category selected
  useEffect(() => {
    const neededProducts = products.filter((product) =>
      selectedCategories.includes(product.category)
    );

    if (neededProducts.length > 0) {
      setNeededProducts(neededProducts);
    } else {
      setNeededProducts(products);
    }
  }, [selectedCategories, products]);

  if (isLoading) {
    return <Loader center />;
  }

  return (
    <View style={styles.container}>
      {/* will display a horizontal scrollable list of all categories as filter */}
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        horizontal={true}
        showsHorizontalScrollIndicator={isWeb() ? true : false}
        contentContainerStyle={{
          minWidth: globalWidth("90%"),
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: 10,
          height: isTablet()
            ? globalHeight("13%")
            : isWeb()
            ? globalHeight("8%")
            : globalHeight("6%"),
        }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => {
              if (selectedCategories.includes(category)) {
                setSelectedCategories(
                  selectedCategories.filter((cat) => cat !== category)
                );
              } else {
                setSelectedCategories([...selectedCategories, category]);
              }
            }}
            style={{
              ...styles.categoriesBtn,
              ...{
                backgroundColor: selectedCategories.includes(category)
                  ? Colors.font
                  : "white",
                borderWidth: selectedCategories.includes(category) ? 0 : 1,
              },
            }}
          >
            <Text
              style={[
                {
                  color: selectedCategories.includes(category)
                    ? "white"
                    : Colors.font,
                },
                styles.buttonText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={neededProducts}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        style={{ minWidth: "80%" }}
        numColumns={4}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => editItem(item._id)}
                style={{
                  alignItems: "flex-end",
                  cursor: "pointer",
                }}
              >
                <Feather name="edit" size={24} color={Colors.font} />
              </TouchableOpacity>
              <Card style={styles.card}>
                <View style={styles.mainRow}>
                  <View style={{ width: "20%", alignItems: "center" }}>
                    <Image
                      source={{ uri: item.imageURL }}
                      style={styles.image}
                    />
                  </View>
                  <Text
                    style={[styles.title, { marginTop: globalHeight("2%") }]}
                  >
                    {item.productNickName}
                  </Text>
                  <View style={{ width: "80%" }}>
                    <Text
                      style={[
                        styles.title,
                        { textAlign: "center", color: "#000", marginTop: 10 },
                      ]}
                    >
                      {" "}
                      Price :{" "}
                      <Text style={styles.numbers}>
                        {numberWithComma(
                          item.sellingPrice ? item.sellingPrice : 0
                        )}
                      </Text>{" "}
                      <Text style={styles.code}>{item.currencyCode}</Text>
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: "flex-end",
                    flex: 1,
                  }}
                >
                  <Text style={styles.description}>{item.description}</Text>
                  <TouchableOpacity
                    onPress={() => deleteItem(item._id, item.productName)}
                    style={{
                      cursor: "pointer",
                      alignItems: "flex-end",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete-sweep"
                      size={
                        isWeb()
                          ? globalWidth("2.2%")
                          : isTablet()
                          ? globalWidth("6%")
                          : globalWidth("8%")
                      }
                      color="#ff0055"
                      style={{ marginRight: 5 }}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={[styles.title, { textAlign: "center", marginTop: 10 }]}
                >
                  {" "}
                  Availability:{" "}
                  {numberWithComma(item.quantity ? item.quantity : 0)}{" "}
                </Text>
                <View style={styles.lowerView}>
                  <Image
                    source={{ uri: item.businessLogo }}
                    style={[
                      styles.image,
                      {
                        width: globalWidth("3%"),
                        height: globalWidth("3%"),
                        borderRadius: globalWidth("1.5%"),
                      },
                    ]}
                  />
                  <Text style={[styles.title, { marginLeft: 10 }]}>
                    {item.businessName}
                  </Text>
                </View>
                <Button
                  buttonStyle={styles.addTargetBtn}
                  title="Add Target"
                  titleStyle={styles.addTargetBtnTitle}
                  onPress={() => {
                    window.location.href = `/target/target-add/${products.findIndex(
                      (a) => a._id === item._id
                    )}`;
                  }}
                />
              </Card>
            </View>
          );
        }}
      />
      <View style={{ height: 250 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: -100,
    alignItems: "center",
  },
  itemContainer: {
    borderBottomColor: Colors.font,
    borderBottomWidth: 1,
    width: isWeb() ? globalWidth("18%") : globalWidth("90%"),
    marginHorizontal: isWeb() ? globalWidth("1%") : globalWidth("5%"),
    marginTop: 10,
    padding: 3,
  },
  mainRow: {
    alignItems: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  title: {
    fontSize: isWeb()
      ? globalWidth("0.8%")
      : isTablet()
      ? globalWidth("3%")
      : isTablet()
      ? globalWidth("2.5%")
      : globalWidth("3.5%"),
    fontFamily: "headers",
    color: Colors.font,
  },
  numbers: {
    fontFamily: "numbers",
  },
  description: {
    marginTop: 10,
    textAlign: "center",
    marginBottom: 10,
    fontSize: globalWidth("1%"),
    color: "#000",
  },
  card: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    minHeight: globalHeight("55%"),
  },
  image: {
    height: globalWidth("7%"),
    width: globalWidth("7%"),
    borderRadius: globalWidth("3.5%"),
    borderColor: Colors.font,
    borderWidth: 1.5,
    // marginLeft: 5,
  },
  categoriesBtn: {
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    borderColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    width: isWeb() ? globalWidth("10%") : globalWidth("40%"),
    height: isWeb() ? globalWidth("3%") : globalWidth("10%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: isWeb()
      ? globalWidth("1.2%")
      : isTablet()
      ? globalWidth("3%")
      : isTablet()
      ? globalWidth("2.5%")
      : globalWidth("4%"),
    fontFamily: "headers",
  },
  lowerView: {
    borderTopColor: Colors.primary,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    padding: 10,
  },
  avatar: {
    marginRight: 10,
    borderColor: Colors.font,
    borderWidth: 1.5,
    width: globalWidth("3%"),
  },
  addTargetBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  addTargetBtnTitle: {
    fontFamily: "headers",
    fontSize: globalWidth("1%"),
    color: "white",
  },
});

export default ProductsShow;
