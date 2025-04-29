import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const Home = () => {
  const ai = new GoogleGenAI({ apiKey: "AIzaSyCJrr1xbbJe3mJtqcm2NxaNNL03apiKuhY" });

  const [messages, setMessages] = useState([])
  const [userInput, setuserInput] = useState("")

  
  const submitHandler = async(e) => {
    e.preventDefault()

    const prompt = userInput
    setuserInput("")

    const userMsg = {role: "user", content: prompt}
      setMessages((prevMessages) => [...prevMessages, userMsg]);

      try {
        // Call the model directly to generate content
        const response = await ai.models.generateContent({
          model: "gemini-1.5-flash",  // Example model, you may need to change it if not valid
          contents: prompt,
        });

  
        const botMsg = {role: "bot", content: response.text}
        setMessages((prevMessages) => [...prevMessages, botMsg]);
        
  
      } catch (error) {
        console.error("Error:", error);
        setans("Something went wrong.");
      }
  }
  

  return (
    <div className="">



      <div id='display message' className="">
      
<ul className="space-y-2">
  {messages.map((message, index) => (
    <li key={index} className="bg-gray-100 p-2 rounded">
      <strong>{message.role}:</strong>
      <ReactMarkdown>{message.content}</ReactMarkdown>
    </li>
  ))}
</ul>
      </div>

      <div id="input-send-sec">
        <textarea
        value={userInput}
        onChange={(e) => setuserInput(e.target.value)} // Update userInput state
        placeholder="Type your message here..."
        className="border border-gray-300 rounded w-full p-2 mb-4"
        />
        

      <button onClick={(e)=>submitHandler(e)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get response
      </button>
</div>

    </div>
  );
};

export default Home;
