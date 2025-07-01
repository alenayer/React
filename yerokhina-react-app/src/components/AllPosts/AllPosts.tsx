import { useState, useEffect, type ChangeEvent } from 'react';
import './AllPosts.css';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../store/store';
import PostPreview from '../PostPreview/PostPreview';
import ImagePreview from '../ImagePreview/ImagePreview';
import { fetchPosts } from '../../store/postsThunk';
import { PostCard } from '../PostCard';

const AllPosts = () => {
    const { theme } = useTheme();
    const [search, setSearch] = useState<string>('');
    const dispatch = useAppDispatch();
    const { 
        isPreviewOpen,
         isImagePreviewOpen,
         posts,
         loading,
         error,
        } = useAppSelector(state => state.post)
   

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

            {filteredPosts.length > 0 && (
                <div className='posts'>
                    {filteredPosts.map(post => (
                       <PostCard post = {post} key={post.id}/>
                    ))}
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