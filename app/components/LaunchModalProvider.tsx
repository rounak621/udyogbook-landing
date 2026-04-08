'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import LaunchModal from './LaunchModal'

interface LaunchModalContextType {
  openModal: () => void
}

const LaunchModalContext = createContext<LaunchModalContextType>({ openModal: () => {} })

export const useLaunchModal = () => useContext(LaunchModalContext)

export default function LaunchModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <LaunchModalContext.Provider value={{ openModal: () => setIsOpen(true) }}>
      {children}
      <LaunchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </LaunchModalContext.Provider>
  )
}
