import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { getMovies } from '../api/api';
import { BASE_URL, IMAGE_PATH } from '../utils/AppConstants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const MovieList = ({ route }) => {
    const navigation = useNavigation();
    const [genreID, setGenreID] = useState(route.params.genresID);
    const [genreName, setGenreName] = useState(route.params.genreName);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies(genreID).then(res => {
            setMovies(res.results);
        })
    }, []);

    const renderMovies = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: item.title, poster_path: item.poster_path, overview: item.overview })}>
                <View style={styles.movieContainer}>
                    <Image style={styles.movieImage} source={{ uri: IMAGE_PATH + item.backdrop_path }}></Image>
                    <Text style={styles.movieText}>{item.title}</Text>
                </View>    
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={2}
                data={movies}
                renderItem={renderMovies}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    movieContainer: {
        width: (Dimensions.get('screen').width/2)-1,
        height: 150
    },
    movieImage: {
        flex: 1,
        height: 150,
        width: (Dimensions.get('screen').width/2)-1,
    },
    movieText: {
        position: 'absolute',
        bottom: 10,
        marginLeft: 10,
        fontSize: 18,
        color: 'white',
    }
})

export default MovieList;