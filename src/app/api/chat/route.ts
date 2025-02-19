import { createOllama } from 'ollama-ai-provider';
import { streamText } from 'ai';

import { weatherTool } from '@/app/ai/weather.tool';
import { NextResponse } from 'next/server';

// Allow streaming responses up to 30 seconds to address typically longer responses from LLMs
export const maxDuration = 30;

/* Instantiate provider with custom settings */
const ollama = createOllama({
  baseURL: 'http://localhost:11434/api', // Default

});

export const tools = {
  displayWeather: weatherTool,
};

// Post request handler
export async function POST(req: Request) {
  const { messages } = await req.json();
  
  try {
    // Generate response from the LLM using the provided model, system prompt and messages
    const result = streamText({
      model: ollama('llama3.1'),
      system: 
        'You are a helpful assistant that returns travel itineraries based on the specified location.',
      messages,
      maxSteps: 5,
      tools
    });

    // Return data stream to allow the useChat hook to handle the results as they are streamed through for a better user experience
    return result.toDataStreamResponse();
  } catch(e) {
    console.error(e);
    return new NextResponse("Unable to generate a plan. Please try again later!");
  }
}