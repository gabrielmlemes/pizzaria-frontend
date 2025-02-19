import { cookies } from "next/headers";

const getCookiesServer = async () => {
        const cookiesStore = await cookies()
        const token =  cookiesStore.get("session")?.value

        return token || null
}
 
export default getCookiesServer;