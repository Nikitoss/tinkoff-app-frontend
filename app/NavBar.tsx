import React from 'react'
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

const NavBar = () => {
    const links = [
        { label: <LogoutIcon sx={{ fontSize: 44 }} />, href: '/logout' },
        { label: <SettingsIcon sx={{ fontSize: 44 }} />, href: '/settings' },
    ]

    return (
        <div className="fixed w-20 ml-3 flex h-screen justify-center bg-yellow-300">
            <Link className="top-3 space-y-96" href="/profile"><AccountCircleIcon sx={{ fontSize: 52 }} /></Link>
            <ul className="">
                {links.map(link =>
                    <Link
                        key={link.href}
                        href={link.href}>{link.label}</Link>)}
            </ul>
        </div>
    )
}

export default NavBar