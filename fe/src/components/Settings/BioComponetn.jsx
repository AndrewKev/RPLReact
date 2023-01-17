import React from "react";
import { useState } from "react";

const BioComponent = (props) => {
  const [bio, setBio] = useState(props.bio)

  const handlePassing = (value) => {
    props.passingBio(value)
  }

  const onChangeBio = (e) => {
    setBio(e.target.value)
    handlePassing(e.target.value)
  }

  return(
    <div className="mt-6">
      <label htmlFor="bio" className="font-bold">Bio</label>
      <textarea id="bio" rows="4" value={bio} onChange={onChangeBio}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your bio..."></textarea>
    </div>
  )
}

export default BioComponent