import React from 'react'
import {BrainCircuit} from "lucide-react"

const EmptyChatScreen = () => {
  return (
    <div className="">
        
        <div className="flex flex-col justify-center items-center font-bold gap-4 px-4">
            
            <BrainCircuit color="white" size={64} />
            <h2 className="text-4xl">Welcome to the Chat!</h2>
            <p>How can I help you ?</p>

        </div>


    </div>
  )
}

export default EmptyChatScreen