'use client';

import { useChat } from '@ai-sdk/react';
import Image from "next/image";

import Spinner from './components/spinner';
import { Weather } from './components/weather';

import pending from '../../public/multi-cloud.svg';

export default function Chat() {
  /* useChat hook helps us handle the input, resulting messages, and also handle the loading and error states for a better user experience */
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, error, reload } = useChat();

  return (
    <div className="chat__form">
      <div className="chat__messages">
        {
          /* Display all user messages and assistant responses */
          messages.map(m => (
            <div key={m.id} className="message">
              <div>
                { /* Messages with the role of *assistant* denote responses from the LLM */}
                <div className="role">{m.role === "assistant" ? "Sorley" : "Me"}</div>
                { /* Tool handling */}
                <div className="tools__summary">
                  {
                    m.parts.map(part => {
                      if (part.type === 'tool-invocation') {
                        const { toolName, toolCallId, state } = part.toolInvocation;

                        if (state === 'result') {
                          { /* Show weather results */}
                          if (toolName === 'displayWeather') {
                            const { result } = part.toolInvocation;
                            return (
                              <div key={toolCallId}>
                                <Weather {...result} />
                              </div>
                            );
                          }
                        } else {
                          return (
                            <div key={toolCallId}>
                              {toolName === 'displayWeather' ? (
                                <div className="weather__tool">
                                  <Image src={pending} width={80} height={80} alt="Placeholder Weather"/>
                                  <p className="loading__weather__message">Loading weather...</p>
                                </div>
                              ) : null}
                            </div>
                          );
                        }
                      }
                    })}
                </div>
                { /* User or LLM generated content */}
                <p>{m.content}</p>

              </div>
            </div>
          ))}
      </div>

      {
        /* Spinner shows when awaiting a response */
        isLoading && (
          <div className="spinner__container">
            <Spinner />
            <button id="stop__button" type="button" onClick={() => stop()}>
              Stop
            </button>
          </div>
        )}

      {
        /* Show error message and return button when something goes wrong */
        error && (
          <>
            <div className="error__container">Unable to generate a plan. Please try again later!</div>
            <button id="retry__button" type="button" onClick={() => reload()}>
              Retry
            </button>
          </>
        )}

      { /* Form using default input and submission handler form the useChat hook */}
      <form onSubmit={handleSubmit}>
        <input
          className="search-box__input"
          value={input}
          placeholder="Where would you like to go?"
          onChange={handleInputChange}
          disabled={error != null}
        />
      </form>
    </div>
  );
}