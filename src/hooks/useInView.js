import { useEffect, useState } from "react"

export function useInView(ref, options = {}) {
  const [inView, setInView] = useState(true)

  const threshold = options.threshold ?? 0.12
  const rootMargin = options.rootMargin ?? "0px"

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return undefined
    }

    if (!("IntersectionObserver" in window)) {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref, threshold, rootMargin])

  return inView
}