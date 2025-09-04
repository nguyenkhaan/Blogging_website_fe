import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

function textToHTML(str) 
{
    const cleanHTML = DOMPurify.sanitize(str) 
    const reactElement = parse(cleanHTML) 
    return reactElement
} 
export {textToHTML}