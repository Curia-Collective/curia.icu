import { SelectJudgments } from '@/db/schema'

import { prettyDate } from '@/lib/time'

export const Judgments = async ({
  judgments,
}: {
  judgments: SelectJudgments[] | null
}) => {
  if (judgments !== null) {
    return (
      <div className="rounded-none border-2 border-black bg-white shadow-md">
        <h2 className="rounded-t-lg bg-gray-100 px-4 py-2 text-xl font-bold">
          Judgments
        </h2>
        {judgments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {judgments.map((judgment) => (
              <li
                key={judgment.id}
                className="px-4 py-3 transition duration-200 hover:bg-gray-50"
              >
                <div className="mb-1">
                  <strong>Judge</strong> {judgment.judge}
                </div>
                <div className="mb-2">
                  <strong>Reasoning</strong>
                  <p className="whitespace-pre-wrap">{judgment.reasoning}</p>
                </div>
                <div className="mb-2">
                  In <strong>favour</strong> of Party {judgment.favours}
                </div>
                <div>
                  <pre className="max-w-full whitespace-pre-wrap break-words border-2 border-stone-300 bg-stone-200 p-1">
                    {judgment.signature}
                  </pre>
                  <p className="border-2 border-gray-300 bg-stone-300 text-center uppercase tracking-wide">
                    Signature
                  </p>
                </div>
                <div className="mb-1 text-right">
                  {prettyDate(new Date(judgment.timestamp * 1000))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-3">No judgments found for this filing.</p>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-lg border-2 border-gray-200 bg-white p-4 shadow-md">
      <p className="text-center text-xl">
        The judgment will be revealed when all judges have judged.
      </p>
    </div>
  )
}
