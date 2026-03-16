import type { Citation } from "@/lib/types"

export function ReferencesSection({
  references,
}: {
  references: Citation[]
}) {
  if (references.length === 0) return null

  return (
    <section className="mt-12 bg-gray-50/50 rounded-xl p-6 border border-gray-100">
      <h2 className="text-xl font-medium text-gray-900 mb-4">References</h2>
      <ol className="space-y-3 list-decimal list-inside">
        {references.map((ref, index) => (
          <li key={index} className="text-sm text-gray-600 leading-relaxed">
            {ref.authors && <span>{ref.authors}. </span>}
            <span className="font-medium">{ref.title}</span>.{" "}
            <em>{ref.source}</em>. {ref.year}.
            {ref.doi && (
              <>
                {" "}
                <a
                  href={`https://doi.org/${ref.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  doi:{ref.doi}
                </a>
              </>
            )}
            {ref.url && !ref.doi && (
              <>
                {" "}
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  [Link]
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
