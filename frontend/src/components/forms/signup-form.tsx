import { TextField } from '@radix-ui/themes';
import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import Button from '../ui/button';
import { EyeClosed, X, XIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../helpers/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

type Props = {}


const InputSchema = z.object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(1, "username is required"),
    password: z.string().min(6, "password must be at least 6 characters")
})

type InputData = z.infer<typeof InputSchema>

function SignupForm({ }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitted } } = useForm<InputData>({
        resolver: zodResolver(InputSchema)
    })
    const onSubmit: SubmitHandler<InputData> = async (data: InputData) => {
        try {
            const response = await api.POST('/auth/signup', data)
            if (!response.status) return toast.error(response.message, { icon: <XIcon className='text-red-500 border-red-500 border rounded-full p-1' />, className: '', position: 'top-right' })
        } catch (error: any) {
            toast.error(error.message, { icon: <XIcon className='text-red-500 border-red-500 border rounded-full p-1' />, className: '', position: 'top-right' })
        }
    }
    return (
        <div className='shadow-md w-2/5 text-center border border-[var(--border-color)] px-1 py-2  rounded-sm'>
            <h1 className='text-[var(--foreground)] text-2xl font-bold '>Get Started!</h1>

            <form method='POST' className='flex items-center justify-center flex-col px-5 gap-2 mt-5' onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full p-2 flex flex-col gap-1'>
                    <TextField.Root
                        placeholder='enter your email'
                        type='email'
                        className={`${errors.email && 'border border-red-500 placeholder:text-[red]'} w-full`}
                        {...register("email")}
                    >

                    </TextField.Root>
                    {
                        errors.email && <p className='text-[var(--text-error)]  text-left text-sm'>* {errors.email.message}</p>
                    }
                </div>

                <div className='w-full p-2 flex flex-col gap-1'>
                    <TextField.Root
                        placeholder='enter your username'
                        className={`${errors.username && 'border border-red-500 placeholder:text-[red]'} w-full`}
                        {...register("username")}
                    >
                    </TextField.Root>
                    {
                        errors.username && <p className='text-[var(--text-error)]  text-left text-sm'>* {errors.username.message}</p>
                    }
                </div>

                <div className='w-full p-2 flex flex-col gap-1'>
                    <TextField.Root
                        type='password'
                        placeholder='enter your password'
                        className={`${errors.password && 'border border-red-500 placeholder:text-[red]'} w-full`}
                        {...register("password")}
                    >
                        <TextField.Slot >
                            <EyeClosed />
                        </TextField.Slot>
                    </TextField.Root>
                    {
                        errors.password && <p className='text-[var(--text-error)]  text-left text-sm'>* {errors.password.message}</p>
                    }
                </div>
                <Button loading={isSubmitting && isSubmitted} className='w-full' type='submit' variant='primary'>
                    Submit
                </Button>

                <div>
                    <p>Already have an account?
                        &nbsp;
                        <Link className='text-[var(--secondary)]' to={'/login'}>
                         login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SignupForm