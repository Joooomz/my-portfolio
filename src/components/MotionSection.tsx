import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type MotionType = "up" | "down" | "left" | "right" | "scale" | "blur"

type MotionSectionProps = {
  children: ReactNode
  type?: MotionType
  delay?: number
  className?: string
  once?: boolean
  amount?: number
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -18 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.975, y: 14 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  blur: {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
}

function MotionSection({
  children,
  type = "up",
  delay = 0,
  className = "",
  once = true,
  amount = 0.18,
}: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={variants[type]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: 0.62,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export default MotionSection