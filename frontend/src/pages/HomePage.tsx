import {Link} from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Header from "@/components/Header"
import { Search } from "lucide-react"

const articles = [
  {
    id: "1",
    title: "The Future of Web Development",
    description: "Exploring the emerging trends and technologies that will shape web development in 2025.",
    excerpt:
      "Web development is evolving rapidly with new frameworks, tools, and practices emerging constantly. In this article, we explore what the future holds for developers.",
    author: "Sarah Chen",
    date: "Dec 10, 2025",
    category: "All",
    readTime: "8 min read",
    image: "/modern-web-development-interface.jpg",
  },
  {
    id: "2",
    title: "Mastering React Hooks",
    description: "A comprehensive guide to understanding and using React Hooks effectively in your applications.",
    excerpt:
      "React Hooks have revolutionized how we write components. Learn the best practices and advanced techniques for using hooks in your projects.",
    author: "Alex Rodriguez",
    date: "Dec 8, 2025",
    category: "React",
    readTime: "12 min read",
    image: "/react-code-development.jpg",
  },
  {
    id: "3",
    title: "Design Systems That Scale",
    description: "Building and maintaining design systems that grow with your organization.",
    excerpt:
      "Design systems are crucial for maintaining consistency at scale. This guide covers the principles and practices for building systems that evolve with your needs.",
    author: "Emma Wilson",
    date: "Dec 5, 2025",
    category: "CSS",
    readTime: "10 min read",
    image: "/design-system-components.png",
  },
  {
    id: "4",
    title: "Nextjs 16: What's New",
    description: "A deep dive into the latest features and improvements in Next.js 16.",
    excerpt:
      "Next.js 16 brings significant improvements to performance, caching, and developer experience. Let's explore what's new in this release.",
    author: "James Park",
    date: "Dec 3, 2025",
    category: "Next.js",
    readTime: "9 min read",
    image: "/nextjs-framework.jpg",
  },
  {
    id: "5",
    title: "TypeScript Best Practices",
    description: "Writing type-safe TypeScript code that scales with your application.",
    excerpt:
      "TypeScript helps you write more reliable code. Discover the best practices for leveraging TypeScript's powerful type system.",
    author: "Lisa Zhang",
    date: "Nov 30, 2025",
    category: "JavaScript",
    readTime: "11 min read",
    image: "/typescript-code.png",
  },
  {
    id: "6",
    title: "Performance Optimization Strategies",
    description: "Techniques for making your web applications faster and more efficient.",
    excerpt:
      "Performance matters. Learn proven strategies for optimizing your applications and improving user experience.",
    author: "Michael Brown",
    date: "Nov 28, 2025",
    category: "TailwindCSS",
    readTime: "7 min read",
    image: "/performance-metrics-dashboard.png",
  },
]

const filters = ["All", "Next.js", "CSS", "JavaScript", "TailwindCSS"]

export default function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = articles.filter((article) => {
    const matchesFilter = selectedFilter === "All" || article.category === selectedFilter
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      <Header/>
      
      {/* Hero Section */}
      <section className="bg-linear-to-b from-primary/10 to-background py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">Discover Quality Articles</h1>
          <p className="text-base text-muted-foreground text-balance max-w-2xl mx-auto">
            Explore in-depth articles on web development, design, and technology. Written by experts, for developers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search with AI: 'How to center a div'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="mb-8 bg-secondary rounded-lg p-4 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground border border-border hover:border-primary/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="border border-dashed border-border rounded-lg p-8">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer group">
                    <div className="relative overflow-hidden bg-muted h-48">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-primary/90 text-primary-foreground hover:bg-primary">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{article.author}</span>
                          <span>{article.readTime}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{article.date}</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-2">No Resources Found</h2>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
     
    </div>
  )
}
