import { Check, Minus } from "lucide-react"

/**
 * true renders as Yes, false as No, and a string renders verbatim for the
 * capabilities a role holds only within a boundary. Specific to the
 * /help/roles-and-permissions article, so the rows live here rather than in the
 * help-article registry, which carries metadata only.
 */
type Cell = boolean | string

const ROLES = ["Member", "Project Manager", "Admin"] as const

const ROWS: { capability: string; cells: [Cell, Cell, Cell] }[] = [
  { capability: "Run assigned simulations", cells: [true, true, true] },
  {
    capability: "See their own feedback and transcripts",
    cells: [true, true, true],
  },
  { capability: "Create and edit projects", cells: [false, true, true] },
  {
    capability: "Choose which simulations a project uses",
    cells: [false, true, true],
  },
  // Targets are gated behind NEXT_PUBLIC_PROJECT_TARGETS_ENABLED, which is
  // unset in production (verified against Vercel 2026-08-29) and read as a
  // strict equality against "true", so the setters refuse and the UI is
  // hidden. Restore "and targets" here only if that flag is turned on.
  { capability: "Set due dates", cells: [false, true, true] },
  {
    capability: "Invite new learners by email",
    cells: [
      false,
      "Into their own projects, as Members",
      "Anywhere in the organization, at any role",
    ],
  },
  {
    capability: "See other learners' feedback",
    cells: [
      false,
      "In the projects they manage",
      "Everywhere in the organization",
    ],
  },
  {
    capability: "See milestone data across learners",
    cells: [
      false,
      "For the projects they manage",
      "For the whole organization",
    ],
  },
  { capability: "Change someone's role", cells: [false, false, true] },
  {
    capability: "Remove someone from the organization",
    cells: [false, false, true],
  },
  { capability: "Delete a project", cells: [false, false, true] },
  { capability: "Change organization settings", cells: [false, false, true] },
]

function CellContent({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-cs-dark-blue">
        <Check className="w-4 h-4 shrink-0 text-cs-navy" aria-hidden="true" />
        Yes
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-cs-dark-gray">
        <Minus className="w-4 h-4 shrink-0" aria-hidden="true" />
        No
      </span>
    )
  }
  return <span className="text-cs-dark-blue/80">{value}</span>
}

export function PermissionsMatrix() {
  return (
    // Twelve rows by four columns does not fit a phone, so the table scrolls
    // sideways inside this wrapper with the capability column pinned.
    //
    // The pinned column steals viewport width without extending the scroll
    // range, so any column wider than (wrapper width - pinned width) can never
    // be fully read: at maximum scroll its left edge stays under the pin. The
    // mobile widths below (9rem pinned, 10.5rem per role) keep every role column
    // reachable down to a 320px viewport. Widen one and the Admin column starts
    // clipping again.
    <div className="my-8 -mx-6 md:mx-0 overflow-x-auto rounded-none md:rounded-xl md:border md:border-cs-gray/50">
      <table className="w-full min-w-[40.5rem] md:min-w-[44rem] border-collapse text-left text-sm md:text-base font-light">
        <caption className="sr-only">
          What a Member, Project Manager, and Admin can each do in ClinicalSim
        </caption>
        <thead>
          <tr className="border-b border-cs-gray/50 bg-cs-cloud">
            <th
              scope="col"
              className="sticky left-0 z-10 w-36 md:w-auto bg-cs-cloud px-3 md:px-4 py-3 align-bottom text-sm font-medium text-cs-dark-blue"
            >
              Capability
            </th>
            {ROLES.map((role) => (
              <th
                key={role}
                scope="col"
                className="w-[10.5rem] md:w-auto px-3 md:px-4 py-3 align-bottom text-sm font-medium text-cs-dark-blue"
              >
                {role}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr
              key={row.capability}
              className="border-b border-cs-gray/40 last:border-b-0"
            >
              <th
                scope="row"
                className="sticky left-0 z-10 w-36 md:w-auto bg-white px-3 md:px-4 py-3 align-top text-sm md:text-base font-light text-cs-dark-blue"
              >
                {row.capability}
              </th>
              {row.cells.map((cell, i) => (
                <td key={ROLES[i]} className="w-[10.5rem] md:w-auto px-3 md:px-4 py-3 align-top">
                  <CellContent value={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
