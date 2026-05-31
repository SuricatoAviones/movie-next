export default async function handler(req, res) {
    if(req.method !== 'GET') {
        res.status(405).json({ message: 'Metodo no permitido' })
    }

    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY_MOVIE}`)
        const movies = await response.json()
        res.status(200).json(movies)
    } catch(error) {
        res.status(500).json({ message: 'Error al obtener las peliculas' })
    }
}