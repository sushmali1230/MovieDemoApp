import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View, Text, FlatList } from 'react-native';
import { IMAGE_PATH } from '../utils/AppConstants';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getGeners } from '../api/api';

const MovieDetails = ({ route }) => {

    const [movieTitle,setMovieTitle] = useState(route.params.title);
    const [moviePoster,setMoviePoster] = useState(route.params.poster_path);
    const [movieOverview,setMovieOverview] = useState(route.params.overview);
    const [movieRating, setMovieRating] = useState(route.params.vote_average);
    const [voteCount, setVoteCount] = useState(route.params.popularity);
    const [genreIDS, setGenreIDS] = useState(route.params.genre_ids);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGeners().then(res => {
            var tempGeners = [];
            for (let i = 0; i < res.genres.length; i++) {
                if (genreIDS.includes(res.genres[i].id)) {
                    tempGeners.push(res.genres[i].name);
                } else {

                }
            }
            setGenres(tempGeners);
        })
    }, []);

    const renderGenres = ({ item }) => {
        return(
            <Text style={styles.genreView}>{item}</Text>
        )
    }

    return (
        <View>
            <Image style={styles.posterImage} source={{ uri: IMAGE_PATH + moviePoster }}/>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.titleText}>{movieTitle}</Text>
                    <FlatList
                        style={styles.genreFlatList}
                        data={genres}
                        horizontal={true}
                        renderItem={renderGenres}/>
                    <View style={styles.starAndViewsContainer}>
                        <View style={styles.starRatingContainer}>
                        <Text style={styles.starRatingText}>{movieRating}</Text>
                            {Math.trunc(movieRating/2) === 0 ?
                            <View style={styles.starContainer}>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                            </View> : Math.trunc(movieRating/2) === 1 ?
                            <View style={styles.starContainer}>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                            </View> : Math.trunc(movieRating/2) === 2 ?
                            <View style={styles.starContainer}>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                            </View> : Math.trunc(movieRating/2) === 3 ?
                            <View style={styles.starContainer}>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                            </View> : Math.trunc(movieRating/2) === 4 ?
                            <View style={styles.starContainer}>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starempty.png')}/>
                            </View> : Math.trunc(movieRating/2) === 5 ?
                            <View style={styles.starContainer}>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                                <Image style={styles.starIcon} source={require('../assets/icons/starnoborder.png')}/>
                            </View>: <View/>}
                        </View>
                        <View style={styles.viewContainer}>
                            <Image style={styles.eyeIcon} source={require('../assets/icons/small_eye.png')}></Image>
                            <Text style={styles.viewText}>{voteCount}</Text>
                        </View>
                    </View>
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
        color: 'black',
        marginHorizontal: 20,
        marginVertical: 10
    },
    descriptionText: {
        fontSize: 16,
        marginHorizontal: 20,
        marginVertical: 10
    },
    starAndViewsContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 20
    },
    starRatingText: {
        color: '#FDD128',
        fontSize: 18,
        fontWeight: '700',
        marginRight: 10
    },
    starRatingContainer: {
        flexDirection: 'row',
        flex: 1
    },
    starContainer: {
        flexDirection: 'row'
    },
    starIcon: {
        height: 22,
        width: 22,
        resizeMode: 'stretch'
    },
    viewContainer: {
        flexDirection: 'row',
        flex: 1,
        marginRight: 10,
        justifyContent: 'flex-end'
    },
    eyeIcon: {
        height: 28,
        width: 28,
        marginRight: 10,
        resizeMode: 'stretch'
    },
    viewText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black'
    },
    genreView: {
        fontSize: 14,
        color: 'black',
        backgroundColor: '#E0E0E0',
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderRadius: 20,
        marginRight: 12
    },
    genreFlatList: {
        marginLeft: 10,
        marginVertical: 10
    }
});

export default MovieDetails;