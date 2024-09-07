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
  
    const { isLogin, token } = useSelector((state) => state.AuthReducer)
    const { statsSelectedPackage } = useSelector((state) => state.PackageReducer)

  
    const [UsersArray, setUsersArray] = useState(false)
    const [totalUsers, setTotalUsers] = useState(false)
        

    useEffect(() => {

        console.log('-----------reload----------')
        if(!isLogin) {
            router.push('/')
        }else{
            getUsersData() 
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    

    const getUsersData = () => {
     
        setSpinner(true)

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/active-users?package=${statsSelectedPackage}`,
            method: 'get',
          
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
                    setUsersArray(data.dataLimit)   
                    setTotalUsers(data.totalUsers)         
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
  <h2 className="mx-auto bold">ACTIVE USERS</h2> 
  <p>Total Users : {totalUsers || 0}</p>
  
  </div>

   
    <div className="flex flex-col w-full overflow-auto">
    <p className="ml-4">100 Latest Data</p>
                        <table className="w-full text-sm text-left text-gray-500 mt-2">

                                <thead className="font-semibold  text-white uppercase bg-purple-700 border-b border-gray-600">

                                    <tr className="_gradient_purple">
                                        <th className="py-3 text-center"> No</th>
                                        <th className="py-3 text-center"> Userid</th>
                                        <th className="py-3 text-center"> Package</th>
                                        <th className="py-3 text-center"> Total REdeem</th>
                                        <th className="py-3 text-center"> Days to complete</th>
                                        <th className="py-3 text-center"> Package Start</th>

                                    </tr>
                                </thead>
                                <tbody>
                            
                                 

                                    { UsersArray && UsersArray.map((item, index) => {
                                        return (
                                            <>
                                                                                    
                                         <tr className={`${index === 0 ? ' text-yellow-400' : ' text-white'} bg-[#4B0082] h-12 border-b border-purple-700`} key={index}>
                                               <td className="text-center text-sm">{index+1}</td>
                                                <td className="text-center text-sm"> 
                                                  <span className="bold">{item.userid}</span><br/>
                                                    </td> 
                                                    <td className="text-center text-sm">{item.name}</td>
                                                    
                                                    <td className="text-center text-sm">{item.total_wd}</td>
                                                    <td className="text-center text-sm">{item.days_left ? item.days_left : 'completed'}</td>
                                                    <td className="text-center text-sm"> {moment(moment.unix(item.time_start), "YYYY/MM/DD h:i:s").fromNow()}</td>
                                               
                                            </tr>

                                          </>  
                                        )
                                    })}

                                    {!spinner && !UsersArray &&
                                        <tr className="bg-gray-800 text-white text-center h-12 border-b border-gray-600">
                                            <td colSpan={6} className="text-sm">No transactions  found!</td>
                                        </tr>
                                    }

                                </tbody>
                            </table>

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


