import type { FC } from 'react'

interface Props {
  title: string
  description: string
  color: 'primary' | 'secondary' | 'success'
  icon: React.ReactNode
  bageText?: string
}

const SectionHeader: FC<Props> = ({ title, description, color, icon, bageText }) => {
  return (
    <section className="text-center mb-16">
      <div
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-${color}/10 border border-${color}/30 mb-6`}
      >
        {icon}
        <span className={`text-sm font-bold text-${color} tracking-wider uppercase`}>{bageText}</span>
      </div>

      <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-4">{title}</h2>
      <p className="text-lg text-text-secondary max-w-2xl mx-auto">{description}</p>
    </section>
  )
}

export default SectionHeader
