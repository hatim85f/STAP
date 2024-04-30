import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { Button, CheckBox, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { isTablet } from "../../constants/device";

import * as clientsActions from "../../store/clients/clientsActions";
import * as productsActions from "../../store/products/productsActions";
import * as ordersActions from "../../store/orders/ordersActions";
import * as authActions from "../../store/auth/authActions";

import DropPicker from "../../components/DropPicker";
import Colors from "../../constants/Colors";
import numberWithComa from "../../components/helpers/numberWithComa";

import { mainLink } from "../../store/mainLink";
import RevisionModal from "./RevisionModal";
import DropDownPicker from "react-native-dropdown-picker";
import MenuButton from "../../components/webComponents/menu/MenuButton";
import OrderDetails from "./OrderDetails";
import Loader from "../../components/Loader";
import ItemCreation from "./ItemCreation";
import OrdersTabBar from "../../components/tabBar/OrdersTabBar";

const OrderCreationScreen = (props) => {
  const { clients } = useSelector((state) => state.clients);
  const { user, token } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);

  //   =======================================================STATE MANAGEMENT===================================================
  const [clientsList, setClientsList] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [listIsOpened, setListIsOpened] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [productIsOpened, setProductIsOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [bonusIsOpened, setBonusIsOpened] = useState(false);
  // const [selectedBonus, setSelectedBonus] = useState("");
  const [availableIndex, setAvailableIndex] = useState(null);
  const [reviseOrder, setReviseOrder] = useState(false);
  const [totalValue, setTotalValue] = useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [addDetails, setAddDetails] = useState(false);
  const [loadingClients, setLoadingClients] = useState(false);
  const [addVAT, setAddVAT] = useState(false);

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

  //   ===========================================GETT CLIENTS LIST TO SELECT FOR THE ORDER =====================================

  useEffect(() => {
    setLoadingClients(true);
    dispatch(clientsActions.getClients()).then(() => {
      setLoadingClients(false);
    });
  }, [dispatch]);

  useEffect(() => {
    const clientsList =
      clients &&
      clients.map((client) => {
        return {
          label: client.clientName,
          value: client._id,
        };
      });

    setClientsList(clientsList);
  }, [clients]);

  useEffect(() => {
    dispatch(productsActions.getBusinessProducts());
  }, [dispatch]);

  //   ===========================================CREATE A NEW ORDER AND GET THE ID =====================================

  const createNewOrder = async () => {
    setIsLoading(true);
    const response = await fetch(`${mainLink}/api/orders/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        clientId: clientId,
      }),
    });

    const resData = await response.json();
    setOrderId(resData.orderId);
    setIsLoading(false);
  };

  // ======================================================ADDING PRODUCTS TO THE ORDER =====================================

  // prepare product list for the drop down picker
  useEffect(() => {
    const productsList =
      products &&
      products.map((product) => {
        return {
          label: product.productName,
          value: product._id,
        };
      });

    setProductsList(productsList);
  }, [products]);

  const addProductToOrder = (productId) => {
    setSelectedProduct(productId);

    // check if the same product is already in the order set available index to the index of the product in the order list
    const availableIndex = orderList.findIndex(
      (order) => order.productId === productId
    );
    if (availableIndex !== -1) {
      setAvailableIndex(availableIndex);
      return;
    }

    const product = products.find((product) => product._id === productId);

    setOrderList((prevOrderList) => {
      const newOrderList = prevOrderList.concat({
        productId: productId,
        quantity: 0,
        productName: product?.productNickName,
        price: product?.sellingPrice,
        total: 0,
        image: product?.imageURL,
        bonusValue: 0,
        currency: product?.currencySymbol,
        bonusType: "",
        businessId: product?.businessId,
      });

      return newOrderList;
    });

    handleFocusOnNewlyAddedItem();
  };

  const handleFocusOnNewlyAddedItem = () => {
    setAvailableIndex(orderList.length - 1);
    setProductIsOpened(false);
  };

  // changing quantity of the product
  const addQuantity = (index, qty) => {
    if (availableIndex === index) {
      setAvailableIndex(null);
    }

    setOrderList((prevOrderList) => {
      const newOrderList = [...prevOrderList];
      newOrderList[index].quantity = +qty;
      newOrderList[index].total = qty * newOrderList[index].price;

      const totalValue = newOrderList.reduce((acc, order) => {
        return acc + order.total;
      }, 0);

      setTotalValue(totalValue);

      return newOrderList;
    });
  };

  // change bonus value of the product
  const changeBonus = (index, bonus) => {
    setOrderList((prevOrderList) => {
      const newOrderList = [...prevOrderList];
      newOrderList[index].bonusValue = +bonus;

      if (newOrderList[index].bonusType === "Value") {
        newOrderList[index].total =
          newOrderList[index].quantity * newOrderList[index].price -
          newOrderList[index].bonusValue;
      }

      return newOrderList;
    });
  };

  // change bonus type of the product
  const changeBonusType = (index, bonusType) => {
    let newOrderList = [...orderList];
    newOrderList[index].bonusType = bonusType;
    setOrderList(newOrderList.map((x) => x));
  };

  // delete product from the order
  const deleteItem = (index) => {
    setOrderList((prevOrderList) => {
      const newOrderList = [...prevOrderList];
      newOrderList.splice(index, 1);

      return newOrderList;
    });
  };

  // change price of the product
  const changePrice = (index, price) => {
    setOrderList((prevOrderList) => {
      const newOrderList = [...prevOrderList];
      newOrderList[index].price = +price;
      newOrderList[index].total = newOrderList[index].quantity * +price;

      return newOrderList;
    });
  };

  // ========================================================CANCELLING ORDER================================================

  const deleteOrder = () => {
    setDeleteIsLoading(true);
    dispatch(ordersActions.deleteOrder(orderId)).then(() => {
      setOrderId(null);
      setOrderList([]);
      setTotalValue(null);
      setSelectedProduct(null);
      setClientId(null);
      setDeleteIsLoading(false);
    });
  };

  // ===================================================HANDLING LOADING=======================================================

  if (loadingClients) {
    return <Loader loadingMessage="Loading Clients..." center />;
  }

  //   =======================================================RETURNED JSX===================================================

  return (
    <View style={styles.container}>
      <MenuButton navigation={props.navigation} />
      {!orderId && (
        <DropPicker
          list={clientsList}
          placeholder="Select a Client"
          valueSelected={(data) => setClientId(data)}
          showingValue={clientId}
          isOpened={(data) => setListIsOpened(data)}
        />
      )}
      {clientId && !orderId && !listIsOpened && (
        <View style={styles.loadingContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <Button
              title="Create Order"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              onPress={createNewOrder}
            />
          )}
        </View>
      )}
      {orderId && (
        <View style={styles.orderDetails}>
          <Text style={styles.header}>Order Number</Text>
          <Text style={styles.orderNumber}>{orderId}</Text>
        </View>
      )}
      {orderId && !addDetails && (
        <DropDownPicker
          open={productIsOpened}
          value={selectedProduct}
          items={productsList}
          setOpen={setProductIsOpened}
          setValue={setSelectedProduct}
          onChangeValue={(value) => addProductToOrder(value)}
          placeholder="Select an item"
          placeholderStyle={{ color: "#6a6b6c" }}
          style={styles.listStyle}
          textStyle={styles.dropText}
          dropDownContainerStyle={styles.dropListStyle}
        />
      )}
      <View style={{ flex: 1 }}>
        {orderList.length > 0 && totalValue > 0 && (
          <Text style={[styles.orderValue, { textAlign: "center" }]}>
            Order Value :{" "}
            {numberWithComa(addVAT ? totalValue * 1.05 : totalValue)}{" "}
            {orderList[0].currency}
          </Text>
        )}
      </View>
      {!addDetails && orderId && !productIsOpened && (
        <OrderDetails
          orderList={orderList}
          addDetails={() => setAddDetails(true)}
          deleteItem={(index) => deleteItem(index)}
        />
      )}
      {orderList.length > 0 && addDetails && (
        <View style={styles.orderItemsContainer}>
          <View style={[styles.partContainer, { height: globalHeight("60%") }]}>
            <ItemCreation
              orderList={orderList}
              changePrice={(index, price) => changePrice(index, price)}
              addQuantity={(index, qty) => addQuantity(index, qty)}
              changeBonus={(index, bonus) => changeBonus(index, bonus)}
              changeBonusType={(index, bonusType) =>
                changeBonusType(index, bonusType)
              }
              deleteItem={(index) => deleteItem(index)}
              productsList={productsList}
              productIsOpened={productIsOpened}
              availableIndex={availableIndex}
              setAvailableIndex={setAvailableIndex}
            />
          </View>
          <View style={styles.partContainer}>
            <RevisionModal
              orderList={orderList}
              orderId={orderId}
              client={clients?.find((client) => client._id === clientId)}
              getVatStatus={setAddVAT}
              cancelRevision={() => console.log("Cancel")}
              clearOrder={() => {
                setClientId(null);
                setOrderId(null);
                setOrderList([]);
                setTotalValue(null);
                setSelectedProduct(null);
                setAddDetails(false);
              }}
            />
          </View>
        </View>
      )}

      {orderId && (
        <View style={styles.buttonRow}>
          {deleteIsLoading ? (
            <View
              style={{
                width: globalWidth("40%"),
                marginBottom: globalHeight("2%"),
              }}
            >
              <ActivityIndicator size="large" color="#ff0055" />
            </View>
          ) : (
            <Button
              title="Cancel Order"
              buttonStyle={[styles.cancelButton, { width: globalWidth("25%") }]}
              titleStyle={styles.buttonTitle}
              onPress={deleteOrder}
            />
          )}
        </View>
      )}
      <OrdersTabBar route="order_creation" navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: "40%",
    alignSelf: "center",
    // marginTop: globalHeight("7%"),
  },
  loadingContainer: {
    marginTop: globalHeight("8%"),
  },
  orderDetails: {
    marginTop: globalHeight("2%"),
  },
  header: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
    color: Colors.font,
  },
  orderNumber: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: globalWidth("1.2%"),
    color: Colors.primary,
  },
  cancelButton: {
    backgroundColor: "#ff0055",
    borderRadius: 10,
    width: globalWidth("40%"),
    alignSelf: "center",
    marginBottom: globalHeight("2%"),
  },
  buttonRow: {
    alignItems: "flex-start",
    marginBottom: globalHeight("5%"),
    paddingLeft: globalWidth("8%"),
  },
  listStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "60%",
    alignSelf: "center",
    borderWidth: 0,
    height: globalWidth("3.5%"),
    zIndex: 100,
    borderWidth: 1.5,
    borderColor: "#6a6b6c",
    marginBottom: 40,
    marginTop: globalHeight("2%"),
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
    width: "60%",
    alignSelf: "center",
    zIndex: 1000,
    elevation: 10,
  },
  orderItemsContainer: {
    // flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 0,
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
    // width: "80%",
    // alignSelf: "center",
    // height: "100%",
  },
  orderValue: {
    fontFamily: "numbers",
    color: Colors.font,
    fontSize: globalWidth("1.2%"),
  },
  partContainer: {
    width: "48%",
    marginHorizontal: "1%",
    height: globalHeight("100%"),
    paddingHorizontal: "1%",
    // flex: 1,
  },
});

export default OrderCreationScreen;
