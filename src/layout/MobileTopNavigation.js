import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
const moment = require('moment')

import dynamic from 'next/dynamic'
import LEftSidebar from "layout/LEftSidebar"
import LoginSidebar from "layout/LoginSidebar"
//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux'

import { resetErrors } from 'redux/reducers/ErrorReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { setLoginSidebar, setLeftSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function TopNavigation() {


    const router = useRouter()
    const dispatch = useDispatch()

    const { isLogin, username } = useSelector((state) => state.AuthReducer)
    const { showLogin } = useSelector((state) => state.SidebarReducer)
    const { spinnerAtVisitor } = useSelector((state) => state.LoaderReducer)
    const { modalMenuDrawer } = useSelector((state) => state.ModalReducer)
    const { loginSidebar, leftSidebar } = useSelector((state) => state.MainmenuReducer)

    const handleUserClick = () => {

        if (router.pathname !== '/users') {
          
        }
        setTimeout(() => {
         
            router.push('/users')
        }, 1000)
    }

    const handleOpenDrawer = () =>{  
      
            dispatch(setLeftSidebar(!leftSidebar))
            dispatch(setLoginSidebar(false))
     
      
      
    }

 
    
    const handleToggle = () => {
        dispatch(resetForm())
        dispatch(resetErrors())
      
        if(loginSidebar){
            dispatch(setLoginSidebar(false))
           
        }else{
            dispatch(setLoginSidebar(true))
            dispatch(setLeftSidebar(false))
        }
     
    }


    return (
        <>

<LEftSidebar/>
<LoginSidebar/>

<div className="bg-[#663399] sticky top-0  z-10">
<div className="bg-[#800080] dark:bg-slate-900  rounded-br-[10%] rounded-bl-[10%] h-[100px] h-[90px] shadow-sm shadow-gray-200 w-full ">

<nav className="rounded-bl-[40%] px-3 pt-2 flex flex-grow relative justify-between z-10  mx-auto ">

   <a  className="flex-initial  w-[62px] h-[62px] p-2  cursor-pointer ">
 
   <button onClick={handleOpenDrawer} className={` outline-none hover:outline-hidden transition duration-150 mt-2 animated backInLeft`}>

       
        {modalMenuDrawer ?
       
         <i class="icofont-arrow-left text-[40px] text-white animated fadeIn"></i>:
       
<svg width="30px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512 " className={leftSidebar ?"transition duration-150 -rotate-90": "transition duration-150"}>
            <path fill="white" d="M12 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 12 12 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 12 12 12z" />
          </svg>

               }
          </button>
    
    </a>

    <a onClick={()=>router.push('/')} className="cursor-pointer  flex centered  w-[250px]  mr-6">
    <img src="/assets/F5-logo.png" className=" animated fadeInDown " alt="logo" /> 
    {/* <h3 className="text-white">HEADER LOGO</h3> */}
    </a>

    <div className="rounded-full w-[60px] h-[60px]  flex flex-col centered items-center ">

{spinnerAtVisitor ?
    <svg style={{ maxWidth: 40 }} role="status" className="inline w-[30px] h-[30px] text-yellow-400 animate-spin  fill-gray-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
    :

    isLogin ?
        <button onClick={()=>router.push('/users')} className="rounded-full cursor-pointer w-[50px] mt-4">
            <img src="/assets/img/user-red.webp" className="rounded-full w-10 " alt="users" />
        </button>
        :
        <button onClick={handleToggle} className="rounded-full cursor-pointer border-2 w-[50px] bg-gray-50  mt-4">
           
                <img src="/assets/img/user-red.webp" className="rounded-full animated fadeIn" alt="user" />
         
        </button>
}
 {isLogin?
<p className=" text-xs text-white mx-auto">{username}</p>:
<p className=" text-xs text-white">{showLogin? 'ADMIN ' : 'REGISTER'}</p>
 }
</div>
    
    
</nav>

</div>
</div>

{/* <ul className="list-reset flex justify-around flex-1 md:flex-none items-center bg-red-900 w-[448px] text-white fixed">

<li className="mr-3  md:font-semibold">
        <Link href="/"><a className="inline-block py-2 px-4  dark:text-white"
         
        >Home</a></Link>
    </li>

       <li className="mr-3  md:font-semibold">
        <button onClick={()=>router.push('/about')}><p className="inline-block py-2 px-4  dark:text-white"
            // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
        >About</p></button>
    </li>

    <li className="mr-3  font-semibold">
        <button onClick={()=>router.push('/contact')}><p className="inline-block py-2 px-4  dark:text-white"
            // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
        >Contact</p></button>
    </li>


</ul> */}
        </>
    )
}
