import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const workCategories = ["All Work", "Technology", "Design", "React", "Next.js", "TypeScript", "Performance"]

export function SearchBar() : React.ReactNode {
  const [selectedCategory, setSelectedCategory] = useState("All Work")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Searching for: "${searchQuery}" in category: "${selectedCategory}"`)
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-md">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="min-w-fit bg-transparent">
            {selectedCategory}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Filter by Work</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {workCategories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-primary/10" : ""}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button type="submit" size="sm" className="gap-2">
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  )
}
