interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'blogs', label: 'Blog Posts' },
    { id: 'settings', label: 'Settings' }
  ]

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <nav className="p-4 space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              activeSection === item.id
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
} 