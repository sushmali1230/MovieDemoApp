import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { getGeners } from '../api/api';

const Splash = () => {

    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Dashboard')
        }, 2000)
    }, [])

    return (
        <View>

        </View>
    )
}

export default Splash;