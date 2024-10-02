import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../../../components/ErrorText";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "../../../constant/colors";
import AuthManager from "../../../services/AuthManager";

function Complaint({ navigation }) {
  const initialValues = {
    namaPengadu: "",
    noKTP: "",
    alamat: "",
    noHP: "",
    hubunganDenganWBP: "",
    deskripsiKeluhan: "",
  };

  const SignupSchema = Yup.object().shape({
    namaPengadu: Yup.string().required("Nama Pengadu is required"),
    noKTP: Yup.string().required("No. KTP is required"),
    alamat: Yup.string().required("Alamat is required"),
    noHP: Yup.string().required("No. HP is required"),
    hubunganDenganWBP: Yup.string().required("Hubungan Dengan WBP is required"),
    deskripsiKeluhan: Yup.string().required("Deskripsi Keluhan is required"),
  });

  const { values, isValid, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (isValid) {
        try {
          // Melakukan otentikasi DB dengan AuthManager (API Admin only)
          await AuthManager.authenticate();

          // Jika otentikasi berhasil, simpan data pengaduan
          await AuthManager.pb.collection("pengaduan").create(values);

          alert("Aduan berhasil dikirim.");

          resetForm();

          navigation.navigate("dashboard");
        } catch (error) {
          alert("Complaint Failed");
          console.error(error);
        }
      } else {
        alert("Complaint Failed");
      }
    },
    validationSchema: SignupSchema,
  });

  const {
    namaPengadu,
    noKTP,
    alamat,
    noHP,
    hubunganDenganWBP,
    deskripsiKeluhan,
  } = values;

  return (
    <LinearGradient
      colors={['#52a8de', '#4682d4', '#195DBA']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Formulir Pengaduan</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Pengadu"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("namaPengadu")}
          value={namaPengadu}
        />
        <ErrorText text={errors.namaPengadu} />
        <TextInput
          style={styles.input}
          placeholder="No. KTP"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("noKTP")}
          value={noKTP}
        />
        <ErrorText text={errors.noKTP} />
        <TextInput
          style={styles.input}
          placeholder="Alamat"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("alamat")}
          value={alamat}
        />
        <ErrorText text={errors.alamat} />
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="No. HP"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("noHP")}
          value={noHP}
        />
        <ErrorText text={errors.noHP} />
        <TextInput
          style={styles.input}
          placeholder="Hubungan Dengan WBP"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("hubunganDenganWBP")}
          value={hubunganDenganWBP}
        />
        <ErrorText text={errors.hubunganDenganWBP} />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Deskripsi Keluhan"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("deskripsiKeluhan")}
          value={deskripsiKeluhan}
          multiline
        />
        <ErrorText text={errors.deskripsiKeluhan} />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Submit</Text>
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
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  input: {
    width: "80%",
    padding: 9,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "white",
    color: colors.DOMINAN_COLOR,
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
  textArea: {
    height: 150,
    textAlignVertical: "top",
  },
});

export default Complaint;
