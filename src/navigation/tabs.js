import React from "react";
import {
    View,
    Image,
    
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"

import { Electro, Gaz, Water } from "../screens"
import { COLORS, icons } from "../constants"

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator
   
            screenOptions={{
               headerShown:false,
                tabBarShowLabel:false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 0,
                        backgroundColor: COLORS.black,
                        borderTopColor: "transparent",
                        height: 80
                    }
                }}
        >
            <Tab.Screen
                name="Electro"
                component={Electro}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image
                                source={icons.electro}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.yellow : COLORS.whitelight
                                }}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Gaz"
                component={Gaz}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.fire}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.red : COLORS.whitelight
                                }}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Water"
                component={Water}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.water}
                                resizeMode="contain"
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? COLORS.blue : COLORS.whitelight
                                }}
                            />
                        </View>
                    )
                }}
            />
    
        </Tab.Navigator>
    )
}



export default Tabs;