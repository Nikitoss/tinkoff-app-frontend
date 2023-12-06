'use client'

import React from 'react'
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const hoverAnimation = "ease-out duration-300 hover:scale-125"

const NavBar = () => {
    return (
        <div className="fixed w-20 pl-3 h-screen">
            <div className='relative h-full bg-yellow-300'>
                <ul className="relative top-4 space-y-2.5">
                    <Link className={`flex justify-center ${hoverAnimation}`} href="/profile">
                        <AccountCircleIcon sx={{ fontSize: 56 }} />
                    </Link>
                    <Link className={`flex justify-center ${hoverAnimation}`} href="/logout">
                        <ExitToAppIcon sx={{ fontSize: 48 }} />
                    </Link>
                </ul>
                
                <Link className={`absolute bottom-4 flex justify-center inset-x-0 ${hoverAnimation}`} href="/settings">
                    <SettingsIcon sx={{ fontSize: 48 }} />
                </Link>
            </div>
        </div>
    )
}

export default NavBar