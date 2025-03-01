export interface OrderItemProps {
    id: string
    amount: number
    productId: string
    orderId: string
    product: {
        id: string
        name: string
        price: string
        description: string
        banner: string
        categoryId: string
        created_at: string
        updated_at: string
    };
    order: {
        created_at: string
        updated_at: string
        id: string
        table: number
        status: boolean
        draft: boolean
        name: string | null
    }
}