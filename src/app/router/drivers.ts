import { RouteRecordRaw } from 'vue-router';
import { findToken } from "@/core/helpers/auth-helper";
import DriverMainRouter from "@/components/driver/DriverMainRouter.vue";
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
			const currentRole = getRole();
			const urlRole = to.meta.role as string;
			const roleIsAllowed = currentRole.includes(urlRole);

			if (!roleIsAllowed) return { path: '/not-allowed' };

			return true;
		},
		component: DriverMainRouter,
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
