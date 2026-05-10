import * as React from "react"
import { motion } from "framer-motion"
import { fetchClients } from "@/lib/api"

export function ClientsSection() {
  const [clients, setClients] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients()
        setClients(data || [])
      } catch (err) {
        console.error("Failed to load clients:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadClients()
  }, [])

  if (!loading && (error || clients.length === 0)) {
    return null
  }

  return (
    <section className="py-16 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-widest text-center text-gray-400 mb-10"
        >
          Trusted by
        </motion.p>

        {loading ? (
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-28 bg-gray-100 rounded animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
          >
            {clients.map((client) => (
              <img
                key={client._id}
                src={client.image}
                alt={client.title}
                className="h-10 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ClientsSection
