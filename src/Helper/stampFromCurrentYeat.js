const currentYear = () => (new Date).getFullYear() 


const stampFromCurrentYear = (date) => {
    const startDate = new Date(`01-01-${currentYear()}`) 
    const diffMs = date - startDate    //Khoang cach giua 2 Date, tinh theo Ms 
    const diffDays = Math.floor(diffMs / (1000 * 86400)) //Khoang cach giua 2 Date, tinh theo days 
    return diffDays
} 

export {currentYear , stampFromCurrentYear}