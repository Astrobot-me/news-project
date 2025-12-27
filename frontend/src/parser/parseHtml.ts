import parse from 'html-react-parser';
import { sanitizeHtml } from './sanitizeHtml';

/**
 * Parses an HTML string and returns a Document object.
 * @param html The HTML string to parse.
 * @returns The parsed Document.
 */
export function parseHtml(dirtyHtml: string): React.ReactNode { 

    const safeHtml = sanitizeHtml(dirtyHtml); 
    return parse(safeHtml); 


}