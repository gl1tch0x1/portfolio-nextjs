import { Suspense } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { 
  ProjectsManager, 
  BlogsManager, 
  SettingsPanel,
  AdminHeader 
} from '@/components/admin';
  
export default function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <Suspense fallback={<LoadingScreen />}>
        <div className="max-w-6xl mx-auto w-full">
          <AdminHeader />
          <ProjectsManager />
          <BlogsManager />
          <SettingsPanel />
        </div>
      </Suspense>
    </main>
  );
}