import { User, UsersModel } from '../../models/users';

const userModel = new UsersModel();
let createdUser: User;
describe('User model', () => {
    const user: User = {
        id: 1,
        username: 'test',
        firstname: 'quan',
        lastname: 'tran',
        password: 'zxcv1234',
    };

    beforeAll(async () => {
        createdUser = await userModel.create(user);
    })

    afterAll(async () => {
        await userModel.deleteUser(user.id!);
    })

    it('should have index method', () => {
        expect(userModel.index).toBeDefined();
    });

    it('should have create method', () => {
        expect(userModel.create).toBeDefined();
    });

    it('should have delete method', () => {
        expect(userModel.deleteUser).toBeDefined();
    });

    it('should have authenticate method', () => {
        expect(userModel.authenticate).toBeDefined();
    });

    it('test create user', async () => {
        createdUser = await userModel.create(user);
        const { firstname, lastname, username } = createdUser

        expect(firstname).toEqual(user.firstname);
        expect(lastname).toEqual(user.lastname);
        expect(username).toEqual(user.username);
    });

    it('test index method', async () => {
        const userList = await userModel.index();
        expect(userList.length).toBeGreaterThan(0);
    });


    it('test authenticate method', async () => {
        const userAuth = await userModel.authenticate(
            user.username,
            user.password
        );
        expect(userAuth).not.toBeNull;
    });

    it('test delete method', async () => {
        const deleteUserTest = await userModel.create(user);
        await userModel.deleteUser(deleteUserTest.id!);
        const userList = await userModel.index();
        const isDeleted = userList.includes(deleteUserTest);
        expect(isDeleted).toBeFalse;
    });
});
