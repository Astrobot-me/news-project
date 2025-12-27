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

interface Article {
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
}

export type ArticleContentProps = {
    article: Article;
};