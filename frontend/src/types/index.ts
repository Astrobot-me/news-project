interface ArticleFields {
    headline?: string;
    standfirst?: string;
    trailText?: string;
    byline?: string;
    main?: string;
    body?: string;
    bodyText?: string;
    wordcount?: string;
    thumbnail?: string;
    firstPublicationDate?: string;
    lastModified?: string;
    newspaperPageNumber?: number;
    newspaperEditionDate?: string;
    shortUrl?: string;
    lang?: string;
    legallySensitive?: boolean;
    [key: string]: any;
}

export interface Article {
    id?: string; 
    type?: string;
    sectionId?: string;
    sectionName?: string;
    pillarId?: string;
    pillarName?: string;
    webTitle?: string;
    webPublicationDate?: string;
    webUrl?: string;
    apiUrl?: string;
    isLive?: boolean;
    isHosted?: boolean;
    publication?: string;
    productionOffice?: string;
    fields?: ArticleFields;
    [key: string]: any;
    isSaved?: boolean; 
    isRead?: boolean; 
}

export type ArticleContentProps = {
    article: Article; 
    handleSave : (articleId : string, mode : "save" | "mark" ) => void ; 
    handleShare : (webUrl: string) => void ; 
    handleMarkRead : (articleId : string ) => void ; 
    handleRemoveSaved : (articleId : string, mode : "save" | "mark" ) => void ; 
    handleRemoveMarked : (articleId : string ) => void  ; 
 };



export type SavedArticle = { 
        article_id: string
        thumbnail_url?: string
        title: string
        description: string
        createdAt: string
}