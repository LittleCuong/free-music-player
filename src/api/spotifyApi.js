import axiosClient from "./apiClient";
import apiConfig from "./apiConfig";
import axios from "axios";

const spotifyApi = {
    // getNewRelease: () => {
    //     const url = 'browse/new-releases?country=VN&limit=5'
    //     return axiosClient.get(url)
    // },
    // getTrendingTrack: (params) => {
    //     const url = 'playlists/37i9dQZEVXbMDoHDwVN2tF'
    //     return axiosClient.get(url, params);
    // },
    // getTodayTopHits: () => {
    //     const url = '/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks'
    //     return axiosClient.get(url)
    // },
    // getPlaylistCoverImage: (id) => {
    //     const url = `/playlists/${id}/images`
    //     return axiosClient.get(url)
    // },
    // getPlaylist: (id) => {
    //     const url = `/playlists/${id}`
    //     return axiosClient.get(url)
    // },
    // getArtistDetails: (id) => {
    //     const url = 'artists/' + id;
    //     return axiosClient.get(url, {params: {}});
    // },
    // getArtistsTopTracks: (id) => {
    //     const url = `artists/${id}/top-tracks?market=ES`;
    //     return axiosClient.get(url, {params: {}});
    // },
    // search: (cate, params) => {
    //     const url = 'search/' + category[cate];
    //     return axiosClient.get(url, params);
    // },
    // searchResult: (id) => {
    //     const url = 'movie/' + id
    //     return axiosClient.get(url, {params: {}})
    // },
    // getSongDetails: (id) => {
    //     const url = `/tracks/${id}`;
    //     return axiosClient.get(url, {params: {}})
    // },
    // getCategories: () => {
    //     const url = '/browse/categories';
    //     return axiosClient.get(url, {params: {}})
    // },
    getCategoryPlaylist: async (id, token) => {
        const result = await axios(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token }
        })
        return result
    },
    getCategories: async (token) => {
        const result = await axios(`https://api.spotify.com/v1/browse/categories`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        return result
    },
    getNewRelease: (token) => {
        const result = axios(`https://api.spotify.com/v1/browse/new-releases?country=VN&limit=5`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        return result
    },
    getTrendingTrack: async (token) => {
        const result = await axios(`https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        return result
    },
    getTodayTopHits: async (token) => {
        const result = await axios(`https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        return result
    },
    getPlaylistCoverImage: async (id, token) => {
        const result = await axios(`https://api.spotify.com/v1/playlists/${id}/images`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        return result
    },
    getPlaylist: async (id, token) => {
        const result = await axios(`https://api.spotify.com/v1/playlists/${id}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        return result
    },
    getArtistDetails: async (id, token) => {
        const result = await axios(`https://api.spotify.com/v1/artists/${id}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        return result
    },
    getArtistsTopTracks: async (id, token) => {
        const result = await axios(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
        return result
    },
}

export default spotifyApi;