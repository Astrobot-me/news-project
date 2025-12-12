import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Calendar, Clock, Share2, Save, CheckCheck } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { BASE_URL } from "@/constant"
import modifiedAxios from "@/lib/axiosConfig"


export default function ArticlePage() : React.ReactNode {
  const { id } = useParams() // expecting route like /id/:id
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function fetchArticle() { 
      setLoading(true)
      setError(null)
      try {
        // call backend: GET /api/articles/id/<actual_id>
        const resp = await modifiedAxios.get(`${BASE_URL}/api/articles/content`, {
          params: { id }
        })

        // Expect backend to return the single item object directly in resp.data
        // If your backend wraps it (e.g. { data: item } or { result: item }), adjust accordingly.
        const item = resp.data

        if (!item) {
          if (!cancelled) {
            setArticle(null)
            setError("Article not found")
          }
          return
        }

        if (!cancelled) {
          setArticle(item)
        }
      } catch (err) {
        console.error("Failed to fetch article:", err)
        if (!cancelled) {
          // Provide useful error message; backend may return 404 or other codes
          setError(
            err?.response?.status === 404
              ? "Article not found (404)"
              : err.message || "Failed to load article"
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchArticle()

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading article…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-4 text-red-600">{error}</p>
          <Link to="/">
            <Button>Back to Articles</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link to="/">
            <Button>Back to Articles</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Use selected fields directly (no heavy normalization)
  const fields = article.fields || {}
  const title = fields.headline || article.webTitle || ""
  const author = fields.byline || article.byline || "Unknown"
  const date = article.webPublicationDate ? new Date(article.webPublicationDate).toLocaleDateString() : article.date || ""
  const category = article.sectionName || article.sectionId || "Technology"
  const readTime = fields.wordcount ? Math.max(1, Math.round(Number(fields.wordcount) / 200)) + " min read" : ""
  const image = fields.thumbnail || "/placeholder.svg"

  // Prefer fields.bodyText for full content; fall back to trailText/standfirst.
  // Convert a basic HTML body into plain text paragraphs while keeping paragraph breaks.
  const rawHtml = fields.bodyText || fields.trailText || fields.standfirst || ""
  const contentText = rawHtml
    .replace(/<\/p>\s*<p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Sticky header with back link */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{category}</Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">{title}</h1>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Article Image */}
          <div className="relative overflow-hidden rounded-lg bg-muted h-96 mb-8">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        </div>

          {/* Share Section */}
        <div className="border-t border-border pt-8 mb-10">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Share this article:</span>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
              <a href={article.webUrl || "#"} target="_blank" rel="noopener noreferrer">
                <Share2 className="w-4 h-4" />
                Share
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
              <a href={article.webUrl || "#"} target="_blank" rel="noopener noreferrer">
                <Save className="w-4 h-4" />
                Save this Article
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
              <a href={article.webUrl || "#"} target="_blank" rel="noopener noreferrer">
                <CheckCheck className="w-4 h-4" />
                Mark as Read
              </a>
            </Button>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-sm md:prose-base max-w-none mb-12">
          {contentText
            .split(/\n{2,}/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)
            .map((paragraph, index) => {
              // Heading detection (if content uses markdown-like '##' headers)
              if (paragraph.startsWith("##")) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.replace(/^##\s*/, "")}
                  </h2>
                )
              }

              // Bullet list detection: if every line in paragraph starts with "- "
              if (paragraph.split("\n").every((ln) => ln.trim().startsWith("- "))) {
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 mb-4">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i} className="text-foreground">
                        {item.replace(/^-+\s*/, "")}
                      </li>
                    ))}
                  </ul>
                )
              }

              return (
                <p key={index} className="text-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              )
            })}
        </div>

      
      </article>

      <Footer />
    </div>
  )
}
