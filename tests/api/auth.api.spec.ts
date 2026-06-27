import { expect } from '@playwright/test';
import { test } from '../../fixtures/api.fixtures';

test('User registered can login successfully', async ({ request, registeredUser}) => {
    const loginResponse = await request.post('https://api.realworld.show/api/users/login', {
        data: {
            user: {
                email: registeredUser.email,
                password: registeredUser.password
            }
        }
    })
    const loginResponseJson = await loginResponse.json();

    expect(loginResponse.status()).toBe(200);
    expect(loginResponseJson).toHaveProperty('user');
    expect(loginResponseJson.user).toHaveProperty('token');
})