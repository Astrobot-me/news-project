import BriefArticleCard from '@/components/BriefArticleCard'
import { Spinner } from '@/components/ui/spinner'
import useAxiosMod from '@/hooks/useAxiosMod'
import { useAppSelector } from '@/store/hooks'
import type { SavedArticle } from '@/types'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'




function SavedArticlePage() {

    const [savedArticle, setSavedArticle] = useState<SavedArticle[] | null>(null)
    const [readArticle, setReadArticle] = useState<SavedArticle[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { status } = useAppSelector((state) => state.auth)

    const axiosAuth = useAxiosMod();



    useEffect(() => {
        if (!status) return;

        const fetchSaved = async () => {


            try {

                setLoading(true)
                const saved_article = axiosAuth.get("/api/user/save-article")
                const read_article = axiosAuth.get("/api/user/mark-article")

                const result = await Promise.all([
                    saved_article,
                    read_article
                ])

                setSavedArticle(result[0].data.saved_articles);
                setReadArticle(result[1].data.saved_articles);

                console.log("Saved Article", result);


            } catch (error) {
                console.log(error)
                toast.error("Some Error Occured while Fetching")
            }

            finally {
                setLoading(false)
            }
        }

        fetchSaved();

    }, [status, axiosAuth])

    return (
        <>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen'>
                <div className="mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Saved News</h1>
                    <p className="text-muted-foreground text-lg">Your collection of saved articles</p>
                </div>

                <div className='flex flex-col gap-3 min-h-44 mb-10'>
                    <h2 className='text-2xl font-semibold mb-5'>Saved</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            <div className="flex w-full h-32 justify-center items-center col-span-full">
                                <Spinner className='text-shadow-slate-900 size-8' />
                            </div>
                        ) : (
                            <>
                                {savedArticle && savedArticle.map((article, index) => (
                                    <BriefArticleCard key={`${index}:${article.article_id}`} article={article} index={index} />
                                ))}
                                {!savedArticle && <span className='font-semibold ml-2'>No Saved Content</span>}
                            </>
                        )}
                    </div>
                </div>

                <Separator className='w-full text-gray-900' aria-orientation='horizontal' />

                <div className='flex flex-col gap-3  min-h-44 mt-20'>
                    <h2 className='text-2xl font-semibold mb-5'>Reading List</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            <div className="flex w-full h-32 justify-center items-center col-span-full">
                                <Spinner className='text-shadow-slate-900 size-8' />
                            </div>
                        ) : (
                            <>
                                {readArticle && readArticle.map((article, index) => (
                                    <BriefArticleCard key={`${index}:${article.article_id}`} article={article} index={index} />

                                ))}
                                {!readArticle && <span className='font-semibold ml-2'>No Saved Content</span>}
                            </>
                        )}
                    </div>
                </div>
                

            </div>



        </>
    )
}

export default SavedArticlePage