import Image from "next/image"

/**
 * A screenshot inside a help article. Alt text carries the argument the image
 * makes rather than naming the controls, because the surrounding prose already
 * names them and a screen reader gets nothing from a second list of labels.
 *
 * The captures are 1440x900 (the nav comparison is 768x788), so they render at
 * roughly half scale in the 768px article column and stay crisp on a 2x
 * display. Nothing floats beside them: a sticky-free single column means even
 * the tall dialog shot gets the full width rather than a crop.
 */
export function HelpFigure({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 768px) 768px, 100vw"
        className="w-full h-auto rounded-xl border border-cs-gray/50"
      />
    </figure>
  )
}
