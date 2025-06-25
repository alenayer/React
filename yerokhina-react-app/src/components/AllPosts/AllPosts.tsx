import { useState, useEffect, type ChangeEvent } from 'react';
import './AllPosts.css';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router';
import type { Post } from '../../types/post';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { openImagePreview, openPreview } from '../../store/postSlice';
import PostPreview from '../PostPreview/PostPreview';
import ImagePreview from '../ImagePreview/ImagePreview';

const AllPosts = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [posts, setPosts] = useState<Post[]>([]);  //все посты с сервера
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('');

    const dispatch = useAppDispatch();
    const { isPreviewOpen, isImagePreviewOpen } = useAppSelector(state => state.post)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://studapi.teachmeskills.by/blog/posts/');
                if (!response.ok) {
                    setError(`Ошибка: ${response.status} ${response.statusText}`);
                    return; //просто выходим при ошибке
                }
                const data = await response.json()
                setPosts(data.results);


            } catch (err) {
                setError(String(err) || 'Не удалось загрузить посты');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();

    }, []);
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

    const handleImageClick = (e: React.MouseEvent, imageUrl: string|undefined) => {
        e.stopPropagation();
        if(!imageUrl)  return
        dispatch(openImagePreview(imageUrl));
    }
    return (
        <div className={`posts__wrapper ${theme}-theme`}>
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

            {!loading && !error && filteredPosts.length > 0 && (
                <div className='posts'>
                    {filteredPosts.map(post => (
                        <div
                            key={post.id}
                            className='post__card'
                            onClick={(e) => handleCardClick(e, post)}
                        >
                            <div className='post__content'>
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
                        </div>
                    ))}
                </div>
            )}


            {/* модалка preview(рендерится только при isPreviewOpen) */}

            {isPreviewOpen && (
                <div className='post__preview-overlay'>
                    <PostPreview />
                </div>
            )}

            {isImagePreviewOpen && (
                <div className='post__preview-overlay'>
                    <ImagePreview />
                </div>
            )}
        </div>
    );
};
export default AllPosts;