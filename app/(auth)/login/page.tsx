'use client'
import { LoginForm } from '@/components/ui/formvalidation/schema';

const Page = () => {
  return (
    <div className="flex flex-1 flex-col w-full h-screen items-center justify-center">
      <div className=''>
        <h1 className={`text-6xl `}>Login</h1>
        <LoginForm/>
      </div>
    </div>
  )
}
export default Page;