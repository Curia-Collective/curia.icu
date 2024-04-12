import { SelectJudgments } from '@/db/schema';
import { prettyDate } from '@/lib/time';

export const Judgments = async ({ judgments }: { judgments: SelectJudgments[] | null }) => {
  if (judgments !== null) {
    return (
      <div className="border-2 border-gray-200 bg-white rounded-lg shadow-md">
        <h2 className="px-4 py-2 text-xl font-bold bg-gray-100 rounded-t-lg">
          Judgments
        </h2>
        {judgments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {judgments.map((judgment) => (
              <li
                key={judgment.id}
                className="px-4 py-3 hover:bg-gray-50 transition duration-200"
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
                  <strong>Signature</strong> <pre>{judgment.signature}</pre>
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
    );
  }

  return (
    <div className="border-2 border-gray-200 bg-white p-4 rounded-lg shadow-md">
      <p className="text-xl text-center">
        The judgment will be revealed when all judges have judged.
      </p>
    </div>
  );
};