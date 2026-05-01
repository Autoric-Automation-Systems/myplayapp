import { fetchDataUser } from '@/query/users/data';
import { auth } from './auth';

export async function CurrentUser() {
    const session = await auth();
    if (!session || !session?.user || !session.user.email) {
        return null;
    }
    const user = await fetchDataUser(session?.user?.email);
    return user;
}
