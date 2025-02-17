'use client';

//import { Weather } from '@/app/components/weather';
import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="chat-form">
      <div className="chat-messages">
        {messages.map(m => (
          <div key={m.id} className="message">
            <div>
              <div className="role font-bold">{m.role === "assistant" ? "Sorley" : "Me"}</div>
              <p>{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="search-box__input"
          value={input}
          placeholder="Where would you like to go?"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}