import { useEffect, useRef } from "react"

/**
 * CircuitCanvas — reusable animated circuit board background
 *
 * Props:
 *   gridSize    {number}   node spacing in px          (default 100)
 *   pulseCount  {number}   max concurrent pulses       (default 8)
 *   pulseSpeed  {number}   base pulse travel speed     (default 0.003)
 *   nodeOpacity {number}   max node fill opacity       (default 0.2)
 *   lineOpacity {number}   line stroke opacity         (default 0.04)
 *   glowPulse   {boolean}  radial-gradient halo pulse  (default false)
 *   className   {string}   extra CSS class names
 *   style       {object}   extra inline styles
 */
function CircuitCanvas({
  gridSize    = 100,
  pulseCount  = 8,
  pulseSpeed  = 0.003,
  nodeOpacity = 0.2,
  lineOpacity = 0.04,
  glowPulse   = false,
  className   = "",
  style       = {},
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext("2d")
    let animationId
    let nodes = [], pulses = []

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      init()
    }

    const init = () => {
      nodes = []; pulses = []
      const cols   = Math.floor(canvas.width  / gridSize)
      const rows   = Math.floor(canvas.height / gridSize)
      const jitter = gridSize * 0.4

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.45) continue
          nodes.push({
            x:           i * gridSize + Math.random() * jitter - jitter / 2,
            y:           j * gridSize + Math.random() * jitter - jitter / 2,
            radius:      Math.random() * 1.8 + 0.3,
            connections: [],
            opacity:     Math.random() * nodeOpacity + nodeOpacity * 0.375,
          })
        }
      }

      const connectDist = gridSize * 1.75
      nodes.forEach((n, i) => {
        nodes.forEach((m, j) => {
          if (i >= j) return
          if (Math.hypot(n.x - m.x, n.y - m.y) < connectDist && Math.random() > 0.5)
            n.connections.push(j)
        })
      })

      const initial = Math.ceil(pulseCount * 0.5)
      for (let i = 0; i < initial; i++) spawnPulse()
    }

    const spawnPulse = () => {
      if (!nodes.length) return
      const si   = Math.floor(Math.random() * nodes.length)
      const node = nodes[si]
      if (!node || !node.connections.length) return
      pulses.push({
        fromIdx:  si,
        toIdx:    node.connections[Math.floor(Math.random() * node.connections.length)],
        progress: 0,
        speed:    pulseSpeed + Math.random() * pulseSpeed,
        opacity:  glowPulse ? Math.random() * 0.6 + 0.3 : Math.random() * 0.3 + 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach(n => {
        n.connections.forEach(j => {
          const m = nodes[j]
          ctx.beginPath()
          ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, n.y); ctx.lineTo(m.x, m.y)
          ctx.strokeStyle = `rgba(110,255,192,${lineOpacity})`
          ctx.lineWidth   = 0.8
          ctx.stroke()
        })
      })

      nodes.forEach(n => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(110,255,192,${n.opacity})`
        ctx.fill()
      })

      pulses.forEach((p, idx) => {
        p.progress += p.speed
        if (p.progress >= 1) {
          const node = nodes[p.toIdx]
          if (node && node.connections.length) {
            p.fromIdx = p.toIdx
            p.toIdx   = node.connections[Math.floor(Math.random() * node.connections.length)]
            p.progress = 0
          } else { pulses.splice(idx, 1); spawnPulse(); return }
        }

        const from = nodes[p.fromIdx], to = nodes[p.toIdx]
        if (!from || !to) return

        const midX     = to.x, midY = from.y
        const s1       = Math.hypot(midX - from.x, midY - from.y)
        const s2       = Math.hypot(to.x - midX,   to.y - midY)
        const traveled = p.progress * (s1 + s2)
        let px, py

        if (traveled <= s1) {
          const t = s1 > 0 ? traveled / s1 : 0
          px = from.x + (midX - from.x) * t
          py = from.y + (midY - from.y) * t
        } else {
          const t = s2 > 0 ? (traveled - s1) / s2 : 0
          px = midX + (to.x - midX) * t
          py = midY + (to.y - midY) * t
        }

        if (glowPulse) {
          const g = ctx.createRadialGradient(px, py, 0, px, py, 6)
          g.addColorStop(0, `rgba(110,255,192,${p.opacity})`)
          g.addColorStop(1, "rgba(110,255,192,0)")
          ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2)
          ctx.fillStyle = g; ctx.fill()
          ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(180,255,220,${p.opacity})`; ctx.fill()
        } else {
          ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(110,255,192,${p.opacity})`; ctx.fill()
        }
      })

      if (Math.random() < 0.01 && pulses.length < pulseCount) spawnPulse()
      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [gridSize, pulseCount, pulseSpeed, nodeOpacity, lineOpacity, glowPulse])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        display: "block", pointerEvents: "none", zIndex: 0,
        ...style,
      }}
    />
  )
}

export default CircuitCanvas