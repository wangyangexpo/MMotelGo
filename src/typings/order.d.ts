/** 订单 */
declare namespace ORDER {
  interface OrderData {
    checkinTime?: string;
    checkinType?: number;
    checkoutTime?: string;
    customer?: string;
    needPayAmount?: number;
    orderId?: string;
    origin?: string;
    phone?: string;
    remark?: string;
    roomId?: string;
    serviceId?: string;
    status?: number;
    totalAmount?: number;
  }
}
