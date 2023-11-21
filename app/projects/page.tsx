import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'

export default function Page() {
    return (
        <main>
            <div className="pt-4 mr-5 grid grid-cols-4 gap-5">
                <Link className="w-full" href="/create">
                    <div className="w-full aspect-video bg-yellow-300 rounded-lg flex justify-center items-center ease-out duration-300 hover:bg-yellow-200">
                        <AddIcon sx={{ fontSize: 76 }} className="text-white" />
                    </div>
                </Link>
                <div className="w-full aspect-video bg-gray-300 rounded-lg flex justify-center items-center ease-out duration-300 hover:bg-gray-200"></div>
                <div className="w-full aspect-video bg-gray-300 rounded-lg flex justify-center items-center ease-out duration-300 hover:bg-gray-200"></div>
                <div className="w-full aspect-video bg-gray-300 rounded-lg flex justify-center items-center ease-out duration-300 hover:bg-gray-200"></div>
            </div>   
        </main>
    )
}