import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
} from "react-native";
import { globalWidth } from "../../constants/globalWidth";
import Card from "../Card";

const AddProduct = (props) => {
  const { openModal, closeModal } = props;
  return (
    <Modal visible={openModal} animationType="slide">
      <View style={styles.innerContainer}>
        <Card style={styles.container}>
          <Pressable onPress={closeModal} style={{ height: 500 }}>
            <Text style={styles.cancel}>Cancel</Text>
            <Text style={styles.cancel}>Cancel</Text>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    width: Platform.OS === "web" ? globalWidth("50%") : globalWidth("95%"),
    alignSelf: "center",
    borderWidth: Platform.OS === "web" ? 0 : 2,
    borderRadius: Platform.OS === "web" ? 10 : 25,
  },
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    width: Platform.OS === "web" ? globalWidth("50%") : globalWidth("95%"),
    alignSelf: "center",
    borderWidth: Platform.OS === "web" ? 0 : 2,
    borderRadius: Platform.OS === "web" ? 10 : 25,
  },
});

export default AddProduct;
