import React, { useEffect, useState, useRef } from "react"
import axios from 'axios'
const moment = require('moment')
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setError } from 'redux/reducers/ErrorReducer'
import { setModalMessage, setCofetty, setModalToast, setModalSendWallet } from 'redux/reducers/ModalReducer'
import {setAdminPackageArray, setAllowRelaodPAckage, setItemToEdit } from 'redux/reducers/PackageReducer'
import { setToUserID, setSendAmount } from 'redux/reducers/FormReducer'
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
    // const [to_userid, setTouserid] = useState(false)
    // const [amount, setAmount] = useState(false)
    const { toUserID, SendAmount } = useSelector((state) => state.FormReducer)
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

    const shoter = (txhash) => {
        let front = txhash.substring(0, 10);
        let back = txhash.substring(txhash.length - 10);
        const string = front + '....' + back;
        return string
    }
  

    useEffect(() => {

        console.log('-----------reload----------')
        if(!isLogin) {
            router.push('/')
        }else{
            handleDepositRequest() 
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(allowReload){
            setLoader(true)
            handleDepositRequest()
             setAllowReload(false)
             setTimeout(()=>{
                setLoader(false)
             },1000)
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allowReload])


    const handleDepositRequest = () => {
        setSpinner(true)
        const data = { toUserID, SendAmount}

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/deposit-request`,
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

                    setSpinner(false)
                    setWdRequestrray(data.dataLimit)   
                 //   setStats(data.stats)         
                 //   dispatch(setModalToast({ type: data.type, title : data.title, message: data.message })) 



                } else {

                    setSpinner(false)
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
 
const handleDepositConfirm  = (pid, userid, amount, confirmed) => {
  
    if(confirmed) return false
  console.log(pid)
  console.log(userid)
  console.log(amount)
  dispatch(setToUserID(userid) )
  dispatch(setSendAmount(amount) )

    setSpinnerPID(pid)
    setSpinner(true)
        const data = {pid, status}

     //   console.log(data)

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/depo-confirm`,
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
                    dispatch(setModalSendWallet(true))
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
  <h2 className="mx-auto bold">DEPOSIT REQUEST</h2> 

  </div>

   
    <div className="flex flex-col w-full overflow-auto">
    <p className="ml-4">100 Latest Deposit Request</p>
                        <table className="w-full text-sm text-left text-gray-500 mt-2">

                                <thead className="font-semibold  text-white uppercase bg-purple-700 border-b border-gray-600">

                                    <tr className="_gradient_purple">
                                        <th className="py-3 text-center"> Userid</th>
                                        <th className="py-3 text-center"> Depo Amount<br/>Tx Hash</th>
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
                                                                                                      
                                                    <a href={`https://bscscan.com/tx/` + item.tx_hash} target="_blank" rel={"noreferrer"} className="text-green-300" title="show on bscscan">
                                                    {shoter(item.tx_hash)}
           </a>   
                                                    </td>
                                            
                                               
                                                <td className="text-center text-[12px] leading-3 ">
                                                    {item.time && moment.unix(item.time).format("YYYY/MM/DD")} <br />
                                                    {item.time && moment.unix(item.time).format("HH:mm:ss")}<br />
                                                    <span className="text-yellow-400 text-[10px]">{moment(moment.unix(item.time), "YYYY/MM/DD h:i:s").fromNow()}</span>
                                                </td>
                                                <td className="text-center text-sm w-[250px]"> 
                                                {item.confirmed?
                                                <div className=" my-6 text-white 
                                               rounded-lg text-sm px-5 py-2.5 
                                                text-center dark:bg-blue-600 ">
                                                      {spinner && spinnerPID === item.id &&
                                                 <svg style={{ maxWidth: 40 }} role="status" className="mr-1 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>}
                                                    {item.confirmed? "Completed" : "Pending..."}</div>:
                                                      <div className=" my-6 text-white 
                                                      rounded-lg text-sm px-5 py-2.5 
                                                       text-center dark:bg-blue-600 ">
                                                             {spinner && spinnerPID === item.id &&
                                                        <svg style={{ maxWidth: 40 }} role="status" className="mr-1 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                       </svg>}
                                                           {item.confirmed? "Completed" : "Pending..."}</div>
                                                        }

                                                </td>
                                                <td className="text-center text-sm"> 
                                                 { item.confirmed?    <button  className=" my-6 text-white bg-green-700   font-medium rounded-lg text-sm px-5 py-2.5 
                                                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                                                {spinner && spinnerPID === item.id &&
                                                 <svg style={{ maxWidth: 40 }} role="status" className="mr-1 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>}
                                                CONFIRMED!
                                                 </button> : 
                                                <button onClick={()=>handleDepositConfirm(item.id, item.userid, item.amount, item.confirmed)} className="my-6 text-white bg-blue-700   font-medium rounded-lg text-sm px-5 py-2.5 
                                                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                                                 {spinner && spinnerPID === item.id &&
                                                 <svg style={{ maxWidth: 40 }} role="status" className="mr-1 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>}
                                                CONFIRM
                                                 </button>
                                    }
                                                    </td>
                                            </tr>

                                          </>  
                                        )
                                    })}

                                    {!spinner && !wdRequestrray &&
                                        <tr className="bg-gray-800 text-white text-center h-12 border-b border-gray-600">
                                            <td colSpan={5} className="text-sm">No transactions  found!</td>
                                        </tr>
                                    }

                                </tbody>
                            </table>

                            <small className="mt-4 ml-4">Click on TX Hash to see on BSCSAN</small>
                            <small className=" ml-4">If Transaction is valid then Admin can send Wallet to the user</small>
                            <small className=" ml-4">Admin also can send Wallet using Send Wallet Menu on the left side. it is show the history of Send Wallet as well</small>
                            {spinner &&
     <div className="text-center mt-5">
            <svg role="status" className="mr-4 inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>}
                        </div> 
  </div>  
  </div>  
  </div>    
       </>
    )

}


