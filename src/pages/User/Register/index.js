import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../../../components/ErrorText";
import CustomButton from "../../../components/CustomButton";
import { colors } from "../../../constant/colors";
import AuthManager from "../../../services/AuthManager"; 

function RegisterForm({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
    emailVisibility: true,
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const { values, isValid, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (isValid) {
        try {
          // Melakukan otentikasi dengan AuthManager
          await AuthManager.authenticate();

          const { email, username, name, phoneNumber, password, emailVisibility } = values;

          // Memanggil fungsi createAccount dari AuthManager
          await AuthManager.pb.collection("users").create({
            username,
            email,
            name,
            phoneNumber,
            password,
            passwordConfirm,
            emailVisibility,
          });

          alert("Registrasi Sukses");

          navigation.navigate("login");
        } catch (error) {
          console.error(error);
          alert("Registration Failed");
        }
      } else {
        alert("Registration Failed");
      }
    },
    validationSchema: SignupSchema,
  });

  const {
    email,
    username,
    name,
    phoneNumber,
    password,
    passwordConfirm,
    emailVisibility
  } = values;

  return (
      <LinearGradient
        colors={['#DF2935', '#DF2935', '#DF2935']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
      <View style={styles.container}>
        <Text style={styles.text}>Register</Text>
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]}
          placeholder="Email"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("email")}
          value={email}
        />
        <ErrorText text={errors.email} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]}
          placeholder="Username"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("username")}
          value={username}
        />
        <ErrorText text={errors.username} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]}
          placeholder="Name"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("name")}
          value={name}
        />
        <ErrorText text={errors.name} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]}
          keyboardType="phone-pad"
          placeholder="Phone Number"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("phoneNumber")}
          value={phoneNumber}
        />
        <ErrorText text={errors.phoneNumber} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]}
          secureTextEntry={!showPassword}
          placeholder="Password"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("password")}
          value={password}
        />
        <ErrorText text={errors.password} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]}
          secureTextEntry={!showConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("passwordConfirm")}
          value={passwordConfirm}
        />
        <ErrorText text={errors.passwordConfirm} />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={!isValid}
          >
          <Text style={styles.buttonText}>Registrasi</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  button: {
    backgroundColor: colors.WHITE,
    paddingVertical: 13,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: colors.DOMINAN_COLOR,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default RegisterForm;
