import { Helmet } from "react-helmet-async"

const SITE_URL = "https://hmimichioukh.com"
const SITE_NAME = "Hmimi Chioukh — Portfolio"
const DEFAULT_IMAGE = "/og-image.png"

export function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  noindex = false,
}) {
  const pageTitle = title
    ? `${title} | Hmimi Chioukh`
    : "Hmimi Chioukh | Product Designer — SaaS, UI/UX, AI"
  const pageDesc =
    description ||
    "Product Designer specializing in SaaS platforms, UI/UX design, and AI-powered workflows. View case studies from DadyCar, FocusCare, Shihany, Resaglob."
  const pageImage = image || DEFAULT_IMAGE
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <link rel="canonical" href={pageUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />
    </Helmet>
  )
}
