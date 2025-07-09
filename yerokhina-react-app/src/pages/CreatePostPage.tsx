import { useState } from "react"
import { useNavigate } from "react-router";
import { createPost } from "../store/postsThunk";
import { useAppDispatch } from "../store/store";

const CreatePostPage = () => {
    const [form, setForm] = useState({
        title: '',
        text: '',
        description: '',
        lesson_num: 0
    });
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === 'lesson_num' ? Number(value) : value })
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Проверка обязательных полей
        if (!form.title || !form.text || !form.description || !image) {
            setError('Заполните все обязательные поля!');
            return;
        }

        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('text', form.text);
        formData.append('description', form.description);
        formData.append('lesson_num',String(form.lesson_num));
        formData.append('image', image);

        try {
            await dispatch(createPost(formData));
            navigate('/posts')
        } catch {
            setError('Ошибка при создании поста')
        }
    };
    return (
        <div className="create-post__container">
            <h2 className="create-post__title">Новый пост</h2>
            {error && <div className="posts__error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="post__form">
                <div className="form__group">
                    <label className="form__label">Заголовок*</label>
                    <input type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="form__input"
                    />
                </div>
                <div className="form__group">
                    <label className="form__label">Описание*</label>
                    <input type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="form__input"
                    />
                </div>
                <div className="form__group">
                    <label className="form__label">Текст*</label>
                    <textarea
                        name="text"
                        value={form.text}
                        onChange={handleChange}
                        className="form__textarea"
                    />
                </div>
                <div className="form__group">
                    <label className="form__label">Номер урока*</label>
                    <input
                        type="number"
                        name="lesson_num"
                        value={form.lesson_num}
                        onChange={handleChange}
                        className="form__input"
                    />
                </div>
                <div className="form__group">
                    <label className="form__label">Изображение*</label>
                    <div className="form__file-input-wrapper">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="form__file-input"
                    />
                    </div>
                </div>
                <button type="submit" className="submit__btn">Создать пост</button>
            </form>
        </div>
    )
}
export default CreatePostPage;