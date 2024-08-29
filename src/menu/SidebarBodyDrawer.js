import React, { } from "react"
import Link from 'next/link'

import { useRouter } from 'next/router';

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setMainSidebarOpen, setDropdownOpen, setItemSelected } from 'redux/reducers/MainmenuReducer'
import {  setModalMessage, setModalMenuDrawer } from 'redux/reducers/ModalReducer'
import { setAllowSound } from 'redux/reducers/SettingReducer'
import { setPlaySound } from 'redux/reducers/SoundReducer'
//-------------------------------------------------------

export default function SidebarBody() {


  const dispatch = useDispatch()
  const router = useRouter()
  const { mainSidebarOpen, dropdownOpen, itemSelected } = useSelector((state) => state.MainmenuReducer)
  const { allowSound } = useSelector((state) => state.SettingReducer)
  const { isLogin } = useSelector((state) => state.AuthReducer)
  const { modalMenuDrawer } = useSelector((state) => state.ModalReducer)

  const toggleSound = () => {
    if (allowSound) {
      dispatch(setAllowSound(false))
    } else {
      dispatch(setPlaySound('good'))
      dispatch(setAllowSound(true))
    }
  }

  const toggleSidebar = () => {
    mainSidebarOpen ? dispatch(setMainSidebarOpen(false)) : dispatch(setMainSidebarOpen(true))
  }

  const handleDropdownToggle = (n) => {
    if (dropdownOpen === n) {
      dispatch(setDropdownOpen(0))
    } else {
      dispatch(setDropdownOpen(n))
    }
  }

  const handleModalReg = () => {

    if (isWalletRegistered) {
      dispatch(setPlaySound('pling'))
      return dispatch(setModalMessage({ type: 'warning', title: "ALREADY REGISTERED", message: 'Your current wallet is already registered' }))
    }
    dispatch(setPlaySound('click'))
   // dispatch(setModalRegWallet(true))
  }

  const hanleMenuClick = (link) => {
 
    if(!isLogin) {
        router.push('/')
     // dispatch(setCloseModal(true))
    }else{

    if(modalMenuDrawer){
        //dispatch(setCloseModal(true))

    }
    router.push(link)

    }
 
  }


  const hanleLogout = () => {
  
    router.push('/logout')
  }

  return (
    <>


      {/* <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col"> */}

<div className={`${mainSidebarOpen ? 'w-[340px]' : 'w-14'} fixed flex flex-col h-[70%]  left-0 
      font-semibold  text-white transition-all duration-300  z-10  `}>
      
          <ul className="flex flex-col">


          <li className={`${dropdownOpen === 1 ? 'bg-white bg-opacity-5' : 'bg-transparent'} border-gray-400 border-opacity-20  border-b `}>
            <Link href=""><a onClick={() => handleDropdownToggle(1)} className="flex  flex-row justify-between items-center h-16  hover:bg-white hover:bg-opacity-10 text-white-600 pl-3 ">

              {!mainSidebarOpen &&
                <span className="ml-1" onClick={toggleSidebar}>
                  <svg width="24px" className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>}
              {mainSidebarOpen &&
                <>
                  <div className="flex flex-col">
                  
                    <p className="ml-2 tracking-wide truncate text-xs">NETWORK</p>
                    <p className="ml-2 tracking-wide truncate text-xs">Network & ROI</p>
                  </div>
                  <div className="mr-4">
                    <svg width="24px" className={`fill-current h-6 w-6 transform  transition duration-150 ease-in-out ${dropdownOpen === 1 ? '' : '-rotate-90'} `}
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </>}
            </a>
            </Link>

            <ul className={mainSidebarOpen && dropdownOpen === 1 ? "d-block animated fadeIn bg-gray-800 py-2 pb-6" : "hidden"}>

              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>hanleMenuClick('/users/network')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 1 && dropdownOpen === 1 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-fox-alt text-lg mr-1 text-yellow-300 hover:text-green-300"></i> My Network</p>
                </a>
              </li>

              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>hanleMenuClick('/users/roi')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 2 && dropdownOpen === 1 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-fox-alt text-lg mr-1 text-yellow-300 hover:text-green-300"></i> My ROI</p>
                </a>
              </li>

             

            

            </ul>
          </li>

          <li className={`${dropdownOpen === 2 ? 'bg-white bg-opacity-5' : 'bg-transparent'} border-gray-400 border-opacity-20  border-b `}>
            <Link href=""><a onClick={() => handleDropdownToggle(2)} className="flex  flex-row justify-between items-center h-16  hover:bg-white hover:bg-opacity-10 text-white-600 pl-3 ">

              {!mainSidebarOpen &&
                <span className="ml-1" onClick={toggleSidebar}>
                  <svg width="24px" className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>}
              {mainSidebarOpen &&
                <>
                  <div className="flex flex-col">
                    <p className="ml-2 text-sm tracking-wide truncate uppercase">FINANCE</p>
                    <p className="ml-2 tracking-wide truncate text-xs">Deposit & Withdrawal</p>
                  </div>
                  <div className="mr-4">
                    <svg width="24px" className={`fill-current h-6 w-6 transform  transition duration-150 ease-in-out ${dropdownOpen === 2 ? '' : '-rotate-90'} `}
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </>}
            </a>
            </Link>

            <ul className={mainSidebarOpen && dropdownOpen === 2 ? "d-block animated fadeIn bg-gray-800 py-2 pb-6" : "hidden"}>
            
            <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>hanleMenuClick('/users/confirmation')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 3 && dropdownOpen === 2 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-fox-alt text-lg mr-1 text-yellow-300 hover:text-green-300"></i> Deposit/TopUp Wallet</p>
                </a>
              </li>
              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>hanleMenuClick('/users/withdrawal')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 4 && dropdownOpen === 2 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-fox-alt text-lg mr-1 text-yellow-300 hover:text-green-300"></i> Cash Withdrawal</p>
                </a>
              </li>
            </ul>
          </li>

          <li className={`${dropdownOpen === 3 ? 'bg-white bg-opacity-5' : 'bg-transparent'} border-gray-400 border-opacity-20  border-b `}>
            <Link href=""><a onClick={() => handleDropdownToggle(3)} className="flex  flex-row justify-between items-center h-16  hover:bg-white hover:bg-opacity-10 text-white-600 pl-3 ">

              {!mainSidebarOpen &&
                <span className="ml-1" onClick={toggleSidebar}>
                  <svg width="24px" className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>}
              {mainSidebarOpen &&
                <>
                  <div className="flex flex-col">
                    <p className="ml-2 text-sm tracking-wide truncate uppercase">HISTORY</p>
                    <p className="ml-2 tracking-wide truncate text-xs">All Transaction History</p>
                  </div>
                  <div className="mr-4">
                    <svg width="24px" className={`fill-current h-6 w-6 transform  transition duration-150 ease-in-out ${dropdownOpen === 3 ? '' : '-rotate-90'} `}
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </>}
            </a>
            </Link>

            <ul className={mainSidebarOpen && dropdownOpen === 3 ? "d-block animated fadeIn bg-gray-800 py-2 pb-6" : "hidden"}>
            
            <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>hanleMenuClick('/users/history-topup')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 5 && dropdownOpen === 3 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-fox-alt text-lg mr-1 text-yellow-300 hover:text-green-300"></i> History TopUp/Deposit</p>
                </a>
              </li>
              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>hanleMenuClick('/users/history-wd-roi')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 6 && dropdownOpen === 3 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-fox-alt text-lg mr-1 text-yellow-300 hover:text-green-300"></i> History ROI WD to Wallet</p>
                </a>
              </li>
              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>hanleMenuClick('/users/history-wd-cash')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 7 && dropdownOpen === 3 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-fox-alt text-lg mr-1 text-yellow-300 hover:text-green-300"></i> History Cash Withdrawal</p>
                </a>
              </li>
            </ul>
          </li>



          {/* //------------------- DROPDOWN 4 ------------------------ */}

          <li className={`${dropdownOpen === 4 ? 'bg-white bg-opacity-5' : 'bg-transparent'} border-gray-400 border-opacity-20  border-b `}>
            <Link href=""><a onClick={() => handleDropdownToggle(4)} className="flex  flex-row justify-between items-center h-16  hover:bg-white hover:bg-opacity-10 text-white-600 pl-3 ">

              {!mainSidebarOpen &&
                <span className="ml-1" onClick={toggleSidebar}>
                  <svg width="24px" className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </span>}
              {mainSidebarOpen &&
                <>
                  <div className="flex flex-col">
                    <p className="ml-2 text-sm tracking-wide truncate uppercase">SETTINGS</p>
                    <p className="ml-2 tracking-wide truncate text-xs">Update Data</p>
                  </div>
                  <div className="mr-4">
                    <svg width="24px" className={`fill-current h-6 w-6 transform  transition duration-150 ease-in-out ${dropdownOpen === 4 ? '' : '-rotate-90'} `}
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </>}
            </a>
            </Link>

            <ul className={mainSidebarOpen && dropdownOpen === 4 ? "d-block animated fadeIn bg-gray-800 py-2 pb-6" : "hidden"}>

            <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>hanleMenuClick('/users/user-profile')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 8 && dropdownOpen === 4 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-user text-lg mr-1 text-yellow-300 hover:text-green-300"></i> User Profile</p>
                </a>
              </li>
              
              <li className="cursor-pointer hover:text-green-300">
                <a onClick={()=>hanleMenuClick('/users/password')} className={` flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 9 && dropdownOpen === 4 && 'bg-white bg-opacity-10'}`}>
                  <p className="text-sm ">
                    <i className="icofont-lock text-lg mr-1 text-yellow-300 hover:text-green-300"></i> Login Password</p>
                </a>
              </li>
              <li>
                <a onClick={toggleSound} className={` cursor-pointer flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 10 && dropdownOpen === 4 && 'bg-white bg-opacity-10'}`}>
                  <span className="text-sm ">
                    {allowSound ?
                      <i className="icofont-audio text-xl mr-2 text-green-400 "></i> :
                      <i className="icofont-ui-mute text-xl mr-2 text-green-400"></i>
                    } Sound Setting
                  </span>
                </a>
              </li>
  <li>
                <a onClick={hanleLogout} className={` cursor-pointer flex flex-row items-center h-10  pl-6 
                    ${itemSelected === 10 && dropdownOpen === 4 && 'bg-white bg-opacity-10'}`}>
                  <span className="text-sm ">
                    <i className="icofont-logout text-xl mr-2 text-green-400"></i>
                    Logout
                  </span>
                </a>
              </li>


            </ul>
          </li>



        </ul>
      </div >

    </>
  )
}


