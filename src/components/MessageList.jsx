import React, { useEffect, useRef } from 'react'
import Message from './Message'
import EmptyChatScreen from './EmptyChatScreen'

const MessageList = ({messages}) => {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth",
    block: "nearest",
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);
    
  return (

<div className="h-full w-full">
    <ul className="">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </ul>

  <div ref={messagesEndRef} />
</div>

  )
}

export default MessageList