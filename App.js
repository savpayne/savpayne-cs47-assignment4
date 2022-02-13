import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, SafeAreaView, View, Button, Image, TouchableOpacity, FlatList} from "react-native";
import { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors";
import Images from "./Themes/images";
import Song from './Song';
import MainScreen from "./Screens/MainScreen"
import DetailedSong from "./Screens/DetailedSong"
import SongPreview from "./Screens/SongPreview"

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name="DetailedSong" component={DetailedSong} />
        <Stack.Screen name="SongPreview" component={SongPreview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});
