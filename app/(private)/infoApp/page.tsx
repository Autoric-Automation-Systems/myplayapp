import InfoCard from './InfoCard';
import PixCard from '@/components/pix/PixCard';

export default function InfoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-3 sm:p-6">
      <InfoCard />
      <PixCard />
    </div>
  );
}
