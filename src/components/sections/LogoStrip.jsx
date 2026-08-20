import * as React from "react"
import { motion } from "framer-motion"
import { fetchClients } from "@/lib/api"

export function LogoStrip() {
  const [clients, setClients] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients()
        setClients(data)
      } catch (err) {
        console.error('Failed to load clients:', err)
      } finally {
        setLoading(false)
      }
    }
    loadClients()
  }, [])

  if (loading || clients.length === 0) {
    return null
  }

  const duplicatedLogos = [...clients, ...clients, ...clients]

  return (
    <section className="py-16 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs uppercase tracking-widest text-center text-gray-400 mt-8 mb-8"
        >
          Projects I worked on
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden max-w-7xl mx-auto px-4 sm:px-6"
        >
          <motion.div
            animate={{ x: ["0%", "-25%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-16 items-center whitespace-nowrap"
          >
            {duplicatedLogos.map((client, index) => (
              <img
                key={`${client.id}-${index}`}
                src={client.logo}
                alt={`${client.name} logo`}
                className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                width={120}
                height={32}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}