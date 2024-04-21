import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import BusinessSelection from "../BusinessSelection";

const BusinessAddition = (props) => {
  const { getBusinessId, getSelectedBusiness } = props;

  const [business, setBusiness] = useState(null);
  const [businessName, setBusinessName] = useState("");

  useEffect(() => {
    if (business) {
      getBusinessId(business);
    }
  }, [business]);

  useEffect(() => {
    if (businessName) {
      getSelectedBusiness(businessName);
    }
  }, [businessName]);

  return (
    <View style={styles.container}>
      <BusinessSelection
        getBusinessId={(businessId) => setBusiness(businessId)}
        getSelectedBusiness={(businessName) => setBusinessName(businessName)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  header: {},
});

export const BusinessAdditionOptions = (navData) => {
  return {
    headerTitle: "BusinessAddition",
  };
};

export default BusinessAddition;
