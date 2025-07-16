import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError, type AxiosResponse } from "axios"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import './CreatePostOther.css'

const PostSchema = z.object({
    id: z.number(),
    title: z.string()
        .min(1, 'Field is required')
        .max(5, 'The maxValue is 5 symbols'), //макс кол-во 5
    body: z.string()
        .min(1, 'Field is required')
        .max(100, 'The maxValue is 100 symbols'),
    userId: z.number(),
})
// тип на оснве схемы
type PostOther = z.infer<typeof PostSchema>
type CreatePostOther = Omit<PostOther, 'id'>

interface CreatePostOtherProps {
    post?: PostOther,
}

export const CreatePostOther = ({ post }: CreatePostOtherProps) => {
    const { 
        register,
        handleSubmit,
        formState: { errors }, reset } = useForm<CreatePostOther>({
        resolver: zodResolver(PostSchema.omit({ 'id': true })),  //когда зарегистрированы и проверка на валтдность - используй схему и правилами в схеме с помощью zod (соединяющая ниточка)
        defaultValues: {
            title: '',
            body: '',
            userId: 1,
        },
        // mode:'all' //не реком-тся(проблемы с производительностью - если большие формы)
        // // первый символ - сразу ошибка
        // // можно тольео на onchange ..
    });

    const onSubmit = async (values: CreatePostOther) => {
        console.log(values);
        try {
            const { data } = await axios.post<CreatePostOther, AxiosResponse<PostOther>>('https://jsonplaceholder.typicode.com/posts',
                { ...values }
            );
            console.log(data);
            alert(`New post ${data.id} and title ${data.title} has been created`);
            reset();
            // за основу возьмется инишиал состояние(defaultValues)

        } catch (err: unknown) {
            console.log(err as AxiosError)
            alert('Error creation post')
        }

    }

    useEffect(() => {
        if (post) {
            reset(post)
        }
    }, [post, reset])

    return (
        
       
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            {/* handle Передает значения если все валидно(проверяет) */}
            <h2 className="form-title">Создать пост для jsonplaceholder</h2>
            <div className="form-field">
                <label htmlFor="" className="form-label">Title</label>
                <input type="text" id="title" {...register('title')} className="form-input"  />
                {/* дестр обьекта из метода register */}
                <span className="form-error">{errors.title?.message}</span>
            </div>
            <div className="form-field">
                <label htmlFor="" className="form-label">Body</label>
                <textarea id="body" {...register('body')} className="form-input" placeholder="Write summary of the post... " rows={3} />
                <span className="form-error">{errors.body?.message}</span>
            </div>
            <button type="submit" className="form-submit">Submit</button>
        </form>
        
    )
}