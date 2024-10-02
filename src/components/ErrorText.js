import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constant/colors";

const ErrorText = ({ text }) => {
  return (
    <View>
      <Text style={{ color: colors.RED }}>{text}</Text>
    </View>
  );
};

export default ErrorText;

const styles = StyleSheet.create({});
