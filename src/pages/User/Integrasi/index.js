import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, BackHandler } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; // Import modul LinearGradient
import { colors } from "../../../constant/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Integration = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const handleBerhak = () => {
    navigation.navigate("berhak");
  };
  const handleBebas = () => {
    navigation.navigate("bebas");
  };
  const handleUnduh = () => {
    navigation.navigate("unduh-syarat");
  };

  return (
    <LinearGradient // Tambahkan LinearGradient sebagai kontainer utama
      colors={['#52a8de', '#4682d4', '#195DBA']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Integrasi</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.DOMINAN_COLOR_DANGER }]} onPress={handleBebas}>
          {/* <FontAwesome name="plus" size={20} color="white" style={styles.icon} /> */}
          <Text style={styles.buttonText}>Daftar WBP Bebas Murni</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.DOMINAN_COLOR_SUCCESS }]} onPress={handleBerhak}>
          {/* <FontAwesome name="plus" size={20} color="white" style={styles.icon} /> */}
          <Text style={styles.buttonText}>Daftar WBP Berhak Mengajukan PB/CB</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.BUTTON_ORANGE }]} onPress={handleUnduh}>
          {/* <FontAwesome name="plus" size={20} color="white" style={styles.icon} /> */}
          <Text style={styles.buttonText}>Unduh Syarat PB/CB</Text>
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

export default Integration;
