import { OrderItemProps } from "@/utils/orderDetail.type";


export function calculateTotalOrder(order:OrderItemProps[]) {
    return order.reduce((total, item)=> {
        const totalItem = parseFloat(item.product.price) * item.amount
        return total + totalItem
    }, 0)
}