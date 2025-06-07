import { useState, useEffect } from 'react';
import './AllPosts.css';


type Post = {
    id: number,
    image?: string,
    text: string,
    date: string,
    lesson_num: number,
    title: string,
    author: number
}

type AllPostsProps = {
    onPostSelect: (id: number) => void;
}


const AllPosts = ({ onPostSelect }: AllPostsProps) => {
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
        <div className="post__wrapper">
            {/* отрисовка карточек */}
            {posts.map(post => (
                <div 
                key={post.id} 
                className='post__card'
                onClick={()=>onPostSelect(post.id)}
                >
                    <div className='post__content'>
                        <p className='post__date'>Date: {post.date}</p>
                        <h2 className='post__title'>{post.title}</h2>
                        <p className='post__text'>{post.text}</p>
                        <p>Lesson: {post.lesson_num}</p>
                        <p>Author ID: {post.author}</p>
                    </div>

                    
                        {/* условный рендеринг для изображения */}
                        {post.image && (
                            <div className='post__image-wrapper'>
                            <img
                                className="post__image"
                                src={post.image}
                                alt={post.title} />
                                </div>
                        )}
                    
                </div>
            ))}
        </div>
    );
};
export default AllPosts;