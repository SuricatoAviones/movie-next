/* pages/movies/[id].js   con SSR */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetail({ movie, backPage }) {
    const backHref = backPage ? `/movies?page=${backPage}` : '/movies';

    return (
        <>
        
            <Head>
                <title>{movie.title} | Mi App de Peliculas</title>
                <metadata name="description" content={`Detalles de la película ${movie.title}`} />
            </Head>

            <div>
                <Link href={backHref}>← Volver a la lista de películas</Link>
                {
                    movie.poster_path && (
                        <Image
                            src={`${IMG_BASE}${movie.poster_path}`}
                            alt={movie.title}
                            width={200}
                            height={300}
                        />
                    )
                }
                <div>
                    <h1>{movie.title}</h1>
                    <p>Rating: {movie.vote_average.toFixed(1)}</p>
                    <p>{movie.release_date}</p>
                    <p>{movie.overview}</p>
                </div>

            </div>
        
        
        
        </>
    )
}

export async function getServerSideProps({ params, query }) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.API_KEY_MOVIE}`)
    const movie = await res.json();
    const pageParam = Array.isArray(query.page) ? query.page[0] : query.page;
    const parsedPage = Number.parseInt(pageParam ?? '', 10);
    const backPage = Number.isNaN(parsedPage) || parsedPage < 1 ? null : parsedPage;

    //console.log(movie)
    if(!movie.id) return { notFound: true }

    return { props: { movie, backPage } }
}
