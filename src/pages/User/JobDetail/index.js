import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "../../../constant/colors";

const JobDetail = ({ route }) => {
  const { job } = route.params;

  // Fungsi untuk memformat gaji
  const formatCurrency = (amount) => {
    if (!amount) return "Tidak disebutkan";
    return `IDR ${parseInt(amount).toLocaleString("id-ID")}`;
  };

  // Fungsi untuk memformat tanggal batas akhir lamaran
  const formatDeadline = (date) => {
    if (!date) return "Tidak disebutkan";
    return new Date(date).toLocaleDateString("id-ID");
  };

  return (
    <LinearGradient
      colors={['#DF2935', '#DF2935', '#DF2935']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.company}>{job.company}</Text>
          <Text style={styles.location}>Lokasi: {job.location || "Tidak disebutkan"}</Text>

          <Text style={styles.sectionTitle}>Deskripsi Pekerjaan:</Text>
          <Text style={styles.sectionText}>{job.description || "Tidak ada deskripsi tersedia"}</Text>

          <Text style={styles.sectionTitle}>Persyaratan:</Text>
          <Text style={styles.sectionText}>{job.requirements || "Tidak ada persyaratan khusus"}</Text>

          <Text style={styles.salary}>Gaji: {formatCurrency(job.salary)}</Text>
          <Text style={styles.employmentType}>Jenis Pekerjaan: {job.employment_type || "Tidak disebutkan"}</Text>
          <Text style={styles.jobLevel}>Tingkat Pekerjaan: {job.job_level || "Tidak disebutkan"}</Text>
          <Text style={styles.applicationDeadline}>
            Batas Akhir Lamaran: {formatDeadline(job.application_deadline)}
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Apply Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: "center",
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
    marginBottom: 20,
  },
  title: {
    fontSize: 20, // sebelumnya 24
    fontWeight: "bold",
    color: colors.DARK_TEXT,
    marginBottom: 10,
  },
  company: {
    fontSize: 14, // sebelumnya 18
    color: colors.DARK_GRAY,
    marginBottom: 5,
  },
  location: {
    fontSize: 12, // sebelumnya 16
    color: colors.DARK_TEXT,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14, // sebelumnya 18
    fontWeight: "bold",
    color: colors.DARK_TEXT,
    marginTop: 15,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 12, // sebelumnya 16
    color: colors.DARK_GRAY,
    marginBottom: 15,
  },
  salary: {
    fontSize: 12, // sebelumnya 16
    color: colors.DARK_GRAY,
    fontWeight: "bold",
    marginBottom: 10,
  },
  employmentType: {
    fontSize: 12, // sebelumnya 16
    color: colors.DARK_TEXT,
    marginBottom: 5,
  },
  jobLevel: {
    fontSize: 12, // sebelumnya 16
    color: colors.DARK_TEXT,
    marginBottom: 5,
  },
  applicationDeadline: {
    fontSize: 12, // sebelumnya 16
    color: colors.DARK_TEXT,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  buttonText: {
    color: colors.DOMINAN_COLOR,
    fontWeight: "bold",
    fontSize: 14, // sebelumnya 16
  },
});


export default JobDetail;
