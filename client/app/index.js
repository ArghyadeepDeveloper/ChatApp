import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Link href="/about" style={styles.link}>
        <Text>Go to About</Text>
      </Link>
      <Link href="/profile" style={styles.link}>
        <Text>Go to Profile</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24 },
  link: { marginTop: 20, fontSize: 18, color: "blue" },
});
