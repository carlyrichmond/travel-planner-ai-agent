import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";
import { NextResponse } from "next/server";

import { weatherTool } from "@/app/ai/weather.tool";
import { fcdoTool } from "@/app/ai/fcdo.tool";

// Allow streaming responses up to 30 seconds to address typically longer responses from LLMs
export const maxDuration = 30;

/* Instantiate provider with custom settings */
const ollama = createOllama({
  baseURL: "http://localhost:11434/api", // Default
});

export const tools = {
  fcdoGuidance: fcdoTool,
  displayWeather: weatherTool,
};

// Post request handler
export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    // Generate response from the LLM using the provided model, system prompt and messages
    const result = streamText({
      model: ollama("llama3.1"),
      system:
        "You are a helpful assistant that returns travel itineraries based for a location" + 
        "The itinerary must be based on both the weather (from tool displayWeather) and FCDO guidance (from tool fcdoGuidance)." +
        "Use the current weather to adjust the itinerary and give packing suggestions." +
        "If FCDO advises against travel to this country, do not generate an itinerary.",
      messages,
      maxSteps: 10,
      tools,
      onStepFinish({ text, toolCalls, toolResults, finishReason, usage }) {
        console.log(toolCalls);
      },
    });

    // Return data stream to allow the useChat hook to handle the results as they are streamed through for a better user experience
    return result.toDataStreamResponse();
  } catch (e) {
    console.error(e);
    return new NextResponse(
      "Unable to generate a plan. Please try again later!"
    );
  }
}
