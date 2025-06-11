import { useState, useEffect, type ChangeEvent } from 'react';
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
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        // Функция загрузки данных
        const fetchPosts = async () => {
            try {
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

    useEffect(() => {
        const newPosts = [...posts].filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
        setPosts(newPosts);
    }, [search])

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    return (
        <div className="posts__wrapper">
            
            <div className='posts__search-container'>
                <input type="search" placeholder='Search post...' className='posts__search-input' value={search} onChange={searchHandler} />
            </div>

            {error && <p className='posts__error-message'>{error}</p>}
            
            <div className='posts'>
                {/* отрисовка карточек */}
                {loading && <p>Loading...</p>}

                {posts.length?
                (posts.map(post => (
                    <div
                        key={post.id}
                        className='post__card'
                        onClick={() => onPostSelect(post.id)}
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
                (<p className='posts__no-results'>No results</p>)
            }
            </div>

        </div>
    );
};
export default AllPosts;