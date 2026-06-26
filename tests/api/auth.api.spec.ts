import { test, expect } from '@playwright/test';
import { createUser, type User } from '../../utils/userFactory';

test('User creation request successful', async ({ request }) => {
    const userData: User = createUser();
    const response = await request.post('https://api.realworld.show/api/users', {
        data: {
            user: {
            username: userData.username,
            email: userData.email,
            password: userData.password
            }
        }
    })
    const responseJson = await response.json();

    expect(response.status()).toBe(201);    
    expect(responseJson).toHaveProperty('user');
    expect(responseJson.user).toHaveProperty('token');
});

test('User registered can login successfully', async ({ request }) => {
    const userData: User = createUser();
    request.post('https://api.realworld.show/api/users', {
        data: {
            user:{
                username: userData.username,
                email: userData.email,
                password: userData.password
            }
        }
    })

    const loginResponse = await request.post('https://api.realworld.show/api/users/login', {
        data: {
            user: {
                email: userData.email,
                password: userData.password
            }
        }
    })
    const loginResponseJson = await loginResponse.json();

    expect(loginResponse.status()).toBe(200);
    expect(loginResponseJson).toHaveProperty('user');
    expect(loginResponseJson.user).toHaveProperty('token');
})