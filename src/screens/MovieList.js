import React, { useEffect, useState } from 'react';
import { View, Image, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { getMovies } from '../api/api';
import { BASE_URL, IMAGE_PATH } from '../utils/AppConstants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataAdd, createTable } from '../sqlite/sqlitefunctions';
import sqlite from 'react-native-sqlite-storage';

const MovieList = ({ route }) => {
    const navigation = useNavigation();
    const [genreID, setGenreID] = useState(route.params.genresID);
    const [genreName, setGenreName] = useState(route.params.genreName);
    const [movies, setMovies] = useState([]);

    // const db = sqlite.openDatabase(
    //     {
    //         name: 'MovieDB',
    //         location: 'default'
    //     }, 
    //     () => {},
    //     error => { console.log(error) }
    // );

    useEffect(() => {
        //createTable(genreName)
        getTimeDifference();
        //getData();
    }, []);

    const getTimeDifference = async () => {
        const savedTimeString = await AsyncStorage.getItem('SavedTime');
        if (savedTimeString === null || savedTimeString === undefined || savedTimeString === "null" || savedTimeString === "undefined" || savedTimeString === "") {
            await AsyncStorage.setItem('SavedTime', JSON.stringify(new Date()))
            getMovies(genreID).then(res => {
                saveData(res.results)
            });
            console.log("Data Saved First Time");
        } else {
            const savedTime = new Date(JSON.parse(savedTimeString));
            var date2 = new Date();

            if (date2 < savedTime) {
                date2.setDate(date2.getDate() + 1);
            }
            var diff = date2 - savedTime;
            var msec = diff;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            msec -= mm * 1000 * 60;
            if (hh >= 4 && mm > 0) {
                getMovies(genreID).then(res => {
                    saveData(res.results)
                });
                console.log("Time Changed.");
            } else {
                getData();
                console.log("Got Data From Local. Time Not Changed.");
            }
        }
    }

    const saveData = async (result) => {
        await AsyncStorage.setItem(genreName+'MOVIES', JSON.stringify(result));
        getData();
    }

    const getData = async () => {
        const data = await AsyncStorage.getItem(genreName+'MOVIES');
        setMovies(JSON.parse(data));
    }

    // const addData = async (res) => {
    //     for (let i = 0; i< res.results ; i++) {
    //         DataAdd(genreName, res.results[i].title, res.results[i].overview, res.results[i].genre_ids, res.results[i].backdrop_path, res.results[i].poster_path, res.results[i].vote_average, res.results[i].vote_count);
    //     }
    //     getData();
    // }

    // const getData = async () => {
    //     try {
    //         await db.transaction(async (tx) => {
                
    //             tx.executeSql(
    //                 "SELECT title, overview, genre_ids, backdrop_path, poster_path, vote_average, vote_count FROM "+genreName+"_MOVIES",[],
    //                 (tx, results) => {
    //                     var tempResult = [];
    //                     var i = 0;
    //                     //console.log(results.rows.item);
    //                     for (i = 0; i < results.rows.length; i++) {
    //                         tempResult.push(results.rows.item(i))
    //                     }
    //                     console.log(tempResult);
    //                     //setMovies(tempResult);
    //                 }
    //             )
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }    
    // }

    // const updateDatabase = async () => {
    //     const storedTimeString = await AsyncStorage.getItem('LastTimeStored');
    //     const getTimeString = new Date();

    //     if (storedTime === null || storedTime === undefined || storedTime === "null" || storedTime === "undefined" || storedTime === "") {

    //     } else if ()
    // }

    const renderMovies = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', { title: item.title, poster_path: item.poster_path, overview: item.overview, vote_average: item.vote_average, popularity: item.popularity, genre_ids: item.genre_ids })}>
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