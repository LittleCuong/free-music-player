import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// var token =  localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
var auth = JSON.parse(localStorage.getItem('token'))

export const spotifyApi = createApi({
    reducerPath: 'spotifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spotify.com/v1',
        mode: "cors",
        headers: {'Authorization' : 'Bearer ' + auth}
}),
    endpoints: (builder) => ({
        getNewRelease: builder.query({ query: () => '/browse/new-releases?country=VN&limit=5' }),
        getTrendingTracks: builder.query({ query: () => '/playlists/37i9dQZEVXbMDoHDwVN2tF' }),
        getArtistDetails: builder.query({ query: (artistId) => `artists/${artistId}` }),
        getArtistsTopTracks: builder.query({ query: ({artistId}) => `/artists/${artistId}/top-tracks`}),
        getSongDetails: builder.query({ query: ({ songid }) => `/tracks/${songid}` }),
        getCategories: builder.query( { query: () => '/browse/categories' })
        // getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}` }),
        // getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` }),
    }),
});

export const {
    useGetNewReleaseQuery,
    useGetTrendingTracksQuery,
    useGetArtistDetailsQuery,
    useGetArtistsTopTracksQuery,
    useGetSongDetailsQuery,
    useGetCategoriesQuery,

    // useGetSongsByGenreQuery,
    // useGetSongsBySearchQuery,
} = spotifyApi;