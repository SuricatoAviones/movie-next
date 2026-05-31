export default function Posts({posts}) {
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )

}
// Esta función corre en build Time (Ejemplo SSG con GetStaticProps)
export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    return {
        props: {
            posts
        },
        revalidate: 10, // Esto hace que se regenere la página cada 10 segundos (ISR)
    }
}
