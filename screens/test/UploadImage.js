import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Button } from "react-native-elements";

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        // uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadToServer = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", selectedImage, true);
      xhr.send(null);
    });

    const metadata = {
      contentType: "image/jpeg",
    };

    const storage = getStorage();
    const storageRef = ref(storage, "images/" + "businessLogo");
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log("Upload is " + progress + "% done");

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
        });
      }
    );
  };

  return (
    <View>
      <Text>uploadToServer</Text>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <View style={{ height: 50 }} />
      <Button title="Pick Image" onPress={handleImageUpload} />
      <View style={{ height: 50 }} />
      <Button title="Upload Image" onPress={uploadToServer} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default UploadImage;
