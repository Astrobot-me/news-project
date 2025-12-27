import React from 'react'
import {
  Share2,
  Save,
  CheckCheck,
  Clock,
  User,
  Calendar,
} from "lucide-react"; 
import { Badge } from "@/components/ui/badge"; 
import { parseHtml } from "@/parser/parseHtml"; 
import { Button } from './ui/button';
import type { ArticleContentProps } from '@/types';



function ArticleContent( { article } : ArticleContentProps ) {
  

    const {
        type,
        sectionId,
        sectionName,
        pillarId,
        pillarName,
        webTitle,
        webPublicationDate,
        webUrl,
        apiUrl,
        isLive,
        isHosted,
        publication,
        productionOffice,
        fields = {},
    } = article

    const {
        headline,
        standfirst,
        trailText,
        byline,
        main,
        body,
        bodyText,
        wordcount,
        thumbnail,
        firstPublicationDate,
        lastModified,
        newspaperPageNumber,
        newspaperEditionDate,
        shortUrl,
        lang,
        legallySensitive,
    } = fields

    const title = headline || webTitle

    const subtitle =
        standfirst ||
        (trailText ? `<p>${trailText}</p>` : null)

    const publishedAt = firstPublicationDate || webPublicationDate
    const updatedAt = lastModified

    const readTime = Math.ceil(
        Number(wordcount || bodyText?.split(" ").length || 0) / 200
    )
    return (
        <div className="min-h-screen bg-background" lang={lang || "en"}>


            <article className="max-w-4xl mx-auto px-4 py-10">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    {sectionName && <Badge variant="secondary">{sectionName}</Badge>}
                    {pillarName && <Badge variant="outline">{pillarName}</Badge>}
                    {isLive && (
                        <Badge variant="destructive" className="animate-pulse">
                            LIVE
                        </Badge>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {title}
                </h1>

                {/* Subtitle */}
                {subtitle && (
                    <div className="text-lg text-muted-foreground mb-6">
                        {parseHtml(subtitle)}
                    </div>
                )}

                {/* Meta */}
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-medium mb-8">
                    {byline && (
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {byline}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={publishedAt}>
                            {new Date(publishedAt).toLocaleDateString()}
                        </time>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {readTime} min read
                    </div>
                </div>

                {/* Hero image */}
                {main ? (
                    <div className="prose max-w-none mb-10">
                        {parseHtml(main)}
                    </div>
                ) : thumbnail ? (
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-[420px] object-cover rounded-lg mb-10"
                    />
                ) : null}

                {/* Body */}
                <div className="prose prose-neutral max-w-none">
                    {parseHtml(body || "<p>No article content found.</p>")}
                </div>

                {/* Updated */}
                {updatedAt && (
                    <p className="text-xs text-muted-foreground mt-6">
                        Last updated{" "}
                        {new Date(updatedAt).toLocaleDateString()}
                    </p>
                )}

                {/* Share / actions */}
                <div className="border-t border-border pt-8 mt-12 flex flex-wrap gap-4">
                    <span className="text-sm text-muted-foreground">
                        Share this article:
                    </span>

                    <Button variant="outline" size="sm" className="gap-2" asChild>
                        <a href={webUrl} target="_blank" rel="noopener noreferrer">
                            <Share2 className="w-4 h-4" />
                            Share
                        </a>
                    </Button>

                    <Button variant="outline" size="sm" className="gap-2">
                        <Save className="w-4 h-4" />
                        Save
                    </Button>

                    <Button variant="outline" size="sm" className="gap-2">
                        <CheckCheck className="w-4 h-4" />
                        Mark as Read
                    </Button>
                </div>

                {/* Publication footer */}
                <footer className="mt-16 border-t pt-6 text-sm text-muted-foreground space-y-1">
                    <p>{publication}</p>
                    {productionOffice && (
                        <p>{productionOffice} edition</p>
                    )}
                    {newspaperPageNumber && (
                        <p>
                            Print: Page {newspaperPageNumber} ·{" "}
                            {newspaperEditionDate}
                        </p>
                    )}
                    {shortUrl && <p>{shortUrl}</p>}
                </footer>
            </article>


        </div>
    )
}

export default ArticleContent