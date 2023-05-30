import sqlite from 'react-native-sqlite-storage';

const db = sqlite.openDatabase(
    {
        name: 'MovieDB',
        location: 'default'
    }, 
    () => {},
    error => { console.log(error) }
);

export const createTable = (Genre) => {
    try {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                +Genre
                +"_MOVIES "
                +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, overview TEXT, genre_ids TEXT, backdrop_path TEXT, poster_path TEXT, vote_average TEXT, vote_count TEXT)"
            )
        })
    } catch (error) {
        console.log(error);
    }
    
}

export const DataAdd = async (Genre, title, overview, genre_ids, backdrop_path, poster_path, vote_average, vote_count) => {
    try {
        await db.transaction(async (tx) => {
            await tx.executeSql(
                "INSERT INTO "+Genre+"_MOVIES (title, overview, genre_ids, backdrop_path, poster_path, vote_average, vote_count) VALUES (?,?,?,?,?,?,?)",[title, overview, genre_ids, backdrop_path, poster_path, vote_average, vote_count]
            )
        });
    } catch (error) {
        console.log(error);
    }
}