import Header from '@/components/layout/Header';
import { requireUser } from '@/server/session';

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireUser();

  return (
    <>
      <Header />
      {children}
    </>
  );
}
