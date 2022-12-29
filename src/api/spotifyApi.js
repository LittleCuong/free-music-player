import axiosClient from "./apiClient";
import apiConfig from "./apiConfig";

const spotifyApi = {
    getNewRelease: () => {
        const url = 'browse/new-releases?country=VN&limit=5'
        return axiosClient.get(url)
    },
    getTrendingTrack: (params) => {
        const url = 'playlists/37i9dQZEVXbMDoHDwVN2tF'
        return axiosClient.get(url, params);
    },
    getTodayTopHits: () => {
        const url = '/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks'
        return axiosClient.get(url)
    },
    getCategoryPlaylist: (id) => {
        const url = `/browse/categories/${id}/playlists`
        return axiosClient.get(url)
    },
    getPlaylistCoverImage: (id) => {
        const url = `/playlists/${id}/images`
        return axiosClient.get(url)
    },
    getPlaylist: (id) => {
        const url = `/playlists/${id}`
        return axiosClient.get(url)
    },
    getArtistDetails: (id) => {
        const url = 'artists/' + id;
        return axiosClient.get(url, {params: {}});
    },
    getArtistsTopTracks: (id) => {
        const url = `artists/${id}/top-tracks?market=ES`;
        return axiosClient.get(url, {params: {}});
    },
    // search: (cate, params) => {
    //     const url = 'search/' + category[cate];
    //     return axiosClient.get(url, params);
    // },
    // searchResult: (id) => {
    //     const url = 'movie/' + id
    //     return axiosClient.get(url, {params: {}})
    // },
    getSongDetails: (id) => {
        const url = `/tracks/${id}`;
        return axiosClient.get(url, {params: {}})
    },
    getCategories: () => {
        const url = '/browse/categories';
        return axiosClient.get(url, {params: {}})
    },
}

export default spotifyApi;