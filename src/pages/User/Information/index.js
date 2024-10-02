import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; // Import modul LinearGradient
import { colors } from "../../../constant/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Infomation = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const handlePengumuman = () => {
    navigation.navigate("information-pengumuman");
  };

  const handleAlur = () => {
    navigation.navigate("information-alur");
  };

  const handleKunjungan = () => {
    navigation.navigate("information-kunjungan");
  };
  return (
    <LinearGradient // Tambahkan LinearGradient sebagai kontainer utama
      colors={['#52a8de', '#4682d4', '#195DBA']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Informasi</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.DOMINAN_COLOR_DANGER }]}
          onPress={handlePengumuman}
        >
          {/* <FontAwesome name="plus" size={20} color="white" style={styles.icon} /> */}
          <Text style={styles.buttonText}>Pengumuman</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.DOMINAN_COLOR_SUCCESS }]}
          onPress={handleKunjungan}
        >
          {/* <FontAwesome name="plus" size={20} color="white" style={styles.icon} /> */}
          <Text style={styles.buttonText}>Layanan Kunjungan </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.ORANGE }]}
          onPress={handleAlur}
        >
          {/* <FontAwesome name="plus" size={20} color="white" style={styles.icon} /> */}
          <Text style={styles.buttonText}>Alur Integrasi WBP</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Hapus warna latar belakang
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  button: {
    width: "60%",
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
});

export default Infomation;
