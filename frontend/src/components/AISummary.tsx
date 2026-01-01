import React from 'react'
import { Badge } from './ui/badge'
import { Sparkle } from 'lucide-react'
import { Button } from './ui/button'
import { Gemini } from './ui/svgs/gemini'

function AISummary() : React.ReactNode {
  return (
    <div className="px-10 py-5 flex flex-col gap-4">
        <Badge className="flex items-center px-3 py-1">
            <Sparkle/>
            <span> AI Summary</span>

        </Badge>
        
        <Button variant='secondary'>
          <span>Generate Summary with Gemini</span> 
          <Gemini  />
        </Button>
      </div>
  )
}

export default AISummary