import { useState, useEffect } from 'react';
import './Posts.css'
type Post = {
    id: number,
    image?: string,
    text: string,
    date: string,
    lesson_num: number,
    title: string,
    author: number
}


const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        // Функция загрузки данных
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://studapi.teachmeskills.by/blog/posts/');
                const data = await response.json()
                setPosts(data.results);

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();

    }, []);
    return (
        <div className="post-wrapper">
            {/* отрисовка карточек */}
            {posts.map(post => (
                <div key={post.id} className='post-card'>
                    <div className='post-content'>
                        <p className='post-date'>Date: {post.date}</p>
                        <h2 className='post-title'>{post.title}</h2>
                        <p className='post-text'>{post.text}</p>
                        <p>Lesson: {post.lesson_num}</p>
                        <p>Author ID: {post.author}</p>
                    </div>

                    <div className='post-img-wrapper'>
                        {/* условный рендеринг для изображения */}
                        {post.image && (
                            <img
                                className="post-image"
                                src={post.image}
                                alt={post.title} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Posts;