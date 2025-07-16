import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { errorSelector, isloadingMyPosts, myPostsCountSelector, myPostsSelector } from "../../store/postSlice";
import { fetchMyPosts } from '../../store/postsThunk';
import { PostCard } from "../PostCard/PostCard";

const LIMIT = 20;
const MyPosts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useAppDispatch();

    const myPosts = useAppSelector(myPostsSelector);
    const totalCount = useAppSelector(myPostsCountSelector);
    const loading = useAppSelector(isloadingMyPosts);
    const error = useAppSelector(errorSelector);

    useEffect(() => {
        dispatch(fetchMyPosts({ page: currentPage, limit: LIMIT }))
    }, [currentPage, dispatch])

    const totalPages = Math.ceil(totalCount/LIMIT)


    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return(
        <div className="my-posts">
            <h2>Мои посты</h2>

            {loading && <p>Loading...</p>}
            {error && <p className='posts__error-message'>{error}</p>}
            {!loading && !error && myPosts.length === 0 && (
                <p className='posts__no-results'> У вас пока нет созданных постов</p>
            )}

            {myPosts.length>0 &&(
                <div className="posts-list">
                    {myPosts.map(post=>(
                        <PostCard post = {post} key={post.id}/>
                    ))}
                </div>
            )}

            {totalPages >1 &&(
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
        </div>
    )

}

export default MyPosts;