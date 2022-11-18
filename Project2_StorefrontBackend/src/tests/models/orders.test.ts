import { OrdersModel, Order, StatusOrder } from '../../models/orders';
import { User, UsersModel } from '../../models/users';

const orderModel = new OrdersModel();
const userModel = new UsersModel();

describe('Order model', () => {
    const order: Order = {
        id: 1,
        status: StatusOrder.ACTIVE,
        user_id: 1,
    };

    let createdOrder: Order;
    let createdUser: User;
    beforeAll(async () => {
        const user: User = {
            id: 1,
            username: 'test',
            firstname: 'quan',
            lastname: 'tran',
            password: 'zxcv1234',
        };
        createdUser = await userModel.create(user)
        order.user_id = createdUser.id!
        createdOrder = await orderModel.create(order);
    });

    afterAll(async () => {
        userModel.deleteUser(1)
        orderModel.deleteOrder(createdOrder.id!);
    });

    it('should have create method', () => {
        expect(orderModel.create).toBeDefined();
    });

    it('should have get method', () => {
        expect(orderModel.getOrdersByUserId).toBeDefined();
    });

    it('should have delete method', () => {
        expect(orderModel.deleteOrder).toBeDefined();
    });

    it('should have update method', () => {
        expect(orderModel.updateOrderStatus).toBeDefined();
    });

    it('test create method', async () => {
        expect(JSON.stringify({
            status: createdOrder.status,
            userId: createdOrder.user_id
        })).toEqual(JSON.stringify({
            status: order.status,
            userId: order.user_id
        }));
    });

    it('test get order by user id method', async () => {
        const orderList = await orderModel.getOrdersByUserId(
            createdUser.id!,
            StatusOrder.ACTIVE
        );

        expect(orderList.length).toBeGreaterThan(0)
    });

    it('test update method', async () => {
        const updatedOrder = await orderModel.updateOrderStatus(
            createdOrder.id!,
            StatusOrder.COMPLETED
        );
        expect(StatusOrder.COMPLETED).toEqual(updatedOrder.status);
    });

    it('test delete method', async () => {
        const testOrder = await orderModel.create(order);
        await orderModel.deleteOrder(testOrder.id!);
        const orderList = await orderModel.getOrdersByUserId(
            createdOrder.id!,
            StatusOrder.ACTIVE
        );
        let isDeleted = true;
        orderList.forEach((order) => {
            if (JSON.stringify(order) === JSON.stringify(testOrder)) {
                isDeleted = false;
            }
        });
        expect(isDeleted).toBeFalse;
    });
});
