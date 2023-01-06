import axios from "axios";

const spotifyApi = {
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
    getSeveralArtists: async (id, token) => {
        const result = await axios(`https://api.spotify.com/v1/artists?ids=${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
        return result
    },
    getAlbums: async (id, token) => {
        const result = await axios(`https://api.spotify.com/v1/artists/${id}/albums`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
        return result
    },
    getAlbumTracks: async (id, token) => {
        const result = await axios(`https://api.spotify.com/v1/albums/${id}/tracks`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
        return result
    },
    getResults: async (string, token) => {
        const result = await axios(`https://api.spotify.com/v1/search?q=${string}&type=track%2Cartist&limit=10`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
        return result
    },
}

export default spotifyApi;