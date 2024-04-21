import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader";
import numberWithComa from "../../components/helpers/numberWithComa";

import * as authActions from "../../store/auth/authActions";
import * as productActions from "../../store/products/productsActions";
import * as suppliersActions from "../../store/suppliers/suppliersActions";
import * as businessActions from "../../store/business/businessActions";
import * as purchaseActions from "../../store/purchases/purchaseActions";

import DropWithButton from "../../components/DropWithButton";
import { globalWidth } from "../../constants/globalWidth";
import Colors from "../../constants/Colors";
import OrdersCreation from "./OrdersCreation";

const AddPurchase = (props) => {
  const { changePurchaseNav } = props;

  const { products } = useSelector((state) => state.products);
  const { suppliers } = useSelector((state) => state.suppliers);
  const { busiessesDetails } = useSelector((state) => state.business);

  const [productIsLoading, setProductIsLoading] = useState(false);
  const [supplierIsLoading, setSupplierIsLoading] = useState(false);
  const [businessIsLoading, setBusinessIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [suppliersList, setSuppliersList] = useState([]);
  const [order, setOrder] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [totalBill, setTotalBill] = useState(null);
  const [orderIsLoading, setOrderIsLoading] = useState(false);

  const dispatch = useDispatch();

  //=========================================================GET USER BACK========================================================

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let storedUserDetails = window.localStorage.getItem("userDetails");

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

  // ==============================================GETTING BUSINESS DETAILS========================================================

  useEffect(() => {
    setBusinessIsLoading(true);
    setLoadingMessage("Getting Business Details");
    dispatch(businessActions.getBusinessesDetails()).then(() => {
      setBusinessIsLoading(false);
      setLoadingMessage("");
    });
  }, [dispatch]);

  // =======================================================GETTING SUPPLIER LIST========================================================

  useEffect(() => {
    setSupplierIsLoading(true);
    setLoadingMessage("Getting Suppliers List");
    dispatch(suppliersActions.getSuppliers()).then(() => {
      setSupplierIsLoading(false);
      setLoadingMessage("");
    });
  }, [dispatch]);

  useEffect(() => {
    if (suppliers && suppliers.length > 0) {
      const suppliersList = suppliers.map((supplier) => {
        return {
          label: supplier.supplierName,
          value: supplier._id,
        };
      });

      setSuppliersList(suppliersList);
    }
  }, [suppliers]);

  // =======================================================HANDLE TOTAL BILL ========================================================

  useEffect(() => {
    const total = order.map((a) => a.totalValue);
    const totalBill = total.reduce((a, b) => a + b, 0);

    setTotalBill(totalBill);
  }, [order]);

  // =================================================GETTING PRODUCTS LIST========================================================

  useEffect(() => {
    setProductIsLoading(true);
    setLoadingMessage("Getting Products List");
    dispatch(productActions.getBusinessProducts()).then(() => {
      setProductIsLoading(false);
      setLoadingMessage("");
    });
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      const productsList = products.map((product) => {
        return {
          label: product.productNickName,
          value: product._id,
        };
      });

      setProductsList(productsList);
    }
  }, [products]);

  const submit = () => {
    setOrderIsLoading(true);
    dispatch(purchaseActions.addPurchase(order, supplier, totalBill)).then(
      () => {
        setOrderIsLoading(false);
        changePurchaseNav();
      }
    );
  };

  // ===============================================RENDERING=======================================================================

  if (productIsLoading || supplierIsLoading || businessIsLoading) {
    return <Loader center loadingMessage={loadingMessage} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ width: globalWidth("16%") }}>
          <DropWithButton
            list={suppliersList}
            buttonTitle="Select Supplier"
            getSelection={setSupplier}
            isOpened={setIsOpened}
            width={globalWidth("15%")}
            rounded
          />
        </View>
        <View
          style={{
            width: globalWidth("25%"),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.total}>
            Total :{" "}
            <Text style={styles.colored}>
              {" "}
              {numberWithComa(parseFloat(totalBill).toFixed(2))}{" "}
            </Text>{" "}
            {busiessesDetails &&
              busiessesDetails.length > 0 &&
              busiessesDetails[0].currencySymbol}
          </Text>
        </View>
      </View>
      <OrdersCreation
        onSubmit={submit}
        productsList={productsList}
        setOrder={setOrder}
        products={products}
        submitIsLoading={orderIsLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: globalWidth("2%"),
  },
  headerRow: {
    width: globalWidth("45%"),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  total: {
    fontSize: globalWidth("1.5%"),
    fontFamily: "HelveticaNeue",
    fontStyle: "italic",
  },
  colored: {
    color: Colors.primary,
  },
});

export const AddPurchaseOptions = (navData) => {
  return {
    headerTitle: "AddPurchase",
  };
};

export default AddPurchase;
