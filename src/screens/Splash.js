import React, { useEffect } from 'react';
import { PermissionsAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { getGeners } from '../api/api';

const Splash = () => {

    const navigation = useNavigation();
    useEffect(() => {
        request_runtime_permission();
    }, []);

    const request_runtime_permission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                'title': 'ReactNativeCode Write Permission',
                'message': 'ReactNativeCode App needs access to write data '
                }
            );
            const granted1 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                'title': 'ReactNativeCode Read Permission',
                'message': 'ReactNativeCode App needs access to read data '
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                if (granted1 === PermissionsAndroid.RESULTS.GRANTED) {
                    setTimeout(() => {
                        navigation.navigate('Dashboard')
                    }, 2000)
                }
                else {
                    console.log("Storage Permission Not Granted");
                }   
            }
            else {
                console.log("Camera Permission Not Granted");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    return (
        <View>

        </View>
    )
}

export default Splash;