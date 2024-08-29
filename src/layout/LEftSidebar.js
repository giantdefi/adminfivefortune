import React, {useRef, useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import { setLoginSidebar, setLeftSidebar } from 'redux/reducers/MainmenuReducer'
import Username from 'components/inputforms/login/Username'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import SidebarBody from "menu/SidebarBody"
import { setCreatepackagesidebar, setEditpackagesidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function Home() {

  
 const dispatch = useDispatch()
  const router = useRouter()
  const { loginSidebar, leftSidebar } = useSelector((state) => state.MainmenuReducer)
  const { createpackagesidebar } = useSelector((state) => state.MainmenuReducer)

  const handleMenu = (link) => {
   dispatch(setLeftSidebar(false))
   dispatch(setCreatepackagesidebar(false))
   dispatch(setEditpackagesidebar(false))
   router.push(link)
  }

  const handleNewPackage = () => {
   dispatch(setLeftSidebar(false))
   dispatch(setCreatepackagesidebar(false))
   dispatch(setEditpackagesidebar(false))
  }

return (
  <>


<div  class={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform  ${!leftSidebar && "-translate-x-full"} bg-white w-96 mt-24 dark:bg-gray-800`} tabindex="-1" aria-labelledby="drawer-navigation-label">     
   
<div class="py-4 overflow-y-auto">
      <ul class="space-y-2 font-medium">
         <li>
            <button onClick={()=>handleMenu('/admin')} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span class="ms-3 ml-4">Dashboard</span>
            </button>
         </li>
         <li>
            <button  type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <i className="icofont-gear text-red-300 text-lg mr-4"></i>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap ">Settings</span>
                  
            </button>
            <ul  class=" py-2 space-y-2">
                  <li>
                     <button onClick={()=>handleMenu('/admin/app-settings')} class="flex items-center w-full p-2 text-gray-900 transition duration-75 
                     rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                      <i className="icofont-monitor mr-2"></i>  
                        Apps Setting</button>
                  </li>
                 
            </ul>
         </li>
      
         <li>
            <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <i className="icofont-certificate-alt-1 text-sky-400 mr-4"></i>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap ">Package</span>
                  {/* <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg> */}
            </button>
            <ul  class=" py-2 space-y-2">
                  <li>
                     <button onClick={()=>handleMenu('/admin/packages')} class="flex items-center w-full p-2 text-gray-900 transition duration-75 
                     rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        <i className="icofont-files-stack text-lg mr-1 text-blue-300 hover:text-green-300 "></i>
                        Package List</button>
                  </li>
                  <li>
                     <button  onClick={handleNewPackage} class="flex items-center w-full p-2 text-gray-900 transition duration-75 
                     rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                         <i className="icofont-plus-square text-lg mr-1 text-blue-300 hover:text-green-300 "></i>
                        Add New Package</button>
                  </li>
                 
            </ul>
         </li>
      
         <li>
            <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <i className="icofont-electron text-sky-900 text-lg mr-2"></i>
                  <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap ">Transaction</span>
                  {/* <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                  </svg> */}
            </button>
            <ul  class=" py-2 space-y-2">
                  <li>
                     <button onClick={()=>handleMenu('/admin/send-wallet')} class="flex items-center w-full p-2 text-gray-900 transition duration-75 
                     rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                         <i className="icofont-paper-plane text-lg mr-1 text-green-800 hover:text-green-300"></i>
                        Send Wallet</button>
                  </li>
                  <li>
                     <button  onClick={()=>handleMenu('/admin/wd-request')} class="flex items-center w-full p-2 text-gray-900 transition duration-75
                      rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                          <i className="icofont-wallet text-lg mr-1 text-green-700 hover:text-green-300"></i>
                        WD Request</button>
                  </li>
                 
            </ul>
         </li>
      
       
      
      
      </ul>
   </div>
</div>

  
     

   

  </>
)
}



