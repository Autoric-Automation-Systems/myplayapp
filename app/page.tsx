import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowsRightLeftIcon,
  MusicalNoteIcon,
  ShareIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: MusicalNoteIcon,
    title: 'Repertório e blocos',
    description: 'Divida o show em blocos e ordene as músicas na sequência que vai tocar.',
  },
  {
    icon: ArrowsRightLeftIcon,
    title: 'Tom, BPM e letra',
    description: 'Tonalidade, andamento e letra de cada música guardados no mesmo lugar.',
  },
  {
    icon: ShareIcon,
    title: 'Compartilhe o link',
    description: 'Deixe o repertório público e envie um link para a banda visualizar.',
  },
];

export default function LandPage() {
  return (
    <div className="relative isolate flex min-h-[calc(100dvh-7rem)] flex-1 flex-col overflow-hidden">
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#170903]/70 via-[#170903]/85 to-[#170903]" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-16">
        <Link href="/" className="mb-8 flex w-fit items-center" aria-label="MyPlayApp">
          <Image
            src="/logo.png"
            alt="MyPlayApp"
            width={200}
            height={200}
            priority
            className="h-12 w-auto sm:h-16"
          />
        </Link>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-800/50 bg-orange-950/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-orange-300">
          <SparklesIcon className="h-3.5 w-3.5" />
          Para músicos
        </span>

        <h1 className="mt-4 max-w-2xl text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
          Seus repertórios <span className="text-orange-400">prontos para o palco</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-lg">
          Monte blocos, guarde tom, BPM e letra de cada música e compartilhe um link com a banda.
        </p>

        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-green-600 px-6 text-base font-semibold text-white shadow-lg shadow-green-950/40 transition-colors hover:bg-green-500 active:scale-[0.99] sm:h-11 sm:text-sm"
          >
            Entrar com Google
          </Link>
          <span className="text-center text-xs text-white/55 sm:text-left">
            Grátis. Sem senha, sem cadastro.
          </span>
        </div>

        <ul className="mt-10 grid gap-2 sm:mt-14 sm:grid-cols-3 sm:gap-3">
          {features.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3 backdrop-blur-sm sm:flex-col sm:gap-2 sm:p-4"
            >
              <Icon className="h-6 w-6 shrink-0 text-orange-400" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/50 sm:text-sm">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
