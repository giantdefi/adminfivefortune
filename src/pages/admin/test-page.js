import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'

import dynamic from 'next/dynamic'

const StatsChart = dynamic(
  () => import('components/StatsChart'),
  { ssr: false }
)


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalToast } from 'redux/reducers/ModalReducer';
//--------------------------------------

export default function Users() {

    const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
 
    const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)
    const { adminPackageArray } = useSelector((state) => state.PackageReducer)
    const { isLogin } = useSelector((state) => state.AuthReducer)


    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="md:pt-12  min-h-screen">

            <div className=" transition-all  duration-300 flex flex-col pt-6 text-white ">
            <div className="transition-all duration-300 flex flex-col w-full   mx-auto text-white ">
         
            <div className=" w-full mx-auto md:w-10/12 lg:w-10/12  border-4">

                <section className="w-full mx-auto text-white animated fadeIn">


                    <div className="text-center py-2 px-4 mb-2">
                    <p className="uppercase bold mb-2 text-xl">PACKAGES</p>              

                    </div>

                    <div className="min-h-screen  w-10/12 pb-20">
                    <div className="grid lg:grid-cols-2 px-8 gap-10 text-zinc-800 mt-10">
                   
                   
       {adminPackageArray && adminPackageArray.map((item, index)=>{
        return (
              <div   className="flex flex-col items-center bg-gradient-to-br from-sky-100 via-blue-100 
        to-gray-100 p-8 rounded-lg shadow-lg relative border-8 border-sky-500 max-w-sm" key={index}>
     
   
        <div>
            <div className="flex gap-4 justify-center">
                <p className="font-extrabold text-3xl mb-2">{item.package_name}

                </p>
            </div>
           
            <p className="opacity-60 text-center">
            </p>
            <div className="flex gap-4 justify-center">
                <div className="flex flex-col items-center my-8">
                    <p className="font-extrabold text-4xl">${item.package_value}

                    </p>
                    <p className="text-sm opacity-60">One time payment

                    </p>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-1">
            <p className="flex items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" aria-hidden="true" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"></path>
                </svg>
                <b>Max ROI : {item.max_profit}%</b><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    aria-hidden="true" className="w-4 h-4 ml-1 fill-orange-300">
                    <path fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"></path>
                </svg>
            </p>
            <p className="flex items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" aria-hidden="true" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"></path>
                </svg>
                <b>Contract Duration : {item.duration} days</b>
            </p>
            <p className="flex items-center text-sm"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" aria-hidden="true" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"></path>
                </svg>
                <b>Matching Level :  {item.mathcing_level} level</b>
            </p>
         
            <div className="flex justify-around mt-20 w-full">
              
                    <button className="border px-4 py-2 border-violet-400 border-4 hover:bg-violet-100 rounded-xl">
					<i className="icofont-ui-edit"></i> Edit
                    </button>
                    <button className="border px-4 py-2 border-violet-400 border-4 hover:bg-violet-100 rounded-xl">
					<i className="icofont-ui-delete"></i> Delete
                    </button>
            </div>
        </div>
    </div> 
        )
       })} 
               




</div>
                    </div>
                </section>
            </div>
            </div>
            </div>
            </div>
        </>
    )
}



