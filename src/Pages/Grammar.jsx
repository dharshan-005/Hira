import React from "react"
import grammarData from "../data/grammar.json"

const Grammar = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Grammar</h2>

      {Object.keys(grammarData).map((category) => (
        <div key={category} className="mb-10">
          <h3 className="text-xl font-bold mb-4 flex justify-center">{category}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {grammarData[category].map((item, idx) => (
              <div key={idx} className="border border-gray-300 rounded p-4 shadow hover:shadow-lg transition">
                <div className="font-bold text-lg mb-2">{item.point} - <span className="font-normal">{item.romanji}</span></div>
                <div className="mb-3">{item.meaning}</div>
                <div className="italic text-sm text-gray-600">{item.example}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grammar;