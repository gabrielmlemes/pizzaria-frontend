import getCookiesServer from "@/lib/cookieServer";
import Orders from "./components/orders";
import { api } from "@/lib/api";
import { OrderProps } from "@/utils/orders.type";

async function getOrders(): Promise<OrderProps[] | []> {
  try {
    const token = await getCookiesServer();

    const response = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data || []
  } catch (error) {
    console.log(error);
    return [];
  }
}

const Dashboard = async () => {
  const orders = await getOrders()
  console.log(orders);
  

  return (
    <>
      <Orders orders={orders} />
    </>
  );
};

export default Dashboard;
