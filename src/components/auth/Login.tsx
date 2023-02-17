"use client"

import { useForm } from 'react-hook-form'

interface FormValues {
    email: string;
    password: string;
}

export const Login = () => {
    const { register, handleSubmit } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input 
                        type="text"
                        placeholder="email"
                        {...register("email")}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        {...register("password")}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}
