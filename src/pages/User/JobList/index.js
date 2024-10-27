import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "../../../constant/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import AuthManager from "../../../services/AuthManager";

const JobList = () => {
  const [jobData, setJobData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [salaryFilterActive, setSalaryFilterActive] = useState(false);
  const [salaryFilterDirection, setSalaryFilterDirection] = useState('descending');
  const [dateFilterDirection, setDateFilterDirection] = useState('descending');
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const { searchTerm } = route.params || {};
    setSearchTerm(searchTerm || "");

    const fetchJobList = async () => {
      try {
        const jobs = await AuthManager.pb.collection("job_list").getFullList({
          sort: '-created',
        });
        setJobData(jobs);
        setFilteredData(jobs);
      } catch (error) {
        console.error("Error fetching job list:", error);
      }
    };
    
    fetchJobList();
  }, [route.params]);

  const handleSearch = () => {
    const filtered = jobData.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
  };

  const handleFilterByDate = () => {
    const sortedByDate = [...filteredData].sort((a, b) => dateFilterDirection === 'descending'
      ? new Date(b.application_deadline) - new Date(a.application_deadline)
      : new Date(a.application_deadline) - new Date(b.application_deadline));
      
    setFilteredData(sortedByDate);
    setDateFilterDirection(dateFilterDirection === 'descending' ? 'ascending' : 'descending');
    setSalaryFilterActive(false);
    setSalaryFilterDirection('descending');
    setFilterVisible(false);
  };

  const handleFilterBySalary = () => {
    const sortedBySalary = [...filteredData].sort((a, b) => salaryFilterDirection === 'descending'
      ? (b.salary || 0) - (a.salary || 0)
      : (a.salary || 0) - (b.salary || 0));
    
    setFilteredData(sortedBySalary);
    setSalaryFilterActive(!salaryFilterActive);
    setSalaryFilterDirection(salaryFilterDirection === 'descending' ? 'ascending' : 'descending');
    setFilterVisible(false);
  };

  return (
    <LinearGradient
      colors={['#DF2935', '#DF2935', '#DF2935']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari lowongan..."
            placeholderTextColor={colors.GRAY}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Cari</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)} style={styles.filterButton}>
            <FontAwesome name="filter" size={24} color="white" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          {filterVisible && (
            <View style={styles.filterMenu}>
              <TouchableOpacity onPress={handleFilterByDate} style={styles.menuItem}>
                <View style={styles.dateFilterContainer}>
                  <Text style={styles.menuText}>Tanggal</Text>
                  <FontAwesome 
                    name={dateFilterDirection === 'descending' ? "arrow-down" : "arrow-up"} 
                    size={12} 
                    color="white" 
                    style={styles.arrowIcon} 
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFilterBySalary} style={styles.menuItem}>
                <View style={styles.salaryFilterContainer}>
                  <Text style={styles.menuText}>Gaji</Text>
                  <FontAwesome 
                    name={salaryFilterDirection === 'descending' ? "arrow-down" : "arrow-up"} 
                    size={12} 
                    color="white" 
                    style={styles.arrowIcon} 
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate("job-detail", { job: item })}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.location}>Lokasi: {item.location}</Text>
              <Text style={styles.employmentType}>Jenis Pekerjaan: {item.employment_type}</Text>
              <Text style={styles.jobLevel}>Tingkat Pekerjaan: {item.job_level}</Text>
              <Text style={styles.applicationDeadline}>Batas Pengajuan: {new Date(item.application_deadline).toLocaleDateString("id-ID")}</Text>
              <Text style={styles.salary}>Gaji: {item.salary ? `IDR ${parseInt(item.salary).toLocaleString("id-ID")}` : "Tidak diketahui"}</Text>
            </TouchableOpacity>
          )}
          style={styles.jobList}
          contentContainerStyle={styles.jobListContent}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    flex: 1,
    paddingTop: 60, // Menambahkan paddingTop agar tidak tertutup header
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Menambah marginBottom untuk jarak yang lebih baik
    width: '90%',
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 5,
  },
  searchButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 7,
  },
  searchButtonText: {
    color: colors.DOMINAN_COLOR,
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  filterButton: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.DOMINAN_COLOR,
    padding: 8,
    borderRadius: 8,
  },
  filterText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12,
  },
  filterMenu: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: colors.DARK_GRAY,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 8,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.WHITE,
  },
  dateFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salaryFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    marginLeft: 5,
  },
  menuText: {
    color: colors.WHITE,
    fontSize: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.DARK_TEXT,
    marginBottom: 10,
  },
  company: {
    fontSize: 14,
    color: colors.DARK_GRAY,
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: colors.DARK_GRAY,
    marginBottom: 5,
  },
  salary: {
    fontSize: 12,
    color: colors.DARK_GRAY,
    marginBottom: 5,
    marginTop: 5,
    fontWeight: 'bold',
  },
  employmentType: {
    fontSize: 12,
    color: colors.DARK_GRAY,
    marginBottom: 5,
  },
  jobLevel: {
    fontSize: 12,
    color: colors.DARK_GRAY,
    marginBottom: 5,
  },
  applicationDeadline: {
    fontSize: 12,
    color: colors.DARK_GRAY,
  },
  jobList: {
    marginTop: 10,
  },
  jobListContent: {
    paddingBottom: 20, // Menambahkan paddingBottom agar list tidak mepet di bagian bawah
  },
});


export default JobList;
