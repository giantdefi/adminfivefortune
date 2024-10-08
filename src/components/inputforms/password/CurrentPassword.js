import React, { useEffect, useState, useRef } from "react"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setFormPassword } from 'redux/reducers/FormReducer'
import { setError } from 'redux/reducers/ErrorReducer'
import { setCurrentpassword } from 'redux/reducers/FormReducer'
//-------------------------------------------------------


export default function Password() {

    const inputRef = useRef()
    const [showPassword, setShowPassword] = useState(false)
    // redux store
    const dispatch = useDispatch();
    const { currentpassword } = useSelector((state) => state.FormReducer)
    const { formError } = useSelector((state) => state.ErrorReducer)


    // handle on input value change
    const handleChange = (e) => {
        dispatch(setError(false))


        const { name, value } = e.target
        if (value.length <= 20) {
            dispatch(setCurrentpassword(value))
        }
    }


    const togglePassword = () => {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }


    return (
        <>

            <div className="flex justify-between text-white">
                <p className="mb-2 "> Enter Current Password   </p>
                {!showPassword ?
                    <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer">
                        <p className="text-sm"> Hide </p><p>   <i className="icofont-eye-blocked text-xl ml-2" /></p>
                    </div> :
                    <div onClick={togglePassword} className="flex justify-center items-center cursor-pointer">
                        <p className="text-sm"> Show </p><p>   <i className="icofont-eye text-xl ml-2" /></p>
                    </div>}
            </div>

            <input type={!showPassword ? "password" : "text"} autoComplete="off"
                className="w-full mt-2 py-3 px-3 rounded-lg h-[60px] bg-purple-900 border border-gray-400 
                   text-gray-50  font-semibold focus:border-green-500 focus:outline-none" ref={inputRef}
                name="currentpassword"
                value={currentpassword || ''}
                onChange={handleChange}
            //onClick={() => dispatch(setModalKeyboardPassword(true))}

            />
           {formError && formError.path === 'currentpassword' &&
                        <p className="text-yellow-300 ml-2 mt-2 text-sm animated backInLeft items-center flex">
                            {/* <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2" /> */}
                            <i className="icofont-arrow-right animate-ping  mr-2"></i>
                            {formError.message}
                        </p> 
                     }



        </>

    )
}



