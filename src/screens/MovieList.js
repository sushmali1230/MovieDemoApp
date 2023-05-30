import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { getMovies } from '../api/api';
import { BASE_URL, IMAGE_PATH } from '../utils/AppConstants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataAdd, createTable } from '../sqlite/sqlitefunctions';

const MovieList = ({ route }) => {
    const navigation = useNavigation();
    const [genreID, setGenreID] = useState(route.params.genresID);
    const [genreName, setGenreName] = useState(route.params.genreName);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        createTable(genreName)
        getMovies(genreID).then(res => {
            for (let i = 0; i< res.results ; i++) {
                DataAdd(genreName, res.results[i].title, res.results[i].overview, res.results[i].genre_ids, res.results[i].backdrop_path, res.results[i].poster_path, res.results[i].vote_average, res.results[i].vote_count);
            }
        });
        getData();
    }, []);

    function getData () {
        try {
            db.transaction(async (tx) => {
                
                tx.executeSql(
                    "SELECT title, overview, genre_ids, backdrop_path, poster_path, vote_average, vote_count FROM "+genreName+"_MOVIES",[],
                    (tx, results) => {
                        var tempResult = [];
                        var i = 0;
                        for (i = 0; i < results.rows.length; i++) {
                            tempResult.push(results.rows.item(i))
                        }
                        setMovies(tempResult);
                    }
                )
            })
        } catch (error) {
            console.log(error);
        }    
    }

    // const updateDatabase = async () => {
    //     const storedTimeString = await AsyncStorage.getItem('LastTimeStored');
    //     const getTimeString = new Date();

    //     if (storedTime === null || storedTime === undefined || storedTime === "null" || storedTime === "undefined" || storedTime === "") {

    //     } else if ()
    // }

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