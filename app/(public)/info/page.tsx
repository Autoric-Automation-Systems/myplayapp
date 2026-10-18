import MessageBoundary from '@/components/ui/MessageBoundary';

export default function Page() {
  return (
    <div className="flex min-h-[calc(100dvh-9rem)] items-center justify-center bg-gradient-to-b from-surface-deep to-[#1a0a02] p-4 text-white">
      <div className="w-full max-w-2xl">
        <MessageBoundary />
      </div>
    </div>
  );
}
