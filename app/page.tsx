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
    <div className="flex flex-1 flex-col bg-[#170903]">
      <section className="relative isolate flex min-h-[calc(100dvh-3.5rem)] items-end overflow-hidden">
        <Image
          src="/images/hero-band.jpg"
          alt="Músico cantando no palco com a banda ao fundo durante um show"
          fill
          priority
          // O hero é mais alto que largo no celular; com object-cover a imagem
          // precisa de ~3x a largura da viewport para não ser ampliada.
          sizes="(max-width: 640px) 200vw, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#170903] via-[#170903]/70 to-[#170903]/20" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#170903]/90 via-[#170903]/35 to-transparent sm:block" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-10 pt-24 sm:px-8 sm:py-20">
          <Link href="/" className="mb-6 flex w-fit items-center" aria-label="MyPlayApp">
            <Image
              src="/logo.png"
              alt="MyPlayApp"
              width={200}
              height={200}
              priority
              className="h-12 w-auto sm:h-16"
            />
          </Link>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-700/50 bg-orange-950/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-orange-300 backdrop-blur-sm">
            <SparklesIcon className="h-3.5 w-3.5" />
            Para músicos
          </span>

          <h1 className="mt-4 max-w-2xl text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
            Seus repertórios <span className="text-orange-400">prontos para o palco</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-lg">
            Monte blocos, guarde tom, BPM e letra de cada música e compartilhe um link com a banda.
          </p>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-green-600 px-6 text-base font-semibold text-white shadow-lg shadow-green-950/40 transition-colors hover:bg-green-500 active:scale-[0.99] sm:h-11 sm:text-sm"
            >
              Entrar com Google
            </Link>
            <span className="text-center text-xs text-white/60 sm:text-left">
              Grátis. Sem senha, sem cadastro.
            </span>
          </div>

          <p className="mt-8 text-[10px] leading-relaxed text-white/35">
            Foto:{' '}
            <a
              href="https://commons.wikimedia.org/wiki/File:Music_band_performs_on_stage_during_a_live_concert.jpg"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-white/60"
            >
              Shixart1985
            </a>{' '}
            · CC BY 2.0
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-12 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
        <ul className="grid gap-2 sm:grid-cols-3 sm:gap-4">
          {features.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="flex items-start gap-3 rounded-xl border border-orange-900/40 bg-surface p-4 sm:flex-col sm:gap-2 sm:p-5"
            >
              <Icon className="h-6 w-6 shrink-0 text-orange-400" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white sm:text-base">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-white/50 sm:mt-1 sm:text-sm">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
