// Gerador de BR Code (Pix estático). Especificação: Manual do BR Code do Banco Central.

export const PIX_KEY = '33019320000142';
export const PIX_CNPJ_LABEL = '33.019.320/0001-42';

// Nome e cidade aparecem no app de quem paga. O titular do CNPJ é uma pessoa
// física, então usamos o nome do projeto em vez do nome civil.
const MERCHANT_NAME = 'MYPLAYAPP';
const MERCHANT_CITY = 'CACHOEIRINHA';

function tlv(id: string, value: string): string {
  return `${id}${String(value.length).padStart(2, '0')}${value}`;
}

export function crc16(payload: string): string {
  let crc = 0xffff;

  for (const byte of new TextEncoder().encode(payload)) {
    crc ^= byte << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function buildPixPayload(key = PIX_KEY): string {
  const merchantAccount = tlv('00', 'br.gov.bcb.pix') + tlv('01', key);

  const payload = [
    tlv('00', '01'),
    tlv('26', merchantAccount),
    tlv('52', '0000'),
    tlv('53', '986'),
    tlv('58', 'BR'),
    tlv('59', MERCHANT_NAME),
    tlv('60', MERCHANT_CITY),
    tlv('62', tlv('05', '***')),
    '6304',
  ].join('');

  return payload + crc16(payload);
}
