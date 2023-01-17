import axios from "axios";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RekomenComponent from "./RecFriends/RekomenComponent";

const RekomenFriend = () => {
    const name = useParams()

    const [allFriend, setAllFriend] = useState([])
    const [search, setSearch] = useState('')


    const getAllUser = async () => {
        const res = await axios.get(`http://localhost:5000/${name.username}/allUser`)
        // console.log(res.data)
        setAllFriend(res.data)
    }

    useEffect(() => {
        getAllUser()
    }, [])

    return (
        <div className="">
            <div className="hidden lg:block bg-white rounded-lg border-2 h-[40rem] fixed right-12 w-80 xl:w-[27rem]">
            <form className=" mb-4">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                </div>
            </form>
            {/* <hr /> */}
                <ul className="text-sm font-medium text-center text-gray-500 rounded-xl" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
                    <li className="w-full border-b">
                        <div>
                            <p className="p-4 w-full text-black rounded-tl-lg text-lg text-left ml-4 font-bold">Friends Suggestion</p>
                        </div>
                    </li>
                </ul>
                <div id="fullWidthTabContent" className="border-b rounded-xl border-gray-200 h-[36.5rem] overflow-auto">
                    <div className="bg-white rounded-lg" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                        {allFriend.filter((item) => {
								return search.toLowerCase() === ''
									? item
									: item.username.toLowerCase().includes(search)
							}).map(data => (<RekomenComponent key={data.idUser} idUser={data.idUser} photoProfile={data.photoProfile} username={data.username} />))}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default RekomenFriend