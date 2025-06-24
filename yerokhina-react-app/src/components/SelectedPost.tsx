import { useState, useEffect } from 'react';
import './SelectedPost.css';


type Post = {
    id: number,
    image?: string,
    text: string,
    date: string,
    lesson_num: number,
    title: string,
    author: number
}

type SelectedPostProps = {
    postId: number | null;
    onBack: () => void;
    theme?: 'light' | 'dark';
}


const SelectedPost = ({ postId, onBack }: SelectedPostProps) => {
    const [post, setPost] = useState<Post | null>(null);
    useEffect(() => {
        if (!postId) return;
        // Функция загрузки данных
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://studapi.teachmeskills.by/blog/posts/${postId}`);
                const data = await response.json()
                setPost(data);

            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();

    }, [postId]);
    return (
        <div className='selected__post'>
            <button
                onClick={onBack}
                className='back__btn'
            >
                Back to All Posts
            </button>
            {post ? (
                <>
                    <div className='post__card'>
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



                </>) :
                (<div>Loading post...</div>
                )}
        </div>
    );
};
export default SelectedPost;