import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import MessageList from './components/MessageList';
import EmptyChatScreen from './components/EmptyChatScreen';

const Home = () => {


  const ai = new GoogleGenAI("AIzaSyCJrr1xbbJe3mJtqcm2NxaNNL03apiKuhY");

  const [messages, setMessages] = useState([])
  const [userInput, setuserInput] = useState("")

  
  const submitHandler = async(e) => {
    e.preventDefault()

    const prompt = userInput
    setuserInput("")
    const userMsg = {role: "user", content: prompt}
    const botMsg = {role: "bot", content: ""}

    const updateMessage = [...messages,userMsg, botMsg]
    setMessages(updateMessage);

      try {   

        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash", 
          contents : `
  You are a general-purpose chatbot capable of answering a wide variety of questions. 
  You can answer questions on topics such as science, technology, history, culture, and more. 
  Respond to the user's prompt based on all available knowledge, including the chat history if relevant.
  Previous Chat History: ${JSON.stringify(messages)}
  User's Prompt: "${prompt}"`
        });

        const fullResponse = response.text


        typeMessage(fullResponse, (partial)=> {
              updateMessage[updateMessage.length - 1].content = partial
              setMessages([...updateMessage]) //react rules -_-
        })
        
  
      } catch (error) {
        console.error("Error:", error);
        setans("Something went wrong.");
      }
  }
  

  return (
    <div className="h-screen flex flex-col text-white bg-black">


<div className={`flex-1 overflow-y-auto px-24 py-5 ${messages.length===0 ? "flex justify-center items-center" : "" }`}>
      {messages.length === 0 ? (
        <EmptyChatScreen />
      ) : (
        <MessageList messages={messages} />
      )}
</div>


{/*Input section --- */}


<div className="w-full px-24 flex justify-center py-10">

  <form onSubmit={submitHandler}
  className="w-[70%] bg-gray-600 rounded-3xl max-w-4xl flex items-center gap-3 border-3 border-red-400 px-3"

  >

        <textarea
        value={userInput}
        rows = {3}
        onChange={(e) => setuserInput(e.target.value)} 
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitHandler(e);
          }
        }}
        placeholder="Type your message here..."
        className="rounded-xl flex-1 resize-none  p-2 focus:outline-none mt-1"
        />
        

        <button 
          type="submit"
          className="flex items-center justify-center bg-blue-400 hover:bg-blue-600 text-white p-3 rounded-xl transition ease-in-out duration-500 active:scale-90"
        >
  <svg 
    className="w-5 h-5" 
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
</button>

</form>




    </div>

    </div>
  );
};


const typeMessage = (fullResponse, callback) => {
      let currText = ''
      let index = 0

      const interval = setInterval(() => {
          currText += fullResponse[index]
          index++

          callback(currText)

          if (currText.length == fullResponse.length){
            clearInterval(interval)
          } 

      }, 15);
}


export default Home;
