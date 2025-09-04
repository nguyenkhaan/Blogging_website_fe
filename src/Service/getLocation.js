import { useLocation } from "react-router-dom";
export default getLocation = () => {
    const location = useLocation(); 
    return location.pathname 
}