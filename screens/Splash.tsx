import React from "react";
import { View, Text, Image } from 'react-native';
import { HomeStackNavigationProp } from '../type';

export default function Splash(){
    return(
        <View style={{flex: 1,
            backgroundColor:"#CB80AB",
            justifyContent:'center',
            alignContent:'center',
            alignItems:'center',
         }}>
            <Image source={require("../assets/progress-bar.png")}
            style={{width:80, height:80}}
             />
             <Text style ={{marginTop:30, color: "#F5F5F5"}}>
                Loading...
             </Text>
        </View>
    )
}