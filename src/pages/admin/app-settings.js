import React, { useEffect, useState, useRef } from "react"
import axios from 'axios'
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
    setApp_title, setApp_domain, setApp_description, setApp_tags, setApp_currency, setAdmin_wallet,setSplittoEWallet,setSplittoRwallet,
    setLevel_1, setLevel_2, setLevel_3, setLevel_4, setLevel_5, setLevel_6, setLevel_7, setLevel_8, setLevel_9, setLevel_10,
    setTo_E_Wallet, setTo_R_Wallet, setBonus_sponsor
  } from 'redux/reducers/ConstantReducer'
//--------------------------------------

export default function Users() {

    const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)
    const { adminPackageArray, allowRelaodPackage } = useSelector((state) => state.PackageReducer)
    const { isLogin, token } = useSelector((state) => state.AuthReducer)
    const { createpackagesidebar } = useSelector((state) => state.MainmenuReducer)
    const { editpackagesidebar } = useSelector((state) => state.MainmenuReducer)
    const { 
        app_title,app_domain, app_description, app_tags, app_currency,admin_wallet, splittoEWallet, splittoRwallet, bonus_sponsor,
        level_1, level_2, level_3,level_4,level_5,level_6,level_7, level_8, level_9, level_10,  
        to_E_Wallet,  to_R_Wallet
       
       
     } = useSelector((state) => state.ConstantReducer)


     useEffect(() => {
        // if(!isLogin) {
        //     router.push('/')
        // }else{
            getAdminConstant()
        //}
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
    
    
     const getAdminConstant = () => {
     
     const URL = process.env.NEXT_PUBLIC_API_URL_V1
      return axios({
          url: `${URL}/admin/constant`,
          method: 'GET',
             'headers': {
             'Authorization': token,
              accept: 'application/json',
              'content-type': 'application/json',
          }
      })
          .then(async response => {
    
              const data = response.data.data
    
              if (response.data.isSuccess) {

                
            //  console.log(data)
             
                dispatch(setApp_title(data[0].app_title))
                dispatch(setApp_domain(data[0].app_domain))
                dispatch(setApp_description(data[0].app_description))
                dispatch(setApp_tags(data[0].app_tags))
                dispatch(setApp_currency(data[0].app_currency))
                dispatch(setAdmin_wallet(data[0].admin_wallet_crypto))
                dispatch(setSplittoEWallet(data[0].alocate_E_Wallet))
                dispatch(setSplittoRwallet(data[0].alocate_R_Wallet))
                dispatch(setTo_E_Wallet(data[0].to_E_Wallet))
                dispatch(setTo_R_Wallet(data[0].to_R_Wallet))
                dispatch(setBonus_sponsor(data[0].bonus_sponsor))

                dispatch(setLevel_1(data[0].sponsor_L1))
                dispatch(setLevel_2(data[0].sponsor_L2))
                dispatch(setLevel_3(data[0].sponsor_L3))
                dispatch(setLevel_4(data[0].sponsor_L4))
                dispatch(setLevel_5(data[0].sponsor_L5))
                dispatch(setLevel_6(data[0].sponsor_L6))
                dispatch(setLevel_7(data[0].sponsor_L7))
                dispatch(setLevel_8(data[0].sponsor_L8))
                dispatch(setLevel_9(data[0].sponsor_L9))
                dispatch(setLevel_10(data[0].sponsor_L10))
          
    
              } else {
               
                  return dispatch(setError({ path: response.data.path, message: response.data.message }))
              }
    
         //     setSpinner(false)
    
          }).catch(function (error) {
           //   setSpinner(false)
              console.log(error)
              return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
          })
  }
   
  
  const handleStoreConstant = () => {

      setSpinner(true)
      dispatch(setError(false))
        const data = {
        app_title,app_domain, app_description, app_tags,app_currency,admin_wallet, splittoEWallet, splittoRwallet, bonus_sponsor,
        level_1, level_2, level_3,level_4,level_5,level_6,level_7, level_8, level_9, level_10, to_E_Wallet, to_R_Wallet
        
      }



       const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/admin/constant`,
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
             //   console.log(data)
      
                if (data.isSuccess) {
            
                 setTimeout(()=>{
                    setSpinner(false)
                  
              
                  },2000)
              return dispatch(setModalMessage({ type: response.data.type, title : response.data.title, message: response.data.message }))
                
                  
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

 
    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="md:pt-12  min-h-screen">

            <div className="h-[300px] bg-sky-700 flex  fixed w-full max-w-md lg:max-w-full">
          
            </div>
          
            <div className="flex w-full justify-center">
<section className="w-10/12 mx-auto text-white animated fadeIn pt-20">


<div className="text-center  px-4 mb-2">
<p className="uppercase bold mb-2 text-xl text-gray-100">APPLICATION SETTINGS</p>              

</div>



<div className="flex flex-col lg:flex-row ">
<div className="w-full lg:w-1/2 pb-20 border bg-gray-300 dark:bg-gray-800  pr-6">
                

<div className="max-w-sm ml-10 mt-10">
<div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apps Title</label>
    <input  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm
     rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
     dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="FIVEFORTUNEFX" 
    name="app_title"
    value = {app_title || ""}
    onChange={(e)=>dispatch(setApp_title(e.target.value))}
    />
    {formError && formError.path === 'app_title' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
    }
</div>

<div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apps Domain</label>
    <input  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm
     rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
     dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="https://fivefortunefx.com" 
    name="app_domain"
    value = {app_domain || ""}
    onChange={(e)=>dispatch(setApp_domain(e.target.value))}
    />
    {formError && formError.path === 'app_domain' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
    }
</div>

<div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apps SEO Description</label>
    <textarea  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm
     rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
     dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="FIVEFORTUNEFX is an online investment business that will leverage your asset...." 
    name="app_description"
    value = {app_description || ""}
    onChange={(e)=>dispatch(setApp_description(e.target.value))}
    />
    {formError && formError.path === 'app_description' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
    }
</div>

<div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apps SEO Tags</label>
    <textarea  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm
     rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
     dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="investment, online business, work from home," 
    name="app_tags"
    value = {app_tags || ""}
    onChange={(e)=>dispatch(setApp_tags(e.target.value))}
    />
    {formError && formError.path === 'app_tags' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
    }
</div>





<div className="mb-5 border p-4">
    <p className="mb-4 bold text-gray-800 dark:text-gray-100">Split All Bonus</p>
<div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Split Bonus to E-Wallet (in %)</label>
    <input   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
    dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
    name="splittoEWallet"
    value = {splittoEWallet || ""}
    onChange={(e)=>dispatch(setSplittoEWallet(e.target.value))}

    />
     {formError && formError.path === 'splittoEWallet' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
    }
</div>
<div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Split Bonus to R-Wallet (in %)</label>
    <input   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
    dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
    name="splittoRwallet"
    value = {splittoRwallet || ""}
    onChange={(e)=>dispatch(setSplittoRwallet(e.target.value))}

    />
      {formError && formError.path === 'splittoRwallet' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
    }
</div>
</div>


</div>

</div>

<div className="w-full p-6 lg:w-1/2 pb-20 border bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-100">
<div className="w-full max-w-sm border mx-auto mt-4">

<div className="max-w-sm mx-auto mb-5">
<label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">App Currency</label>
<select  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 name="app_currency"
 value = {app_currency }
 onChange={(e)=>dispatch(setApp_currency(e.target.value))}
>
    <option>USD</option>
    <option >USDT</option>
    <option>TRON</option>
    <option>ETH</option>
    <option>BTC</option>
    <option>TON</option>
</select>
{formError && formError.path === 'app_currency' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
    }
</div>

<div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">App Currency (enter if not on the list)</label>
    <input  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
    ocus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
    name="app_currency"
    value = {app_currency || ""}
    onChange={(e)=>dispatch(setApp_currency(e.target.value))}
    />
      {formError && formError.path === 'app_currency' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
    }
</div>

<div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin Wallet</label>
    <input   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
    dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
    name="admin_wallet"
    value = {admin_wallet || ""}
    onChange={(e)=>dispatch(setAdmin_wallet(e.target.value))}
    />
      {formError && formError.path === 'admin_wallet' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
    }
</div>
<div className="mb-5">
    <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bonus Sponsor in % of package Value</label>
    <input   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm 
    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
    dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
    name="bonus_sponsor"
    value = {bonus_sponsor || ""}
    onChange={(e)=>dispatch(setBonus_sponsor(e.target.value))}
    />
      {formError && formError.path === 'bonus_sponsor' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
    }
</div>
<div className="mb-5 border-2 border-gray-300 pl-6">
<h4 className="ml-10">Matching SPONSOR generasi </h4>

<div className="md:flex md:items-center mb-2 mt-4 text-gray-700 dark:text-gray-100">
<div className="md:w-1/3">
<label className="block   md:text-right mb-1 md:mb-0 pr-4" >
Level-1
</label>
</div>
<div className="md:w-1/4 flex">
<input className="bg-white dark:bg-gray-800 dark:text-white  border border-gray-200 rounded w-full  px-4 h-[40px] w-1/2
text-gray-700  focus:outline-none  focus:border-sky-500" 
name="level_1"
value = {level_1 || "0"}
onChange={(e)=>dispatch(setLevel_1(e.target.value))}
/><span className="ml-2">%</span>
</div>
{formError && formError.path === 'level_1' &&     
<p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
{/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
<i className="icofont-arrow-right animate-ping  mr-2"></i>
<span className="text-red-900 "> {formError.message}</span> 
</p> 
}
</div>
<div className="md:flex md:items-center mb-2 text-gray-700 dark:text-gray-100">
<div className="md:w-1/3">
<label className="block   md:text-right mb-1 md:mb-0 pr-4" >
Level-2
</label>
</div>
<div className="md:w-1/4 flex">
<input className="bg-white dark:bg-gray-800 dark:text-white  border border-gray-200 rounded w-full  px-4 h-[40px] w-1/2 
text-gray-700  focus:outline-none  focus:border-sky-500" 
name="level_2"
value = {level_2 || "0"}
onChange={(e)=>dispatch(setLevel_2(e.target.value))}
/><span className="ml-2">%</span>
</div>
{formError && formError.path === 'level_2' &&     
<p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
{/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
<i className="icofont-arrow-right animate-ping  mr-2"></i>
<span className="text-red-900 "> {formError.message}</span> 
</p> 
}
</div>
<div className="md:flex md:items-center mb-2 text-gray-700 dark:text-gray-100">
<div className="md:w-1/3">
<label className="block   md:text-right mb-1 md:mb-0 pr-4" >
Level-3
</label>
</div>
<div className="md:w-1/4 flex">
<input className="bg-white dark:bg-gray-800 dark:text-white  border border-gray-200 rounded w-full  px-4 h-[40px] w-1/2 
text-gray-700  focus:outline-none  focus:border-sky-500" 
name="level_3"
value = {level_3 || "0"}
onChange={(e)=>dispatch(setLevel_3(e.target.value))}
/><span className="ml-2">%</span>
</div>
{formError && formError.path === 'level_3' &&     
<p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
{/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
<i className="icofont-arrow-right animate-ping  mr-2"></i>
<span className="text-red-900 "> {formError.message}</span> 
</p> 
}
</div>
<div className="md:flex md:items-center mb-2 text-gray-700 dark:text-gray-100">
<div className="md:w-1/3">
<label className="block   md:text-right mb-1 md:mb-0 pr-4" >
Level-4
</label>
</div>
<div className="md:w-1/4 flex">
<input className="bg-white dark:bg-gray-800 dark:text-white  border border-gray-200 rounded w-full  px-4 h-[40px] w-1/2  
text-gray-700  focus:outline-none  focus:border-sky-500" 
name="level_4"
value = {level_4 || "0"}
onChange={(e)=>dispatch(setLevel_4(e.target.value))}
/><span className="ml-2">%</span>
</div>
{formError && formError.path === 'level_4' &&     
<p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
{/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
<i className="icofont-arrow-right animate-ping  mr-2"></i>
<span className="text-red-900 "> {formError.message}</span> 
</p> 
}
</div>
<div className="md:flex md:items-center mb-2 text-gray-700 dark:text-gray-100">
<div className="md:w-1/3">
<label className="block   md:text-right mb-1 md:mb-0 pr-4" >
Level-5
</label>
</div>
<div className="md:w-1/4 flex">
<input className="bg-white dark:bg-gray-800 dark:text-white  border border-gray-200 rounded w-full  px-4 h-[40px]  w-1/2 
text-gray-700  focus:outline-none  focus:border-sky-500" 
name="level_5"
value = {level_5 || "0"}
onChange={(e)=>dispatch(setLevel_5(e.target.value))}
/><span className="ml-2">%</span>
</div>
{formError && formError.path === 'level_5' &&     
<p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
{/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
<i className="icofont-arrow-right animate-ping  mr-2"></i>
<span className="text-red-900 "> {formError.message}</span> 
</p> 
}
</div>
<div className="md:flex md:items-center mb-2 text-gray-700 dark:text-gray-100">
<div className="md:w-1/3">
<label className="block   md:text-right mb-1 md:mb-0 pr-4" >
Level-6
</label>
</div>
<div className="md:w-1/4 flex">
<input className="bg-white dark:bg-gray-800 dark:text-white  border border-gray-200 rounded w-full  px-4 h-[40px] w-1/2 
text-gray-700  focus:outline-none  focus:border-sky-500" 
name="level_6"
value = {level_6 || "0"}
onChange={(e)=>dispatch(setLevel_6(e.target.value))}
/><span className="ml-2">%</span>
</div>
{formError && formError.path === 'level_6' &&     
<p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
{/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
<i className="icofont-arrow-right animate-ping  mr-2"></i>
<span className="text-red-900 "> {formError.message}</span> 
</p> 
}
</div>
<div className="md:flex md:items-center mb-2 text-gray-700 dark:text-gray-100">
<div className="md:w-1/3">
<label className="block   md:text-right mb-1 md:mb-0 pr-4" >
Level-7
</label>
</div>
<div className="md:w-1/4 flex">
<input className="bg-white dark:bg-gray-800 dark:text-white  border border-gray-200 rounded w-full  px-4 h-[40px] w-1/2 
text-gray-700  focus:outline-none  focus:border-sky-500" 
name="level_7"
value = {level_7|| "0"}
onChange={(e)=>dispatch(setLevel_7(e.target.value))}
/><span className="ml-2">%</span>
</div>
{formError && formError.path === 'level_7' &&     
<p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
{/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
<i className="icofont-arrow-right animate-ping  mr-2"></i>
<span className="text-red-900 "> {formError.message}</span> 
</p> 
}
</div>
<div className="md:flex md:items-center mb-2 text-gray-700 dark:text-gray-100">
<div className="md:w-1/3">
<label className="block   md:text-right mb-1 md:mb-0 pr-4" >
Level-8
</label>
</div>
<div className="md:w-1/4 flex">
<input className="bg-white dark:bg-gray-800 dark:text-white  border border-gray-200 rounded w-full  px-4 h-[40px] w-1/2 
text-gray-700  focus:outline-none  focus:border-sky-500" 
name="level_8"
value = {level_8 || "0"}
onChange={(e)=>dispatch(setLevel_8(e.target.value))}
/><span className="ml-2">%</span>
</div>
{formError && formError.path === 'level_8' &&     
<p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
{/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
<i className="icofont-arrow-right animate-ping  mr-2"></i>
<span className="text-red-900 "> {formError.message}</span> 
</p> 
}
</div>
<div className="md:flex md:items-center mb-2 text-gray-700 dark:text-gray-100">
<div className="md:w-1/3">
<label className="block   md:text-right mb-1 md:mb-0 pr-4" >
Level-9
</label>
</div>
<div className="md:w-1/4 flex">
<input className="bg-white dark:bg-gray-800 dark:text-white  border border-gray-200 rounded w-full  px-4 h-[40px] w-1/2 
text-gray-700  focus:outline-none  focus:border-sky-500" 
name="level_9"
value = {level_9 || "0"}
onChange={(e)=>dispatch(setLevel_9(e.target.value))}
/><span className="ml-2">%</span>
</div>
{formError && formError.path === 'level_9' &&     
<p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
{/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
<i className="icofont-arrow-right animate-ping  mr-2"></i>
<span className="text-red-900 "> {formError.message}</span> 
</p> 
}
</div>
<div className="md:flex md:items-center mb-2 text-gray-700 dark:text-gray-100">
<div className="md:w-1/3">
<label className="block   md:text-right mb-1 md:mb-0 pr-4" >
Level-10
</label>
</div>
<div className="md:w-1/4 flex">
<input className="bg-white dark:bg-gray-800 dark:text-white  border border-gray-200 rounded w-full  px-4 h-[40px] w-1/2 
text-gray-700  focus:outline-none  focus:border-sky-500" 
name="level_10"
value = {level_10 || "0"}
onChange={(e)=>dispatch(setLevel_10(e.target.value))}
/><span className="ml-2">%</span>
</div>
{formError && formError.path === 'level_10' &&     
<p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
{/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
<i className="icofont-arrow-right animate-ping  mr-2"></i>
<span className="text-red-900 "> {formError.message}</span> 
</p> 
}
</div>
</div>

<div className=" mt-10 mx-auto flex w-full justify-center"> 


{spinner ?
<button className="w-1/2 my-6 text-white bg-blue-700 hover:bg-blue-800 
focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 p-2
text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
<svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-6 h-6 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
</svg> processing.....</button>
:
<button onClick={handleStoreConstant} className="w-1/2 my-6 text-white bg-blue-700 hover:bg-blue-800 
focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 
text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  SUBMIT REQUEST

</button>


}

</div>
</div>
</div>

</div>
</section>
         
            </div>
            </div>
          
          
        </>
    )
}



