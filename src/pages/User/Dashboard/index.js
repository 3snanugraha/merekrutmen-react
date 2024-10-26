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
  StatusBar,
  TextInput,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "../../../constant/colors";
import { useSelector, useDispatch } from "react-redux";
import AuthManager from "../../../services/AuthManager";

const Dashboard = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [jobData, setJobData] = useState([]);
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
        const fetchedImages = banners.flatMap(item => {
          if (Array.isArray(item.gambar)) {
            return item.gambar.map(image => ({ uri: `https://merekrutmen.pockethost.io/api/files/${item.collectionId}/${item.id}/${image}` }));
          }
          return { uri: `https://merekrutmen.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.gambar}` };
        });
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const fetchJobList = async () => {
      try {
        const jobs = await AuthManager.pb.collection("job_list").getFullList({
          sort: '+created', // Mengurutkan berdasarkan created_at dari yang terbaru
        });
        setJobData(jobs);
      } catch (error) {
        console.error("Error fetching job list:", error);
      }
    };

    fetchImages();
    fetchJobList();
  }, []);

  const handleNavigateToJobList = () => {
    navigation.navigate("job-list", { searchTerm }); // Navigasi ke halaman Job List dengan searchTerm
  };

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
        <TouchableOpacity style={styles.searchButton} onPress={handleNavigateToJobList}>
          <Text style={styles.searchButtonText}>Cari</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.latestJobsTitle}>3 Lowongan terbaru :</Text>
      <View style={styles.jobListContainer}>
        <FlatList
          data={jobData.slice(0, 3)} // Menampilkan 3 lowongan terbaru
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.jobCard} 
              onPress={() => navigation.navigate("job-detail", { job: item })}
            >
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.jobDetails}>{item.company} | {item.location}</Text>
            </TouchableOpacity>
          )}
          style={styles.jobList}
          contentContainerStyle={styles.jobListContent}
        />
        <TouchableOpacity style={styles.loadMoreButton} onPress={handleNavigateToJobList}>
          <Text style={styles.loadMoreButtonText}>Lebih banyak...</Text>
        </TouchableOpacity>
      </View>
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
    height: "23%",
    marginTop: -50,
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
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 6,
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
  jobListContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  jobList: {
    width: '100%',
  },
  jobListContent: {
    width: '100%',
  },
  jobCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'flex-start',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  jobDetails: {
    fontSize: 12,
    color: 'gray',
  },
  loadMoreButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  loadMoreButtonText: {
    color: colors.DOMINAN_COLOR,
  },
});

export default Dashboard;
