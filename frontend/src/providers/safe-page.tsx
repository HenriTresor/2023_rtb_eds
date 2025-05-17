import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../helpers/api'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/slices/userSlice'
import type { RootState } from '../redux/store'

type Props = {
    children: React.ReactNode
}

export const SafePageContext = React.createContext(null)

function SafePageProvider({ children }: Props) {

    const dispatch = useDispatch()
    const { authenticated } = useSelector((state: RootState) => state.user)
    const getUser = async () => {
        try {
            const res = await api.GET('/auth/user')
            if (!res.status) return toast.error(res.message)
            dispatch(login(res.user))
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser()
        } else {
            window.location.href = '/login'
        }
    }, [])
    return (
        <SafePageContext.Provider value={null}>
            {children}
        </SafePageContext.Provider>
    )
}

export default SafePageProvider