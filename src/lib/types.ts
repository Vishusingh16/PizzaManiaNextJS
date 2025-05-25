export type OrderStatus = "pending" | "preparing" | "out-for-delivery" | "delivered" | "cancelled"

export interface PizzaOrder {
  orderId: string
  customerName: string
  pizzaType: string
  quantity: number
  orderDate: string
  status: OrderStatus
}
