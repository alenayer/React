import { useState, useEffect } from 'react';
import './SelectedPost.css';
import { useNavigate, useParams } from 'react-router';
import { useTheme } from '../../contexts/ThemeContext';
import type { Post } from '../../types/post';



const SelectedPost = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (!id) {
                    setError('Post ID is missing');
                    setLoading(false);
                    return;
                }
                const response = await fetch(`https://studapi.teachmeskills.by/blog/posts/${id}`);

                if (!response.ok) {
                    setError(`Error: ${response.status} ${response.statusText}`)
                    setLoading(false);
                    return;
                }
                const data = await response.json()
                setPost(data);

            } catch (error) {
                setError('Failed to load post');
            } finally {
                setLoading(false)
            }
        };
        fetchPost();

    }, [id]);

    const handleBack = () => {
        navigate('/posts');
    };

    return (
        <div className={`selected__post ${theme}__inner`}>
            <button
                onClick={handleBack}
                className='back__btn'
            >
                Back to All Posts
            </button>

            {loading && <div>Loading post...</div>}
            {error && <div className='error'>{error}</div>}
            {!loading && !error && !post && <div>No post found.</div>}

            {post && (
                <div className='post__card'>
                    <div className='post__content'>
                        <p className='post__date'>Date: {post.date}</p>
                        <h2 className='post__title'>{post.title}</h2>
                        <p className='post__text'>{post.text}</p>
                        <p>Lesson: {post.lesson_num}</p>
                        <p>Author ID: {post.author}</p>
                    </div>
                    {post.image && (
                        <div className='post__image-wrapper'>
                            <img
                                className="post__image"
                                src={post.image}
                                alt={post.title} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default SelectedPost;