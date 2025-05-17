import React from 'react'
import Avatar from '../../ui/avatar'
import { navItems } from '../../../constants/sidebar-nav'
import { Link } from 'react-router-dom'
import Button from '../../ui/button'
import { LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../redux/store'
import { logout } from '../../../redux/slices/userSlice'

type Props = {}

function Sidebar({ }: Props) {
    const { user } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    return (
        <div
            className='h-[100dvh] text-[var(--foreground-inverse)] w-[25%] bg-[var(--deep-background)] px-4 py-2 flex flex-col sticky top-0 left-0'
        >
            <div className='py-4 flex items-center gap-2'>
                <Avatar />

                <div className='flex flex-col gap-0'>
                    <p className='capitalize font-bold text-lg'>{user?.username}</p>
                    {/* <i>HR</i> */}
                </div>
            </div>

            <div className='mt-5 flex flex-col gap-2'>
                {
                    navItems.map((item) => {
                        return (
                            <Link className='flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-[var(--surface)] duration-75' to={item.link} key={item.link}>
                                {item.icon}
                                {item.name}
                            </Link>
                        )
                    })
                }
            </div>

            <div className='absolute left-0 py-2 px-4 bottom-0 w-full'>
                <Button
                    onClick={() => dispatch(logout())}
                    className='flex items-center gap-3 w-full hover:bg-white hover:text-red-500 hover:border hover:border-red-500 duration-75 justify-center'
                    variant='destruct'

                >
                    <LogOut />
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Sidebar