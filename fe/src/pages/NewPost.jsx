import React from "react";
import PostImageComponent from "../components/PostImageComponent";
import PostTextComponent from "../components/PostTextComponent";

const NewPost = () => {
  return(
    <div className="m-28 font-raleway">
      <h1 className="mb-4 text-2xl font-bold">Write Down How Do You Feel Today...</h1>
      <PostTextComponent />
      <h1 className="mb-4 text-2xl font-bold mt-16">Or Post Your Photo...</h1>
      <PostImageComponent />
    </div>
  )
}

export default NewPost