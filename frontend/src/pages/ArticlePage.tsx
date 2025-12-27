import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import Loading from "@/components/Loading"
import useAxiosMod from "@/hooks/useAxiosMod"
import ArticleContent from "@/components/ArticleContent"
import type { ArticleContentProps } from "@/types"


export default function ArticlePage(): React.ReactNode {
  const { id } = useParams()
  const axiosAuth = useAxiosMod()

  const [article, setArticle] = useState<ArticleContentProps[]>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    async function fetchArticle() {
      setLoading(true)
      setError(null)

      try {
        const resp = await axiosAuth.get("/api/articles/content", {
          params: { id },
        })

        if (!resp.data) {
          setError("Article not found")
          setArticle(null)
          return
        }

        setArticle(resp.data)
      } catch (err) {
        console.error(err)
        setError(
          err?.response?.status === 404
            ? "Article not found (404)"
            : err?.message || "Failed to load article"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id, axiosAuth])



  if (loading) return <Loading />

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

  return (
    <div className="flex px-10 gap-5">
      
      {/* Article Section  */}
      <ArticleContent article={article}/>

      {/* Utility Section */}

      <div className="px-10 py-5">
        <h1></h1>
      </div>

    </div>
  )
}
