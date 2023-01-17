import React from "react";
import { useState } from "react";
// import { Select } from 'flowbite-react'

const CountryComponent = (props) => {
  const [country, setCountry] = useState(props.country)

  const handlePassing = (value) => {
    props.passingCountry(value)
  }

  const onChangeCountry = (e) => {
    setCountry(e.target.value)
    handlePassing(e.target.value)
  }

  return (
    <div id="select" className="mt-6">
      {/* <div className="mb-2 block">
        <Label
          className="font-bold"
          htmlFor="countries"
          value="Country"
        />
      </div> */}
      <label htmlFor="countries" className="font-bold">Country</label>
      <input value={country} onChange={onChangeCountry} type="text" id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700" placeholder="Country" />
      {/* <Select id="countries" required={true} className="z-10">
        <option>
          United States
        </option>
        <option>
          Canada
        </option>
        <option>
          France
        </option>
        <option>
          Germany
        </option>
      </Select> */}
    </div>
  )
}

export default CountryComponent