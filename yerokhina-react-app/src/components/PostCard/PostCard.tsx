import { useNavigate } from "react-router";
import type { Post } from "../../types/post"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addToFavorites, disLikePost, likePost, openImagePreview, openPreview, removeFromFavorites } from "../../store/postSlice";

interface PostCardProps {
    post: Post
}

export const PostCard = ({ post }: PostCardProps) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

     // Получение  избранного из хранилища
     const favorites = useAppSelector(state=>state.post.favorites)


    const handleCardClick = (post: Post) => {
        dispatch(openPreview(post));
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
        // использовать favorites из хранилища
        if (favorites.includes(id)) {
            dispatch(removeFromFavorites(id))
        } else {
            dispatch(addToFavorites(id))
        }
    }

    return (
        <div
            key={post.id}
            className='post__card'
        >
            <div className='post__content' onClick={() => handleCardClick(post)}>
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
    )
}


