import { Avatar } from "flowbite-react";

const CommentComponent = (props) => {
  return (
    <div className='flex items-center mb-3'>
      <Avatar alt="User" img={props.photoProfile} rounded={true} size='sm' />
      <div className='ml-2 flex flex-col'>
        <p className="font-medium">{props.username}</p>
        <p className="text-xs">{props.comment}</p>
      </div>
    </div>
  )
}

export default CommentComponent