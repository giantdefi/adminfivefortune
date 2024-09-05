import React, { useEffect, useState, useRef } from "react"
import axios from 'axios'
const moment = require('moment')
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setError } from 'redux/reducers/ErrorReducer'
import { setModalMessage, setCofetty, setModalToast } from 'redux/reducers/ModalReducer'
import {setAdminPackageArray, setAllowRelaodPAckage, setItemToEdit } from 'redux/reducers/PackageReducer'
import { setCreatepackagesidebar, setEditpackagesidebar } from 'redux/reducers/MainmenuReducer'
import {
    setApp_title, setApp_currency, setAdmin_wallet,setSplittoEWallet,setSplittoRwallet,
    setLevel_1, setLevel_2, setLevel_3, setLevel_4, setLevel_5, setLevel_6, setLevel_7, setLevel_8, setLevel_9, setLevel_10
  } from 'redux/reducers/ConstantReducer'
//--------------------------------------

export default function Users() {

    const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)
    const [loader, setLoader] = useState(false)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)
    const { adminPackageArray, allowRelaodPackage } = useSelector((state) => state.PackageReducer)
    const { isLogin, token } = useSelector((state) => state.AuthReducer)
    const { createpackagesidebar } = useSelector((state) => state.MainmenuReducer)
    const { editpackagesidebar } = useSelector((state) => state.MainmenuReducer)
    const { 
        app_title,app_currency,admin_wallet, splittoEWallet, splittoRwallet,
        level_1, level_2, level_3,level_4,level_5,level_6,level_7, level_8, level_9, level_10
     } = useSelector((state) => state.ConstantReducer)
    const [to_userid, setTouserid] = useState(false)
    const [amount, setAmount] = useState(false)
    const [history, setHistory] = useState(false)
    const [allowReload, setAllowReload] = useState(false)
        

  const handleDatabaseReset = () =>{
    handleDatabaseResetDelay()
  }

    const handleDatabaseResetDelay = () => {
     
        setSpinner(true)
      
        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/reset/reset`,
            method: 'POST',
       
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                const data = response.data
                console.log(data)

                if (data.isSuccess) {
      
                   dispatch(setModalToast({ type: data.type, title : data.title, message: data.message })) 

                 setSpinner(false)

                } else {

                    setSpinner(false)
                    dispatch(setModalToast({ type: 'error', title: "Activation Fail!", message: response.data.message }))
                    return dispatch(setError({ path: response.data.path, message: response.data.message }))
                }

                setSpinner(false)

            }).catch(function (error) {
                setSpinner(false)
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }
 



    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>


<div className="md:pt-12  min-h-screen">
<div className="flex flex-col md:flex-row w-full">   

<div className="w-full ">  
 <main   className=" w-1/2 mih-h-screen  mx-auto p-6">
    <div className="mt-7 bg-white   rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
      <div className="p-4 sm:p-7 border-4">
        <div className="text-center  ">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">RESET DATABASE</h1>
          <h1 className="block text-2xl font-bold text-red-800 dark:text-white">
          <i className="icofont-warning"></i>
            WARNING</h1>
        </div>

        <div className="mt-5">
          
           <p><i className="icofont-warning text-red-600"></i>This action  will reset database to the initial state</p>
           <p className="mt-2">All data in the database will be truncated and only one user will remain with the userid FX10001, email: master@gmail.com as the admin user.</p>
<p className="mt-2 text-green-800">This reset does not affect the App Setting data and Packages that have been created by the admin.</p>
<p className="mt-2"> <i className="icofont-warning text-red-600"></i>It is highly recommended that the admin back up the database before performing this action.</p>
<p className="mt-2"> <i className="icofont-warning text-red-600"></i>This action cannot be recovered once performed.</p>
<p className="mt-2"> <i className="icofont-warning text-red-600"></i> it is hoped that you understand what you are doing</p>
          
            <div className="flex centered mt-10">
           
              {spinner ?
              <button  type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 
              rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm 
              dark:focus:ring-offset-gray-800">
               
                 <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-6 h-6 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                Send Wallet</button>
                
                :
                   <button onClick={handleDatabaseReset} type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 
                   rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm 
                   dark:focus:ring-offset-gray-800"> CONFIRM RESET</button>
                     }

<button onClick={()=>router.push('/admin')} type="submit" className=" ml-10 py-3 px-4 inline-flex justify-center items-center gap-2 
                   rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm 
                   dark:focus:ring-offset-gray-800"> CANCEL</button>

            </div>
        
        </div>
      </div>
    </div>


  </main>
  </div> 
   
  </div>  
  </div>    
       </>
    )

}


