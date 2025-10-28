import React from "react";
import katakanaData from "../data/katakana.json";

const Katakana = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Katakana Chart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border px-4 py-2">Character</th>
              <th className="border px-4 py-2">Romaji</th>
            </tr>
          </thead>
          <tbody>
            {katakanaData.map((item, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-4 py-2 font-bold">{item.char}</td>
                <td className="border px-4 py-2">{item.romaji}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Katakana;