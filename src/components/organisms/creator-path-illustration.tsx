/**
 * Illustration provisoire (feuille de questions, coche et flèche).
 * À remplacer par une vraie illustration : garder ce composant et son nom.
 */
export function CreatorPathIllustration() {
  return (
    <svg
      viewBox="0 0 200 160"
      aria-hidden="true"
      focusable="false"
      className="mx-auto mb-6 h-auto w-44 sm:w-48"
    >
      <circle cx="100" cy="80" r="70" fill="#00A696" fillOpacity="0.12" />
      <rect x="52" y="22" width="96" height="116" rx="10" fill="#fff" stroke="#282828" strokeWidth="3" />
      <rect x="82" y="14" width="36" height="16" rx="6" fill="#282828" />
      <path d="M64 56l6 6 11-12" fill="none" stroke="#00A696" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="92" y="53" width="44" height="6" rx="3" fill="#282828" fillOpacity="0.55" />
      <circle cx="70" cy="86" r="7" fill="none" stroke="#282828" strokeWidth="3" />
      <rect x="92" y="83" width="36" height="6" rx="3" fill="#282828" fillOpacity="0.55" />
      <circle cx="70" cy="114" r="7" fill="none" stroke="#282828" strokeWidth="3" />
      <rect x="92" y="111" width="30" height="6" rx="3" fill="#282828" fillOpacity="0.55" />
      <path d="M150 128c14-4 24-14 28-30" fill="none" stroke="#00A696" strokeWidth="5" strokeLinecap="round" />
      <path d="M168 102l10-6 4 12" fill="none" stroke="#00A696" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
