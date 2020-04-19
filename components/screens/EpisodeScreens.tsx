import * as React from "react";
import {
  FlatList,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  PixelRatio,
} from "react-native";

import { useFetch } from "../../hooks/useFetch";

type AnyObject = { [k: string]: any };

const BASE_URL = `http://stapi.co/api/v1/rest`;

function EpisodeListScreen({ navigation }: AnyObject) {
  const { response, isLoading } = useFetch(
    `${BASE_URL}/series?uid=SEMA0000073238`
  ) as AnyObject;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={response?.series.episodes}
          renderItem={({ item }: AnyObject) => (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                paddingLeft: 16,
                paddingRight: 8,
              }}
              onPress={() =>
                navigation.navigate("episode.details", {
                  title: item.title,
                  uid: item.uid,
                })
              }
            >
              <View style={styles.listItem}>
                <Text style={{ fontSize: 16 }}>{item.title}</Text>
                <Text style={{ fontSize: 12, color: "#aaa" }}>
                  Season {item.seasonNumber}, Episode {item.episodeNumber}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={({ title, uid }) => `${title}--${uid}`}
        />
      )}
    </View>
  );
}

function EpisodeDetailsScreen({ route }: AnyObject) {
  const { title, uid } = route.params;
  const { response, isLoading } = useFetch(
    `${BASE_URL}/episode?uid=${uid}`
  ) as AnyObject;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ paddingVertical: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Episode Name</Text>
        <Text>{title}</Text>
      </View>
      <View style={{ paddingVertical: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Air Date</Text>
        <Text>
          {isLoading ? <Text>---</Text> : response?.episode.usAirDate}
        </Text>
      </View>
      <View style={{ paddingVertical: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Episode Number</Text>
        <Text>
          {isLoading ? <Text>---</Text> : response?.episode.episodeNumber}
        </Text>
      </View>
      <View style={{ paddingVertical: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Season Number</Text>
        <Text>
          {isLoading ? <Text>---</Text> : response?.episode.season.seasonNumber}
        </Text>
      </View>
      <View style={{ paddingVertical: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Character Appearances
        </Text>
        {isLoading ? (
          <Text>---</Text>
        ) : (
          response?.episode.characters.map((c: AnyObject) => (
            <View style={{ paddingVertical: 4 }} key={c.uid}>
              <Text>{c.name}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: "#ddd",
    paddingVertical: 16,
  },
});

export { EpisodeListScreen, EpisodeDetailsScreen };
