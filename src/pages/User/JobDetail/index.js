import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.location}>Location: {job.location}</Text>
        <Text style={styles.description}>Description:</Text>
        <Text style={styles.descriptionText}>{job.description || "No description available"}</Text>
        <Text style={styles.requirements}>Requirements:</Text>
        <Text style={styles.requirementsText}>{job.requirements || "No specific requirements"}</Text>
        <Text style={styles.salary}>Salary: {formatCurrency(job.salary)}</Text>
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
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  company: {
    fontSize: 18,
    color: colors.GRAY,
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: "white",
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 15,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: colors.GRAY,
    marginBottom: 15,
  },
  requirements: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 15,
    marginBottom: 5,
  },
  requirementsText: {
    fontSize: 16,
    color: colors.GRAY,
    marginBottom: 15,
  },
  salary: {
    fontSize: 16,
    color: colors.GRAY,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default JobDetail;
