import QRCode from 'qrcode';
import { buildPixPayload, PIX_CNPJ_LABEL } from '@/lib/pix';
import CopyPixButton from './CopyPixButton';

// O payload é fixo: gerar o SVG uma vez por processo evita recomputar a matriz do QR
// a cada request (a tela Sobre é dinâmica por causa da sessão).
let qrCodePromise: Promise<string> | null = null;

function getQrCode(payload: string) {
  qrCodePromise ??= QRCode.toString(payload, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    width: 220,
  });

  return qrCodePromise;
}

export default async function PixCard() {
  const payload = buildPixPayload();
  const qrCode = await getQrCode(payload);

  return (
    <section
      id="pix"
      className="rounded-2xl border border-orange-900/50 bg-gradient-to-br from-surface to-surface-deep p-5 sm:p-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wider text-orange-400/80 sm:text-xs">
            Apoie o projeto
          </p>
          <h2 className="mt-2 text-xl font-bold leading-tight text-white sm:text-2xl">
            Já que é de graça, paga um café ☕
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Sem assinatura, sem anúncio, sem plano premium. Se o MyPlayApp te ajuda no palco, um
            café mantém o servidor de pé e o projeto evoluindo.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CopyPixButton payload={payload} />
            <p className="text-xs text-white/45">
              Pix CNPJ <span className="text-white/70">{PIX_CNPJ_LABEL}</span>
            </p>
          </div>
        </div>

        <div className="mx-auto shrink-0 sm:mx-0">
          <div
            className="h-44 w-44 rounded-xl bg-white p-3 [&>svg]:h-full [&>svg]:w-full"
            role="img"
            aria-label="QR Code para doação via Pix"
            dangerouslySetInnerHTML={{ __html: qrCode }}
          />
          <p className="mt-2 w-44 text-center text-[11px] leading-snug text-white/40">
            Aponte a câmera do seu banco
          </p>
        </div>
      </div>
    </section>
  );
}
