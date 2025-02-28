import Header from "./components/header";
import { OrderProvider } from "@/providers/order";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header/>
      <OrderProvider>
        {children}
      </OrderProvider>
    </>
  );
};

export default DashboardLayout;
