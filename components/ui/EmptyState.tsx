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
    <div className="flex flex-col items-center justify-center py-16 text-center sm:py-20">
      <Icon className="h-12 w-12 text-orange-400" />
      <p className="text-base font-medium sm:text-lg">{title}</p>
      {description && <p className="mt-1 text-xs sm:mt-2 sm:text-sm">{description}</p>}
    </div>
  );
}
