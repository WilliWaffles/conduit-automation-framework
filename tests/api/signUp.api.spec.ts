import { expect } from '@playwright/test';
import { createUser, type User } from '../../utils/userFactory';
import { test } from '../../fixtures/api.fixtures';

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

test('User creation request fails due missing password', async ({ request }) => {
    const userData: User = createUser();
    const response = await request.post('https://api.realworld.show/api/users', {
        data: {
            user: {
            username: userData.username,
            email: userData.email,
            }
        }
    })

    expect(response.status()).toBe(422);
})