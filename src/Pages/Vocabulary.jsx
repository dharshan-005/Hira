import React from "react";
import vocabData from "../data/vocab.json";

const Vocabulary = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vocabulary List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border px-4 py-2">Word</th>
              <th className="border px-4 py-2">Romaji</th>
              <th className="border px-4 py-2">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {vocabData.map((item, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-4 py-2 font-bold">{item.word}</td>
                <td className="border px-4 py-2">{item.romaji}</td>
                <td className="border px-4 py-2">{item.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vocabulary;