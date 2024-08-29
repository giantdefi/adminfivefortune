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
        if(!isLogin) {
            router.push('/')
        }else{
            handleGetHistory() 
        }
       
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
              //  console.log(data)

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
              //  console.log(data)

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
<div className="flex flex-col md:flex-row w-full centered">   

  <div className="w-full lg:w-10/12 border min-h-screen text-white justify-center bg-gray-500 pt-10">  

  <div className="flex w-full justify-cebter">
  <h4 className="mx-auto">WD REQUEST</h4> 
  </div>
  <div className="flex justify-end">
  <button className=" w-[200px] my-6 mr-6 text-white bg-blue-700
    rounded-lg text-sm px-5 py-2.5 
    text-center dark:bg-blue-600 ">  Only Pending</button>
  </div> 
   
    <div className="flex w-full overflow-auto">

                        <table className="w-full text-sm text-left text-gray-500 mt-2">

                                <thead className="font-semibold  text-white uppercase bg-purple-700 border-b border-gray-600">

                                    <tr className="_gradient_purple">
                                        <th className="py-3 text-center"> Userid</th>
                                        <th className="py-3 text-center"> Amount</th>
                                        <th className="py-3 text-center"> Time</th>
                                        <th className="py-3 text-center"> Status</th>
                                        <th className="py-3 text-center"> Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                            
                                 

                                    { history && history.map((item, index) => {
                                        return (
                                            <>
                                                                                    
                                         <tr className={`${index === 0 ? ' text-yellow-400' : ' text-white'} bg-[#4B0082] h-12 border-b border-purple-700`} key={index}>
                                               <td className="text-center text-sm">{item.to_userid}</td>
                                                <td className="text-center text-sm"> {parseFloat(item.amount).toFixed(2)}</td>
                                            
                                               
                                                <td className="text-center text-[12px] leading-3 ">
                                                    {item.time && moment.unix(item.time).format("YYYY/MM/DD")} <br />
                                                    {item.time && moment.unix(item.time).format("HH:mm:ss")}<br />
                                                    <span className="text-yellow-400 text-[10px]">{moment(moment.unix(item.time), "YYYY/MM/DD h:i:s").fromNow()}</span>
                                                </td>
                                                <td className="text-center text-sm w-[250px]"> 
                                                <button className="w-1/2 my-6 text-white bg-blue-700
                                               rounded-lg text-sm px-5 py-2.5 
                                                text-center dark:bg-blue-600 ">  Pending</button>

                                                </td>
                                                <td className="text-center text-sm"> 
                                                <button className="w-1/2 my-6 text-white bg-blue-700 hover:bg-blue-800 
                                                focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                                                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                                                
                                                 Confirm as PAID
                                                 </button>
                                                    
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


