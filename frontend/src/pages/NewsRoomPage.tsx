import React, { useEffect, useState } from "react"
import { Link } from "react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import useAxiosMod from "@/hooks/useAxiosMod"
import { SearchBar } from "@/components/SearchBar"

interface Article {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string | null | undefined;
}


const filters = ["All", "Next.js", "CSS", "JavaScript", "TailwindCSS", "Technology"]


function normalizeItem(item: any) {
  if (!item) return null


  if (item.title && item.excerpt) return item


  const fields = item.fields || {}
  return {
    id: item.id,
    title: item.webTitle,
    description: fields.trailText || fields.standfirst || item.webTitle || "",
    excerpt: (fields.trailText || fields.standfirst || item.fields?.bodyText || "").replace(/<[^>]*>/g, "").slice(0, 220),
    author: fields.byline || item.byline || fields.bylineHtml || "Unknown",
    date: item.webPublicationDate ? new Date(item.webPublicationDate).toLocaleDateString() : item.date || "",
    category: item.sectionName || item.category || "Technology",
    readTime: Math.max(1, Math.round((fields.wordcount ? Number(fields.wordcount) : 600) / 200)) + " min read",
    image: fields.thumbnail
  }
}

export default function NewsRoomPage() {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("")
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const axiosAuth = useAxiosMod(); 

    useEffect(() => {
      let cancelled = false



      async function fetchTopHeadlines() {
        setLoading(true)
        setError(null)
        try {
          const resp = await axiosAuth.get(`/api/articles/top-headlines`)

          console.log("Res", resp)
          // Expect backend to return an array in resp.data. Adjust as necessary.
          const raw = resp.data

          const normalized = raw
            .map(normalizeItem)
            .filter(Boolean)

          if (!cancelled) setArticles(normalized)
        } catch (err) {
          console.error("Failed to fetch top headlines:", err)
          if (!cancelled) setError(err?.message || "Failed to load articles")
        } finally {
          if (!cancelled) setLoading(false)
        }
      }

      fetchTopHeadlines()

      return () => {
        cancelled = true
      }
    }, [axiosAuth])

    const filteredArticles = articles.filter((article) => {
      const matchesFilter = selectedFilter === "All" || article.category === selectedFilter
      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
          q === "" ||
          (article.title || "").toLowerCase().includes(q) ||
          (article.description || "").toLowerCase().includes(q) ||
          (article.excerpt || "").toLowerCase().includes(q)
      return matchesFilter && matchesSearch
    })

    return (
      <div className="min-h-screen bg-background">
  
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
         
          <SearchBar/>

          <div className="mb-8 bg-secondary rounded-lg p-4 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground border border-border hover:border-primary/50"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="border border-dashed border-border rounded-lg p-8">
            {loading ? (
              <div className="py-16 text-center">Loading latest headlines…</div>
            ) : error ? (
              <div className="py-16 text-center text-red-500">Error: {error}</div>
            ) : filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Link key={article.id} to={`/app/article/id/${encodeURIComponent(article.id)}`}>
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


      </div>
    )
}
