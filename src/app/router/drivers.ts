import { RouteRecordRaw } from 'vue-router';
import { findToken } from "@/core/guards/auth.guard";
import PassengerRouter from "@/components/passenger/PassengerRouter.vue";
import HomePage from '@/views/HomePage.vue';
import { Role } from "@/core/enums";
import { getRole } from "@/core/helpers/role-helper";

export const driverRoutes: Array<RouteRecordRaw> = [
    {
        path: '/driver',
        beforeEnter: (to) => {
            // reject the navigation
            // when no token is found
            if (!findToken()) {
                return { name: 'Login', query: { returnUrl: to.path } };
            }

            // when the role is invalid
            // TODO: Replace with real role
            const currentRole = 'driver';
            const urlRole = to.meta.role as string;
            const roleIsAllowed = currentRole.includes(urlRole);

            if (!roleIsAllowed) return { path: '/not-allowed' };

            return true;
        },
        component: PassengerRouter,
        children: [
            {
                path: 'home',
                name: 'Home',
                component: HomePage,
            }
        ],
        meta: { role: Role.driver }
    }
];