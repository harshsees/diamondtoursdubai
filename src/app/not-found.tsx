import Link from "next/link";

import { pageBanners } from "@/content/site";
import { PageHeader } from "@/components/PageHeader";
import { SkylineStrip } from "@/components/SkylineStrip";

export default function NotFound() {
  return (
    <>
      <PageHeader title="Page not found" image={pageBanners.legal.image} />
      <div className="container prose">
        <div className="row">
          <div className="col-lg-8">
            <h2 className="page-lede">This Page Isn&apos;t On The Manifest.</h2>
            <p className="mb-4">
              The address you followed doesn&apos;t exist here. Everything else is one click away.
            </p>
            <Link href="/" className="btn btn-primary btn-px-4 btn-py-2">
              Back to the homepage
            </Link>
          </div>
        </div>
      </div>
      <SkylineStrip />
    </>
  );
}
