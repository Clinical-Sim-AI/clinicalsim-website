import { Users } from "lucide-react"
import { getAuthorById, TEAM_AUTHOR_ID } from "@/lib/authors"

const variantClasses = {
  warm: "bg-warm text-white",
  navy: "bg-navy text-white",
  blue: "bg-blue-600 text-white",
  success: "bg-success text-white",
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
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <Users className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {authorName || "ClinicalSim.ai Team"}
          </p>
          <p className="text-xs text-gray-500">ClinicalSim.ai</p>
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
        <p className="text-sm font-medium text-gray-900">{author.name}</p>
        <p className="text-xs text-gray-500">{author.title}</p>
      </div>
    </div>
  )
}
