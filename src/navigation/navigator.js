import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from "../screens/Splash";
import MovieList from "../screens/MovieList";
import { getGeners } from "../api/api";
import MovieDetails from "../screens/MovieDetails";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
var menu = [];

const navigator = () => {
    useEffect(() => {
        getGeners().then(res => {
            console.log('result'+JSON.stringify(res.genres));
            menu = res.genres;
        })
    }, []);
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="MovieDetails" component={MovieDetails} options={{ headerShown: false }}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Dashboard = () => {
    const tabs = menu.map(menuItem => <Tab.Screen name={menuItem.name} component={MovieList} initialParams={{ genresID: menuItem.id, genreName: menuItem.name }}/>);
    return (
        <Tab.Navigator screenOptions={{ tabBarScrollEnabled: true, tabBarInactiveTintColor: 'white', tabBarActiveTintColor: 'white', tabBarItemStyle: { backgroundColor: 'red' } }}>
            {tabs}
        </Tab.Navigator>
    )
}

export default navigator;