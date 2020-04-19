import "react-native-gesture-handler";
import * as React from "react";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";

import { ConversationScreen } from "./components/screens/ConversationScreen";

import { EpisodesStack } from "./components/stacks/EpisodesStack";
import { TasksStack } from "./components/stacks/TasksStack";
import { AppointmentsStack } from "./components/stacks/AppointmentsStack";
import { CommunicationStack } from "./components/stacks/CommunicationStack";
import { SettingsStack } from "./components/stacks/SettingsStack";
import { MODAL_STACK } from "./components/stacks/ModalStack";

enableScreens();

type AnyObject = { [k: string]: any };

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const HiddenTabBarStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function handleTabBarIcons(route: AnyObject) {
  return () => {
    let iconName;

    switch (route.name) {
      case "episodes.tab":
        iconName = "film";
        break;
      case "tasks.tab":
        iconName = "list-alt";
        break;
      case "appointments.tab":
        iconName = "calendar-alt";
        break;
      case "communication.tab":
        iconName = "mobile-alt";
        break;
      case "settings.tab":
        iconName = "cog";
        break;
      default:
        break;
    }

    return <FontAwesome5 name={iconName} size={16} />;
  };
}

function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: handleTabBarIcons(route),
      })}
      tabBarOptions={{ showLabel: false }}
    >
      <Tab.Screen name="episodes.tab" component={EpisodesStack} />
      <Tab.Screen name="tasks.tab" component={TasksStack} />
      <Tab.Screen name="appointments.tab" component={AppointmentsStack} />
      <Tab.Screen name="communication.tab" component={CommunicationStack} />
      <Tab.Screen name="settings.tab" component={SettingsStack} />
    </Tab.Navigator>
  );
}

// In order to allow stacks to not display the tab bar, we need to register them
// outside of the tab stack, e.g. instead of using a modal for conversation, we
// can just register it outside of the tab stack.
function HiddenStack() {
  return (
    <HiddenTabBarStack.Navigator
      screenOptions={{ headerBackTitleVisible: false }}
    >
      <HiddenTabBarStack.Screen
        name="hidden"
        component={TabStack}
        options={{ headerShown: false }}
      />
      <HiddenTabBarStack.Screen
        name="conversation"
        component={ConversationScreen}
        options={{ headerTransparent: true, headerTitle: "" }}
      />
    </HiddenTabBarStack.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerLeft: () => null,
        ...TransitionPresets.ModalPresentationIOS,
        cardOverlayEnabled: true,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={HiddenStack}
        options={{ headerShown: false }}
      />
      {MODAL_STACK.map((modal: AnyObject) => (
        <Stack.Screen
          name={modal.name}
          component={modal.component}
          key={modal.name}
          options={modal?.options}
        />
      ))}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Root"
          options={{ headerShown: false }}
          component={MainStack}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
