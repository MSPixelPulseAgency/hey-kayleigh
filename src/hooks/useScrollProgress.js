import { useEffect, useRef } from 'react'

export function useScrollProgress() {
  const progressRef = useRef(null)

  useEffect(() => {
    let frameId = 0

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = scrollable > 0 ? window.scrollY / scrollable : 0
      const progress = Math.min(1, Math.max(0, nextProgress))
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
      frameId = 0
    }

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return progressRef
}
