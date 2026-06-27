import { test as base } from "@playwright/test";
import { createUser, User } from "../utils/userFactory";

export const test = base.extend<{ registeredUser: User }>({
    // registeredUser: object containing unique username, email and password
    // uniqueness guaranteed by Date.now() in userFactory
    registeredUser: async ({ request }, use) => {
        // createUser() must be called inside the fixture to avoid 
        // shared state between parallel tests
        const registeredUser = createUser();
        await request.post('https://api.realworld.show/api/users', {
            data: {
                user: {
                username: registeredUser.username,
                email: registeredUser.email,
                password: registeredUser.password
                }
            }
        })

        await use(registeredUser);
    },
})