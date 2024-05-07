
import React, { useContext } from 'react'
import Link from 'next/link'
import UserContext from '@/context/userContext'
import { logout } from '@/services/userService'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

const HomeBtn = () => {
  const context = useContext(UserContext)
  const router = useRouter()

  async function doLogout(){
    try {
      const result =await logout()
      context.setUser(undefined)
      router.push('/login')
    } catch (error) {
      toast.error("Logout Error")
    }
  }
  return (
    <Link href={"/login"} onClick={doLogout} target={'_self'} className='text-foreground rounded-full flex items-center justify-center custom-bg fixed top-4 left-4 w-fit self-start' aria-label={"Logout"} name={"Logout"}>
            <span className='relative w-14 h-14 p-4 hover:text-accent'>
                <LogOut className='w-full h-auto' strokeWidth={1.5}/>
                
                <span className='peer bg-transparent absolute top-0 left-0 w-full h-full'/>


                <span className=' absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap'>
                Logout
                </span>
            </span>
            
        </Link>
  )
}

export default HomeBtn