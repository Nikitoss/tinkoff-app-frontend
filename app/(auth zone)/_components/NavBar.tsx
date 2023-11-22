'use client'

import React from 'react'
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const NavBar = () => {
    return (
        <div className="fixed w-16 ml-3 h-screen bg-yellow-300">
            <Link className="relative top-4 flex justify-center ease-out duration-300 hover:scale-125" href="/profile">
                <AccountCircleIcon sx={{ fontSize: 56 }} />
            </Link>
            
            <ul className="absolute bottom-4 inset-x-0 space-y-2.5">
                <Link className="flex justify-center ease-out duration-300 hover:scale-125" href="/logout">
                    <ExitToAppIcon sx={{ fontSize: 48 }} />
                </Link>
                <Link className="flex justify-center items-bottom ease-out duration-300 hover:scale-125" href="/settings">
                    <SettingsIcon sx={{ fontSize: 48 }} />
                </Link>
            </ul>                 
        </div>
    )
}

export default NavBar