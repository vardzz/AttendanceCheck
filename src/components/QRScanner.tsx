"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Camera, CheckCircle, XCircle, Loader2 } from "lucide-react";

type ScanStatus = "idle" | "scanning" | "success" | "error";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

export default function QRScanner({ onScanSuccess }: QRScannerProps) {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const scannerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html5QrCodeRef = useRef<any>(null);
  const isMountedRef = useRef(true);

  const stopScanner = useCallback(async () => {
    if (html5QrCodeRef.current) {
      try {
        const state = html5QrCodeRef.current.getState();
        // Html5QrcodeScannerState: SCANNING = 2
        if (state === 2) {
          await html5QrCodeRef.current.stop();
        }
      } catch {
        // scanner may already be stopped
      }
      html5QrCodeRef.current = null;
    }
  }, []);

  const startScanner = useCallback(async () => {
    if (!scannerRef.current) return;

    setStatus("scanning");
    setErrorMessage("");

    try {
      const { Html5Qrcode } = await import("html5-qrcode");

      // Ensure the container element exists
      const containerId = "qr-reader";
      if (!document.getElementById(containerId)) return;

      const html5QrCode = new Html5Qrcode(containerId);
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
        },
        async (decodedText) => {
          // Stop immediately on successful scan
          await stopScanner();
          if (isMountedRef.current) {
            setStatus("success");
            onScanSuccess(decodedText);
          }
        },
        () => {
          // QR scan failure callback — ignore, scanner keeps trying
        }
      );
    } catch (err) {
      if (isMountedRef.current) {
        setStatus("error");
        setErrorMessage(
          err instanceof Error
            ? err.message.includes("Permission")
              ? "Camera permission denied. Please allow camera access and try again."
              : err.message
            : "Failed to start scanner."
        );
      }
    }
  }, [onScanSuccess, stopScanner]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      stopScanner();
    };
  }, [stopScanner]);

  const handleReset = async () => {
    await stopScanner();
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Scanner viewport */}
      <div
        className="relative w-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-800"
        style={{ minHeight: status === "scanning" ? 320 : 0 }}
      >
        <div id="qr-reader" ref={scannerRef} className="w-full" />
      </div>

      {/* Status feedback */}
      {status === "idle" && (
        <button
          onClick={startScanner}
          className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
                     bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold
                     shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
                     hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98]
                     transition-all duration-200 cursor-pointer"
        >
          <Camera className="w-5 h-5" />
          Open Camera &amp; Scan
        </button>
      )}

      {status === "success" && (
        <div className="mt-4 flex flex-col items-center gap-3 p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
          <CheckCircle className="w-10 h-10 text-emerald-400 animate-bounce" />
          <p className="text-emerald-300 font-semibold text-lg">QR Code Captured!</p>
          <button
            onClick={handleReset}
            className="mt-1 px-5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium
                       hover:bg-emerald-500 active:scale-[0.97] transition-all cursor-pointer"
          >
            Scan Another
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="mt-4 flex flex-col items-center gap-3 p-5 rounded-xl bg-red-950/40 border border-red-500/30">
          <XCircle className="w-10 h-10 text-red-400" />
          <p className="text-red-300 text-sm text-center">{errorMessage}</p>
          <button
            onClick={handleReset}
            className="mt-1 px-5 py-2 rounded-lg bg-red-600 text-white text-sm font-medium
                       hover:bg-red-500 active:scale-[0.97] transition-all cursor-pointer"
          >
            Try Again
          </button>
        </div>
      )}

      {status === "scanning" && (
        <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Scanning… point camera at QR code
        </div>
      )}
    </div>
  );
}
