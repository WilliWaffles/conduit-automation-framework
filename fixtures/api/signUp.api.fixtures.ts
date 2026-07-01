import { test as base } from "@playwright/test";
import { createUser, UserPlusToken } from "../../utils/userFactory";

export const test = base.extend<{ registeredUser: UserPlusToken }>({
    // registeredUser: object containing unique username, email and password
    // uniqueness guaranteed by Date.now() in userFactory
    registeredUser: async ({ request }, use) => {
        // createUser() must be called inside the fixture to avoid 
        // shared state between parallel tests
        const userData = createUser();
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
        const userDataPlusToken = { ...userData, token: responseJson.user.token}

        await use(userDataPlusToken);
    },
})