import React, {useRef, useEffect, useState } from "react"
import Link from 'next/link'
import axios from 'axios'
import Router, { useRouter } from "next/router"
import { setCreatepackagesidebar } from 'redux/reducers/MainmenuReducer'

import { setModalMessage, setCofetty, setModalToast } from 'redux/reducers/ModalReducer'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import {setAdminPackageArray, setAllowRelaodPAckage } from 'redux/reducers/PackageReducer'
import { setError, resetErrors } from 'redux/reducers/ErrorReducer'

//--------------------------------------

export default function Home() {

  
 const dispatch = useDispatch()
  const router = useRouter()
  const { formError } = useSelector((state) => state.ErrorReducer)
  const [spinner, setSpinner] = useState(false)
  const { createpackagesidebar } = useSelector((state) => state.MainmenuReducer)
  const { adminPackageArray, allowRelaodPackage } = useSelector((state) => state.PackageReducer)
  const [pname, setPname] = useState(false)
  const [pvalue, setPvalue] = useState(false)
  const [dailyProfit, setDailyProfit] = useState(false)
  const [maxROI, setMaxROI] = useState(180)
  const [duration, setDuration] = useState(90)
  const [matchingLevel, setMatchingLevel] = useState(90)




const handleChange = async (e) => {
    dispatch(resetErrors())
    const { name, value } = e.target
    console.log(name)
    if (name==="pname") {
        setPname(value)   
    }else if (name==="pvalue") {
        setPvalue(value)
    }else if (name==="maxROI") {
        setMaxROI(value)
    }else if (name==="duration") {
        setDuration(value)
    }else if (name==="matchingLevel") {
        setMatchingLevel(value)
    }else if (name==="dailyProfit") {
        setDailyProfit(value)
    }

}


const handleSubmit = () => {

    const data = {
        pname,pvalue, dailyProfit, maxROI, duration, matchingLevel
    }

    if (!data.pname) {
        setSpinner(false)
        return dispatch(setError({ path: "pname", message: 'Package Name is required' }))
    }
     
    if (!data.pvalue) {
        setSpinner(false)
        return dispatch(setError({ path: "pvalue", message: 'Package Value is required' }))
    }
    if (!data.dailyProfit) {
        setSpinner(false)
        return dispatch(setError({ path: "dailyProfit", message: 'Daily Profit Value is required' }))
    }
     
    if (!data.maxROI) {
        setSpinner(false)
        return dispatch(setError({ path: "maxROI", message: 'This data is required' }))
    }
     
    if (!data.duration) {
        setSpinner(false)
        return dispatch(setError({ path: "duration", message: 'This data is required' }))
    }
    if (!data.matchingLevel) {
        setSpinner(false)
        return dispatch(setError({ path: "matchingLevel", message: 'This data is required' }))
    }
    setSpinner(true)
   

  console.log(data)  

  const URL = process.env.NEXT_PUBLIC_API_URL_V1
  return axios({
      url: `${URL}/admin/create-package`,
      method: 'POST',
      data,
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
            setSpinner(false)
            dispatch(setCreatepackagesidebar(false))
            dispatch(setAllowRelaodPAckage(true))
          //  return dispatch(setModalToast({ type: response.data.type, title : response.data.title, message: response.data.message }))


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

const handleclose = () =>{
    dispatch(resetErrors())
    dispatch(setCreatepackagesidebar(!createpackagesidebar))
}


return (
  <>


        
    <div  class={`min-h-screen overflow-auto mt-24 md:mt-16 fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-96 
    dark:bg-gray-800 ${!createpackagesidebar && "translate-x-full"}`}
    >
    <div class="flex justify-end"> 
       <button onClick={handleclose} className=" my-1 text-white bg-blue-700 hover:bg-blue-800 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i class="icofont-circled-right"></i>  Close</button>
  </div>  


 <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" >
    <div class="space-y-6">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Create/Add new Pakage</h5>
        <div>

<div class="space-y-2">
    <label  className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Package Name :</label>
    <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  
    name="pname"
    value={pname || ''}
    onChange={handleChange}
    />
  {formError && formError.path === 'pname' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
}
</div>

<div class="space-y-2 mt-4">
    <label  className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Package Value :</label>
    <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  
    name="pvalue"
    value={pvalue || ''}
    onChange={handleChange}
    />
  {formError && formError.path === 'pvalue' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
}
</div>

<div class="space-y-2 mt-4">
    <label  className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Daily Profit in %:</label>
    <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  
    name="dailyProfit"
    value={dailyProfit || ''}
    onChange={handleChange}
    />
  {formError && formError.path === 'dailyProfit' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
}
</div>

<div class="space-y-2 mt-4">
    <label  className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Max ROI in % :</label>
    <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  
    name="maxROI"
    value={maxROI || ''}
    onChange={handleChange}
    />
  {formError && formError.path === 'maxROI' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
}
</div>

<div class="space-y-2 mt-4">
    <label  className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Package Duration in Days :</label>
    <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  
    name="duration"
    value={duration || ''}
    onChange={handleChange}
    />
  {formError && formError.path === 'duration' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
}
</div>

<div class="space-y-2 mt-4">
    <label  className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Matching Level :</label>
    <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
    focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"  
    name="matchingLevel"
    value={matchingLevel || ''}
    onChange={handleChange}
    />
  {formError && formError.path === 'matchingLevel' &&     
    <p className="text-red-800 ml-2 text-sm animated backInLeft items-center flex">
        {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
        <i className="icofont-arrow-right animate-ping  mr-2"></i>
        <span className="text-red-900 "> {formError.message}</span> 
    </p> 
}
</div>

                     
</div>  
{spinner ?
                <button className="w-full my-6 text-white bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-6 h-6 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    submitting.....</button>
                :    
      
<button onClick={handleSubmit} className="w-full my-6 text-white bg-blue-700 hover:bg-blue-800 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  Save Package</button>
  
}
    </div>
</div> 

</div>

  </>
)
}



