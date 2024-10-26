import React, { useState, useEffect } from "react";
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
  TextInput,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "../../../constant/colors";
import { useSelector, useDispatch } from "react-redux";
import AuthManager from "../../../services/AuthManager";

const Dashboard = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
          if (Array.isArray(item.gambar)) {
            item.gambar.forEach(image => {
              fetchedImages.push({ uri: `https://merekrutmen.pockethost.io/api/files/${item.collectionId}/${item.id}/${image}` });
            });
          } else {
            fetchedImages.push({ uri: `https://merekrutmen.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.gambar}` });
          }
        });
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleLogout = () => {
    try {
      dispatch({ type: "LOGOUT" });
      Alert.alert("Logout Berhasil", "Anda telah berhasil logout.");
      navigation.navigate("login");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  const dummyJobData = [
    { id: '1', title: 'Software Engineer', company: 'ABC Corp', location: 'Jakarta' },
    { id: '2', title: 'Data Analyst', company: 'XYZ Inc', location: 'Bandung' },
    { id: '3', title: 'Product Manager', company: 'Tech Co', location: 'Surabaya' },
  ];

  return (
    <LinearGradient
      colors={['#DF2935', '#DF2935', '#DF2935']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <View style={styles.hero}>
        <FlatList
          data={images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={item} style={styles.heroImage} />
          )}
          ListEmptyComponent={<Text>No image available</Text>}
        />
      </View>

      <View style={styles.keterangan}>
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: 15 }}>
          Hi! Selamat datang, {Name}!
        </Text>
        <Text style={{ color: "white", textAlign: "center" }}>Apa yang bisa kami bantu hari ini?</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari lowongan..."
          placeholderTextColor={colors.GRAY}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => console.log(searchTerm)}>
          <Text style={styles.searchButtonText}>Cari</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.latestJobsTitle}>3 Lowongan terbaru:</Text>
      <FlatList
        data={dummyJobData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.jobCard} 
            onPress={() => Alert.alert("Lowongan Diklik", `Anda memilih lowongan: ${item.title}`)}
          >
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobDetails}>{item.company} | {item.location}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }} // Menambahkan padding bawah untuk spacing
      />

      <TouchableOpacity style={styles.loadMoreButton}>
        <Text style={styles.loadMoreButtonText}>Lebih banyak...</Text>
      </TouchableOpacity>
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
    marginBottom: 15,
    width: "100%",
    height: "22%",
    backgroundColor: colors.DOMINAN_COLOR,
  },
  keterangan: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "80%",
    marginBottom: 10,
    marginTop: 5,
  },
  heroImage: {
    resizeMode: "cover",
    width: 400,
    marginTop: 15,
    marginBottom: -20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    width: '80%',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 40,
  },
  searchButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 8,
    marginLeft: 5,
  },
  searchButtonText: {
    color: colors.DOMINAN_COLOR,
  },
  latestJobsTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  jobCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5, // Margin vertikal antar card
    width: '100%', // Pastikan lebar 100%
    alignItems: 'center', // Center align item dalam card
    shadowColor: "#000", // Warna bayangan
    shadowOffset: { width: 0, height: 2 }, // Offset bayangan
    shadowOpacity: 0.25, // Opasitas bayangan
    shadowRadius: 3.5, // Radius bayangan
    elevation: 5, // Elevasi untuk Android
  },
  jobTitle: {
    fontSize: 15, // Ukuran font lebih kecil
    fontWeight: 'bold',
    color: 'black',
  },
  jobDetails: {
    fontSize: 12, // Ukuran font lebih kecil
    color: 'gray',
  },
  loadMoreButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  loadMoreButtonText: {
    color: colors.DOMINAN_COLOR,
  },
});

export default Dashboard;
