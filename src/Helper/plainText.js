function plainText(str) 
{
    const temp = document.createElement('div') 
    temp.innerHTML = str 
    return temp.textContent //Lay toan bo text ben trong va ca cac the con cua no 
}
export {plainText}