'use client'

import { Creep } from "@/components/assets/fonts";
import { LoginForm } from "./form";
import { Meteors } from "@/components/ui/meteors";

const Page = () => {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="flex flex-1 flex-col w-full h-screen items-center justify-center">
      <div className=''>
        <h1 className={`text-6xl `}>Login</h1>
        <LoginForm/>
=======
    <div className="flex flex-1 flex-col h-[80vh] items-center justify-center">
      <div className="border-2 border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-4  shadow-xl">
      <h1 className={`text-6xl ${Creep.className}`}>Login</h1>
      <LoginForm/>
>>>>>>> 99aeb1ace2fcba19788b54b76db577b35885e4ae
      </div>
    </div>
=======
    <div className=" flex flex-1 relative flex-col h-[80vh] items-center  justify-center">
          <div className=" dark:bg-sky-950/90 dark:shadow-sky-800 overflow-hidden shadow-sky-500 bg-sky-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4  shadow-2xl">
              <div className="relative w-full max-w-xl">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className={`text-6xl ${Creep.className}`}>Login</h1>
                        <LoginForm/>
                        <Meteors number={20} />
                    </div>
                  </div>
              </div>
            </div>
>>>>>>> fc2044295c5ab886ec07c1649acedb07c0c203af
  )
}
export default Page;