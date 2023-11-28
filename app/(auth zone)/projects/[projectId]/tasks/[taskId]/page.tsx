'use client'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

export default function Page() {
    return (
        <main>
            <div className="pt-4 mr-5 grid grid-cols-4 gap-5">
                <div className="col-start-2 col-span-2 w-full h-full px-10 py-4 rounded-lg bg-gray-300 space-y-3">
                    <div className="flex justify-center font-bold space-x-3">
                        <h1>Доделать карточки</h1>
                        <div className="flex items-center">
                            <select name="status" id="status" className="flex justify-center rounded-md bg-orange-300 text-center text-sm w-fit">
                                <option value="new">НОВЫЙ</option>
                                <option value="inprogress">В РАБОТЕ</option>
                                <option value="accepted">ПРИНЯТЫЙ</option>
                                <option value="declined">ОТКЛОНЁННЫЙ</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <p>
                            <AccountCircleIcon sx={{ fontSize: 50 }} />
                            Михаил Колчин
                        </p>
                    </div>
                    <div className="flex justify-center items-end text-4xl">
                        <h1>10&nbsp;
                            <button>
                                <ThumbUpIcon sx={{ fontSize: 36 }} />
                            </button>
                            &nbsp;| 2&nbsp;
                            <button>
                                <ThumbDownIcon sx={{ fontSize: 36 }} />       
                            </button>
                        </h1>
                    </div>
                    <div className="flex space-x-3">
                        <label>Описание</label>
                    </div>
                    <div className="flex justify-center">
                        <input type="text" name="description" className="w-full bg-gray-200 flex-wrap" />
                    </div>
                </div>
            </div>
        </main>
    )
}