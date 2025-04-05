"use client";
import { useState } from "react";

export default function AskGPTPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const ask = async () => {
    const res = await fetch("/api/ask-gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, userId: "demo-user" }),
    });
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Poser une question à GPT</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
        className="w-full p-2 border rounded mb-2"
        placeholder="Ex : Comment le PlayerController interagit avec le GameMode ?"
      />
      <button
        onClick={ask}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Envoyer
      </button>

      {response && (
        <div className="mt-6 p-4 bg-gray-100 rounded whitespace-pre-wrap font-mono">
          {response}
        </div>
      )}
    </div>
  );
}
