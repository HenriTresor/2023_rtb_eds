import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import SafePageProvider from "../providers/safe-page";

export const routes = [
    {
        path: '/login',
        component: <LoginPage />
    },
    {
        path: "/signup",
        component: <SignupPage />
    },
    {
        path: "/",
        component: (
            <SafePageProvider>
                <HomePage />
            </SafePageProvider>
        )
    },
    {
        path: "*",
        component: <h1>page not found</h1>
    }
]