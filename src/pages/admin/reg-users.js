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
     
    

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/reg-users`,
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

                  
                    setUsersArray(data.dataLimit)   
                    setTotalUsers(data.totalUsers)         
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
  <h2 className="mx-auto bold">REGISTER USERS</h2> 
  <p>Total Users : {totalUsers}</p>
  
  </div>

   
    <div className="flex flex-col w-full overflow-auto">
    <p className="ml-4">100 Latest Join</p>
                        <table className="w-full text-sm text-left text-gray-500 mt-2">

                                <thead className="font-semibold  text-white uppercase bg-purple-700 border-b border-gray-600">

                                    <tr className="_gradient_purple">
                                        <th className="py-3 text-center"> No</th>
                                        <th className="py-3 text-center"> Userid</th>
                                        <th className="py-3 text-center"> Name</th>
                                        <th className="py-3 text-center"> Email</th>
                                        <th className="py-3 text-center"> Phone</th>
                                        <th className="py-3 text-center"> Join</th>

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
                                                    <td className="text-center text-sm">{item.email}</td>
                                                    <td className="text-center text-sm">{item.phone}</td>
                                                    <td className="text-center text-sm"> {moment(moment.unix(item.time), "YYYY/MM/DD h:i:s").fromNow()}</td>
                                               
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


