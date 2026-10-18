import AppHeader from '@/components/layout/AppHeader';
import { requireUser } from '@/server/session';

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireUser();

  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
