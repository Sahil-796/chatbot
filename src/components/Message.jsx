import React, {useState} from 'react'
import ReactMarkdown from 'react-markdown';
import botIcon from '../assets/artificial-intelligence.png'
import userIcon from '../assets/user (1).png'
const Message = ({message}) => {

    const isUser = message.role === "user";

    return (
        <div className={`flex items-center  gap-5 ${isUser ? "justify-end" : "justify-start"} my-7`}>

<div className='w-8 h-8'>
            {!isUser ? <img src={botIcon}/> :  <img src={userIcon}/> }
</div>

            <div
                className={`px-3 py-2 max-w-2xl w-fit rounded-lg ${
                    isUser
                        ? "bg-gray-200 text-black"
                        : "bg-[#334eff] text-white"
                }`}
            >
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        </div>
    );
}

export default Message