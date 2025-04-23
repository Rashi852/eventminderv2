'use client'

import { Creep } from "@/components/assets/fonts";
import { LoginForm } from "./form";

const Page = () => {
  return (
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
  )
}
export default Page;