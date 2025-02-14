'use client'

import { Suspense, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { ProjectsGrid } from '@/components/ProjectsGrid'
import { SkillsMatrix } from '@/components/SkillsMatrix'
import { ContactSection } from '@/components/ContactSection'
import { SecBlogs } from '@/components/SecBlogs'
import { Experience } from '@/components/Experience'
import { Certifications } from '@/components/Certifications'
import { LoadingScreen } from '@/components/LoadingScreen'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const isDarkMode = theme === 'dark'
  const handleSetDarkMode = (value: boolean) => setTheme(value ? 'dark' : 'light')

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingScreen />
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <Experience />
      case 'projects':
        return <ProjectsGrid />
      case 'skills':
        return <SkillsMatrix />
      case 'secblogs':
        return <SecBlogs />
      case 'certifications':
        return <Certifications />
      case 'contact':
        return <ContactSection />
      default:
        return <HeroSection />
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Suspense fallback={<LoadingScreen />}>
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={handleSetDarkMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        {renderSection()}
      </Suspense>
    </main>
  )
}
