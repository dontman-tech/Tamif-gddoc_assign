import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
import { useAuth } from "../auth-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    signIn(email);
    router.replace("/main/home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <View style={styles.content}>
        {/* Gradient Icon Circle */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={["#ec12c4ff", "#410ae4ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.iconCircle}
          >
            <Ionicons name="person" size={56} color="#FFFFFF" />
          </LinearGradient>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 17, fontWeight: "normal", color: "#000" }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={30} color="#5d6570ff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={30} color="#5d6570ff" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.signUpButtonContainer}>
            <LinearGradient
              colors={["#8E2DE2", "#4A00E0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or continue with </Text>
              <View style={styles.separatorLine} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={40} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={40} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.signUpFooterText}>Not registered yet? </Text>
            <Link href="/(auth)/SignUp" asChild>
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Text style={styles.footerLink}>Sign Up</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#7F5AF0" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
