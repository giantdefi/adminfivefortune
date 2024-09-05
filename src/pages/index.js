import React, { useEffect } from "react"
import Router, { useRouter } from "next/router"


import Head from 'next/head'
  import MainIndex from "./MainIndex"
  import MobileIndex from "./MobileIndex"


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setMainMenuItem } from 'redux/reducers/MainmenuReducer'
import {setWarningAllowLogin } from 'redux/reducers/AuthReducer'
//--------------------------------------

export default function Home() {

  const { domain, title, desc } = useSelector((state) => state.GeneralReducer)

  const router = useRouter()
  const { ref } = router.query
  const dispatch = useDispatch();

  const { width } = useSelector((state) => state.GeneralReducer)

  useEffect(() => { // referal sponsor from URL if any
    setTimeout(() => {
      //  setdelayLoad(true)
    }, 500)
    dispatch(setMainMenuItem(1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    const timeNow = parseInt(Date.now() / 1000)
    var date1 = new Date()
    let date = date1.getDate();
    let year = date1.getFullYear()
    let month = date1.getMonth() + 1
    const datefull = date+'/'+month+'/'+year;
    console.log(datefull)

    if( datefull === '15/9/2024') {
        console.log('LOGIN DISABLED')
       
    //     router.push('/logout')
         setTimeout(()=>{
            dispatch(setWarningAllowLogin(false))
         },1000)
        
    }else{
      console.log('LOGIN ENABLED')
      setTimeout(()=>{
        dispatch(setWarningAllowLogin(true))
     },1000)
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  return (
    <>

      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Head>

      <div>

      {/* show mobile main page on small device */}
       { width > 760? <MainIndex/> : <MobileIndex/> } 
      </div>

    </>
  )
}



