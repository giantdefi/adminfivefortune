import React, { useEffect, useState, useRef } from "react"
import axios from 'axios'
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalMessage, setCofetty, setModalToast } from 'redux/reducers/ModalReducer'
import {setAdminPackageArray, setAllowRelaodPAckage, setItemToEdit } from 'redux/reducers/PackageReducer'
import { setCreatepackagesidebar, setEditpackagesidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function Users() {

    const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)
    const { isLogin, token } = useSelector((state) => state.AuthReducer)
    const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)
    const { adminPackageArray, allowRelaodPackage } = useSelector((state) => state.PackageReducer)
 
    const { createpackagesidebar } = useSelector((state) => state.MainmenuReducer)
    const { editpackagesidebar } = useSelector((state) => state.MainmenuReducer)


    useEffect(() => {
        if(!isLogin) {
            router.push('/')
        }else{
             getPackage()
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {
        if(allowRelaodPackage){
              getPackage()
              dispatch(setAllowRelaodPAckage(false))
        }
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allowRelaodPackage])
    

    const getPackage = () => {

        setSpinner(true)
        dispatch(setAdminPackageArray(false))
        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/packages`,
            method: 'GET',
          
            'headers': {
               // 'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {
                setSpinner(false)
                const data = response.data
               // console.log(data)
      
                if (data.isSuccess) {
               
                //  dispatch(setCreatepackagesidebar(false))
               
                  dispatch(setAdminPackageArray(data.newData))
               
                  // return dispatch(setModalToast({ type: response.data.type, title : response.data.title, message: response.data.message }))
      
      
                } else {
                    setSpinner(false)
                    return dispatch(setError({ path: response.data.path, message: response.data.message }))
                }
      
                setSpinner(false)
      
            }).catch(function (error) {
                setSpinner(false)
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }


    const handleToEdit = (item) => {
        dispatch(setItemToEdit(item))
        dispatch(setCreatepackagesidebar(false))
        dispatch(setEditpackagesidebar(!editpackagesidebar))
    }

    const delPackage = (pid) => {
        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/delete-package`,
            method: 'POST',
            data : { pid},
            'headers': {
               // 'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {
      
                const data = response.data
                console.log(data)
      
                if (data.isSuccess) {
               
                //  dispatch(setCreatepackagesidebar(false))
               
                  dispatch(setAdminPackageArray(data.newData))
               
                  // return dispatch(setModalToast({ type: response.data.type, title : response.data.title, message: response.data.message }))
      
      
                } else {
                    setSpinner(false)
                    return dispatch(setError({ path: response.data.path, message: response.data.message }))
                }
      
                setSpinner(false)
      
            }).catch(function (error) {
                setSpinner(false)
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }

    const handleNewPackage = () => {
        dispatch(setCreatepackagesidebar(!createpackagesidebar))
        dispatch(setEditpackagesidebar(false))
       }

    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="md:pt-12  min-h-screen">

            <div className="h-[300px] bg-sky-700 flex  fixed w-full max-w-md lg:max-w-full">
          
          </div>

            <div className=" transition-all  duration-300 flex flex-col pt-6 text-white ">
            <div className="transition-all duration-300 flex flex-col w-full   mx-auto text-white ">
         
            <div className=" w-full mx-auto md:w-10/12 lg:w-10/12 ">

                <section className="w-full mx-auto text-white animated fadeIn">


                    <div className="text-center py-2 px-4 mb-2">
                    <p className="uppercase bold mb-2 text-xl">INVESTMENT PACKAGES</p>              
                    <button onClick={handleNewPackage} className="border px-4 py-2 bg-red-900 border-violet-400 border-4 hover:bg-sky-600 rounded-xl">
					<i className="icofont-plus-square"></i> Add New Package
                    </button>
                    </div>
                    {spinner && 
                    <div className="mx-auto flex flex-col centered mt-20">
                    <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-12 h-12 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    </div>}

    <div className="min-h-screen w-10/12 md:w-full pb-20">
    <div className="grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 px-8 gap-10 lg:gap-2 text-zinc-800 mt-10">
                   
                   
       {adminPackageArray && adminPackageArray.map((item, index)=>{
        return (
              <div   className="flex flex-col items-center bg-gradient-to-br from-sky-100 via-blue-100 
        to-gray-100 p-2 rounded-lg shadow-lg relative border-8 border-sky-500 max-w-sm" key={index}>
     
   
        <div>
            <div className="flex gap-4 justify-center">
                <p className="font-extrabold text-2xl mb-2">{item.package_name}

                </p>
            </div>
           
            <p className="opacity-60 text-center">
            </p>
            <div className="flex gap-4 justify-center">
                <div className="flex flex-col items-center my-8">
                    <p className="font-extrabold text-4xl">${item.package_value}

                    </p>
                    <p className="text-sm opacity-60">One time payment

                    </p>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-1">
            <p className="flex items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" aria-hidden="true" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"></path>
                </svg>
                <b>Daily Profit : {item.daily_profit}%</b>
            </p>
            <p className="flex items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" aria-hidden="true" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"></path>
                </svg>
                <b>Max ROI : {item.max_profit}%</b>
            </p>
            <p className="flex items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" aria-hidden="true" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"></path>
                </svg>
                <b>Contract Duration : {item.duration} days</b>
            </p>
            <p className="flex items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" aria-hidden="true" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"></path>
                </svg>
                <b>Matching Level :  {item.mathcing_level} level</b>
            </p>
         
            <div className="flex justify-around mt-4 w-full">
              
                    <button onClick={()=>handleToEdit(item)} className="border px-4 py-2 border-violet-400 border-4 hover:bg-violet-100 rounded-xl">
					<i className="icofont-ui-edit"></i> Edit
                    </button>
                    <button onClick={()=>delPackage(item.pid)} className="border px-4 py-2 border-violet-400 border-4 hover:bg-violet-100 rounded-xl">
					<i className="icofont-ui-delete"></i> Delete
                    </button>
            </div>
        </div>
    </div> 
        )
       })} 
               




</div>
                    </div>
                </section>
            </div>
            </div>
            </div>
            </div>
        </>
    )
}



