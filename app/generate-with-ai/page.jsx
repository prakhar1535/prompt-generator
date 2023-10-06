'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const AiGenerate = () => {
  const [inputText, setInputText] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);


  const captureText = (e) => {
    setInputText(e.target.value);
  };

  const generatePrompt = async () => {
    
    if (inputText.trim() === '') {
      alert('Please enter a prompt.');
      return;
    }

    // Disable the Generate button while loading
    setLoading(true);

    try {
    
      const response = await fetch('https://open-ai21.p.rapidapi.com/conversationgpt35', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'd0e48e8da7mshf8ae52e8290250fp1ac39djsne214a149375c',
            'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
        },
        body: JSON.stringify({
            messages: [
              {
                role: 'user',
                content: inputText
              },
              {
                role: 'assistant', // Set role to 'assistant' for the bot's response
                content: '', // You can leave this empty as the bot will provide the response
              },
            ],
            web_access: false,
            stream: false
          })
      });

      const result = await response.json(); 
      const botResponse = result.BOT;
      console.log(botResponse);
      
      setGeneratedPrompt(botResponse)
      
    } catch (error) {
      console.error(error);
      alert('An error occurred while generating the prompt.');
    } finally {
      // Re-enable the Generate button
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Generate with AI</span>
      </h1>
      <p className="desc text-left max-w-md">
        Generate crazy and efficient prompts for AI by AI.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generatePrompt();
        }}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Write what type of what you want
          </span>
          <input
            onChange={captureText}
            value={inputText}
            placeholder="Write Your Prompt"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
          {generatedPrompt && 'Generated Prompt'}
          </span>
          <p className='font-satoshi desc'>{generatedPrompt}</p>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-700 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AiGenerate;
