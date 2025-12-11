import {  Newspaper } from 'lucide-react'
import React from 'react'
import {Link} from "react-router"
import { Button } from './ui/button'

function Header() : React.ReactNode {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
            <Newspaper className="w-6 h-6 text-primary" />
            <span>News Project</span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center shrink-0">
            <div>
               <Link to="/auth/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link to="/auth/signup">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Sign Up
              </Button>
            </Link>
            </div>
           
          </nav>
        </div>
      </header>

  )
}

export default Header