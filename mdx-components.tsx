import { Children, isValidElement, type ReactNode } from 'react'
import type { MDXComponents } from 'mdx/types'
import { headingId } from '@/lib/howto-schema'

// Plain text of a heading, so an H2 containing a link or emphasis still gets
// the same id the HowTo step URLs point at.
function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return Children.toArray(node).map(textOf).join('')
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 mt-8 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        id={headingId(textOf(children))}
        className="text-2xl md:text-3xl font-light text-gray-900 mb-4 mt-8"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium text-gray-900 mb-3 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg text-gray-700 font-light leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="space-y-2 text-lg text-gray-700 font-light mb-4 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-2 text-lg text-gray-700 font-light mb-4 ml-4 list-decimal">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed pl-2">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 my-6 italic">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-gray-900">{children}</strong>
    ),
    hr: () => <hr className="border-gray-200 my-8" />,
    ...components,
  }
}
