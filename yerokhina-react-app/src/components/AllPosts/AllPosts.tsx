import { useState, useEffect, type ChangeEvent } from 'react';
import './AllPosts.css';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router';
import type { Post } from '../../types/post';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addToFavorites, disLikePost, likePost, openImagePreview, openPreview, removeFromFavorites, setActiveTab } from '../../store/postSlice';
import PostPreview from '../PostPreview/PostPreview';
import ImagePreview from '../ImagePreview/ImagePreview';
import { fetchPosts } from '../../store/postsThunk';

const AllPosts = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [search, setSearch] = useState<string>('');

    const dispatch = useAppDispatch();
    const { isPreviewOpen, isImagePreviewOpen } = useAppSelector(state => state.post)
    const { posts, activeTab, loading, error, favorites } = useAppSelector(state => state.post);

    // сортировка для вкладки popular
    const popularPosts = [...posts].sort((a, b) => b.likes - a.likes);
    // фильтрация  для избранного
    const favoritePosts = posts.filter(post => favorites.includes(post.id));
    const displayedPosts =
        activeTab === 'all' ? posts :
            activeTab === 'popular' ? popularPosts :
                favoritePosts;

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);


    // Фильтрация при изменении поиска
    const filteredPosts = search ?
        posts.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.text.toLowerCase().includes(search.toLowerCase())
        )
        :
        posts;

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const handleCardClick = (e: React.MouseEvent, post: Post) => {
        // проверка был ли клик по кнопке или дочерним
        const isButtonClick = (e.target as HTMLElement).closest('.post__preview-open')
        if (!isButtonClick) {
            e.stopPropagation();   //Предотвр-т всплытие
            dispatch(openPreview(post));
        }
    }

    const handleButtonClick = (e: React.MouseEvent, postId: number) => {
        e.stopPropagation();
        navigate(`/posts/${postId}`)
    }

    const handleImageClick = (e: React.MouseEvent, imageUrl: string | undefined) => {
        e.stopPropagation();
        if (!imageUrl) return
        dispatch(openImagePreview(imageUrl));
    }

    const handleLikeClick = (id: number) => {
        dispatch(likePost(id))
    }
    const handleDislikeClick = (id: number) => {
        dispatch(disLikePost(id))
    }
    const handleFavoriteClick = (id: number) => {
        if (favorites.includes(id)) {
            dispatch(removeFromFavorites(id))
        } else {
            dispatch(addToFavorites(id))
        }
    }



    return (
        <div className={`posts__wrapper ${theme}-theme`}>
            {/* переклюяатель табов */}
            <div className='posts__tabs'>
                <button className={activeTab === 'all' ? 'active' : ''}
                    onClick={() => dispatch(setActiveTab('all'))}
                >
                    All posts
                </button>
                <button className={activeTab === 'favorites' ? 'active' : ''}
                    onClick={() => dispatch(setActiveTab('favorites'))}
                >
                    My favorites posts
                </button>
                <button className={activeTab === 'popular' ? 'active' : ''}
                    onClick={() => dispatch(setActiveTab('popular'))}
                >
                    Popular posts
                </button>
            </div>
            {/* основной контент с постами */}
            <div className='posts__search-container'>
                <input
                    type="search"
                    placeholder='Search post...'
                    className='posts__search-input'
                    value={search}
                    onChange={searchHandler} />
                {search && (<div className='search__info'>Найдено:{filteredPosts.length} постов</div>)}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className='posts__error-message'>{error}</p>}
            {!loading && !error && filteredPosts.length === 0 && (
                <p className='posts__no-results'>
                    {search ? 'Ничего не найдено' : 'Нет доступных постов'}
                </p>
            )}

            {filteredPosts.length > 0 && (
                <div className='posts'>
                    {displayedPosts.map(post => (
                        <div
                            key={post.id}
                            className='post__card'
                        >
                            <div className='post__content' onClick={(e) => handleCardClick(e, post)}>
                                <button
                                    className='post__preview-open'
                                    onClick={(e) => {
                                        handleButtonClick(e, post.id)
                                    }}
                                >
                                    View Full Page
                                </button>
                                <p className='post__date'>Date: {post.date}</p>
                                <h2 className='post__title'>{post.title}</h2>
                                <p className='post__text'>{post.text}</p>
                                <p>Lesson: {post.lesson_num}</p>
                                <p>Author ID: {post.author}</p>
                            </div>

                            {post.image && (
                                <div className='post__image-wrapper'
                                    onClick={(e) => handleImageClick(e, post.image)}>
                                    <img
                                        className="post__image"
                                        src={post.image}
                                        alt={post.title}
                                    />
                                </div>
                            )}
                            <div className='vote-buttons'>
                                <button
                                    className='vote-button'
                                    onClick={() => handleFavoriteClick(post.id)}
                                >
                                    {favorites.includes(post.id) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gold" width="24px" height="24px">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24px" height="24px">
                                            <path d="M0 0h24v24H0z" fill="none" />
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" strokeWidth="1.5" />
                                        </svg>
                                    )}
                                </button>
                                <button onClick={() => handleLikeClick(post.id)}
                                    className='vote-button like-button'
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                    </svg>
                                    <span>{post.likes}</span>

                                </button>
                                <button onClick={() => handleDislikeClick(post.id)}
                                    className='vote-button dislike-button'
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                                    </svg>
                                    <span>{post.dislikes}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }


            {/* модалка preview(рендерится только при isPreviewOpen) */}

            {
                isPreviewOpen && (
                    <div className='post__preview-overlay'>
                        <PostPreview />
                    </div>
                )
            }

            {
                isImagePreviewOpen && (
                    <div className='post__preview-overlay'>
                        <ImagePreview />
                    </div>
                )
            }
        </div >
    );
};
export default AllPosts;