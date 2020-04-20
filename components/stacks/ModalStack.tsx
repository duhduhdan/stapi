import * as React from "react";
import { View, Button, Text } from "react-native";

type AnyObject = { [k: string]: any };

function DetailsModal({ navigation }: AnyObject) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const MODALS = [
  {
    name: "details.modal",
    component: DetailsModal,
    options: {
      headerTitle: "Edit details",
    },
  },
];

export { MODALS };
