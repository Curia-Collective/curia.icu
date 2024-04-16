import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="relative z-10 rounded-2xl border border-8 border-black bg-white p-3 text-center">
        <h1 className="border border-2 border-black bg-black text-6xl font-bold italic text-white text-white">
          Curia
        </h1>
        <div className="mt-8 flex flex-col space-y-4 text-3xl md:flex-row md:space-x-8 md:space-y-0">
          <Link
            href="/file"
            className="hover:shadow-neon-yellow rounded-lg border-4 border-black bg-yellow-400 px-4 py-2 text-black"
          >
            📤 File
          </Link>
          <a
            href="https://app.deform.cc/form/6f8e3542-60fc-4f02-a443-fa15f66339e0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:shadow-neon-fuchsia rounded-lg border-4 border-black bg-fuchsia-400 px-4 py-2 text-black"
          >
            🖊 Apply
          </a>
          <a
            href="https://canny.nani.ooo/d/0x0000000000001d8a2e7bf6bc369525A2654aa298"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:shadow-neon-cyan rounded-lg border-4 border-black bg-cyan-400 px-4 py-2 text-black"
          >
            ⛓ DAO
          </a>
          <Link
            href={'/filings'}
            className="hover:shadow-neon-red rounded-lg border-4 border-black bg-red-500 px-4 py-2 text-black"
          >
            💼 Files
          </Link>
        </div>
        <div className="mt-8 border-2 border-black bg-black text-xl text-white hover:italic hover:text-[#ffd700]">
          <a
            href="https://lexcuria.eth.limo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Curia is a decentralized court system for the metaverse.
          </a>
        </div>
      </div>
    </div>
  )
}
