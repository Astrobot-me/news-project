import { useRef, useState, useEffect } from "react"
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

const workCategories = [
  "All Work",
  "Technology",
  "Design",
  "React",
  "Next.js",
  "TypeScript",
  "Performance",
]

const aiSuggestions = [
  "How to center a div?",
  "React hooks best practices",
  "CSS Grid vs Flexbox",
  "Next.js performance tips",
  "TypeScript types explained",
  "Web design principles",
]

export function SearchBar() {
  const [selectedCategory, setSelectedCategory] = useState("All Work")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDropdownOpen(false)
    console.log(`Searching for: "${searchQuery}" in ${selectedCategory}`)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setIsDropdownOpen(false)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 w-full mb-8"
    >
      {/* INPUT */}
      <div
        ref={dropdownRef}
        className="relative flex-1"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />

        <Input
          type="text"
          placeholder="Search with AI: 'How to center a div'..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full pl-12 pr-4 py-5 bg-secondary border border-border rounded-lg"
        />

        {/* AI SUGGESTIONS */}
        <div
          className={`absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg overflow-hidden transition-all duration-200 origin-top z-50 ${
            isDropdownOpen
              ? "opacity-100 scale-y-100 visible"
              : "opacity-0 scale-y-95 invisible pointer-events-none"
          }`}
        >
          <div className="p-3 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground">
              AI Suggestions
            </p>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {aiSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-2.5 hover:bg-secondary text-sm flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CATEGORY */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="py-5 whitespace-nowrap "
          >
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
              className={
                selectedCategory === category ? "bg-primary/10" : ""
              }
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* SUBMIT */}
      <Button type="submit" size="sm" className="py-5 gap-2">
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  )
}
