import * as React from "react";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { Button } from "react-native";

import {
  EpisodeListScreen,
  EpisodeDetailsScreen,
} from "../screens/EpisodeScreens";

const EpisodesNavigator = createStackNavigator();

function EpisodesStack() {
  return (
    <EpisodesNavigator.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        cardStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <EpisodesNavigator.Screen
        name="episodes"
        component={EpisodeListScreen}
        options={{ headerTitle: "Episodes" }}
      />
      <EpisodesNavigator.Screen
        name="episode.details"
        component={EpisodeDetailsScreen}
        options={({ navigation }) => ({
          headerTitle: "Details",
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("details.modal")}
              title="Edit"
            />
          ),
        })}
      />
    </EpisodesNavigator.Navigator>
  );
}

export { EpisodesStack };
