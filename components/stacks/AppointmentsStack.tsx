import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

function AppointmentsStack() {
  return (
    <View style={styles.container}>
      <Text>Appointments</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export { AppointmentsStack };
