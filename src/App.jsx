import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'

const Hero       = lazy(() => import('./components/Hero'))
const About      = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const Skills     = lazy(() => import('./components/Skills'))
const Projects   = lazy(() => import('./components/Projects'))
const Contact    = lazy(() => import('./components/Contact'))
const Footer     = lazy(() => import('./components/Footer'))

function SectionFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#080810',
    }}>
      <div style={{
        width: '32px', height: '32px',
        border: '2px solid #1e1e30',
        borderTopColor: '#6effc0',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function App() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<SectionFallback />}><Hero /></Suspense>
      <Suspense fallback={<SectionFallback />}><About /></Suspense>
      <Suspense fallback={<SectionFallback />}><Experience /></Suspense>
      <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
      <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
      <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
    </div>
  )
}

export default App