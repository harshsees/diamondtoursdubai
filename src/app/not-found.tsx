import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[100svh] flex-col items-center justify-center text-center">
      <p className="eyebrow">error 404</p>
      <h1 className="display-2 mt-4 text-ink">this page isn&apos;t on the manifest</h1>
      <p className="lede mt-5 max-w-[28rem] text-balance">
        The address you followed doesn&apos;t exist here. Everything else is one click away.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex items-center gap-2 rounded-[10px] bg-ink px-5 py-[0.6875rem] text-[0.8125rem] font-medium leading-none text-[#080808] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:bg-white"
      >
        back to the homepage
      </Link>
    </div>
  );
}
