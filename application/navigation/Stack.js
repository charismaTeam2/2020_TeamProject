//Stack 네비게이션은 다른것들 위에있음.
//stacknavigatrion설치해야됨
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Tabs from "../navigation/Tabs";
import Home from "../screens/Home";
import Member from "../screens/Member"
import Border from "../screens/Border";
import Recommend from "../screens/Recommend";
import Recocheck from "../screens/Recocheck";
import Recommendd from "../screens/Recommendd";


const Stack = createStackNavigator();

//screen을 다 넣으면됨
//srceen을 컴포넌트와 이름이 필요하다.
//App.js에 네비게이션을 랜더해줘야됨.
//stack navigator이 스크린들에게 prop을 줌

export default () => (    
    <Stack.Navigator>
        <Stack.Screen name= "おすすめ服" component={Home}/>
        <Stack.Screen name= "MyCloset" component={Tabs}/>        
        <Stack.Screen name= "Member" component={Member}/>
        <Stack.Screen name= "글쓰기" component={Border}/>       
        <Stack.Screen name="옷추천" component={Recommend}/>
        <Stack.Screen name="옷추천확인" component={Recocheck}/>      
        <Stack.Screen name="추천" component={Recommendd}/>
    </Stack.Navigator>
 
)