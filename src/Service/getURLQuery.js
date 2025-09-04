function getURLQuery(location) 
{
    const queryParams = new URLSearchParams(location.search) 
    return queryParams 
} 
export {getURLQuery}