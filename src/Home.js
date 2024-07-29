import React from 'react'
import { NavLink } from "react-router-dom"

function Home() {
  return (
    <div className="grid h-screen place-items-center">
        <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">Client Demo</h1>
            <NavLink
                to="/login"
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Login
            </NavLink>
        </div>
    </div>
  )
}

export default Home