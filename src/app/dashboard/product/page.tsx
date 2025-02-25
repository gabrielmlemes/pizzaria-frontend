import { api } from "@/lib/api";
import getCookiesServer from "@/lib/cookieServer";
import ProductForm from "./_components/form";

const Product = async () => {
    const token = await getCookiesServer()

    const response = await api.get('/category', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return ( 
        <div className="px-4">
            <ProductForm categories={response.data}/>
        </div>
     );
}
 
export default Product;