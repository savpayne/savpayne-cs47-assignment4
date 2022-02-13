import 'react-native-gesture-handler';
import { StyleSheet, Text, SafeAreaView, View, Button, Image, TouchableOpacity, FlatList} from "react-native";
import { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "..//utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "..//utils/constants";
import Colors from "../Themes/colors";
import Images from "../Themes/images";
import Song from '../Song';

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function MainScreen() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
    useEffect(() => {
      console.log(tracks)
    }, [tracks]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );


const SpotifyAuthButton = () =>{
  return (
    <View>
      <TouchableOpacity style={[styles.button, {backgroundColor: Colors.spotify}]} onPress={()=>{promptAsync()}}>
        <Image style={{height: 15,width: 15,marginRight: 8}} source={Images.spotify}/>
        <Text style={{color: "white", fontWeight: "bold"}}>
        CONNECT WITH SPOTIFY 
        </Text>
      </TouchableOpacity>
    </View>
  )
};
const AlbumList = () =>{
  return (
    <View>
      <View style={[styles.titleRow, {backgroundColor: Colors.background}]}>
        <Image style={{height: 20,width: 20,marginRight: 8, marginTop: 4}} source={Images.spotify}/>
        <Text style={styles.titleText}>My Top Tracks</Text>
      </View>
      <FlatList
        data={tracks} 
        renderItem={(item) => renderItem(item)} 
        keyExtractor={(item) => item.index} 
        />
    </View>
  )
};


  

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);


  useEffect(() => {
    if (token) {
      // TODO: Select which option you want: Top Tracks or Album Tracks

      // Comment out the one you are not using
      //myTopTracks(setTracks, token);
      albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);


  const renderItem = ({ item, index }) => (
    <Song 
      index ={index}
      imageurl={item.album.images[0].url}
      songtitle={item.name}
      artist={item.artists[0].name}
      album={item.album.name}
      songlength={item.duration_ms}
      previewURL={item.preview_url}
      details={item.external_urls.spotify}/>
  );

  let contentDisplayed = null;
  if ( token && tracks.length !==0 ) {
    contentDisplayed = <AlbumList/>
  } else {
    contentDisplayed = <SpotifyAuthButton/>
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: Colors.background}]}>
      {contentDisplayed}
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  flatlist: {
    flex: 1,

  },
  titleRow: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    color: "white",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    padding: 7,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 5,
    borderRadius: 30,
  }
});
