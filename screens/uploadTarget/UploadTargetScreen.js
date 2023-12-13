import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

import MenuButton from "../../components/webComponents/menu/MenuButton";
import Loader from "../../components/Loader";
import DropDownPicker from "react-native-dropdown-picker";
import TableComp from "../../components/TableComp";
import BackButton from "../../components/BackButton";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import ManualDrop from "../../components/manualDrop/ManualDrop";
import numberWithComa from "../../components/helpers/numberWithComa";

import * as authActions from "../../store/auth/authActions";
import * as productsActions from "../../store/products/productsActions";
import * as targetActions from "../../store/target/targetActions";

const UploadTargetScreen = (props) => {
  const { products } = useSelector((state) => state.products);
  const { phasing } = useSelector((state) => state.target);

  // ================================ STATE MANAGEMENT ====================================
  const [isLoading, setIsLoading] = useState(false);
  const [productsTable, setProductsTable] = useState([]);
  const [phasingList, setPhasingList] = useState([]);
  const [startPeriod, setStartPeriod] = useState(new Date().toISOString());
  const [loadingMessage, setLoadingMessage] = useState("Getting Products Data");
  const [totalTargetValue, setTotalTargetValue] = useState(0);

  // ===================================GETTING USER BACK ====================================
  const dispatch = useDispatch();

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

  // =================================================GETTING PRODUCTS DATA========================================

  useEffect(() => {
    setIsLoading(true);
    dispatch(targetActions.getPhasing());
    dispatch(productsActions.getBusinessProducts()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  // get products details
  // get phasing data if there is
  // get target data if there is
  // show table thing while the user can change the values inside that table

  console.log("products:", products);

  // ===============================================ARRANGING FOR TABLE=======================================

  const header = [
    "SN",
    "Product Logo",
    "Product Name",
    "Cost Price",
    "Target Units",
    "Target Type",
    "Has Phasing ?",
    "Phasing",
    "Target Value",
  ];

  useEffect(() => {
    const itemsProductsList = products.map((product, index) => {
      return {
        sn: index + 1,
        productId: product._id,
        productLogo: product.imageURL,
        productName: product.productNickName,
        costPrice: product.costPrice,
        startPeriod: "",
        targetUnits: 0,
        targetType: "",
        hasPhasing: false,
        phasing: "",
        phasingData: "",
        targetValue: 0,
        businessId: product.businessId,
      };
    });

    setProductsTable(itemsProductsList);
  }, [products]);

  const widthArr = [
    globalWidth("3%"),
    globalWidth("8%"),
    globalWidth("12.8%"),
    globalWidth("8%"),
    globalWidth("8%"),
    globalWidth("12%"),
    globalWidth("10%"),
    globalWidth("15%"),
    globalWidth("8%"),
  ];

  const targetTypes = [
    { label: "Monthly", value: "Monthly" },
    { label: "Quarterly", value: "Quarterly" },
    { label: "Yearly", value: "Yearly" },
    { label: "Bulk", value: "Bulk" },
  ];

  useEffect(() => {
    const phasingList = phasing.map((phase) => {
      return {
        label: phase.phasingName,
        value: phase.phasingName,
      };
    });

    setPhasingList(phasingList);
  }, [phasing]);

  const changeTargetType = (index, value) => {
    let newProductsTable = [...productsTable];
    newProductsTable[index].targetType = value;

    setProductsTable(newProductsTable);
  };

  const hasPhasingList = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  // ====================================================CHANGEING DETAILS====================================

  const changeTargetUnits = (index, value) => {
    let newProductsTable = [...productsTable];
    newProductsTable[index].targetUnits = +value;

    newProductsTable[index].targetValue =
      value * newProductsTable[index].costPrice;

    setProductsTable(newProductsTable);
  };

  const changeCostPrice = (index, value) => {
    let newProductsTable = [...productsTable];
    newProductsTable[index].costPrice = +value;

    setProductsTable(newProductsTable);
  };

  const changeHasPhasing = (index, value) => {
    let newProductsTable = [...productsTable];
    newProductsTable[index].hasPhasing = value;

    setProductsTable(newProductsTable);
  };

  const changePhasingData = (index, value) => {
    let newProductsTable = [...productsTable];
    const phasingData = phasing.find((phase) => phase.phasingName === value);
    newProductsTable[index].phasingData = phasingData._id;

    setProductsTable(newProductsTable);
  };

  useEffect(() => {
    const totalValue = productsTable.reduce((acc, product) => {
      return acc + product.targetValue;
    }, 0);

    setTotalTargetValue(totalValue);
  }, [productsTable]);

  // =============================================SUBMITTING==================================================

  const submit = () => {
    setIsLoading(true);
    setLoadingMessage("Uploading Target");

    const targetPromises = productsTable.map((product) => {
      if (product.targetUnits > 0) {
        return dispatch(
          targetActions.addTarget(
            product.productId,
            product.businessId,
            product.targetUnits,
            product.costPrice,
            product.targetType,
            product.hasPhasing,
            product.phasingData,
            startPeriod
          )
        );
      }
    });

    // Wait for all promises to resolve
    Promise.all(targetPromises)
      .then(() => {
        setIsLoading(false);
        props.navigation.navigate("target_show");
      })
      .catch((error) => {
        console.error("Error uploading targets:", error);
        setIsLoading(false);
      });
  };

  // ==============================================RETURN=====================================================

  if (isLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <MenuButton navigation={props.navigation} />
        <BackButton route="/target/target-show" />
        <View style={styles.dateSelectioncontainer}>
          <Text style={styles.header}>Start Period</Text>
          <input
            type="date"
            onChange={(date) => setStartPeriod(new Date(date.target.value))}
            style={styles.dateContainer}
          />
        </View>
        <ScrollView
          scrollEnabled={true}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 15,
            width: globalWidth("85%"),
            alignSelf: "center",
            height: globalHeight("70%"),
          }}
        >
          <View>
            <TableComp
              tableHead={header}
              widthArr={widthArr}
              showTotal
              totalData={[
                "",
                "Total",
                "",
                "",
                "",
                "",
                "",
                "",
                numberWithComa(+totalTargetValue),
              ]}
              data={productsTable.map((product, index) => {
                return [
                  index + 1,
                  <Image
                    source={{ uri: product.productLogo }}
                    style={styles.image}
                  />,
                  product.productName,
                  <Input
                    value={product.costPrice}
                    onChangeText={(text) => changeCostPrice(index, text)}
                    style={[styles.input, { fontSize: globalWidth("0.8%") }]}
                    inputStyle={{
                      textAlign: "center",
                      fontSize: globalWidth("0.8%"),
                    }}
                    containerStyle={{ width: globalWidth("8%") }}
                    keyboardType="numeric"
                  />,

                  <Input
                    placeholder="Set Target"
                    onChangeText={(text) => changeTargetUnits(index, text)}
                    style={[styles.input, { fontSize: globalWidth("0.8%") }]}
                    inputStyle={{
                      textAlign: "center",
                      fontSize: globalWidth("0.8%"),
                    }}
                    containerStyle={{ width: globalWidth("8%") }}
                    keyboardType="numeric"
                  />,
                  <ManualDrop
                    list={targetTypes}
                    placeholder="Select Target Type"
                    getSelectedValue={(data) => changeTargetType(index, data)}
                    top={4}
                  />,
                  <ManualDrop
                    list={hasPhasingList}
                    placeholder="Select"
                    getSelectedValue={(data) => changeHasPhasing(index, data)}
                    top={7}
                  />,
                  <ManualDrop
                    list={phasingList}
                    placeholder="Select Phasing"
                    getSelectedValue={(data) => changePhasingData(index, data)}
                    top={3.5}
                  />,
                  product.targetValue > 0
                    ? numberWithComa(+product.targetValue)
                    : 0,
                ];
              })}
            />
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button
          title="Submit"
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          onPress={submit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    width: globalWidth("90%"),
    alignSelf: "center",
  },
  image: {
    width: globalWidth("3%"),
    height: globalWidth("3%"),
    alignSelf: "center",
    borderRadius: globalWidth("1.5%"),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: globalWidth("18%"),
  },
  input: {
    width: globalWidth("2.5%"),
    height: globalWidth("2.5%"),
    fontSize: globalWidth("0.8%"),
    fontFamily: "headers",
    textAlign: "center",
  },
  dropContainerStyle: {
    width: globalWidth("15%"),
    height: globalWidth("5%"),
    fontSize: globalWidth("0.8%"),
    fontFamily: "headers",
    textAlign: "center",
  },
  dropListStyle: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: Colors.primary,
    width: Platform.OS === "web" ? "80%" : "95%",
    alignSelf: "center",
    zIndex: 1000,
    elevation: 10,
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
  dateContainer: {
    backgroundColor: Colors.lightBG,
    outline: "none",
    border: "none",
    width: "90%",
    alignSelf: "center",
    height: "70%",
    borderRadius: 10,
    textAlign: "center",
    fontSize: globalWidth("0.8%"),
    fontFamily: "headers",
    color: Colors.font,
    borderWidth: 1,
    borderColor: Colors.font,
    height: globalHeight("4%"),
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: globalWidth("15%"),
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonTitle: {
    fontFamily: "headers",
    fontSize: globalWidth("1%"),
    color: "white",
  },
  dateSelectioncontainer: {
    width: globalWidth("30%"),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: globalHeight("2%"),
  },
  header: {
    fontSize: globalWidth("1%"),
    fontFamily: "headers",
    color: Colors.font,
    marginBottom: 5,
  },
});

export const UploadTargetScreenOptions = (navData) => {
  return {
    headerTitle: "UploadTargetScreen",
  };
};

export default UploadTargetScreen;
