'use client'

import React from 'react'
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const hoverAnimation = "ease-out duration-300 hover:scale-125"

const NavBar = () => {
    return (
        <div className="fixed w-20 pl-3 py-3 h-screen">
            <div className='relative h-full rounded-lg bg-yellow-300'>
                <Link className={`relative top-4 flex justify-center ${hoverAnimation}`} href="/profile">
                    <AccountCircleIcon sx={{ fontSize: 56 }} />
                </Link>

                <ul className="absolute bottom-4 inset-x-0 space-y-2.5">
                    <Link className={`flex justify-center ${hoverAnimation}`} href="/logout">
                        <ExitToAppIcon sx={{ fontSize: 48 }} />
                    </Link>
                    <Link className={`flex justify-center items-bottom ${hoverAnimation}`} href="/settings">
                        <SettingsIcon sx={{ fontSize: 48 }} />
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default NavBar