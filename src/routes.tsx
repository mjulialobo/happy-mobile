import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen } = createStackNavigator();

import SheltersMap from './pages/SheltersMap';
import ShelterDetails from './pages/ShelterDetails';

export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false}}>
                <Screen name="SheltersMap" component={SheltersMap}/>
                <Screen name="ShelterDetails" component={ShelterDetails}/>
            </Navigator>
        </NavigationContainer>

    );
}