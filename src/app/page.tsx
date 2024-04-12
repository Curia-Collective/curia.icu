import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="relative z-10 bg-white p-3 rounded-2xl text-center border border-8 border-black">
        <h1 className="text-white text-6xl font-bold italic text-white border border-black bg-black border-2">Curia</h1>
        <div className="flex flex-col md:flex-row text-3xl mt-8 space-y-4 md:space-y-0 md:space-x-8">
          <Link href="/file" className="bg-yellow-400 text-black px-4 py-2 rounded-lg border-black border-4 hover:shadow-neon-yellow">📤 File</Link>
          <a href="https://app.deform.cc/form/6f8e3542-60fc-4f02-a443-fa15f66339e0/" target="_blank" rel="noopener noreferrer" className="bg-fuchsia-400 border-black border-4 text-black px-4 py-2 rounded-lg hover:shadow-neon-fuchsia">🖊 Apply</a>
          <a href="https://canny.nani.ooo/d/0x0000000000001d8a2e7bf6bc369525A2654aa298" target="_blank" rel="noopener noreferrer" className="bg-cyan-400 border-black border-4 text-black px-4 py-2 rounded-lg hover:shadow-neon-cyan">⛓ DAO</a>
          <Link href={'/filings'} className="bg-red-500 text-black px-4 py-2 border-black border-4 rounded-lg hover:shadow-neon-red">💼 Files</Link>
        </div>
        <div className="text-white text-xl mt-8 border-black border-2 bg-black hover:text-[#ffd700] hover:italic">
          <a href="https://lexcuria.eth.limo/" target="_blank" rel="noopener noreferrer">Curia is a decentralized court system for the metaverse.</a>
        </div>
      </div>
    </div>
  );
}