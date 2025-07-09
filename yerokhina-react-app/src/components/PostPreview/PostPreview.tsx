import { closePreview } from "../../store/postSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const PostPreview = () => {
    const { selectedPost } = useAppSelector(state => state.post);
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state=>state.theme.mode)

    if (!selectedPost) return null;


    return (
        <div className={`post__preview ${theme}`}>
            <div className={`post__preview-content ${theme}`}>
                <button className="post__preview-close" onClick={() => dispatch(closePreview())}>X</button>
                <div className="post__card">
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
            </div>
        </div>
    )
}

export default PostPreview;








