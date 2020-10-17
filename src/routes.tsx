import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen } = createStackNavigator();

import SheltersMap from './pages/SheltersMap';
import ShelterDetails from './pages/ShelterDetails';
import SelectMapPositon from './pages/CreateShelter/SelectMapPosition';
import ShelterData from './pages/CreateShelter/ShelterData';
import Header from './components/Header'

export default function Routes(){
   
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false, cardStyle:{backgroundColor: '#f2f3f5'}}}>
                
                <Screen name="SheltersMap" component={SheltersMap}/>

                <Screen 
                name="ShelterDetails" component={ShelterDetails} 
                options={{headerShown:true,header:() => <Header showCancel={false} title="Informações do Abrigo"/>}}
                />

                <Screen name="SelectMapPosition" component={SelectMapPositon}
                options={{headerShown:true,header:() => <Header title="Selecione o endereço no mapa"/>}}
                />


                <Screen name="ShelterData" component={ShelterData}
                options={{headerShown:true,header:() => <Header title="Informe os dados do abrigo"/>}}
                />

            </Navigator>
        </NavigationContainer>

    );
}