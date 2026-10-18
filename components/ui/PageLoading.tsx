export default function PageLoading({ label = 'Carregando…' }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50dvh] w-full items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl animate-pulse space-y-3">
        <div className="h-7 w-2/3 rounded-lg bg-white/10" />
        <div className="h-4 w-1/3 rounded bg-white/[0.07]" />
        <div className="mt-6 space-y-2">
          <div className="h-16 rounded-xl border border-white/5 bg-white/[0.04]" />
          <div className="h-16 rounded-xl border border-white/5 bg-white/[0.04]" />
          <div className="h-16 rounded-xl border border-white/5 bg-white/[0.04]" />
        </div>
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}
