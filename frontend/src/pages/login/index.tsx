import React, { useEffect } from 'react'
import LoginForm from '../../components/forms/login-form'
import { useNavigate } from 'react-router-dom'

type Props = {}

function LoginPage({ }: Props) {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])
    return (
        <div className='w-full min-h-screen relative top-0 left-0 p-0 m-0 flex items-center justify-center'>
            <LoginForm />
        </div>
    )
}

export default LoginPage