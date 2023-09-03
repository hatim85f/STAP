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
import { Avatar } from "react-native-elements";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import numberWithComma from "../helpers/numberWithComa";
import { Dimensions } from "react-native";
import Card from "../Card";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Alert } from "react-native";
import Loader from "../Loader";

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
  }, [selectedCategories]);

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
        showsHorizontalScrollIndicator={Platform.OS === "web" ? true : false}
        contentContainerStyle={{
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: 10,
          height: Platform.isPad
            ? globalHeight("13%")
            : Platform.OS === "web"
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
            style={[
              {
                backgroundColor: selectedCategories.includes(category)
                  ? Colors.font
                  : "white",
                borderWidth: selectedCategories.includes(category) ? 1 : 0,
              },
              styles.categoriesBtn,
            ]}
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
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => editItem(item._id)}
                style={{
                  alignItems: "flex-end",
                  marginBottom: 5,
                  cursor: "pointer",
                }}
              >
                <Feather name="edit" size={24} color={Colors.font} />
              </TouchableOpacity>
              <Card style={styles.card}>
                <View style={styles.mainRow}>
                  <View style={{ width: "20%" }}>
                    <Image
                      source={{ uri: item.imageURL }}
                      style={styles.image}
                    />
                  </View>
                  <View style={{ width: "30%" }}>
                    <Text style={styles.title}>{item.productNickName}</Text>
                  </View>
                  <View style={{ width: "30%" }}>
                    <Text style={styles.title}>
                      {" "}
                      Price :{" "}
                      <Text style={styles.numbers}>
                        {numberWithComma(item.sellingPrice)}
                      </Text>{" "}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteItem(item._id, item.productName)}
                    style={{ cursor: "pointer" }}
                  >
                    <MaterialCommunityIcons
                      name="delete-sweep"
                      size={
                        Platform.OS === "web"
                          ? globalWidth("4%")
                          : Platform.isPad
                          ? globalWidth("6%")
                          : globalWidth("8%")
                      }
                      color="#ff0055"
                      style={{ marginRight: 5 }}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.description}> {item.description} </Text>
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
  },
  itemContainer: {
    borderBottomColor: Colors.font,
    borderBottomWidth: 1,
    width: Platform.OS === "web" ? globalWidth("80%") : globalWidth("90%"),
    marginTop: 10,
    padding: 3,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  title: {
    fontSize:
      Platform.OS === "web"
        ? globalWidth("1.5%")
        : Platform.isPad
        ? globalWidth("3%")
        : isTablet()
        ? globalWidth("2.5%")
        : globalWidth("4%"),
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
    fontSize:
      Platform.OS === "web"
        ? globalWidth("1.5%")
        : Platform.isPad
        ? globalWidth("3%")
        : isTablet()
        ? globalWidth("2.5%")
        : globalWidth("4%"),
    color: "#000",
  },
  card: {
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    height: Platform.OS === "web" ? globalWidth("10%") : globalWidth("10%"),
    width: Platform.OS === "web" ? globalWidth("8.8%") : globalWidth("12.5%"),
    marginLeft: 5,
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
    width: Platform.OS === "web" ? globalWidth("20%") : globalWidth("40%"),
    height: Platform.OS === "web" ? globalWidth("3%") : globalWidth("10%"),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize:
      Platform.OS === "web"
        ? globalWidth("1.5%")
        : Platform.isPad
        ? globalWidth("3%")
        : isTablet()
        ? globalWidth("2.5%")
        : globalWidth("4%"),
    fontFamily: "headers",
  },
});

export default ProductsShow;
