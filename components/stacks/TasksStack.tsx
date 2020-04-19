import * as React from "react";
import { View, StyleSheet, Text } from "react-native";

function TasksStack() {
  return (
    <View style={styles.container}>
      <Text>Tasks</Text>
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

export { TasksStack };
