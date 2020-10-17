import React , { useState}from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface Shelter{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function SheltersMap(){
  const [shelters, setShelters] = useState<Shelter[]>([]);

  const navigation = useNavigation();

  useFocusEffect(()=>{
    api.get('shelters').then(response => {
      setShelters(response.data)
    });
  });

  function handleNavigateToShelterDetails(id:number){
    navigation.navigate('ShelterDetails', {id});
  }

  function handleNavigateToCreateShelter(){
    navigation.navigate('SelectMapPosition');
  }

  return(
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -23.5803183,
          longitude:-46.7816684,
          latitudeDelta:0.008,
          longitudeDelta:0.008,
        }}
      >
       {shelters.map (shelter => {
         return(
          <Marker
            key={shelter.id}
            icon={mapMarker}
            calloutAnchor={{
              x:0.5,
              y:-0.1,
            }}
            coordinate={{
              latitude: shelter.latitude,
              longitude: shelter.longitude,
            }}
          >
          <Callout tooltip onPress= {()=>handleNavigateToShelterDetails(shelter.id)}>
            <View style={styles.calloutContainer}>
            <Text style= {styles.calloutText}>{shelter.name}</Text>
            </View>
          </Callout>
        </Marker>
         );
       })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}> {shelters.length} abrigos encontrados</Text>
        <RectButton style={styles.createShelterButton} onPress= {handleNavigateToCreateShelter}>
            <Feather name="plus" size={20} color="#FFF"/>
        </RectButton>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
   
    map:{
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
    },
    calloutContainer:{
      width:180,
      height:46,
      paddingHorizontal:16,
      backgroundColor:'rgba(255,255,255,1)',
      borderRadius:16,
      justifyContent:'center',
      elevation:3,
    },
  
    calloutText:{
      fontFamily:'Nunito_800ExtraBold',
      color:'#26a867',
      fontSize:14,
    
  
    },
    footer:{
      position:'absolute',
      left:24,
      right:24,
      bottom:32,
  
      backgroundColor:'#FFF',
      borderRadius:20,
      height:56,
      paddingLeft:24,
  
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
  
      elevation:3,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
    },
  
    footerText:{
      fontFamily:'Nunito_700Bold',
      color:'#8fa7b3',
     
    },
  
    createShelterButton:{
      width:56,
      height:56,
      backgroundColor:'#26a867',
      borderRadius:20,
  
      justifyContent:'center',
      alignItems:'center',
    },
  
  });
  
  
  
