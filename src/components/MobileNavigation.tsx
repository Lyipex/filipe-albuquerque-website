"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#metodo", label: "Método" },
  { href: "#processo", label: "Processo" },
  { href: "#duvidas", label: "Dúvidas" },
];

export default function MobileNavigation() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const restoreScrollRef = useRef<(() => void) | null>(null);
  const [open, setOpen] = useState(false);

  function unlockScroll() {
    restoreScrollRef.current?.();
    restoreScrollRef.current = null;
  }

  function closeMenu() {
    dialogRef.current?.close();
    // Restore before the anchor's default navigation so its destination is kept.
    unlockScroll();
    setOpen(false);
  }

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    const body = document.body;
    const { overflow, position, top, width } = body.style;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    restoreScrollRef.current = () => {
      Object.assign(body.style, { overflow, position, top, width });
      window.scrollTo({ top: scrollY, left: scrollX, behavior: "instant" });
    };
    Object.assign(body.style, {
      overflow: "hidden",
      position: "fixed",
      top: `-${scrollY}px`,
      width: "100%",
    });

    dialog.showModal();
    setOpen(true);
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => {
      if (desktop.matches) dialogRef.current?.close();
    };
    desktop.addEventListener("change", handleResize);
    return () => {
      desktop.removeEventListener("change", handleResize);
      restoreScrollRef.current?.();
    };
  }, []);

  return (
    <div className="ml-4 lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={openMenu}
        className="min-h-11 min-w-11 cursor-pointer border-b border-ink text-sm font-medium text-ink"
      >
        Menu
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-labelledby="mobile-navigation-title"
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-paper p-6 text-ink sm:p-10 lg:hidden"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href]',
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          unlockScroll();
          setOpen(false);
          triggerRef.current?.focus({ preventScroll: true });
        }}
      >
        <div className="mx-auto max-w-editorial">
          <div className="flex items-center justify-between gap-6">
            <h2 id="mobile-navigation-title" className="text-sm font-medium text-ink/60">
              Navegação
            </h2>
            <button
              type="button"
              onClick={closeMenu}
              className="min-h-11 cursor-pointer px-2 text-sm font-medium"
            >
              Fechar <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav aria-label="Navegação mobile" className="mt-8">
            <ul className="border-t border-ink/15">
              {links.map((link) => (
                <li key={link.href} className="border-b border-ink/15">
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-3 text-2xl font-medium tracking-[-0.025em] hover:text-moss"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contato"
              onClick={closeMenu}
              className="mt-8 inline-flex min-h-11 items-center gap-2 border-b border-moss text-base font-semibold text-moss"
            >
              Vamos conversar <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </dialog>
    </div>
  );
}
