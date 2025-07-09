import { useEffect } from 'react';
import './SelectedPost.css';
import { useNavigate, useParams } from 'react-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { clearSelectedPost, errorSelector, isLoadingSelectedPost, selectedPostSelector } from '../../store/postSlice';
import { fetchSelectedPost } from '../../store/postsThunk';



const SelectedPost = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const dispatch = useAppDispatch();

    const selectedPost = useAppSelector(selectedPostSelector);
    const loading = useAppSelector(isLoadingSelectedPost);
    const error = useAppSelector(errorSelector)

    useEffect(() => {
        if (id) {
            const postId = parseInt(id);
            dispatch(fetchSelectedPost(postId))
        }
        return () => {
            dispatch(clearSelectedPost())
        };
    }, [id, dispatch]);

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
            {loading&&(<div className='post__loading'>Loading post...</div>)}
            {error&&(<div className='post__error'>{error}</div>)}
            {!selectedPost && !loading && !error && (<div className='post__not-found'>Post not found</div>)}

            {selectedPost && (
            <div className='post__card'>
                <div className='post__content'>
                    <p className='post__date'>Date: {selectedPost.date}</p>
                    <h2 className='post__title'>{selectedPost.title}</h2>
                    <p className='post__text'>{selectedPost.text}</p>
                    <p>Lesson: {selectedPost.lesson_num}</p>
                    <p>Author ID: {selectedPost.author}</p>
                </div>
                {selectedPost.image && (
                    <div className='post__image-wrapper'>
                        <img
                            className="post__image"
                            src={selectedPost.image}
                            alt={selectedPost.title} />
                    </div>
                )}
            </div>
        )}
        </div>
    );
};
export default SelectedPost;