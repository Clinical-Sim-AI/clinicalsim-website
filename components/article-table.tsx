/**
 * A captioned data table for MDX posts. The site's MDX pipeline has no GFM
 * tables, so a post passes its rows here instead of writing pipe syntax.
 * Scrolls horizontally inside its own box on a narrow screen rather than
 * widening the page.
 */
export function ArticleTable({
  caption,
  headers,
  rows,
}: {
  caption: string
  headers: string[]
  rows: string[][]
}) {
  return (
    <figure className="not-prose my-8">
      <div className="overflow-x-auto rounded-xl border border-cs-gray">
        <table className="w-full min-w-[32rem] text-left text-sm text-cs-dark-blue">
          <thead className="bg-cs-dark-blue text-white">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-4 py-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-cs-gray/60 align-top">
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th key={cellIndex} scope="row" className="px-4 py-3 font-medium">
                      {cell}
                    </th>
                  ) : (
                    <td key={cellIndex} className="px-4 py-3 font-light leading-relaxed">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-sm font-light text-cs-dark-blue/70">{caption}</figcaption>
    </figure>
  )
}
