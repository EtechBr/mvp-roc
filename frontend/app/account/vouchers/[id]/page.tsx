"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { QrCode, Copy, Check, MapPin, Calendar } from "@phosphor-icons/react";

interface VoucherPageProps {
  params: {
    id: string;
  };
}

// Dados mockados - será substituído por API
const userData = {
  name: "João Silva",
  cpf: "123.456.789-00",
};

function getVoucherData(voucherId: string) {
  return {
    restaurantName: `Restaurante Parceiro ${voucherId}`,
    city: "Porto Velho",
    discount: "20% OFF",
    expiresInDays: 90,
    used: false,
  };
}

export default function VoucherPage({ params }: VoucherPageProps) {
  const voucherId = params.id;
  const voucherCode = `ROC-${String(voucherId).padStart(4, "0")}`; // Formato ROC-0001, ROC-0002, etc.
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const voucherData = getVoucherData(voucherId);

  useEffect(() => {
    // Gerar QR Code apenas quando o voucher estiver ativo (para validação)
    if (isActive) {
      // QR Code contém CPF e código do voucher para validação
      const qrData = JSON.stringify({
        cpf: userData.cpf.replace(/\D/g, ""), // Apenas números
        voucherCode: voucherCode,
        voucherId: voucherId,
      });
      
      QRCode.toDataURL(qrData, {
        errorCorrectionLevel: "H",
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then((url) => {
          setQrDataUrl(url);
        })
        .catch((err) => {
          console.error("Erro ao gerar QR Code:", err);
        });
    }
  }, [isActive, voucherCode, voucherId]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseNow = () => {
    setIsActive(true);
    // Aqui seria feita a chamada à API para ativar o voucher para validação
    // Por enquanto apenas mostra o QR code e código
  };

  if (!isActive) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-light)] px-[var(--spacing-4)] py-[var(--spacing-5)]">
        <div className="mx-auto max-w-md space-y-[var(--spacing-4)]">
          <div className="rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] text-center shadow-soft">
            <p className="text-xs uppercase text-[var(--color-text-medium)]">Voucher</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              {voucherData.restaurantName}
            </h1>
            <div className="mt-4 space-y-2 text-sm text-[var(--color-text-medium)]">
              <div className="flex items-center justify-center gap-2">
                <MapPin size={16} weight="fill" />
                <span>{voucherData.city}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar size={16} weight="fill" />
                <span>Válido por {voucherData.expiresInDays} dias após a ativação</span>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-[var(--color-roc-primary-light)]/10 px-4 py-2">
              <span className="text-sm font-semibold text-[var(--color-roc-primary)]">
                {voucherData.discount}
              </span>
            </div>
            <p className="mt-6 text-sm text-[var(--color-text-medium)]">
              Ao chegar no restaurante, clique em usar agora para gerar o código de validação.
            </p>
            <button
              type="button"
              onClick={handleUseNow}
              className="mt-6 w-full rounded-lg bg-[var(--color-roc-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-roc-primary-dark)]"
            >
              Usar agora
            </button>
            <p className="mt-4 text-xs text-[var(--color-text-medium)]">
              Cada voucher pode ser utilizado uma única vez durante a campanha.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] px-[var(--spacing-4)] py-[var(--spacing-5)]">
      <div className="mx-auto max-w-md space-y-[var(--spacing-4)]">
        <div className="rounded-2xl bg-[var(--color-white)] p-[var(--spacing-4)] text-center shadow-soft">
          <div className="mb-4 flex items-center justify-center gap-2">
            <QrCode size={24} className="text-[var(--color-roc-primary)]" weight="fill" />
            <p className="text-xs uppercase text-[var(--color-text-medium)]">
              Código de validação
            </p>
          </div>

          <h1 className="mb-2 text-xl font-semibold tracking-tight">
            {voucherData.restaurantName}
          </h1>

          {/* Dados do usuário */}
          <div className="my-4 space-y-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-light)] p-4 text-left">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-medium)]">Nome completo</p>
              <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                {userData.name}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--color-text-medium)]">CPF</p>
              <p className="text-sm font-semibold text-[var(--color-text-dark)]">
                {userData.cpf}
              </p>
            </div>
          </div>

          {/* QR Code */}
          {qrDataUrl && (
            <div className="my-6 flex justify-center">
              <div className="rounded-xl border-4 border-[var(--color-border)] bg-[var(--color-white)] p-4">
                <img src={qrDataUrl} alt="QR Code" className="h-64 w-64" />
              </div>
            </div>
          )}

          {/* Código para digitação */}
          <div className="my-6 space-y-3">
            <p className="text-xs font-medium text-[var(--color-text-medium)]">Ou use o código:</p>
            <div className="flex items-center justify-center gap-2">
              <div className="rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-bg-light)] px-4 py-3">
                <span className="font-mono text-lg font-bold tracking-wider text-[var(--color-text-dark)]">
                  {voucherCode}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] p-3 hover:bg-[var(--color-bg-light)]"
                title="Copiar código"
              >
                {copied ? (
                  <Check size={20} className="text-[var(--color-roc-success)]" weight="fill" />
                ) : (
                  <Copy size={20} className="text-[var(--color-text-medium)]" weight="fill" />
                )}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-[var(--color-roc-success)]">Código copiado!</p>
            )}
          </div>

          <div className="mt-6 rounded-lg border border-[var(--color-roc-primary)] bg-[var(--color-roc-primary-light)]/10 p-4 text-left">
            <p className="mb-2 text-xs font-semibold text-[var(--color-text-dark)]">Instruções:</p>
            <ul className="space-y-1 text-xs text-[var(--color-text-medium)]">
              <li>• Apresente esta tela ao restaurante para validação</li>
              <li>• O restaurante escaneará o QR Code ou digitará seu CPF</li>
              <li>• Após a validação, o voucher será marcado como usado</li>
              <li>• Este voucher só pode ser usado uma vez</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setIsActive(false)}
            className="mt-6 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-white)] px-4 py-2 text-sm font-medium text-[var(--color-text-medium)] hover:bg-[var(--color-bg-light)]"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
