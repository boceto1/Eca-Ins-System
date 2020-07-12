import { createNewLoginToken, checkLoginJwt } from './jwt';
import { ObjectId } from 'bson';

describe('*createNewToken', () => {
    it('should return a token string', () => {
        const res = createNewLoginToken({
            id: new ObjectId('5d30ed75e16ddd116881b81f'),
            name: 'foo-user',
            type: 'student'
        });
        expect(res).toBeDefined();
    });
});

describe('*checkJwt', () => {
    describe('when the token is correct', () => {
        it('should return an object data', () => {
            const token = createNewLoginToken({
                id: new ObjectId('5d30ed75e16ddd116881b81f'),
                name: 'foo-user',
                type: 'student'
            });

            const res = checkLoginJwt(token);

            expect(res).toHaveProperty('id');
            expect(res).toHaveProperty('name');
            expect(res).toHaveProperty('type');

        });
    });
    describe('when the token is invalid', () => {
        it('should return INVALID', () => {
            const token = 'Invalid-token';
            const res = checkLoginJwt(token);
            expect(res).toBe('INVALID');

        });
    });
    describe('when the token is expired', () => {
        it('should return EXPIRED', () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMzBlZDc1ZTE2ZGRkMTE2ODgxYjgxZiIsIm5hbWUiOiJmb28tdXNlciIsInR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNTg3NjkwOTA5LCJleHAiOjE1ODc2OTA5MTB9.U9Wm5INCIsO468hnLChFrU2HB4cBDWFzpxQ7o9P-cNw';
            const res = checkLoginJwt(token);
            expect(res).toBe('EXPIRED');
        });
    });
})
