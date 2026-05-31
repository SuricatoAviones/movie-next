import Link from "next/link";
import Image from "next/image";

const IMG_BASE = "https://image.tmdb.org/t/p/w300";

export default function Movies({ movies, currentPage, totalPages }) {
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return (
        <div>
            <h1>Películas Populares</h1>

            <p>Página {currentPage} de {totalPages}</p>

            <div>
                {movies.map(movie => (
                    <div key={movie.id}>
                        <Link href={`/movies/${movie.id}?page=${currentPage}`}>
                            {movie.poster_path && (
                                <Image
                                    src={`${IMG_BASE}${movie.poster_path}`}
                                    alt={movie.title}
                                    width={300}
                                    height={450}
                                />
                            )}
                            <h2>{movie.title}</h2>
                            <p>Rating: {movie.vote_average.toFixed(1)}</p>
                        </Link>
                    </div>
                ))}
            </div>

            <nav aria-label="Paginación de películas">
                {previousPage ? (
                    <Link href={`/movies?page=${previousPage}`}>← Anterior</Link>
                ) : (
                    <span>← Anterior</span>
                )}

                {nextPage ? (
                    <Link href={`/movies?page=${nextPage}`}>Siguiente →</Link>
                ) : (
                    <span>Siguiente →</span>
                )}
            </nav>
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const pageParam = Array.isArray(query.page) ? query.page[0] : query.page;
    const parsedPage = Number.parseInt(pageParam ?? "1", 10);
    const currentPage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY_MOVIE}&page=${currentPage}`);
    const data = await res.json();
    const totalPages = Math.min(data.total_pages ?? 1, 500);

    return {
        props: {
            movies: data.results ?? [],
            currentPage,
            totalPages,
        },
    };
}