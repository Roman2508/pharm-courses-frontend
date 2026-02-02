import { Link } from 'react-router'

interface Props {
  link: string
  title: string
  description: string
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive'
}

const AdminActionCard = ({ link, icon, title, description, color }: Props) => {
  return (
    <Link
      to={link}
      className={`group bg-surface rounded-2xl border border-border p-6 hover:shadow-xl hover:shadow-${color}/5 hover:-translate-y-1 transition-all`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-xl bg-${color}/10 flex items-center justify-center group-hover:bg-${color}/20 transition-colors`}
        >
          {icon}
        </div>
        <div>
          <h3 className={`font-semibold text-${color} mb-1`}>{title}</h3>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default AdminActionCard
