import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';

export default function Page() {
    return (
        <main>
            <div className="pt-4 mr-5 grid grid-cols-4 gap-5">
                <div>
                    <div className="w-full h-16 bg-gray-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        <h1>НОВЫЕ</h1>
                    </div>
                    <Link className="relative w-full" href="/create">
                        <div className="w-full aspect-video bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center ease-out duration-300 hover:bg-gray-100">
                            <AddIcon sx={{ fontSize: 76 }} className="text-white" />
                        </div>
                    </Link>
                </div>
                
                <div>
                    <div className="w-full h-16 bg-gray-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        В РАБОТЕ
                    </div>
                    <div className="w-full h-full bottom-4 bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center"></div>
                </div>
                
                <div>
                    <div className="w-full h-16 bg-gray-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        ПРИНЯТЫЕ
                    </div>
                    <div className="w-full h-full bottom-4 bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center"></div>
                </div>
                
                <div>
                    <div className="w-full h-16 bg-gray-200 rounded-tl-lg rounded-tr-lg flex justify-center items-center">
                        ОТКЛОНЁННЫЕ
                    </div>
                    <div className="w-full h-full bottom-4 bg-gray-200 rounded-bl-lg rounded-br-lg flex justify-center items-center"></div>
                </div>
            </div>
        </main>
    )
}