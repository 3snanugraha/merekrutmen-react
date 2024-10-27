import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import ErrorText from "../../../components/ErrorText";
import { colors } from "../../../constant/colors";
import AuthManager from "../../../services/AuthManager";
import { MaterialIcons } from "@expo/vector-icons";

function Profile({ navigation }) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    name: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    profile_photo: null,
    cv: null,
  });

  const ProfileSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postal_code: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
    cv: Yup.mixed().required("CV is required"),
  });

  const fetchUserData = async () => {
    try {
      const isAuthenticated = AuthManager.pb.authStore.isValid;
      if (!isAuthenticated) {
        console.log("User not authenticated");
        return;
      }

      const userId = AuthManager.pb.authStore.model.id;
      const user = await AuthManager.pb.collection("users").getOne(userId);
      setUserData({
        username: user.username,
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        postal_code: user.postal_code || "",
        country: user.country || "",
        profile_photo: user.profile_photo || null,
        cv: user.cv || null,
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleProfilePhotoChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled && result.assets[0].fileSize <= 1 * 1024 * 1024) {
      setUserData({ ...userData, profile_photo: result.assets[0].uri });
    } else {
      alert("Image size should be under 1 MB.");
    }
  };

  const handleCVUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
    if (result.size <= 2 * 1024 * 1024) {
      setUserData({ ...userData, cv: result.uri });
    } else {
      alert("File size should be under 2 MB and in PDF format.");
    }
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: userData,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await AuthManager.pb.collection("users").update(AuthManager.pb.authStore.model.id, {
          username: values.username,
          email: values.email,
          name: values.name,
          phoneNumber: values.phoneNumber,
          address: values.address,
          city: values.city,
          state: values.state,
          postal_code: values.postal_code,
          country: values.country,
          profile_photo: values.profile_photo,
          cv: values.cv,
        });
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Update failed", error);
        alert("Failed to update profile");
      }
    },
    validationSchema: ProfileSchema,
  });

  const handleLogout = async () => {
    await AuthManager.pb.authStore.clear();
    navigation.navigate("login");
  };

  return (
    <LinearGradient 
      colors={["#DF2935", "#DF2935", "#DF2935"]} 
      start={[0, 0]} 
      end={[1, 1]} 
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleProfilePhotoChange}>
            <Image
              source={
                userData.profile_photo 
                  ? { uri: userData.profile_photo } 
                  : require("../../../../assets/logome.png")
              }
              style={styles.profilePhoto}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Data Diri</Text>

          {Object.keys(values).map((key) => {
            if (key !== "profile_photo" && key !== "cv") {
              return (
                <View key={key} style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                    placeholderTextColor="darkgray"
                    onChangeText={handleChange(key)}
                    value={values[key]}
                  />
                  <ErrorText text={errors[key]} style={{ color: "white" }} />
                </View>
              );
            }
            return null;
          })}

          <TouchableOpacity onPress={handleCVUpload} style={styles.buttonUploadCV}>
            <View style={styles.uploadContainer}>
              <MaterialIcons name="attach-file" size={24} color="black" />
              <Text style={styles.uploadText}>Upload CV</Text>
            </View>
          </TouchableOpacity>
          <ErrorText text={errors.cv} style={{ color: "white" }} />

          <ErrorText text={errors.cv} style={{ color: "white" }} />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    alignSelf: "stretch",
    paddingHorizontal: 20,
    marginBottom: 2,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: "white",
    color: "black",
  },
  buttonUploadCV: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    width: "90%",
    paddingHorizontal: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.DOMINAN_COLOR,
    fontWeight: "bold",
  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    marginLeft: 10,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});



export default Profile;