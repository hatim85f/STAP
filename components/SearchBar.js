import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { globalHeight, globalWidth } from "../constants/globalWidth";
import * as authActions from "../store/auth/authActions";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { isWeb } from "../constants/device";

const SearchBar = (props) => {
  const { user, token } = useSelector((state) => state.auth);

  const [isAm, setIsAm] = useState(true);
  const [time, setTime] = useState(new Date());
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = () => {
      const userDetails = window.localStorage.getItem("userDetails");
      const parsedUserDetails = JSON.parse(userDetails);

      if (parsedUserDetails.user) {
        dispatch(authActions.getUserIn(parsedUserDetails));
      }
    };

    if (!token) {
      fetchUserDetails();
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const hours = time.getHours();

  const amPm = hours >= 12 ? "PM" : "AM";

  useEffect(() => {
    if (amPm === "AM") {
      setIsAm(true);
    } else {
      setIsAm(false);
    }
  }, [amPm]);

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>
          {isAm ? "Good Morning" : "Good Evening"}
        </Text>
        <Text style={styles.name}>{user && user.userName}</Text>
      </View>
      <View style={styles.search}>
        <View style={styles.innerSearch}>
          <Input
            placeholder="Search"
            leftIcon={{ type: "font-awesome", name: "search" }}
            style={{ width: "100%" }}
            onChangeText={(text) => setSearchText(text)}
            inputStyle={{
              fontSize: globalWidth("1.2%"),
              fontFamily: "headers",
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.notification} onPress={() => {}}>
        <FontAwesome name="bell" size={globalWidth("2%")} color="#000" />
      </TouchableOpacity>
      <View style={styles.profile}>
        <Avatar
          avatarStyle={styles.avatar}
          source={{ uri: user && user.profilePicture }}
          size={globalWidth("4%")}
          rounded
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: isWeb() ? globalWidth("60%") : globalWidth("90%"),
    borderRadius: 10,
    borderColor: "#6a6b6c",
    borderWidth: 1,
    height: globalHeight("10%"),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  greeting: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  greetingText: {
    fontFamily: "headers",
    fontSize: globalWidth("1.8%"),
  },
  name: {
    fontFamily: "headers",
    fontSize: globalWidth("1%"),
    textAlign: "center",
    color: "#6a6b6c",
  },
  search: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  innerSearch: {
    backgroundColor: "#f4f4f4",
    width: "100%",
    borderRadius: 10,
  },
  notification: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "10%",
    cursor: "pointer",
  },
  profile: {
    justifyContent: "center",
  },
});

export default SearchBar;
