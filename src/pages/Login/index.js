import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../constant/colors.js";
import CustomButton from "../../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthentication } from "../../store/userSlice";
import AuthManager from "../../services/AuthManager";
import { setUser } from "../../store/userSlice";

function Login({ navigation }) {
  const { isAuthenticated = false, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (key, value) => {
    setForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleTogglePassword = () => {
    setForm((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleForgotPassword = () => {
    // navigation.navigate("forget-password");
  };

  const handleRegister = () => {
    navigation.navigate("register");
  };

  const handleLogin = async () => {
    const { email: identity, password } = form;
    try {
      await AuthManager.authenticate();
      const response = await fetch('https://rutan-app.pockethost.io/api/collections/users/auth-with-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identity,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Gagal login. Periksa kembali email dan password Anda.');
      }
  
      const userData = await response.json();
      dispatch(setUser(userData));
      dispatch(setIsAuthentication(true));
      setForm({ email: "", password: "", showPassword: false });
      navigation.navigate("dashboard");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert('Error', error.message);
    }
  };

  const handleGoogleLogin = () => {
    // Integrasi OAuth Google dapat ditambahkan di sini
    Alert.alert('Google OAuth', 'Login dengan Google belum diimplementasikan.');
  };

  const image = require('../../../assets/merekrutmen.png');

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={image} style={{ height:200,width:220,resizeMode: 'contain'}}></Image>
        <Text style={styles.text}>Selamat datang di Merekrutmen!</Text>
      </View>
      <LinearGradient
        colors={['#DF2935', '#DF2935', '#DF2935']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.hero}
      >
        <Text style={styles.text2}>Login</Text>
        <Text style={styles.text3}>Masukkan username dan password Anda untuk melanjutkan</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username / Email"
            onChangeText={(text) => handleChange("email", text)}
            value={form.email}
            placeholderTextColor={colors.DOMINAN_COLOR}
          />
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!form.showPassword}
            onChangeText={(text) => handleChange("password", text)}
            value={form.password}
            placeholderTextColor={colors.DOMINAN_COLOR}
            color={colors.DOMINAN_COLOR}
          />
          <TouchableOpacity
            onPress={handleTogglePassword}
            style={styles.eyeIcon}
          >
            <Icon
              name={form.showPassword ? "eye-slash" : "eye"}
              size={20}
              color={colors.DOMINAN_COLOR}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.masukContainer}>
          <CustomButton text={"Masuk"} handleClick={handleLogin} />
        </View>

        {/* Tambahkan tombol OAuth Google di sini */}
        <TouchableOpacity style={styles.oauthButton} onPress={handleGoogleLogin}>
          <Icon name="google" size={20} color="#fff" />
          <Text style={styles.oauthButtonText}>Login dengan Google</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleForgotPassword}>
            {/* <Text style={styles.textLink}>Lupa Password?</Text> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.textLink}>Buat Akun?</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  title: {
    alignContent:"center",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 50,
    height: "30%",
    marginTop: 50,
  },
  hero: {
    backgroundColor: colors.DOMINAN_COLOR,
    borderTopLeftRadius: 75,
    borderTopRightRadius: 75,
    justifyContent: "center",
    height: "70%",
    width: "100%",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 40,
  },
  input: {
    color: colors.DOMINAN_COLOR,
    height: 50,
    width: "100%",
    borderWidth: 1,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    padding: 8,
    textAlign: "center",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: colors.WHITE,
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    color: "white",
    height: 50,
    width: "100%",
    padding: 8,
    textAlign: "center",
    marginLeft: 40,
  },
  eyeIcon: {
    padding: 10,
  },
  masukContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    color: colors.DOMINAN_COLOR,
  },
  text: {
    color: colors.DOMINAN_COLOR,
    textAlign: "center",
    fontSize: 9,
    fontWeight: "800",
    lineHeight: 9,
    marginBottom: 30,
  },
  text2: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 48,
    marginBottom: 30,
    marginTop: -50,
  },
  text3: {
    color: "white",
    textAlign: "center",
    marginTop: -40,
    fontSize: 12,
  },
  oauthButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2966df",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
  },
  oauthButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
  textLink: {
    textAlign: "left",
    color: "white",
  },
});

export default Login;
