'use client';

//import { Weather } from '@/app/components/weather';
import { useChat } from '@ai-sdk/react';
import Spinner from './components/spinner';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, error, reload } = useChat();

  return (
    <div className="chat__form">
      <div className="chat__messages">
        {messages.map(m => (
          <div key={m.id} className="message">
            <div>
              <div className="role font-bold">{m.role === "assistant" ? "Sorley" : "Me"}</div>
              <p>{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="spinner__container">
          <Spinner />
          <button id="stop__button" type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}

      {error && (
        <>
          <div className="error__container">Unable to generate a plan. Please try again later!</div>
          <button id="retry__button" type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}

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