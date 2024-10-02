import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../../../components/ErrorText";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "../../../constant/colors";
import AuthManager from "../../../services/AuthManager"; 

function Titipan({ navigation }) {
  const initialValues = {
    namaPenitip: "",
    alamat: "",
    namaPenerima: "",
    jenisBarang: "",
    jumlahUang: "",
  };

  const SignupSchema = Yup.object().shape({
    namaPenitip: Yup.string().required("Nama Pengadu is required"),
    alamat: Yup.string().required("Alamat is required"),
    namaPenerima: Yup.string().required("Nama Penerima is required"),
    jenisBarang: Yup.string().required("Jenis Barang is required"),
    jumlahUang: Yup.string().required("Jumlah Uang is required"),
  });

  const formatCurrency = (value) => {
    // Menghilangkan karakter non-digit
    let val = value.replace(/[^\d]/g, '');
    // Mengubah string menjadi bilangan bulat
    val = parseInt(val);
    // Memastikan val bukan NaN
    if (!isNaN(val)) {
      // Mengubah bilangan bulat menjadi format mata uang
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return value;
  };

  const { values, isValid, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        // Melakukan otentikasi DB dengan AuthManager (API Admin only)
        await AuthManager.authenticate();
        
        // Jika autentikasi berhasil, lanjutkan dengan memasukkan data ke koleksi "titipan"
        await AuthManager.pb.collection("titipan").create(values);
        
        // Jika berhasil, tampilkan pesan sukses dan reset form
        alert("Data berhasil dikirim.", "Sukses");;
        resetForm();
        navigation.navigate("dashboard");
      } catch (error) {
        // Jika terjadi kesalahan, tangani dengan menampilkan pesan error
        alert("Operation Failed");
        console.error(error);
      }
    },
    validationSchema: SignupSchema,
  });

  const handleAmountChange = (value) => {
    // Mengubah nilai input menjadi format mata uang
    const formattedValue = formatCurrency(value);
    // Mengupdate nilai input jumlahUang
    handleChange("jumlahUang")(formattedValue);
  };

  const {
    namaPenitip,
    alamat,
    namaPenerima,
    jenisBarang,
    jumlahUang,
  } = values;

  return (
      <LinearGradient
        colors={['#52a8de', '#4682d4', '#195DBA']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
      <View style={styles.container}>
        <Text style={styles.text}>Formulir Titipan Barang</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama Penitip"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("namaPenitip")}
          value={namaPenitip}
        />
        <ErrorText text={errors.namaPenitip} />
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
          placeholder="Nama Penerima"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("namaPenerima")}
          value={namaPenerima}
        />
        <ErrorText text={errors.namaPenerima} />
        <TextInput
          style={styles.input}
          placeholder="Jenis Barang"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleChange("jenisBarang")}
          value={jenisBarang}
        />
        <ErrorText text={errors.jenisBarang} />
        <TextInput
          style={styles.input}
          placeholder="Jumlah Uang"
          keyboardType="numeric"
          placeholderTextColor={colors.DOMINAN_COLOR}
          onChangeText={handleAmountChange}
          value={jumlahUang} 
        />
        <ErrorText text={errors.jumlahUang} />

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
    marginTop: 30,
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

export default Titipan;
