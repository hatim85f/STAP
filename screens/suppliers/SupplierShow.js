import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../../constants/globalWidth";

import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";

import * as supplierActions from "../../store/suppliers/suppliersActions";

const SupplierShow = (props) => {
  const { supplier } = props;

  const [supplierName, setSupplierName] = useState("");
  const [editSupplierName, setEditSupplierName] = useState(false);
  const [supplierEmail, setSupplierEmail] = useState("");
  const [editSupplierEmail, setEditSupplierEmail] = useState(false);
  const [supplierPhone, setSupplierPhone] = useState("");
  const [editSupplierPhone, setEditSupplierPhone] = useState(false);
  const [supplierAddress, setSupplierAddress] = useState("");
  const [editSupplierAddress, setEditSupplierAddress] = useState(false);
  const [supplierCity, setSupplierCity] = useState("");
  const [editSupplierCity, setEditSupplierCity] = useState(false);
  const [contactPerson, setContactPerson] = useState("");
  const [editContactPerson, setEditContactPerson] = useState(false);
  const [contactPersonPhone, setContactPersonPhone] = useState("");
  const [editContactPersonPhone, setEditContactPersonPhone] = useState(false);
  const [contactPersonEmail, setContactPersonEmail] = useState("");
  const [editContactPersonEmail, setEditContactPersonEmail] = useState(false);
  const [paymentPeriod, setPaymentPeriod] = useState("");
  const [editPaymentPeriod, setEditPaymentPeriod] = useState(false);
  const [currency, setCurrency] = useState("");
  const [editCurrency, setEditCurrency] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [editIsLoading, setEditIsLoading] = useState(false);

  useEffect(() => {
    if (supplier) {
      setSupplierName(supplier.supplierName);
      setSupplierEmail(supplier.supplierEmail);
      setSupplierPhone(supplier.supplierPhone);
      setSupplierAddress(supplier.supplierAddress);
      setSupplierCity(supplier.supplierCity);
      setContactPerson(supplier.contactPerson);
      setContactPersonPhone(supplier.contactPersonPhone);
      setContactPersonEmail(supplier.contactPersonEmail);
      setPaymentPeriod(supplier.paymentPeriod);
      setCurrency(supplier.currency);
    }
  }, [supplier]);

  const dispatch = useDispatch();

  const deleteSupplier = () => {
    setDeleteIsLoading(true);
    dispatch(supplierActions.deleteSupplier(supplier._id)).then(() => {
      setDeleteIsloading(false);
    });
  };

  const editSupplier = () => {
    setEditIsLoading(true);
    dispatch(
      supplierActions.editSupplier(
        supplier._id,
        supplierName,
        supplierEmail,
        supplierPhone,
        supplierAddress,
        supplierCity,
        contactPerson,
        contactPersonPhone,
        contactPersonEmail,
        paymentPeriod,
        currency
      )
    ).then(() => {
      setEditIsLoading(false);
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.smallRow, { width: "70%", alignSelf: "center" }]}>
        <FontAwesome
          name="building"
          size={globalWidth("1.5%")}
          style={{ alignSelf: "center" }}
          color="black"
        />
        {editSupplierName ? (
          <Input
            placeholder="Supplier Name"
            value={supplierName}
            onChangeText={(text) => setSupplierName(text)}
            style={styles.title}
            containerStyle={styles.inputContainer}
          />
        ) : (
          <Text style={[styles.title, { textAlign: "center" }]}>
            {" "}
            {supplierName}{" "}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => setEditSupplierName(!editSupplierName)}
        >
          <Feather name="edit" size={globalWidth("1.5%")} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.smallRow}>
        <FontAwesome5
          name="envelope"
          size={globalWidth("1.5%")}
          style={{ alignSelf: "center" }}
          color="black"
        />
        {editSupplierEmail ? (
          <Input
            placeholder="Supplier Email"
            value={supplierEmail}
            onChangeText={(text) => setSupplierEmail(text)}
            style={styles.title}
            containerStyle={styles.inputContainer}
          />
        ) : (
          <Text style={styles.title}> {supplierEmail} </Text>
        )}
        <TouchableOpacity
          onPress={() => setEditSupplierEmail(!editSupplierEmail)}
        >
          <Feather name="edit" size={globalWidth("1.5%")} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.smallRow}>
        <FontAwesome5
          name="phone"
          size={globalWidth("1.5%")}
          style={{ alignSelf: "center" }}
          color="black"
        />
        {editSupplierPhone ? (
          <Input
            placeholder="Supplier Phone"
            value={supplierPhone}
            onChangeText={(text) => setSupplierPhone(text)}
            style={styles.title}
            containerStyle={styles.inputContainer}
          />
        ) : (
          <Text style={styles.title}> {supplierPhone} </Text>
        )}
        <TouchableOpacity
          onPress={() => setEditSupplierPhone(!editSupplierPhone)}
        >
          <Feather name="edit" size={globalWidth("1.5%")} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.smallRow}>
        <FontAwesome5
          name="address-card"
          size={globalWidth("1.5%")}
          style={{ alignSelf: "center" }}
          color="black"
        />
        {editSupplierAddress ? (
          <Input
            placeholder="Supplier Address"
            value={supplierAddress}
            onChangeText={(text) => setSupplierAddress(text)}
            style={styles.title}
            containerStyle={styles.inputContainer}
          />
        ) : (
          <Text style={styles.title}> {supplierAddress} </Text>
        )}
        <TouchableOpacity
          onPress={() => setEditSupplierAddress(!editSupplierAddress)}
        >
          <Feather name="edit" size={globalWidth("1.5%")} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.smallRow}>
        <FontAwesome5
          name="city"
          size={globalWidth("1.5%")}
          style={{ alignSelf: "center" }}
          color="black"
        />
        {editSupplierCity ? (
          <Input
            placeholder="Supplier City"
            value={supplierCity}
            onChangeText={(text) => setSupplierCity(text)}
            style={styles.title}
            containerStyle={styles.inputContainer}
          />
        ) : (
          <Text style={styles.title}> {supplierCity} </Text>
        )}
        <TouchableOpacity
          onPress={() => setEditSupplierCity(!editSupplierCity)}
        >
          <Feather name="edit" size={globalWidth("1.5%")} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.smallRow}>
        <FontAwesome5
          name="user"
          size={globalWidth("1.5%")}
          style={{ alignSelf: "center" }}
          color="black"
        />
        {editContactPerson ? (
          <Input
            placeholder="Contact Person"
            value={contactPerson}
            onChangeText={(text) => setContactPerson(text)}
            style={styles.title}
            containerStyle={styles.inputContainer}
          />
        ) : (
          <Text style={styles.title}> {contactPerson} </Text>
        )}
        <TouchableOpacity
          onPress={() => setEditContactPerson(!editContactPerson)}
        >
          <Feather name="edit" size={globalWidth("1.5%")} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.smallRow}>
        <FontAwesome5
          name="phone"
          size={globalWidth("1.5%")}
          style={{ alignSelf: "center" }}
          color="black"
        />
        {editContactPersonPhone ? (
          <Input
            placeholder="Contact Person Phone"
            value={contactPersonPhone}
            onChangeText={(text) => setContactPersonPhone(text)}
            style={styles.title}
            containerStyle={styles.inputContainer}
          />
        ) : (
          <Text style={styles.title}> {contactPersonPhone} </Text>
        )}
        <TouchableOpacity
          onPress={() => setEditContactPersonPhone(!editContactPersonPhone)}
        >
          <Feather name="edit" size={globalWidth("1.5%")} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.smallRow}>
        <FontAwesome5
          name="envelope"
          size={globalWidth("1.5%")}
          style={{ alignSelf: "center" }}
          color="black"
        />
        {editContactPersonEmail ? (
          <Input
            placeholder="Contact Person Email"
            value={contactPersonEmail}
            onChangeText={(text) => setContactPersonEmail(text)}
            style={styles.title}
            containerStyle={styles.inputContainer}
          />
        ) : (
          <Text style={styles.title}> {contactPersonEmail} </Text>
        )}
        <TouchableOpacity
          onPress={() => setEditContactPersonEmail(!editContactPersonEmail)}
        >
          <Feather name="edit" size={globalWidth("1.5%")} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.smallRow}>
        <FontAwesome5
          name="money-check-alt"
          size={globalWidth("1.5%")}
          style={{ alignSelf: "center" }}
          color="black"
        />
        {editPaymentPeriod ? (
          <Input
            placeholder="Payment Period"
            value={paymentPeriod}
            onChangeText={(text) => setPaymentPeriod(text)}
            style={styles.title}
            containerStyle={styles.inputContainer}
          />
        ) : (
          <Text style={styles.title}> {paymentPeriod} </Text>
        )}
        <TouchableOpacity
          onPress={() => setEditPaymentPeriod(!editPaymentPeriod)}
        >
          <Feather name="edit" size={globalWidth("1.5%")} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.smallRow}>
        <FontAwesome5
          name="money-bill-wave"
          size={globalWidth("1.5%")}
          style={{ alignSelf: "center" }}
          color="black"
        />
        {editCurrency ? (
          <Input
            placeholder="Currency"
            value={currency}
            onChangeText={(text) => setCurrency(text)}
            style={styles.title}
            containerStyle={styles.inputContainer}
          />
        ) : (
          <Text style={styles.title}> {currency} </Text>
        )}
        <TouchableOpacity onPress={() => setEditCurrency(!editCurrency)}>
          <Feather name="edit" size={globalWidth("1.5%")} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsRow}>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            title="  Edit Supplier  "
            loading={editIsLoading}
            onPress={editSupplier}
            titleStyle={styles.buttonTitle}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={[styles.button, { backgroundColor: "#ff0055" }]}
            title="Delete Supplier"
            loading={deleteIsLoading}
            onPress={deleteSupplier}
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: globalWidth("25%"),
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderColor: "black",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  smallRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
    marginVertical: globalHeight("1%"),
  },
  title: {
    fontSize: globalWidth("1%"),
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    width: "80%",
  },
  inputContainer: {
    maxWidth: "70%",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: globalHeight("2%"),
  },
  button: {
    width: "100%",
    borderRadius: 5,
  },
});

export default SupplierShow;
