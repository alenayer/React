import { useState, useEffect, type ChangeEvent } from 'react';
import './AllPosts.css';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router';


type Post = {
    id: number,
    image?: string,
    text: string,
    date: string,
    lesson_num: number,
    title: string,
    author: number
}

const AllPosts = () => {
    const navigate = useNavigate();
  const{theme} = useTheme();
    const [posts, setPosts] = useState<Post[]>([]);  //все посты с сервера
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('');
   
   
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
    posts.filter(post=>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.text.toLowerCase().includes(search.toLowerCase())
    )
    :
    posts;

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    return (
        <div className={`posts__wrapper ${theme}-theme`}>

            <div className='posts__search-container'>
                <input
                    type="search"
                    placeholder='Search post...'
                    className='posts__search-input'
                    value={search}
                    onChange={searchHandler} />

                {search && (<div className='search__info'>Найдено:{filteredPosts.length} постов</div>)}
            </div>

            {error && <p className='posts__error-message'>{error}</p>}

            <div className='posts'>
                {/* отрисовка карточек */}
                {loading ?
                    (<p>Loading...</p>)
                    :
                    filteredPosts.length ?
                        (filteredPosts.map(post => (
                            <div
                                key={post.id}
                                className='post__card'
                                onClick={() => navigate(`/posts/${post.id}`)}
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
                        ))
                        )
                        :
                        (<p className='posts__no-results'>
                            {search ?
                                'Ничего не найдено' :   //если Displayed пуст после фильтрации(поиск не пустой но ни один пост не соотв-т)
                                'Нет доступных постов'}   
                                {/* если поиск пустой(неактивен) или массив постов пуст-сервер не вернул */}
                        </p>)
                }
            </div>

        </div>
    );
};
export default AllPosts;