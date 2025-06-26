const { AppDataSource } = require("../config/data-source");
const { OrderManagement } =  require("../../dist/entities/order.entity");
const { CustomerCancellation } = require("../../dist/entities/customerCancellation.entity");
const { CancelReason } = require("../../dist/entities/cancelReason.entity");

module.exports.getOrderDetailsById = async (orderId) => {
     console.log(" DB Before order:", orderId);
     try{
    const orderRepo = AppDataSource.getRepository(OrderManagement);
    const order = await orderRepo.findOne({
        where: { id: orderId },
        select: ['id', 'custID', 'status', 'amount'],
        relations: ['cancellation'],
    });
    console.log(" DB returned order:", order);
    return order;
} catch (error) {
    console.error("Error fetching order:", error);
    throw error;    
}
};

module.exports.createNewOrder = async () => {
    try {
        const orderRepo = AppDataSource.getRepository(OrderManagement);
        console.log(" DB Before orders", orderRepo);
        const orders = await orderRepo
        .createQueryBuilder('orders')
        .leftJoinAndSelect('orders.cancellation', 'cancellation')
        .leftJoinAndSelect('cancellation.cancelReason', 'cancelReason')
        .select([
            'orders.id',
            'orders.custID',
            'orders.status',
            'orders.amount',
            'orders.createdAt',
            'cancellation.id',
            'cancellation.createdAt',
            'cancelReason.id',
            'cancelReason.cancelReason',
        ])
        .getMany();
        console.log(" DB returned orders:", orders);
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

module.exports.createNewOrder = async (orderItem) => {
    try {
        const dateTime = new Date();
        const orderDetails = {...orderItem, dateTime: dateTime.toISOString() };
        const orderRepo = await AppDataSource.getRepository(OrderManagement).save(orderDetails);
        return orderRepo;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

module.exports.updateOrder = async (orderId, status) => {
    try {
        const orderUpdated = await AppDataSource.getRepository(OrderManagement).update({
            id: orderId
        }, {
            status: status
        });
        return orderUpdated;
    }catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
};

module.exports.cancelOrder = async (orderId, reasonId) => {
    try {
        const dateTime = new Date();      
        const orderUpdated = await AppDataSource.getRepository(OrderManagement).update({
            id: orderId
        }, {
            status: "Cancelled"
        });
        if(orderUpdated) {
            const cancellationDetails = {
                orderId: orderId,
                cancelId: reasonId,
                createdAt: dateTime.toISOString()
            };
            const cancellationRepo = await AppDataSource.getRepository(CustomerCancellation).save(cancellationDetails);
            console.log(" DB returned cancellation:", cancellationRepo);
            if(cancellationRepo) return true;
            else return false;
        }
        else return false;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};