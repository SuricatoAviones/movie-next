/* Ejemplo con SSR */
export default function PostDetail({ post }) {
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    )
}

// Esta función corre en cada request (Ejemplo SSR con GetServerSideProps)
export async function getServerSideProps({params}) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await res.json()

    // Si el post no existe, podemos retornar un 404
    if (!post.id) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            post
        }
    }
}