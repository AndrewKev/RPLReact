import React, { useState } from "react";
import { useEffect } from "react";
// import { Label } from "flowbite-react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const BirthdaySettingComponent = (props) => {
	const toIsoString = (date) => {
		let tzo = -date.getTimezoneOffset(),
				dif = tzo >= 0 ? '+' : '-',
				pad = (num) => {
						return (num < 10 ? '0' : '') + num;
				};
	
		return date.getFullYear() +
				'-' + pad(date.getMonth() + 1) +
				'-' + pad(date.getDate()) +
				'T' + pad(date.getHours()) +
				':' + pad(date.getMinutes()) +
				':' + pad(date.getSeconds()) +
				dif + pad(Math.floor(Math.abs(tzo) / 60)) +
				':' + pad(Math.abs(tzo) % 60);
	}

	const [startDate, setStartDate] = useState(new Date(props.birthday));
	const [changeDate, setChangeData] = useState('')


	const handlePassing = (value) => {
		props.passingBday(value)
	}

	// console.log(changeDate)

	useEffect(() => {
		setChangeData(toIsoString(startDate).slice(0, 10))
		handlePassing(toIsoString(startDate).slice(0, 10))
	}, [startDate])

	return (
		<div className="mt-6">
			{/* <Label
				className={
					'font-bold'
				}
				htmlFor="birthday"
				value="Birthday"
			/> */}
			<label htmlFor="birthday" className="font-bold ">Birthday</label>
			<div className="flex items-center">
				<div className="border border-[#D5D9DE] bg-[#e5e7eb] p-2.5 rounded-tl-md rounded-bl-md">
					<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
						viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clipRule="evenodd"></path>
					</svg>
				</div>

				{/* <div class="relative">
					<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
					</div>
					<input datepicker datepicker-buttons type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
				</div> */}

				<DatePicker id="birthday" className="border-[#D5D9DE] w-full rounded-tr-md rounded-br-md bg-[#F9FAFB]" selected={startDate} onChange={(date) => setStartDate(date)} />
			</div>
		</div>
	)
}

export default BirthdaySettingComponent