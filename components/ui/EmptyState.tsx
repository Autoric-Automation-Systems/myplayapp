import type { ComponentType, SVGProps } from 'react';

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center sm:py-20">
      <Icon className="h-10 w-10 text-orange-400/80 sm:h-12 sm:w-12" />
      <p className="mt-3 text-sm font-medium text-white sm:mt-2 sm:text-lg">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-white/50 sm:mt-2 sm:text-sm">
          {description}
        </p>
      )}
    </div>
  );
}
