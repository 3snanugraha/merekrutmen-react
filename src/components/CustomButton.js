import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../constant/colors";

const CustomButton = ({
  text,
  bgColor,
  color,
  handleClick,
  disabled,
  textStyle,
  fontSize
}) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      alignContent: "center",
      paddingVertical: 10,
      backgroundColor: bgColor || "white",
      borderRadius: 20,
    },
    text: {
      color: color || colors.DOMINAN_COLOR,
      textAlign: "center",
      fontSize: fontSize || 18,
      fontWeight: "700",
    },
  });
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.container}
      onPress={handleClick}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
