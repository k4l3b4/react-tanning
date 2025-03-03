import viteLogo from '/vite.svg'
import { useState } from 'react'

import { createLazyFileRoute } from '@tanstack/react-router'

import reactLogo from '../assets/react.svg'
import tailwindLogo from '../assets/tailwind.svg'
import tanstackLogo from '../assets/tanstack.png'

export const Route = createLazyFileRoute('/')({
  component: App,
})

function App() {

  return (
    <>
      
    </>
  )
}

export default App
