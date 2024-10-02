import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  FlatList,
  Image,
  Linking,
  StatusBar,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "../../../constant/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AuthManager from "../../../services/AuthManager";

const Dashboard = ({ navigation }) => {
  const [images, setImages] = useState([]); // State untuk menyimpan daftar gambar hero

  const userData = useSelector((state) => state.user.userData);
  const Name = userData.record.name;
  const dispatch = useDispatch();
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);
  useEffect(() => {
    StatusBar.setBackgroundColor(colors.DOMINAN_COLOR);
    const fetchImages = async () => {
      try {
        await AuthManager.authenticate();
        const banners = await AuthManager.pb.collection("banner").getFullList({
          sort: 'created',
        });
        const fetchedImages = [];
        banners.forEach(item => {
          // Periksa apakah 'gambar' adalah array
          if (Array.isArray(item.gambar)) {
            item.gambar.forEach(image => {
              fetchedImages.push({ uri: `https://rutan-app.pockethost.io/api/files/${item.collectionId}/${item.id}/${image}` });
            });
          } else {
            // Jika 'gambar' bukan array, tambahkan saja satu gambar
            fetchedImages.push({ uri: `https://rutan-app.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.gambar}` });
          }
        });
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
  
    fetchImages();
  }, []);
  
  
  

  const handleMenuPress = (menuName) => {
    switch (menuName) {
      case "Kunjungan":
        navigation.navigate("visit");
        break;
      case "Pembinaan":
        alert("Fitur belum tersedia");
        break;
      case "SIABI":
        alert("Fitur belum tersedia");
        break;
      case "Pengaduan":
        navigation.navigate("complaint");
        break;
      case "Video Call":
        alert("Fitur belum tersedia");
        break;
      case "Informasi Publik":
        navigation.navigate("information");
        break;
      case "Integrasi":
        navigation.navigate("integration");
        break;
      case "Self Service":
        Linking.openURL("https://docs.google.com/spreadsheets/d/1rITbu47TJRCJADNPZgcXhgWqdyzI1nL4dwDY1Gf3OAs/edit?usp=sharing");
        break;
      case "Whatsapp":
        Linking.openURL("https://wa.me/6282174344444");
        break;
      case "Website":
        Linking.openURL("https://rutanlubuksikaping.kemenkumham.go.id/");
        break;
      case "Twitter":
        Linking.openURL("https://twitter.com/rutanlusika?t=LNRT0cjkV2PWDsuE5Q3IUg&s=09");
        break;
      case "Instagram":
        Linking.openURL("https://www.instagram.com/rutanlusika?igsh=MTh5MjQxbGs3YTNlaw==");
        break;
      case "Facebook":
        Linking.openURL("https://www.facebook.com/rutan.sikaping?mibextid=ZbWKwL");
        break;
      case "Bantuan":
        Linking.openURL("https://wa.me/6282174344444");
        break;
      case "Logout":
        handleLogout();
      break;
      // Handle other menu actions
      default:
        break;
    }
  };

  const handleLogout = () => {
    try {
      dispatch({ type: "LOGOUT" });
      Alert.alert("Logout Berhasil", "Anda telah berhasil logout.");
      // Redirect
      navigation.navigate("login");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  const menuItems = [
    { name: "Kunjungan", icon: "building-o" },
    { name: "Integrasi", icon: "exchange" },
    { name: "Informasi Publik", icon: "newspaper-o" },
    { name: "Pengaduan", icon: "exclamation-circle" },
    { name: "Self Service", icon: "user-circle" },
    { name: "Whatsapp", icon: "whatsapp" },
    // { name: "Video Call", icon: "video-camera" },
    { name: "Website", icon: "globe" },
    { name: "Twitter", icon: "twitter" },
    { name: "Instagram", icon: "instagram" },
    { name: "Facebook", icon: "facebook" },
    { name: "Bantuan", icon: "question" },
    { name: "Logout", icon: "sign-out" },
  ];

  const getIconBackgroundColor = (iconName) => {
    // Mendapatkan warna latar belakang berdasarkan nama ikon
    switch (iconName) {
      case "twitter":
        return "#3ed3fd";
      case "instagram":
        return "#f01660";
      case "facebook":
        return "#4940fa";
      case "globe":
        return "#4181fc";
      case "video-camera":
        return "#4c4c4c";
      case "graduation-cap":
        return "#fba539";
      case "building-o":
        return "#8108bb";
      case "shopping-cart":
        return "#4166fc";
      case "user-secret":
        return "#13bfd7";
      case "exclamation-circle":
        return "#fb423f";
      case "newspaper-o":
        return "#4181fc";
      case "whatsapp":
        return "#41fe80";
      default:
        return "black";
    }
  };

  return (
        <LinearGradient
        colors={['#52a8de', '#4682d4', '#195DBA']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
      {/* Bagian Hero dengan gambar yang dapat dislide */}
      <View style={styles.hero}>
      <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={[styles.heroImage]} />
          )}
          ListEmptyComponent={<Text>No image available</Text>}
        />
      </View>

      {/* Bagian keterangan dan menu */}
      <View style={styles.keterangan}>
        <Text style={{ color: "white", textAlign : "center", fontWeight: "bold", fontSize: 15}}>Hi! Selamat datang, {Name}!</Text>
        <Text style={{ color: "white", textAlign : "center" }}>Layanan apa yang anda butuhkan?</Text>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={menuItems}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.menuContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleMenuPress(item.name)}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: getIconBackgroundColor(item.icon) },
                ]}
              >
                <FontAwesome
                  name={item.icon}
                  size={20}
                  color="white"
                  style={styles.icon}
                />
              </View>
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* <View style={styles.keterangan}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <FontAwesome
              name="sign-out"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.DOMINAN_COLOR,
  },
  hero: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 23,
    width: "100%",
    height: "22%",
    backgroundColor: colors.DOMINAN_COLOR,
  },
  keterangan: {
    flexDirection: "cols",
    justifyContent: "flex-start",
    width: "80%",
    marginBottom: 20,
    marginTop: 7,
  },
  heroImage: {
    resizeMode: "contain",
    width: 400,
    marginTop: 10,
    marginBottom: -50,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 100,
    margin: 10,
    paddingTop: 8,
    backgroundColor: colors.FLORAL_WHITE,
    borderRadius: 14,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.YELLOW_STATUS,
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
  icon: {
    // marginBottom: 2,
    color: "white",
    borderRadius: 50,
  },
});

export default Dashboard;
