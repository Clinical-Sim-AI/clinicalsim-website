import { Users } from "lucide-react"
import { getAuthorById, TEAM_AUTHOR_ID } from "@/lib/authors"

const variantClasses = {
  accent: "bg-cs-electric text-cs-dark-blue",
  navy: "bg-cs-navy text-white",
  blue: "bg-cs-dark-blue text-white",
  "light-blue": "bg-cs-light-blue text-cs-dark-blue",
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((part) => !part.includes(","))
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function AuthorByline({
  authorId,
  authorName,
}: {
  authorId?: string
  authorName?: string
}) {
  const author = authorId ? getAuthorById(authorId) : undefined
  const isTeam = !author || author.id === TEAM_AUTHOR_ID

  if (isTeam) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-cs-electric/20 flex items-center justify-center">
          <Users className="w-5 h-5 text-cs-dark-blue" />
        </div>
        <div>
          <p className="text-sm font-medium text-cs-dark-blue">
            {authorName || "ClinicalSim.ai Team"}
          </p>
          <p className="text-xs text-cs-dark-gray">ClinicalSim.ai</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${variantClasses[author.colorVariant]}`}
      >
        {getInitials(author.name)}
      </div>
      <div>
        <p className="text-sm font-medium text-cs-dark-blue">{author.name}</p>
        <p className="text-xs text-cs-dark-gray">{author.title}</p>
      </div>
    </div>
  )
}
