import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";

// Схема валидации
const UserSchema = z.object({
    id: z.number(),
    name: z.string()
        .min(2, 'Минимум 2 символа')
        .max(50, 'Максимум 50 символов'),
    username: z.string()
        .min(3, 'Минимум 3 символа')
        .max(20, 'Максимум 30 символов'),
    email: z.string()
        .email('Некорректный email') //спец метод zod(встроенная валидация) для проверки адресов(проверка базового формата(@ и доменной части))
        .min(5, 'Слишком короткий')
        .max(50, 'Слишком длинный')
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Некорректный формат email'),
    //доп проверка ( [^\s@] - не пробел и не @) (обязательно 1 точка в доменной части \.) ($ - и так до конца строки)
    phone: z.string()
        .min(7, 'Минимум 7 цифр')
        .max(15, 'Максимум 15 цифр')
        .regex(/^[\d-]+$/, 'Только цифры  и дефисы'),
    website: z.string()
        .includes('.', { message: 'Должна быть точка' })
        .min(5, 'Слишком короткий URL')
        .regex(/^[a-zA-Z0-9 .-]+\.[a-zA-Z]{2,}$/, 'Некорректный URL сайта')
})

// тип на основе схемы
type User = z.infer<typeof UserSchema>
type CreateUser = Omit<User,'id'>
// пропсы
interface CreateUserFormProps{
    user?:User;
}

export const CreateUserForm = ({user}:CreateUserFormProps) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateUser>({
        resolver: zodResolver(UserSchema.omit({id:true})),
        defaultValues:{
            name:'',
            username:'',
            email:'',
            phone:'',
            website:'',
        }
    })
    // useEffect для reset
    useEffect(()=>{
        if(user){
            reset(user);
        }
    },[user, reset])


    const onSubmit = async(values:CreateUser)=>{
        try{
            const {data} = await axios.post<CreateUser, AxiosResponse<User>>('https://jsonplaceholder.typicode.com/users',
               values
            );
            alert(`Пользователь ${data.name} создан! ID:${data.id}`);
            reset();
            navigate('/users')
        } catch(error){
            console.log(error as AxiosError)
        }
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h2 className="form-title">Создать пользователя на jsonplaceholder</h2>
            <div className="form-field">
                <label htmlFor="" className="form-label">Name</label>
                <input type="text" id="name" {...register('name')} className="form-input"  />
    
                <span className="form-error">{errors.name?.message}</span>
            </div>
            <div className="form-field">
                <label htmlFor="" className="form-label">Username</label>
                <input type="text" id="username" {...register('username')} className="form-input"  />
    
                <span className="form-error">{errors.username?.message}</span>
            </div>
            <div className="form-field">
                <label htmlFor="" className="form-label">Email</label>
                <input type="email" id="email" {...register('email')} className="form-input"  />
    
                <span className="form-error">{errors.email?.message}</span>
            </div>
            <div className="form-field">
                <label htmlFor="" className="form-label">Phone</label>
                <input type="tel" id="phone" {...register('phone')} className="form-input"  />
    
                <span className="form-error">{errors.phone?.message}</span>
            </div>
            <div className="form-field">
                <label htmlFor="" className="form-label">Website</label>
                <input type="text" id="website" {...register('website')} className="form-input"  />
    
                <span className="form-error">{errors.website?.message}</span>
            </div>
            
            <button type="submit" className="form-submit">Submit</button>
        </form>
    )
}