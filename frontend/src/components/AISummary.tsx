import React from 'react'
import { Badge } from './ui/badge'
import { Sparkle } from 'lucide-react'

function AISummary() : React.ReactNode {
  return (
    <div className="px-10 py-5 flex flex-col gap-4">
        <Badge className="flex items-center px-3 py-1">
            <Sparkle/>
            <span> AI Summary</span>

        </Badge>
        <div className="w-48 h-48 rounded-2xl bg-gray-200"></div>
      </div>
  )
}

export default AISummary