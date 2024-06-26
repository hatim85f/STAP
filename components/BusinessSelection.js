import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import * as businessActions from "../store/business/businessActions";
import DropDownPicker from "react-native-dropdown-picker";
import { Platform } from "react-native";
import { Image } from "react-native";
import { globalWidth } from "../constants/globalWidth";

import Colors from "../constants/Colors";
import { isWeb } from "../constants/device";

const BusinessSelection = (props) => {
  const { getOpen } = props;

  const { token } = useSelector((state) => state.auth);
  const { business } = useSelector((state) => state.business);

  const [open, setOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessValue, setBusinessValue] = useState(null);
  const [businessLogo, setBusinessLogo] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.getOpen) {
      props.getOpen(open);
    }
  }, [open]);

  useEffect(() => {
    if (token) {
      dispatch(businessActions.getUserBusiness());
    }
  }, [dispatch, token]);

  // preparing list for selection
  const businessList = useMemo(() => {
    const list = [{ label: "All", value: null, businessLogo: null }];
    business &&
      business.length > 0 &&
      business.map((item) => {
        list.push({
          label: item.business.businessName,
          value: item.business._id,
          logo: item.business.businessLogo,
        });
      });
    return list;
  }, [business]);

  // getting business value then find the selected business to show in list placeholder

  useEffect(() => {
    if (businessValue) {
      const selected = business.find(
        (item) => item.business._id === businessValue
      );
      setSelectedBusiness(selected.business.businessName);
      setBusinessLogo(selected.business.businessLogo);
    } else {
      setSelectedBusiness("All");
      setBusinessLogo("");
    }
  }, [businessValue]);

  // getting business Products upon selecting a business

  useEffect(() => {
    props.getBusinessId(businessValue);
    props.getSelectedBusiness(selectedBusiness);
  }, [businessValue, selectedBusiness]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <DropDownPicker
          open={open}
          value={businessValue}
          items={businessList}
          setOpen={setOpen}
          setValue={setBusinessValue}
          setItems={setBusinessValue}
          placeholder="Select Business"
          placeholderStyle={{ color: "#6a6b6c" }}
          style={styles.listStyle}
          textStyle={styles.dropText}
          dropDownContainerStyle={styles.dropListStyle}
        />
        {businessLogo.length > 0 && businessLogo && props.showLogo && (
          <Image source={{ uri: businessLogo }} style={styles.image} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    zIndex: 100,
  },
  innerContainer: {
    width: isWeb() ? "75%" : "95%",
    marginTop: 10,
    alignItems: "center",
  },
  listStyle: {
    backgroundColor: "white",
    borderRadius: 10,
    width: isWeb() ? "80%" : "95%",
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
    fontSize: isWeb() ? globalWidth("1.1%") : globalWidth("3.5%"),
  },
  dropListStyle: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: Colors.primary,
    width: isWeb() ? "80%" : "95%",
    alignSelf: "center",
    zIndex: 10000,
  },
  image: {
    width: 120,
    height: 120,
    zIndex: -100,
    borderRadius: 60,
    borderWidth: 2.5,
    borderColor: "#6a6b6c",
    marginTop: 15,
  },
  notes: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: 24,
  },
});

export default BusinessSelection;
