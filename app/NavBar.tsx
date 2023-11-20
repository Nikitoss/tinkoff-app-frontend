import React from 'react'
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

const NavBar = () => {
    return (
        <div className="fixed w-20 ml-3 h-screen bg-yellow-300">
            <Link className="relative pt-4 flex justify-center ease-out duration-300 hover:scale-125" href="/profile"><AccountCircleIcon sx={{ fontSize: 64 }} /></Link>
            <ul className="absolute bottom-4 px-4">
                <Link className="flex justify-center ease-out duration-300 hover:scale-125" href="/logout"><LogoutIcon sx={{ fontSize: 54 }} /></Link>
                <Link className="flex justify-center ease-out duration-300 hover:scale-125" href="/settings"><SettingsIcon sx={{ fontSize: 54 }} /></Link>
            </ul>                 
        </div>
    )
}

export default NavBar