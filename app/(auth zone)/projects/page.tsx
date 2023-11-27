import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'

export default function Page() {
    const column = "w-full aspect-video rounded-lg flex justify-center items-center ease-out duration-300 hover:shadow hover:bg-gray-200";
    const grayColumn = `${column} bg-gray-300`;
    const yellowColumn = `${column} bg-yellow-300`;
    
    return (
        <main>
            <div className="pt-4 mr-5 grid grid-cols-4 gap-5">
                <Link className="w-full" href="/projects/create">
                    <div className={yellowColumn}>
                        <AddIcon sx={{ fontSize: 76 }} className="text-white" />
                    </div>
                </Link>
            </div>   
        </main>
    )
}