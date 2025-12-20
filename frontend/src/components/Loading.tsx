import { LoaderPinwheel } from 'lucide-react'
import React from 'react'

function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200"> 
            <LoaderPinwheel className="w-10 h-10 animate-spin"/>
    </div>
  )
}

export default Loading