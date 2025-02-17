'use client';

import { useChat } from '@ai-sdk/react';
import Spinner from './components/spinner';

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
              { /* Messages with the role of *assistant* denote responses from the LLM*/ }
              <div className="role">{m.role === "assistant" ? "Sorley" : "Me"}</div>
              { /* User or LLM generated content */ }
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

      { /* Form using default input and submission handler form the useChat hook */ }
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