"use client"

import { useCallback, useState } from "react"
import { Check, Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyLinkButtonProps {
  id: string
  label: string
  className?: string
}

// Copies an absolute link to this anchor and syncs the URL hash without
// triggering navigation or the FaqAnchorHandler's hashchange listener.
export function CopyLinkButton({ id, label, className }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()

      const url = `${window.location.origin}${window.location.pathname}#${id}`
      navigator.clipboard.writeText(url).then(() => {
        window.history.replaceState(null, "", `#${id}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
    },
    [id]
  )

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-1 text-cs-dark-gray hover:text-cs-navy transition-colors flex-shrink-0",
        className
      )}
    >
      {copied ? (
        <Check className="w-4 h-4 text-cs-navy" />
      ) : (
        <LinkIcon className="w-4 h-4" />
      )}
    </button>
  )
}
