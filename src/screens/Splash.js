import React, { useEffect } from 'react';
import { PermissionsAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { getGeners } from '../api/api';

const Splash = () => {

    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Dashboard')
        }, 2000)
    }, []);

    const requestStoreagePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Movie App Storage Permission',
                    message:
                        'Movie App needs access to your storage '
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the storage');
                
            } else {
                console.log('Storage permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <View>

        </View>
    )
}

export default Splash;