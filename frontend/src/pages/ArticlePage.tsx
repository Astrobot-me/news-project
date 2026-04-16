import React, { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import Loading from "@/components/Loading"
import useAxiosMod from "@/hooks/useAxiosMod"
import ArticleContent from "@/components/ArticleContent"
import type { Article } from "@/types"
import AISummary from "@/components/AISummary"
import toast from "react-hot-toast"
import { useAppSelector } from "@/store/hooks"


export default function ArticlePage(): React.ReactNode {
  const { id } = useParams()
  const axiosAuth = useAxiosMod()

  const [article, setArticle] = useState<Article>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { status } = useAppSelector((state) => state.auth)


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

        setArticle(
          { ...resp.data?.content, 
            isSaved: resp.data?.isSaved ,
            isRead: resp.data?.isRead ,
          
          }
        )

       

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

    if (status) fetchArticle();

  }, [id, axiosAuth, status])

  const handleShare = (webUrl: string) => {
    navigator.clipboard.writeText(webUrl || window.location.href)
    toast.success("Url is copied to clipboard")

  }

  const handleSave = useCallback(async (articleId: string, mode: "save" | "mark") => {

    if (!status) return;

     console.log(article)

    const ENDPOINT = (mode === "save") ? "/api/user/save-article" : "/api/user/mark-article";

    try {
      const res = await axiosAuth.post(ENDPOINT, {
        articleId,
        thumbnail_url: article.fields.thumbnail,
        title: article.webTitle,
        description: article.fields.headline

      })

      toast.success(res?.data?.message)

    } catch (error) {
      console.error(error)
      toast.error("Error saving the article")
    }

  }, [axiosAuth, status, article])

  const handleMarkRead = useCallback(async (articleId: string) => {
    await handleSave(articleId, "mark")
  }, [handleSave])

  const handleRemoveSaved = useCallback(async (articleId: string, mode: "save" | "mark") => {
    if (!status) return;
    console.log(articleId, mode)

    const encoded_id = encodeURIComponent(articleId)
    const ENDPOINT = (mode === "save") ? `/api/user/save-article/${encoded_id}` : `/api/user/mark-article/${encoded_id}`; 

    try {
      const res = await axiosAuth.delete(ENDPOINT);
      console.log(res) 
      toast.success(res?.data?.message)

    } catch (error) {
      console.log(error)
      toast.error("Error Removing Article")
    }
    

  }, [axiosAuth, status]);

  const handleRemoveMarked = useCallback(async (articleId: string) => {

    handleRemoveSaved(articleId, "mark");

  }, [handleRemoveSaved]);


  if (loading) return <Loading />

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-4 text-red-600">{error}</p>
          <Link to="/app/news">
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
          <Link to="/app/news">
            <Button>Back to Articles</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex sm:flex-row px-10 max-w-7xl mx-auto gap-5">

      {/* Article Section  */}
      <ArticleContent article={article} handleMarkRead={handleMarkRead} handleSave={handleSave} handleShare={handleShare} handleRemoveMarked={handleRemoveMarked} handleRemoveSaved={handleRemoveSaved} />

      {/* Utility Section */}

      <AISummary content={article.fields.bodyText} />

    </div>
  )
}
