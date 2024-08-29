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
        
    const handleNumberChange = (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
        const re = /^[0-9]*\.?[0-9]*$/;
        if (re.test(value)) {
                setAmount(value)
        }
    }
    useEffect(() => {
       
        handleGetHistory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(allowReload){
            setLoader(true)
             handleGetHistory()
             setAllowReload(false)
             setTimeout(()=>{
                setLoader(false)
             },1000)
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allowReload])

    const handleGetHistory = () => {
     
       const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/history-send-wallet`,
            method: 'GET',
          
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                const data = response.data
               // console.log(data)

                if (data.isSuccess) {

                    setHistory(data.dataLimit)                
                 //   dispatch(setModalToast({ type: data.type, title : data.title, message: data.message })) 



                } 

               

            }).catch(function (error) {
               
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }

    const handleSendWallet = () => {
     
        if (!to_userid) {
            setSpinner(false)
            return dispatch(setError({ path: "to_userid", message: 'To Userid is required' }))
        }
        if (!amount) {
            setSpinner(false)
            return dispatch(setError({ path: "amount", message: 'Amount is required' }))
        }
  

        const data = {to_userid, amount}

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/send-wallet`,
            method: 'POST',
            data,
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

                    setAllowReload(true)             
                 //   dispatch(setModalToast({ type: data.type, title : data.title, message: data.message })) 



                } else {


                 //   dispatch(setModalToast({ type: 'error', title: "Activation Fail!", message: response.data.message }))
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
<div className="w-full md:w-1/2">  
 <main  role="main" className="w-full mih-h-screen max-w-md mx-auto p-6">
    <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Send Wallet</h1>
        
        </div>

        <div className="mt-5">
          
            <div className="grid gap-y-4">
              <div>
                <label  className="block text-sm font-bold ml-1 mb-2 dark:text-white">To Userid :</label>
                <div className="relative">
                  <input className="py-3 px-4 block w-full   rounded-md text-sm bg-gray-100
                   shadow-sm"
                   name="to_userid"
                   value={to_userid || ''}
                   onChange={(e)=>setTouserid(e.target.value)}
                   />
                    {formError && formError.path === 'to_userid' &&     
                    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
                        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
                        <i className="icofont-arrow-right animate-ping  mr-2"></i>
                        <span className="text-red-900 "> {formError.message}</span> 
                    </p> 
                }
                </div>
              
              </div>
           
            </div>
            <div className="grid gap-y-4">
              <div>
                <label  className="block text-sm font-bold ml-1 mb-2 dark:text-white mt-6">Amount :</label>
                <div className="relative">
                  <input  className="py-3 px-4 block w-full   rounded-md text-sm bg-gray-100
                 shadow-sm" 
                 name="amount"
                 value={amount || ''}
                 onChange={handleNumberChange}
                 />
                  {formError && formError.path === 'amount' &&     
                        <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
                            {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
                            <i className="icofont-arrow-right animate-ping  mr-2"></i>
                            <span className="text-red-900 "> {formError.message}</span> 
                        </p> 
                    }
                </div>
              
              </div>
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
                   <button onClick={handleSendWallet} type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 
                   rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm 
                   dark:focus:ring-offset-gray-800">
                    
                   
                     Send Wallet</button>
                     }
              
            </div>
        
        </div>
      </div>
    </div>


  </main>
  </div> 
  <div className="w-full md:w-1/2 border min-h-screen text-white justify-center bg-gray-500 pt-10">  

  <div className="flex w-full">
  <h4 className="mx-auto">History Send Wallet</h4> 
  </div> 
    <div className="flex w-full">

                        <table className="w-full text-sm text-left text-gray-500 mt-2">

                                <thead className="font-semibold  text-white uppercase bg-purple-700 border-b border-gray-600">

                                    <tr className="_gradient_purple">
                                        <th className="py-3 text-center"> To User</th>
                                        <th className="py-3 text-center"> Amount</th>
                                        <th className="py-3 text-center"> Time</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {/* {loader && 
                                <tr className=" bg-[#4B0082] h-12 border-b border-purple-700" >
                                 <td colSpan={5} className="text-center"> <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-6 h-6 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                </td> </tr>
                                } */}
                                 

                                    { history && history.map((item, index) => {
                                        return (
                                            <>
                                            {loader &&  index === 0 && 
                                                <tr className=" bg-[#4B0082] h-12 border-b border-purple-700" >
                                                <td colSpan={5} className="text-center"> <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-6 h-6 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                   <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                               </svg>
                                               </td> </tr>
                                              }
                                         
                                         <tr className={`${index === 0 ? ' text-yellow-400' : ' text-white'} bg-[#4B0082] h-12 border-b border-purple-700`} key={index}>
                                               <td className="text-center text-sm">{item.to_userid}</td>
                                                <td className="text-center text-sm"> {parseFloat(item.amount).toFixed(2)}</td>
                                            
                                               
                                                <td className="text-center text-[12px] leading-3">
                                                    {item.time && moment.unix(item.time).format("YYYY/MM/DD")} <br />
                                                    {item.time && moment.unix(item.time).format("HH:mm:ss")}<br />
                                                    <span className="text-yellow-400 text-[10px]">{moment(moment.unix(item.time), "YYYY/MM/DD h:i:s").fromNow()}</span>
                                                </td>
                                            </tr>

                                          </>  
                                        )
                                    })}

                                    {/* {!spinner && !sendPoinHistory &&
                                        <tr className="bg-gray-800 text-white text-center h-12 border-b border-gray-600">
                                            <td colSpan={5} className="text-sm">No transactions  found!</td>
                                        </tr>
                                    } */}

                                </tbody>
                            </table>
                        </div> 
  </div>  
  </div>  
  </div>    
       </>
    )

}


