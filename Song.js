import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet,Text,View, Image, TouchableOpacity} from 'react-native';
import millisToMinutesAndSeconds from "./utils/millisToMinuteSeconds"
import { Ionicons } from '@expo/vector-icons';
import Colors from "./Themes/colors";
import { WebView } from "react-native-webview";
import { useNavigation } from '@react-navigation/native';


export default function Song({index, imageurl, songtitle, artist, album, songlength, previewURL, details}) {
  const navigation = useNavigation();
  return (
    <View style={styles.songs}>
      <TouchableOpacity style={styles.index} onPress={()=> {navigation.navigate('SongPreview', {URL: previewURL})}}>
        <Ionicons name="caret-forward-circle" size={20} color= {Colors.spotify} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.albumcover} onPress={()=> {navigation.navigate('DetailedSong', {URL: details})}}>
        <Image style={styles.cover} source={{uri : imageurl}}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.songandartist} onPress={()=> {navigation.navigate('DetailedSong', {URL: details})}}>
        <Text numberOfLines={1} style={[styles.text, { color: "white" }]}>{songtitle}</Text>
        <Text numberOfLines={1} style={[styles.smalltext, { color: "white" }]}>{artist}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.albumname} onPress={()=> {navigation.navigate('DetailedSong', {URL: details})}}>
          <Text numberOfLines={1} style={[styles.text, { color: "white" }]}>{album}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.duration} onPress={()=> {navigation.navigate('DetailedSong', {URL: details})}}>
        <Text style={[styles.text, { color: "white" }]}>{[millisToMinutesAndSeconds(songlength)]}</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  songs: {
    flex: 1,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  index: {
    flex: 1,
    width: "10%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumcover: {
    flex: 2,
    width: "20%",
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  songandartist: {
    flex: 4,
    width: "40%",
    marginTop: 20,
    marginRight: 10,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  albumname: {
    flex: 3,
    width: "30%",
    justifyContent: 'center',
    marginRight: 10,
    alignItems: 'flex-start',
  },
  duration: {
    flex: 1,
    width: "10%",
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 12,
  },
  smalltext: {
    fontSize: 10,
    fontWeight: '200',
  },
  cover: {
    width: 50,
    height: 50,
    aspectRatio: 1,
    margin: 10,
    resizeMode: 'contain'
  }
});