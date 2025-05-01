import React, {useState} from 'react'
import ReactMarkdown from 'react-markdown';

const Message = ({message}) => {

    const isUser = message.role === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-7`}>
            <div
                className={`px-3 py-2 max-w-2xl w-fit rounded-lg ${
                    isUser
                        ? "bg-gray-200 text-black"
                        : "bg-[#334eff] text-white"
                }`}
            >
                <strong>{message.role === "user" ? "user" : "bot"}:</strong>
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        </div>
    );
}

export default Message