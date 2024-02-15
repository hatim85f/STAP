import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { View, Text, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Button, CheckBox } from "react-native-elements";
import Colors from "../../constants/Colors";
import * as Progress from "react-native-progress";
import { globalHeight, globalWidth } from "../../constants/globalWidth";
import { Platform } from "react-native";
import { isTablet, isWeb } from "../../constants/device";

const UploadImage = (props) => {
  const { imageName, getURL, disabled, subFolder } = props;
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(null);

  const handleImgePcik = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        await uploadImageToServer(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImageToServer = async (image) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const metadata = {
      contentType: "image/jpeg",
    };

    const storage = getStorage();
    const storageRef = ref(storage, subFolder + imageName);
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(progress);

        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        console.log(error);
        if (error.code === "storage/unauthorized") {
          return;
        }
        if (error.code === "storage/canceled") {
          return;
        }

        if (error.code === "storage/unknown") {
          return;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          getURL(downloadURL);
        });
      }
    );
  };
  return (
    <View style={styles.container}>
      <CheckBox
        center
        title={selectedImage ? "Click to Replace Image" : "Click to Add Image"}
        iconRight
        iconType="material"
        checkedIcon="clear"
        uncheckedIcon="add"
        checkedColor="red"
        checked={selectedImage}
        onPress={handleImgePcik}
        disabled={disabled}
      />

      <Text style={styles.note}>Accepting Only JPEG or PNG files</Text>
      <Progress.Bar
        progress={parseFloat(progress / 100)}
        width={
          props.width
            ? props.width
            : isWeb()
            ? globalWidth("40%")
            : globalWidth("90%")
        }
        height={globalHeight("1.5%")}
        color={Colors.primary}
        style={{
          borderRadius: 50,
          borderWidth: 0,
          marginTop: globalHeight("1.5%"),
          alignSelf: "center",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    textAlign: "center",
    fontFamily: "headers",
    fontSize: isWeb()
      ? globalWidth("1.2%")
      : isTablet()
      ? globalWidth("2%")
      : globalWidth("3.5%"),
    color: Colors.font,
    marginTop: 15,
  },
});

export default UploadImage;
