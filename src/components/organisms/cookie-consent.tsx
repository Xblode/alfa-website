"use client";

import { useCallback, useEffect, useState } from "react";
import { CookieBadge } from "@/components/organisms/cookie-badge";
import { CookieDialog } from "@/components/organisms/cookie-dialog";
import {
  allConsent,
  defaultConsent,
  readConsent,
  writeConsent,
  type CookieConsentState,
  type OptionalCategoryId,
} from "@/lib/cookie-consent";

export function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState>(defaultConsent);
  const [saved, setSaved] = useState<CookieConsentState | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = readConsent();
      if (stored) {
        setConsent(stored);
        setSaved(stored);
      }
      setOpen(stored === null);
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const dismiss = useCallback(() => {
    setOpen(false);
    setDetails(false);
    window.setTimeout(() => {
      document.getElementById("cookie-badge")?.focus();
    }, 0);
  }, []);

  const close = useCallback(
    (next: CookieConsentState) => {
      writeConsent(next);
      setConsent(next);
      setSaved(next);
      dismiss();
    },
    [dismiss],
  );

  if (!ready) return null;

  if (!open) {
    return (
      <CookieBadge
        onOpen={() => {
          setDetails(true);
          setOpen(true);
        }}
      />
    );
  }

  return (
    <CookieDialog
      consent={consent}
      details={details}
      onToggleDetails={() => setDetails((current) => !current)}
      onToggleCategory={(id: OptionalCategoryId) =>
        setConsent((current) => ({ ...current, [id]: !current[id] }))
      }
      onAcceptAll={() => close(allConsent)}
      onRejectAll={() => close(defaultConsent)}
      onSave={() => close(consent)}
      onClose={() => {
        if (saved) {
          setConsent(saved);
          dismiss();
          return;
        }
        close(defaultConsent);
      }}
    />
  );
}
