import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "../../../constant/colors";

const JobDetail = ({ route }) => {
  const { job } = route.params;

  // Fungsi untuk memformat gaji
  const formatCurrency = (amount) => {
    if (!amount) return "Not disclosed";
    return `IDR ${parseInt(amount).toLocaleString("id-ID")}`;
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
          <Text style={styles.location}>Location: {job.location}</Text>
          <Text style={styles.description}>Description:</Text>
          <Text style={styles.descriptionText}>{job.description || "No description available"}</Text>
          <Text style={styles.requirements}>Requirements:</Text>
          <Text style={styles.requirementsText}>{job.requirements || "No specific requirements"}</Text>
          <Text style={styles.salary}>Salary: {formatCurrency(job.salary)}</Text>
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
    elevation: 5, // Efek shadow untuk Android
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.DARK_TEXT,
    marginBottom: 10,
  },
  company: {
    fontSize: 18,
    color: colors.DARK_GRAY,
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: colors.DARK_TEXT,
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.DARK_TEXT,
    marginTop: 15,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.DARK_GRAY,
    marginBottom: 15,
  },
  requirements: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.DARK_TEXT,
    marginTop: 15,
    marginBottom: 5,
  },
  requirementsText: {
    fontSize: 16,
    color: colors.DARK_GRAY,
    marginBottom: 15,
  },
  salary: {
    fontSize: 16,
    color: colors.DARK_GRAY,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  buttonText: {
    color: colors.DOMINAN_COLOR,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default JobDetail;
