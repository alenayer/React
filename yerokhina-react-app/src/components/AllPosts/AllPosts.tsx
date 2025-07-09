import { useState, useEffect, type ChangeEvent } from 'react';
import './AllPosts.css';
import { selectTheme, useAppDispatch, useAppSelector } from '../../store/store';
import PostPreview from '../PostPreview/PostPreview';
import ImagePreview from '../ImagePreview/ImagePreview';
import { fetchPosts } from '../../store/postsThunk';
import { PostCard } from '../PostCard/PostCard';
import { errorSelector, isLoadingPosts, postsSelector } from '../../store/postSlice';
import { NavLink } from 'react-router';

const LIMIT = 20; //постов на странице

const AllPosts = () => {
    const theme = useAppSelector(selectTheme)
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();
    const {
        isPreviewOpen,
        isImagePreviewOpen,
        totalCount,
    } = useAppSelector(state => state.post)

    const loading = useAppSelector(isLoadingPosts);
    const error = useAppSelector(errorSelector);
    const posts = useAppSelector(postsSelector);


    useEffect(() => {
        dispatch(fetchPosts({ search, page: currentPage, limit:LIMIT }));
    }, [search, currentPage, dispatch]);

    const handlePrevPage = ()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = ()=>{
        if(currentPage < totalPages){
            setCurrentPage(currentPage + 1)
        }
    }

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setCurrentPage(1); //сьрос на 1-ю страницу при новом поиске
    }

    const totalPages = Math.ceil(totalCount / LIMIT);


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
                {search && (<div className='search__info'>Найдено:{posts.length} постов</div>)}
            </div>


            {loading && <p>Loading...</p>}
            {error && <p className='posts__error-message'>{error}</p>}
            {!loading && !error && posts.length === 0 && (
                <p className='posts__no-results'>
                    {search ? 'Ничего не найдено' : 'Нет доступных постов'}
                </p>
            )}

<NavLink to = '/create-post' className='create-post__link'>Создать пост</NavLink>

            {posts.length > 0 && (
                <div className='posts'>
                    {posts.map(post => (
                        <PostCard post={post} key={post.id} />
                    ))}
                </div>
            )}

            {/* Пагинация */}
            {totalPages > 1 && (
                <div className='pagination'>
                    <button onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Назад</button>

                        <p>Страница {currentPage} из {totalPages}</p>
                    <button onClick={handleNextPage}
                        disabled={currentPage >= totalPages}
                    >
                        Вперед</button>
                </div>
            )}


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