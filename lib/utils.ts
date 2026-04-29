import { fetchDataUser } from '@/query/users/data';
import { auth } from './auth';

export async function CurrentUser() {
    const session = await auth();
    if (!session || !session?.user || !session.user.email) {
        throw new Error('User session is not available.');
    }
    const user = await fetchDataUser(session?.user?.email);
    return user;
}
