import React, {useState, useEffect } from "react"
//import Link from 'next/link'
import dynamic from 'next/dynamic'
import CreatePackageSidebar from "layout/CreatePackageSidebar"
import EditPackageSidebar from "layout/EditPackageSidebar"

import { useRouter } from 'next/router'
import MainFooter from "layout/MainFooter"
import MainTopNavigation from "./MainTopNavigation"
import UserTopNavigation from "./UserTopNavigation"
import FirebaseSidebar from "menu/FirebaseSidebar"
import ModalMessage from "components/modal/ModalMessage"
import ModalToast from "components/modal/ModalToast"
import ReferralLink from "components/reflink/ReferralLink"

//import ModalMenuDrawer from "components/modal/ModalMenuDrawer" 
import MobileTopNavigation from "./MobileTopNavigation"

import { setWidth } from 'redux/reducers/GeneralReducer'
//--- redux store---------------------------------------
import { useSelector, useDispatch,  } from 'react-redux'
import PlaySound from "sound/PlaySound";
import { setMainSidebarOpen } from 'redux/reducers/MainmenuReducer'

//-------------------------------------------------------

export default function MainLayout({ children }) { // not used yet!
  const dispatch = useDispatch()
  
  
  const { pathname } = useRouter()
  const path = pathname.substring(1, 6)

  const { width } = useSelector((state) => state.GeneralReducer)


  const { isLogin } = useSelector((state) => state.AuthReducer)
  const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)
  const { modalMessage, modalToast, modalMenuDrawer } = useSelector((state) => state.ModalReducer)

    useEffect(() => { // default when load
       
       width <1200 ? dispatch(setMainSidebarOpen(false)) : dispatch(setMainSidebarOpen(true))
    
  }, [width])

  useEffect(() => { // default when load
    dispatch(setWidth(window.innerWidth)) 
  
}, [])

  useEffect(() => {
    const handleResize = () => {
      dispatch(setWidth(window.innerWidth))
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])



  return (
    <>
      
      <PlaySound />
      <CreatePackageSidebar />
<EditPackageSidebar />
    
      {!isLogin && <ReferralLink/> } 
      
      <main className="w-full  min-h-screen">
        <section className={isLogin?
          width > 760 ?
       "text-slate-900 dark:text-white w-full mx-auto  bg-slate-100 bg-fixed bg-cover max-w-md md:max-w-full  z-1  bg-[url('/assets/img/bg/apartment-bg.webp')]" 
       :
       "text-slate-900 dark:text-white w-full mx-auto  bg-slate-800 bg-fixed bg-cover max-w-md md:max-w-full  z-1 " 
       :
       "text-slate-900 dark:text-white w-full mx-auto  bg-slate-700 bg-fixed bg-cover max-w-md md:max-w-full  z-1 bg-slate-900" 
        }
       >

       {path == 'admin'? width > 760 ?
        <>
         <UserTopNavigation/> 
         <FirebaseSidebar/> 
          </> 
         
         : <MobileTopNavigation/>
       :
      
       width > 760 ? <MainTopNavigation/> : <MobileTopNavigation/>
       }

      {path == 'admin' && width > 760?
      <div className={mainSidebarOpen? "ml-64   " : "ml-16  "}>
     {/* {isLogin && <HeaderBoard />} */}
                {children}
                <MainFooter/>
      </div> :
      <div > 
       
                {children}
                <MainFooter/>
      </div>  
      }    
           
         
        </section>
      </main>

      {modalMessage && <ModalMessage />}
      {modalToast && <ModalToast />}
      {/* {modalMenuDrawer && <ModalMenuDrawer />} */}
  
   
    

    

    </>
  )
}
