import Link from "next/link";
import Image from "next/image";

const IMG_BASE = "https://image.tmdb.org/t/p/w300";

export default function Movies({ movies }){
    return (
        <div>
            <h1>Películas Populares</h1>
            <div>
                {movies.map(movie => (
                    <div key={movie.id}>
                        <Link href={`/movies/${movie.id}`}>
                               <Image
                                    src={`${IMG_BASE}${movie.poster_path}`}
                                    alt={movie.title}
                                    width={300}
                                    height={450}
                                /> 
                                <h2>{movie.title}</h2>
                                <p>Rating: {movie.vote_average.toFixed(1)}</p>
                            
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export async function getStaticProps(){
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY_MOVIE}`);
    const data = await res.json();

    return {
        props: {
            movies: data.results.slice(0, 10)
        },
        revalidate: 60, // Revalidar cada 60 segundos
    }
}