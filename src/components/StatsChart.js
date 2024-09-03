import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'
import axios from 'axios'
import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
// import { setChartsArray, setAllowReloadChart, setAdminStatsArray } from 'redux/reducers/ChartReducer';
//--------------------------------------

export default function Users() {

    const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
 
   // const { chartsArray, allowReloadChart, adminStatsArray } = useSelector((state) => state.ChartReducer)
    const { isLogin, isBinary, username, token, pvalue } = useSelector((state) => state.AuthReducer)
    const {  users_stats } = useSelector((state) => state.StatsReducer)
  

    

    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>
            
        <div className="text-center py-2 px-4 mb-2 centered text-white  flex flex-col gap-2 border-4 bg-white w-full border-4 border-red-900">
                        <p className="uppercase bold mb-10 text-xl text-gray-800">NEW CLIENT  STATISTIC</p>    
                                                <Line 
                                                data= {{
                                                 //  labels : users_stats.week, //["week1", "week2", "week3", "week4", "week5", "week6"],
                                                   labels:  users_stats && users_stats.map((data) => data.date), 
                                                  datasets : [
                                                        {
                                                            label : "Users Register",
                                                          
                                                        //   data : users_stats.stats, //[20, 30, 50, 25, 45, 65],
                                                          data: users_stats && users_stats.map((data) => data.total),
                                                            backgroundColor: [
                                                                "#ff9900",
                                                              
                                                                "#ff9900",
                                                                "#ff9900",
                                                                "#ff9900"
                                                              ],
                                                              borderColor: "green",
                                                              text : "Users Register",
                                                          
                                                              borderWidth: 2
                        
                                                        },    
                                                    ],
                                                
                                                }}
                                                />
                                                            
                                            </div> 


        </>
    )
}



