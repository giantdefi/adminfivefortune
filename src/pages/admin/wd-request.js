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
    const [stats, setStats] = useState(false)
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
    const [wdRequestrray, setWdRequestrray] = useState(false)
    const [spinnerPID, setSpinnerPID] = useState(false)
        
    const handleNumberChange = (e) => {
        dispatch(setError(false))
        const { name, value } = e.target
        const re = /^[0-9]*\.?[0-9]*$/;
        if (re.test(value)) {
                setAmount(value)
        }
    }

  

    useEffect(() => {

        console.log('-----------reload----------')
        if(!isLogin) {
            router.push('/')
        }else{
            handleWDRequest() 
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(allowReload){
            setLoader(true)
            handleWDRequest()
             setAllowReload(false)
             setTimeout(()=>{
                setLoader(false)
             },1000)
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allowReload])


    const handleWDRequest = () => {
     
        const data = {to_userid, amount}

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/wd-request`,
            method: 'get',
            data,
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                const data = response.data
              //  console.log(data)

                if (data.isSuccess) {

                  
                    setWdRequestrray(data.dataLimit)   
                    setStats(data.stats)         
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
 
const handleWDPaid  = (pid, status, amount) => {
    setSpinnerPID(pid)
    setSpinner(true)
        const data = {pid, status, amount}

     //   console.log(data)

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/wd-confirm`,
            method: 'post',
            data,
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                const data = response.data
              //  console.log(data)

                if (data.isSuccess) {

                    setAllowReload(true) 
                    setSpinner(false)
                 //   setWdRequestrray(data.dataLimit)            
                 //   dispatch(setModalToast({ type: data.type, title : data.title, message: data.message })) 



                } else {

                    setSpinner(false)
                 //   dispatch(setModalToast({ type: 'error', title: "Activation Fail!", message: response.data.message }))
                    return dispatch(setError({ path: response.data.path, message: response.data.message }))
                }

               

            }).catch(function (error) {
                setSpinner(false)
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
  
}
//   console.log(allowReload)
  // console.log(stats)


    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>


<div className="md:pt-12  min-h-screen">
<div className="flex flex-col md:flex-row w-full centered">   

  <div className="w-full lg:w-10/12  min-h-screen text-white justify-center bg-gray-800 pt-10">  

  <div className="flex flex-col centered w-full justify-cebter">
  <h2 className="mx-auto bold">WD REQUEST</h2> 
  <p>Total WD Request : {stats.wd_request}</p>
  <p>Total WD Paid : {stats.wd_paid}</p>
  </div>

   
    <div className="flex flex-col w-full overflow-auto">
    <p className="ml-4">100 Latest WD Request</p>
                        <table className="w-full text-sm text-left text-gray-500 mt-2">

                                <thead className="font-semibold  text-white uppercase bg-purple-700 border-b border-gray-600">

                                    <tr className="_gradient_purple">
                                        <th className="py-3 text-center"> Userid</th>
                                        <th className="py-3 text-center"> Amount<br/>wallet address</th>
                                        <th className="py-3 text-center"> Time</th>
                                        <th className="py-3 text-center"> Status</th>
                                        <th className="py-3 text-center"> Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                            
                                 

                                    { wdRequestrray && wdRequestrray.map((item, index) => {
                                        return (
                                            <>
                                                                                    
                                         <tr className={`${index === 0 ? ' text-yellow-400' : ' text-white'} bg-[#4B0082] h-12 border-b border-purple-700`} key={index}>
                                               <td className="text-center text-sm">{item.userid}</td>
                                                <td className="text-center text-sm"> 
                                                  <span className="bold">USDT  {parseFloat(item.amount).toFixed(2)}</span><br/>
                                                    {item.wallet_address}
                                                    </td>
                                            
                                               
                                                <td className="text-center text-[12px] leading-3 ">
                                                    {item.time && moment.unix(item.time).format("YYYY/MM/DD")} <br />
                                                    {item.time && moment.unix(item.time).format("HH:mm:ss")}<br />
                                                    <span className="text-yellow-400 text-[10px]">{moment(moment.unix(item.time), "YYYY/MM/DD h:i:s").fromNow()}</span>
                                                </td>
                                                <td className="text-center text-sm w-[250px]"> 
                                                {item.paid?
                                                <button className=" my-6 text-white bg-red-700/50
                                               rounded-lg text-sm px-5 py-2.5 
                                                text-center dark:bg-blue-600 ">
                                                      {spinner && spinnerPID === item.id &&
                                                 <svg style={{ maxWidth: 40 }} role="status" className="mr-1 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>}
                                                    {item.paid? "PAID" : "Pending"}</button>:
                                                      <button className=" my-6 text-white bg-blue-700
                                                      rounded-lg text-sm px-5 py-2.5 
                                                       text-center dark:bg-blue-600 ">
                                                             {spinner && spinnerPID === item.id &&
                                                        <svg style={{ maxWidth: 40 }} role="status" className="mr-1 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                       </svg>}
                                                           {item.paid? "PAID" : "Pending"}</button>
                                                        }

                                                </td>
                                                <td className="text-center text-sm"> 
                                                { item.paid?    <button onClick={()=>handleWDPaid(item.id, item.paid, item.amount)} className=" my-6 text-white bg-red-700   font-medium rounded-lg text-sm px-5 py-2.5 
                                                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                                                {spinner && spinnerPID === item.id &&
                                                 <svg style={{ maxWidth: 40 }} role="status" className="mr-1 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>}
                                                 RESET 
                                                 </button> :
                                                <button onClick={()=>handleWDPaid(item.id, item.paid, item.amount)} className="my-6 text-white bg-blue-700   font-medium rounded-lg text-sm px-5 py-2.5 
                                                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                                                 {spinner && spinnerPID === item.id &&
                                                 <svg style={{ maxWidth: 40 }} role="status" className="mr-1 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>}
                                                 Confirm 
                                                 </button>
                                    }
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


