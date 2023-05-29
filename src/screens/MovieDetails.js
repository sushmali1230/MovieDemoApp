import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View, Text } from 'react-native';
import { IMAGE_PATH } from '../utils/AppConstants';

const MovieDetails = ({ route }) => {

    const [movieTitle,setMovieTitle] = useState(route.params.title);
    const [moviePoster,setMoviePoster] = useState(route.params.poster_path);
    const [movieOverview,setMovieOverview] = useState(route.params.overview);

    return (
        <View>
            <Image style={styles.posterImage} source={{ uri: IMAGE_PATH + moviePoster }}/>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.titleText}>{movieTitle}</Text>
                    <Text style={styles.descriptionText}>{movieOverview}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: (Dimensions.get('screen').height/3) - 70
    },
    posterImage: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height/3,
        position: 'absolute',
        top: 0
    },
    titleText: {
        fontSize: 25,
        fontWeight: '700',
        marginHorizontal: 20,
        marginVertical: 10
    },
    descriptionText: {
        fontSize: 16,
        marginHorizontal: 20,
        marginVertical: 10
    }
});

export default MovieDetails;