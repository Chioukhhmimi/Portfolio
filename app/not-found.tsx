import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-gray-900 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
