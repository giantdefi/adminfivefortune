import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"


import Head from 'next/head'

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setSpinnerAtLogo } from 'redux/reducers/LoaderReducer'
import { setbackURLs } from 'redux/reducers/MainmenuReducer'
import { setMainMenuItem } from 'redux/reducers/MainmenuReducer'
import { setBordingOnMainHeader, setShoWConnectWallet } from 'redux/reducers/SettingReducer'
//--------------------------------------

export default function Home() {

 const dispatch = useDispatch()
  const router = useRouter()
  const [spinner, setSpinner] = useState(false)
  const [toggle, setToggle] = useState(false)
  const { domain, title, desc } = useSelector((state) => state.GeneralReducer)
  const { isLogin, phone, email, toggleLogin } = useSelector((state) => state.AuthReducer)
  const { loginSidebar } = useSelector((state) => state.MainmenuReducer)


  useEffect(() => {
  
    dispatch(setMainMenuItem(1))
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


return (
  <>

    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>

   

 <body className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 ">


      <section className="relative min-h-screen bg-gray-400 dark:bg-[#111] animated fadeIn">

  
        <div className="_gradient_purple/90 w-full h-[600px] bg-cover bg-fixedAA "
          // style={{ backgroundImage: 'url(/assets/img/mainbg.webp)' }}
        >
       

       <section className="min-h-screen pt-64 bg-cover bg-center text-white py-20 " style={{ backgroundImage: 'url(/assets/img/bg/apartment-bg.webp)' }}>
        <div className="container mx-auto text-center ">
        <h1 className="text-5xl font-bold mb-6">FIVEFORTUNE </h1>
        <h1 className="text-4xl ">ADMINISTRATOR PAGE</h1> 
        <p className="mt-4 text-2xl">Turning your ideas into reality with clean code and stunning designs.</p>
           
        </div>
    </section>

    {/* <section className="bg-blue-600 dark:bg-blue-800 text-white py-20 flex flex-col items-center justify-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-4">Hi, I{"'"}m Randi</h1>
    <p className="text-xl md:text-2xl mb-8">I create beautiful and functional websites</p>
    <a href="#contact" className="bg-white text-blue-600 dark:bg-blue-700 dark:text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-gray-100 dark:hover:bg-blue-600 transition duration-300">Get in Touch</a>
  
  </section>

  

  <section id="about" className="py-16 px-4 bg-gray-100 dark:bg-gray-700">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        I{"'"}m a passionate web developer with experience in creating modern and responsive websites. My expertise includes HTML, CSS, JavaScript, and various frameworks and libraries. I love bringing ideas to life and solving problems through code.
      </p>
    </div>
  </section> */}


  {/* <section id="skills" className="bg-gray-200 dark:bg-gray-800 py-16 px-4">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
          <p>HTML, CSS, JavaScript, React, NextJs, Tailwind CSS</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
          <p>Node.js, Express, MongoDB, REST APIs</p>
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Tools & Platforms</h3>
          <p>Git, GitHub, Netlify, Vercel</p>
        </div>
      </div>
    </div>
  </section> */}
   

       
        </div>







      </section>
    

    </body>
  

  </>
)
}



