import type { SVGProps } from "react";

/**
 * Thin-line pictograms. Deliberately hairline (1.1px at 28px) so they read as
 * drawn marks rather than UI icons, matching the restraint of the type.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------- services */

export function FreightIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M3 22.5c1.6 1.4 3.2 1.4 4.8 0s3.2-1.4 4.8 0 3.2 1.4 4.8 0 3.2-1.4 4.8 0 3.2 1.4 4.8 0" />
      <path d="M5.5 18.5h21l-2.6 4H8.1z" />
      <path d="M10 18.5v-5.5h11v5.5" />
      <path d="M15.5 13V6.5" />
      <path d="M12.5 6.5h6" />
    </Base>
  );
}

export function SourcingIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M3.5 20.5v-5l2.5-5h10.5v10" />
      <path d="M16.5 15.5h6l4 3.5v1.5h-3" />
      <circle cx="9.5" cy="21.5" r="2.6" />
      <circle cx="21" cy="21.5" r="2.6" />
      <path d="M12.1 21.5h6.3" />
      <path d="M6.9 10.5v5h9.6" />
    </Base>
  );
}

export function ComplianceIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M16 3.5 26 7v8.2c0 5.4-3.9 10.2-10 13.3-6.1-3.1-10-7.9-10-13.3V7z" />
      <path d="m11.5 15.6 3.1 3.2 6-6.4" />
    </Base>
  );
}

/* ---------------------------------------------------------------- process */

export function MeetingIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 8.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-5.6L7 20v-3.5H6a2 2 0 0 1-2-2z" />
      <path d="M13 20.2a2 2 0 0 0 2 2h4.8L24 26v-3.8h1a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-5" />
      <path d="M8 11.5h6.5" />
    </Base>
  );
}

export function VerifyIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M16 3.6c1.1 1.5 2.9 1.9 4.6 1.1 1 1.6 2.8 2.1 4.5 1.4.3 1.9 1.7 3.1 3.4 3.2-.5 1.8.3 3.5 1.9 4.3-1.2 1.5-1.2 3.4 0 4.8-1.6.8-2.4 2.5-1.9 4.3-1.7.1-3.1 1.3-3.4 3.2-1.7-.7-3.5-.2-4.5 1.4-1.7-.8-3.5-.4-4.6 1.1" />
      <path d="M16 3.6c-1.1 1.5-2.9 1.9-4.6 1.1-1 1.6-2.8 2.1-4.5 1.4-.3 1.9-1.7 3.1-3.4 3.2.5 1.8-.3 3.5-1.9 4.3 1.2 1.5 1.2 3.4 0 4.8 1.6.8 2.4 2.5 1.9 4.3 1.7.1 3.1 1.3 3.4 3.2 1.7-.7 3.5-.2 4.5 1.4 1.7-.8 3.5-.4 4.6 1.1" />
      <path d="m11.8 16.1 2.9 3 5.5-5.9" />
    </Base>
  );
}

export function QuoteIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M6 4.5h14l6 6v17H6z" />
      <path d="M20 4.5v6h6" />
      <path d="M10.5 16.5h11" />
      <path d="M10.5 20.5h7" />
      <path d="M10.5 12.5h4" />
    </Base>
  );
}

export function ContractIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M5.5 6.5h21v14h-21z" />
      <path d="M5.5 11.5h21" />
      <path d="M9.5 16.2h5" />
      <path d="M3.5 25.5c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0 4 1.6 6 0" />
      <path d="M20.5 16.2h2.4" />
    </Base>
  );
}

export function ShipIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 21.5c1.7 1.5 3.4 1.5 5.1 0s3.4-1.5 5.1 0 3.4 1.5 5.1 0 3.4-1.5 5.1 0 2.1 1 3.6 0" />
      <path d="M6.5 17.5 8 12h16l1.5 5.5" />
      <path d="M12 12V7.5h8V12" />
      <path d="M16 7.5v-4" />
    </Base>
  );
}

export function HandoverIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 13.5 16 7l12 6.5-12 6.5z" />
      <path d="M4 13.5v8L16 28l12-6.5v-8" />
      <path d="M16 20v8" />
    </Base>
  );
}

/* ---------------------------------------------------------------- sectors */

export function CarIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 20v-4.2l2.6-5.6a2 2 0 0 1 1.8-1.2h15.2a2 2 0 0 1 1.8 1.2L28 15.8V20" />
      <path d="M4 20h24" />
      <circle cx="9.5" cy="20.5" r="2.8" />
      <circle cx="22.5" cy="20.5" r="2.8" />
      <path d="M6.6 15.8h18.8" />
    </Base>
  );
}

export function ExcavatorIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M3 23.5h20" />
      <circle cx="7" cy="23.5" r="3" />
      <circle cx="17" cy="23.5" r="3" />
      <path d="M6 20.5v-5h10v5" />
      <path d="M13 15.5 20 7l6 5-3.5 5" />
      <path d="M22.5 17.5h6v4h-6z" />
    </Base>
  );
}

export function BoatIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 22c1.7 1.5 3.4 1.5 5.1 0s3.4-1.5 5.1 0 3.4 1.5 5.1 0 3.4-1.5 5.1 0 2.1 1 3.6 0" />
      <path d="m6 18 2-5h16l-3 5z" />
      <path d="M14.5 13V4l8 9" />
    </Base>
  );
}

export function TractorIcon(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="9" cy="21" r="5.5" />
      <circle cx="23" cy="22.5" r="4" />
      <path d="M5 14.5h8l1.5-6h5v10" />
      <path d="M14.5 21h4.5" />
      <path d="M19.5 14.5h5v4" />
    </Base>
  );
}

export function DrumIcon(p: IconProps) {
  return (
    <Base {...p}>
      <ellipse cx="16" cy="7.5" rx="7.5" ry="3" />
      <path d="M8.5 7.5v17c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-17" />
      <path d="M8.5 13.5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
      <path d="M8.5 19.5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </Base>
  );
}

export function PlaneIcon(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M14.5 4.5a1.6 1.6 0 0 1 3 0v7.9l10 5.6v2.6l-10-3v5.3l3 2.3v2.3l-4.5-1.4-4.5 1.4v-2.3l3-2.3v-5.3l-10 3V18l10-5.6z" />
    </Base>
  );
}

/* ---------------------------------------------------------------- mapping */

export const serviceIcons = {
  freight: FreightIcon,
  sourcing: SourcingIcon,
  compliance: ComplianceIcon,
} as const;

export const processIcons = {
  meeting: MeetingIcon,
  verify: VerifyIcon,
  quote: QuoteIcon,
  contract: ContractIcon,
  freight: ShipIcon,
  handover: HandoverIcon,
} as const;

export const sectorIcons = {
  car: CarIcon,
  excavator: ExcavatorIcon,
  boat: BoatIcon,
  tractor: TractorIcon,
  drum: DrumIcon,
  plane: PlaneIcon,
} as const;

/* ---------------------------------------------------------------- chrome */

export function ChevronLeft(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M14.5 6 9 12l5.5 6" />
    </svg>
  );
}

export function ChevronRight(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M9.5 6 15 12l-5.5 6" />
    </svg>
  );
}

export function StarIcon({ filled = true, ...p }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" {...p}>
      <path d="m12 3.6 2.65 5.37 5.93.86-4.29 4.18 1.01 5.9L12 17.13l-5.3 2.78 1.01-5.9-4.29-4.18 5.93-.86z" />
    </svg>
  );
}
