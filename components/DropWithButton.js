import React, { useState, useEffect, useRef } from "react";
import { Animated, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { globalHeight, globalWidth } from "../constants/globalWidth";

const DropWithButton = (props) => {
  const { width, list, buttonTitle, getSelection, rounded, margin, isOpened } =
    props;

  const [selectedItem, setSelectedItem] = useState(null);
  const [usedListHeight, setUsedListHeight] = useState(0);

  const listHeight = useRef(new Animated.Value(0)).current;

  const openList = () => {
    if (usedListHeight > 0) {
      Animated.timing(listHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();

      setUsedListHeight(0);
      isOpened(false);
      return;
    } else {
      Animated.timing(listHeight, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      isOpened(true);
      setUsedListHeight(250);
    }
  };

  const closeList = (item) => {
    Animated.timing(listHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    isOpened(false);
    setUsedListHeight(0);
    setSelectedItem(item);
    getSelection(item.value);
  };

  return (
    <View
      style={[
        styles.container,
        { width: width, marginHorizontal: margin ? margin : 0 },
      ]}
    >
      <Button
        title={selectedItem ? selectedItem.label : buttonTitle}
        buttonStyle={[{ borderRadius: rounded ? 10 : 0 }, styles.buttonStyle]}
        titleStyle={styles.titleStyle}
        onPress={openList}
      />
      {list && list.length > 0 && (
        <Animated.View
          style={[
            styles.listMainContainer,
            {
              height: listHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 250],
              }),
              borderWidth: usedListHeight === 0 ? 0 : 1,
            },
          ]}
        >
          <FlatList
            data={list}
            style={{ maxHeight: 250 }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => closeList(item)}
                  key={index}
                  style={[
                    styles.listItem,
                    { borderBottomWidth: index === list.length - 1 ? 0 : 1 },
                  ]}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 100,
  },
  buttonStyle: {
    backgroundColor: "transparent",
    width: "100%",
    alignSelf: "center",
    borderColor: Colors.font,
    borderWidth: 1,
  },
  titleStyle: {
    fontFamily: "robotoRegular",
    color: Colors.font,
    fontSize: globalWidth("0.8%"),
    fontStyle: "italic",
  },
  listMainContainer: {
    borderColor: Colors.font,
    borderRadius: 10,
    flexGrow: 1,
  },
  listContainer: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: globalWidth("1%"),
    alignItems: "center",
  },
  listItem: {
    width: "100%",
    padding: globalWidth("0.5%"),
    alignItems: "center",
    borderBottomColor: Colors.font,
    borderBottomWidth: 1,
  },
});

export const DropWithButtonOptions = (navData) => {
  return {
    headerTitle: "DropWithButton",
  };
};

export default DropWithButton;

// <ScrollView
// scrollEnabled
// scrollEventThrottle={16}
// showsVerticalScrollIndicator={false}
// contentContainerStyle={[
//   {
//     flexGrow: 1,
//     justifyContent: "center",
//     maxHeight: 250,
//   },
// ]}
// >
// <View style={styles.listContainer}>
//   {list.map((a, i) => {
//     return (
//       <TouchableOpacity
//         onPress={() => closeList(a)}
//         key={i}
//         style={[
//           styles.listItem,
//           { borderBottomWidth: i === list.length - 1 ? 0 : 1 },
//         ]}
//       >
//         <Text>{a.label}</Text>
//       </TouchableOpacity>
//     );
//   })}
// </View>
// </ScrollView>
