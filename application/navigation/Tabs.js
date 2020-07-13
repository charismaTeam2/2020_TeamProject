import React, { useEffect } from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Mycloset from "../screens/Mycloset";
import Ootd from "../screens/Ootd";
import Camera from "../screens/Camera";
import Recommend from "../screens/Recommend";
import Recocheck from "../screens/Recocheck";
import Recommendd from "../screens/Recommendd";
import { Ionicons,MaterialCommunityIcons,AntDesign,Feather,Entypo } from "@expo/vector-icons";



const Tabs = createBottomTabNavigator();


export default ({navigation, route}) =>{
    useEffect(() => {
        navigation.setOptions({
            title: route?.state?.routeNames[route.state.index] || "Mycloset"
        });
    },[route]);
    return (
    <Tabs.Navigator
        screenOptions={ ({ route }) => ({
            tabBarIcon : ({ focused, color, size}) =>{
                let iconName;

                if(route.name === '내옷장'){
                    iconName = 'grid'
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                }else if(route.name === '게시판'){
                    iconName = 'ios-list-box'
                    return <Ionicons name={iconName} size={size} color={color} />;
                }else if(route.name === 'Camera'){
                    iconName = 'camera'
                    return <AntDesign name={iconName} size={size} color={color} />;
                }else if(route.name === '옷추천'){
                    iconName = 'eye'
                    return <Feather name={iconName} size={size} color={color} />;
                }else if(route.name === '팔로워'){
                    iconName = 'users'
                    return <Entypo name={iconName} size={size} color={color} />;
                }else if(route.name === 'Setting'){
                    iconName = 'ios-settings'
                    return <Ionicons name={iconName} size={size} color={color} />
                }
            }
        })}
        tabBarOptions={{
            activeTintColor : 'tomato',
            inactiveTintColor : 'gray'
        }}
    >
        <Tabs.Screen name="내옷장" component={Mycloset}/>
        <Tabs.Screen name="게시판" component={Ootd}/>
        <Tabs.Screen name="Camera" component={Camera}/>
        <Tabs.Screen name="옷추천" component={Recommend}/>
        <Tabs.Screen name="팔로워" component={Recommendd}/>
        <Tabs.Screen name="Setting" component={Recocheck}/>
    </Tabs.Navigator>
    );
};
