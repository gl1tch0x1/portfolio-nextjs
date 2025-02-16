import { headers } from 'next/headers'
import { Sidebar } from '@/components/admin/Sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const pathname = headersList.get('x-pathname')
  const isLoginPage = pathname === '/admin/login'

  return (
    <div className="min-h-screen">
      {isLoginPage ? (
        children
      ) : (
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      )}
    </div>
  )
}
