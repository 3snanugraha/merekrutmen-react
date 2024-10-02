import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from "react-native";
import { colors } from "../../../../constant/colors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { Ionicons } from "@expo/vector-icons";

const pb = new PocketBase("https://rutan-app.pockethost.io");

const Berhak = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const announcements = await pb.collection("wbp_berhak").getFullList();
      setAnnouncements(announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleFileClick = async (collectionId, recordId, fileName) => {
    const fileUrl = `https://rutan-app.pockethost.io/api/files/${collectionId}/${recordId}/${fileName}`;
    const canOpen = await Linking.canOpenURL(fileUrl);
    if (canOpen) {
      await Linking.openURL(fileUrl);
    } else {
      console.log("Unable to open URL:", fileUrl);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Berhak</Text>
        <ScrollView>
          {announcements.map((announcement) => (
            <View key={announcement.id} style={styles.announcementCard}>
              <Text style={styles.contentText}>{announcement.berhak}</Text>
            </View>
          ))}
          <Text style={[styles.title, { marginTop: 20 }]}>File</Text>
          {announcements.map((announcement) => (
            <TouchableOpacity
              key={announcement.id}
              onPress={() =>
                handleFileClick("wbp_berhak", announcement.id, announcement.berhak_gambar)
              }
              style={styles.fileContainer}
            >
              <Ionicons name="document-outline" size={24} color={colors.primary} />
              <Text style={styles.contentText}>{announcement.berhak_gambar}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.text,
  },
  content: {
    padding: 20,
  },
  contentText: {
    color: colors.text,
  },
  announcementCard: {
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default Berhak;