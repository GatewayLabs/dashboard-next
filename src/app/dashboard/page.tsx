import { redirect, RedirectType } from 'next/navigation';

import routes from '@/constants/routes';

export default function DashboardHome() {
  redirect(routes.dashboard.storage, RedirectType.replace);
}
