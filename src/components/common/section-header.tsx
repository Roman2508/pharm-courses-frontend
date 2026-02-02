import type { FC } from "react"

interface Props {
  title: string
  description: string
  color: "primary" | "secondary" | "success"
  icon: React.ReactNode
  bageText?: string
}

const SectionHeader: FC<Props> = ({ title, description, color, icon, bageText }) => {
  return (
    <section className="text-center mb-10 sm:mb-16">
      <div
        className={`inline-flex items-center gap-2 px-3 sm:px-6 py-1 sm:py-3 rounded-full bg-${color}/10 border border-${color}/30 mb-4 sm:mb-6`}
      >
        {icon}
        <span className={`text-sm font-bold text-${color} tracking-wider uppercase`}>{bageText}</span>
      </div>

      <h2 className="text-2xl min-[450px]:text-3xl sm:text-4xl md:text-5xl font-black text-text-primary mb-2 sm:mb-4">
        {title}
      </h2>
      <p className="text-basesm:text-lg text-text-secondary max-w-2xl px-6 mx-auto">{description}</p>
    </section>
  )
}

export default SectionHeader
