import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet,Text,View, Image, TouchableOpacity} from 'react-native';
import { WebView } from "react-native-webview";
import { useNavigation } from '@react-navigation/native';

export default function MyWeb({route, navigation}){

	const { URL } = route.params;

    return (
      <WebView
        source={{
          uri: URL
        }}
        style={{ marginTop: 20 }}
      />
    );
};
