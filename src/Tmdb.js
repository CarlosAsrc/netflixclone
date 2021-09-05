const API_BASE = 'https://tmdb-server-proxy.herokuapp.com/api'


const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json()
    return json.response
}

export default {

    getHomeList: async () => {
        return await basicFetch('/home-list')
    },

    getMovieInfo: async (movieId, type) => {
        return await basicFetch(`/movie-info?movieId=${movieId}&type=${type}`)
    }
}