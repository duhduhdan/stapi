import * as React from "react";
import { Button, View, StyleSheet } from "react-native";

type AnyObject = { [k: string]: any };

function CommunicationStack({ navigation }: AnyObject) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate("conversation")}
        title="View conversation"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { CommunicationStack };
