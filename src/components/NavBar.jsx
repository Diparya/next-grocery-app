import React, { useContext, useState } from 'react'
import Link from 'next/link'
import UserContext from '@/context/userContext'
import { logout } from '@/services/userService'
import { useRouter } from 'next/navigation'

const NavBar = ({setSearchM}) => {
    const [search, setSearch] = useState('')
    const searchbutt = () =>{
        setSearchM(search)
    }
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
    <nav className='h-12 py-7 px-3 flex justify-between items-center bg-background border border-accent/30 border-solid backdrop-blur-[6px] shadow-glass-inset hover:shadow-glass-sm'>
        <div className='brand'>
          <h1 className='text-2xl font-semibold cursor-pointer'>Grocery Store</h1>
        </div>
        <div>
          <ul className='flex space-x-5'>
                <>
                {
                  context.user?.role!=='user' && (
                <>
                  <li>
                    <Link href={'/managerhome'} className='hover:text-green-300'>Categories</Link>
                  </li>
                  <li>
                    <Link href={'/producthome'} className='hover:text-green-300'>Products</Link>
                  </li>
                </>
                  )
                }
            
                </>
          </ul>
        </div>
        <div>
          <ul className='flex space-x-7'>
                <>
                <div>
                  <input className='custom-bg' type="text" id='search' name='search' onChange={(e)=>{setSearch(e.target.value)}} value={search} />
                  <button onClick={searchbutt} className='ml-1 bg-green-900 hover:bg-green-700 p-1 rounded text-sm'>Search</button>
                </div>
              {
              context.user && (
                <>
                <li>
                  <p className='hover:text-red-300 cursor-pointer'>{context.user.name}</p>
                 </li>
                <li>
                  <Link href={'/login'} onClick={doLogout} className='hover:text-green-300'>Logout</Link>
                </li>
              {
              context.user.role==='user' && (
                <li>
                  <Link href={'/cart'} className='hover:text-green-300'>Cart</Link>
                </li>
                )
              }
                </>
                )
              }

            {
              !context.user && (
                <>
                <li>
                  <Link href={'/login'}>Login</Link>
                </li>
                <li>
                  <Link href={'/signup'}>Sign Up</Link>
                </li>
                </>
              )
            }
                </>
          </ul>
        </div>
    </nav>
  )
}

export default NavBar