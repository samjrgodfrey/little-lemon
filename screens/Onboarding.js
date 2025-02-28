import React, { useState, useRef, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import PagerView from "react-native-pager-view";
import { validateEmail } from "../utils";
import { AuthContext } from "../AuthContext";

const Onboarding = () => {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");

  const isEmailValid = validateEmail(email);
  const viewPagerRef = useRef(PagerView);

  const validateName = (name) => {
    if (name.length > 0) {
      return name.match(/[^a-zA-Z]/);
    } else {
      return true;
    }
  };

  const { onboard } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../img/littleLemonLogo.png")}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </View>
      <View style={styles.viewPager}>
        <View style={styles.pageContainer}>
          <Text style={styles.text}>First Name</Text>
          <TextInput
            style={styles.inputBox}
            value={firstName}
            onChangeText={onChangeFirstName}
            placeholder={"First Name"}
          />
          <Text style={styles.text}>Last Name</Text>
          <TextInput
            style={styles.inputBox}
            value={lastName}
            onChangeText={onChangeLastName}
            placeholder={"Last Name"}
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={onChangeEmail}
            placeholder={"Email"}
            keyboardType="email-address"
          />
        </View>
      </View>
      <View style={styles.page}>
        <View style={styles.pageContainer}></View>
        <Pressable
          style={[
            styles.btn,
            isEmailValid && !validateName(firstName) && !validateName(lastName)
              ? ""
              : styles.btnDisabled,
          ]}
          onPress={() => onboard({ firstName, lastName, email })}
          disabled={
            !isEmailValid && validateName(firstName) && validateName(lastName)
          }
        >
          <Text style={styles.btntext}>Submit</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dee3e9",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
  inputBox: {
    alignSelf: "stretch",
    height: 50,
    margin: 18,
    borderWidth: 1,
    padding: 10,
    fontSize: 24,
    borderRadius: 9,
    borderColor: "EDEFEE",
    backgroundColor: "#EDEFEE",
  },
  btn: {
    backgroundColor: "#f4ce14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginHorizontal: 18,
    marginBottom: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cc9a22",
  },
  btnDisabled: {
    backgroundColor: "#f1f4f7",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 18,
    marginBottom: 60,
  },
  halfBtn: {
    flex: 1,
    backgroundColor: "#f4ce14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginRight: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cc9a22",
  },
  btntext: {
    fontSize: 22,
    color: "#3e524b",
    fontWeight: "bold",
    alignSelf: "center",
  },
  pageIndicator: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  pageDot: {
    backgroundColor: "#67788a",
    width: 22,
    height: 22,
    marginHorizontal: 10,
    borderRadius: 11,
  },
  pageDotActive: {
    backgroundColor: "#f4ce14",
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});

export default Onboarding;
