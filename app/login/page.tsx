'use client'

import Link from 'next/link'

export default function Page() {
    return (
        <main>
            <img className="md:fixed absolute h-[58rem] -mt-40 pl-[54rem] -z-10" src="https://brosaem.online/wp-content/uploads/2019/08/D09AD0B0D0BBD18CD18FD0BD.jpg" /> 
            <div className="pt-4 mr-5 grid grid-cols-4 gap-5 relative">
                <div className="col-start-2 col-span-2 w-full mt-36 px-10 py-4 rounded-lg bg-zinc-200 space-y-2 inset-x-0">
                    <span className="font-bold text-2xl flex justify-center">Вход в систему</span>
                    <div className="px-16 space-y-2">
                        <div className="flex justify-center">
                            <input name="login" type="text" placeholder="Логин" className="w-full flex justify-center rounded-[7px] p-2" />   
                        </div>
                        <div className="flex justify-center">
                            <input name="password" type="text" placeholder="Пароль" className="w-full flex justify-center rounded-[7px] p-2" /> 
                        </div>
                    </div>
                    <div className="flex justify-center mt-4 px-36">
                        <Link className="w-full h-12 px-10 mt-2 border flex justify-center gap-2 rounded-lg bg-yellow-300 hover:shadow hover:bg-gray-200 transition duration-300" href="/projects">
                            <span className="flex items-center">Войти</span>  
                        </Link>
                    </div>   
                    
                    <div className="py-2 items-baseline text-neutral-600 text-center">
                        <p className="text-xs">Приступая к работе, вы соглашаетесь с нашими&nbsp; 
                            <a href="/privacy-policy/" className="underline">Условиями использования</a>
                            и подтверждаете, что ознакомились с нашим&nbsp;
                            <a href="/privacy-policy/" className="underline">Положением о конфиденциальности и файлах cookie</a>.
                        </p>
                    </div> 
                </div>   
            </div>    
        </main>
    )
}