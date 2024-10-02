import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../../../components/ErrorText";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import { colors } from "../../../constant/colors";
import AuthManager from "../../../services/AuthManager"; 

function Visitor({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const initialValues = {
    tanggal: "",
    waktu: "",
    namaPengunjung: "",
    noKTP: "",
    alamat: "",
    noHP: "",
    namaWBPYangDikunjungi: "",
    hubunganDenganWBP: "",
    jenisBarang:"",
    junlah:"",
  };

  const SignupSchema = Yup.object().shape({
    tanggal: Yup.string().required("Tanggal dan Waktu is required"),
    waktu: Yup.string().required("Tanggal dan Waktu is required"),
    namaPengunjung: Yup.string().required("Nama Pengunjung is required"),
    noKTP: Yup.string().required("No. KTP is required"),
    alamat: Yup.string().required("Alamat is required"),
    noHP: Yup.string().required("No. HP is required"),
    namaWBPYangDikunjungi: Yup.string().required(
      "Nama WBP Yang Dikunjungi is required"
    ),
    hubunganDenganWBP: Yup.string().required("Hubungan Dengan WBP is required"),
  });

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Set showDatePicker kembali ke false
    if (selectedDate) {
      setDate(selectedDate);
      handleChange("tanggal")(selectedDate.toDateString());
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false); // Set showTimePicker kembali ke false
    if (selectedTime) {
      const selectedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );
      setDate(selectedDateTime);
      handleChange("waktu")(selectedDateTime.toTimeString());
    }
  };

  const { values, isValid, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (isValid) {
        try {
          // Melakukan otentikasi dengan AuthManager
          await AuthManager.authenticate();

          // Jika otentikasi berhasil, simpan data kunjungan
          await AuthManager.pb.collection("kunjungan").create(values);

          Alert.alert('Alert', 'Data berhasil dikirim.');

          resetForm();

          navigation.navigate("dashboard");
        } catch (error) {
          alert(error);
        }
      } else {
        alert("Gagal Daftar Kunjungan");
      }
    },
    validationSchema: SignupSchema,
  });

  const {
    tanggal,
    waktu,
    namaPengunjung,
    noKTP,
    alamat,
    noHP,
    namaWBPYangDikunjungi,
    hubunganDenganWBP,
    jenisBarang,
    jumlah,
  } = values;

  return (
    <LinearGradient
        colors={['#52a8de', '#4682d4', '#195DBA']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.text}>Formulir Pendaftaran</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{date.toDateString()}</Text>
            <FontAwesome
              name="calendar"
              size={20}
              color="black"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <ErrorText text={errors.tanggal} />
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{date.toTimeString()}</Text>
            <FontAwesome
              name="clock-o"
              size={20}
              color="black"
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}
        <ErrorText text={errors.waktu} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]} // Mengubah warna teks
          placeholder="Nama Pengunjung"
          placeholderTextColor={colors.DOMINAN_COLOR} // Mengubah warna placeholder
          onChangeText={handleChange("namaPengunjung")}
          value={namaPengunjung}
        />
        <ErrorText text={errors.namaPengunjung} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]} // Mengubah warna teks
          placeholder="No. KTP"
          placeholderTextColor={colors.DOMINAN_COLOR} // Mengubah warna placeholder
          onChangeText={handleChange("noKTP")}
          value={noKTP}
        />
        <ErrorText text={errors.noKTP} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]} // Mengubah warna teks
          placeholder="Alamat"
          placeholderTextColor={colors.DOMINAN_COLOR} // Mengubah warna placeholder
          onChangeText={handleChange("alamat")}
          value={alamat}
        />
        <ErrorText text={errors.alamat} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]} // Mengubah warna teks
          keyboardType="phone-pad"
          placeholder="No. HP"
          placeholderTextColor={colors.DOMINAN_COLOR} // Mengubah warna placeholder
          onChangeText={handleChange("noHP")}
          value={noHP}
        />
        <ErrorText text={errors.noHP} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]} // Mengubah warna teks
          placeholder="Nama WBP Yang Dikunjungi"
          placeholderTextColor={colors.DOMINAN_COLOR} // Mengubah warna placeholder
          onChangeText={handleChange("namaWBPYangDikunjungi")}
          value={namaWBPYangDikunjungi}
        />
        <ErrorText text={errors.namaWBPYangDikunjungi} />
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]} // Mengubah warna teks
          placeholder="Hubungan Dengan WBP"
          placeholderTextColor={colors.DOMINAN_COLOR} // Mengubah warna placeholder
          onChangeText={handleChange("hubunganDenganWBP")}
          value={hubunganDenganWBP}
        />
        <ErrorText text={errors.hubunganDenganWBP} />
        <Text style={styles.text2}>Titipan Barang</Text>

        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]} // Mengubah warna teks
          placeholder="Jenis Barang"
          placeholderTextColor={colors.DOMINAN_COLOR} // Mengubah warna placeholder
          onChangeText={handleChange("jenisBarang")}
          value={jenisBarang}
        />
        <ErrorText/>
        <TextInput
          style={[styles.input, { color: colors.DOMINAN_COLOR }]} // Mengubah warna teks
          placeholder="Jumlah Barang / Uang"
          placeholderTextColor={colors.DOMINAN_COLOR} // Mengubah warna placeholder
          onChangeText={handleChange("jumlah")}
          value={jumlah}
        />
        <ErrorText/>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
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
  text2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
});

export default Visitor;
