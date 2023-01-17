import axios from "axios";
import { Button, Modal } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FriendComponent from "../components/FriendComponent";
import RekomenComponent from "../components/RecFriends/RekomenComponent";

const Friends = () => {
	const name = useParams()
	const [friendList, setFriendList] = useState([])
	const [msg, setMsg] = useState('')
	const [allFriend, setAllFriend] = useState([])
	const [search, setSearch] = useState('')
	const [isFriendSearch, setIsFriendSearch] = useState('')

	const getFriends = async () => {
		const res = await axios.get(`http://localhost:5000/${name.username}/friends`)
		// console.log(res.data)
		setFriendList(res.data)
	}

	const getAllUser = async () => {
		const res = await axios.get(`http://localhost:5000/${name.username}/allUser`)
		// console.log(res.data)
		setAllFriend(res.data)
	}

	const refresh = () => {
		getFriends()
	}

	const getMsg = (value) => {
		setMsg(value)
		console.log(msg)
	}

	const [modalStatus, setModalStatus] = useState(false)
	const closeModal = () => {
		setModalStatus(false)
	}

	const openModal = () => {
		setModalStatus(true)
	}

	useEffect(() => {
		getFriends()
		getAllUser()
	}, [])


	return (
		<div className="ml-28 mt-28 flex flex-col-reverse lg:flex-row lg:justify-between lg:gap-6 xl:gap-12">
			{msg}
			<div className="flex flex-col w-full">
				<form className="w-1/3 mb-4">
					<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
						</div>
						<input onChange={(e) => setIsFriendSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." required />
						<button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
					</div>
				</form>
				{friendList.filter((item) => {
								return isFriendSearch.toLowerCase() === ''
									? item
									: item.username.toLowerCase().includes(isFriendSearch)
							}).map(data => (<FriendComponent key={data.idUser} refresh={() => refresh()} idUser={data.idUser} photoProfile={data.photoProfile} username={data.username} />))}
			</div>


			<div className="mr-16 w-4/5 xl:w-96 mb-6">
				{/* <Button onClick={openModal}>
					Find New Friends
				</Button>
				<Modal
					show={modalStatus}
					onClose={closeModal}
				>
					<Modal.Header>
						<form>
							<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
								</div>
								<input onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." required />
								<button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
							</div>
						</form>
					</Modal.Header>
					<Modal.Body className="overflow-auto h-80">
						<div className="space-y-6">
							{allFriend.filter((item) => {
								return search.toLowerCase() === ''
									? item
									: item.username.toLowerCase().includes(search)
							}).map(data => (<RekomenComponent refreshFriend={() => refresh()} key={data.idUser} idUser={data.idUser} photoProfile={data.photoProfile} username={data.username} />))}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							color="gray"
							onClick={closeModal}
						>
							Close
						</Button>
					</Modal.Footer>
				</Modal> */}
				{/* <form className="flex items-center">
					<label htmlFor="simple-search" className="sr-only">Search</label>
					<div className="relative w-full">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor"
								viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									clipRule="evenodd"></path>
							</svg>
						</div>
						<input type="text" id="simple-search"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search" required />
					</div>
					<button type="submit"
						className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
						<span className="sr-only">Search</span>
					</button>
				</form> */}

			</div>
		</div>
	)
}

export default Friends