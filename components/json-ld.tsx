import type { Thing, WithContext } from "schema-dts"

interface JsonLdProps {
  data: WithContext<Thing> | WithContext<Thing>[]
}

export function JsonLd({ data }: JsonLdProps) {
  // Render each JSON-LD object as a separate script tag so Next.js can
  // process them individually (it expects a single object per tag).
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  )
}
