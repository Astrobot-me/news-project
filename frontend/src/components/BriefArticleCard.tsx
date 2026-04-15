import { ArrowRight } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';
import { Badge } from './ui/badge';

interface BriefArticleCardProps {
    article: {
        article_id: string
        thumbnail_url?: string
        title: string
        description: string
        createdAt: string
    };
    index: number;
}



function BriefArticleCard({ article, index }: BriefArticleCardProps) : React.ReactNode {

    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })

    const getCategoryFromPath = (path: string) =>
        path.split("/")[0].toUpperCase()

    const category = getCategoryFromPath(article.article_id)


    return (
        <article
            className="animate-fade-in bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-muted">
                <img
                    src={article.thumbnail_url}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Date & Category */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                        {formatDate(article.createdAt)}
                    </span>

                    <Badge className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        {category}
                    </Badge>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                    {article.title}
                </h2>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                    {article.description}
                </p>

                {/* Read More */}
                <Link
                    to={`/app/article/id/${encodeURIComponent(article.article_id)}`}
                    className="inline-flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors group"
                    target='_blank'
                >
                    READ MORE
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </article>

    )
}

export default BriefArticleCard