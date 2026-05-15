import * as React from "react"
import { Mail, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import {
  PageHeader,
  LoadingState,
  EmptyState,
  ConfirmDialog,
} from "../components/ui"
import { messagesService, Message } from "../services/messagesService"

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="divide-y divide-gray-200">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="px-6 py-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-1/6" />
              </div>
              <div className="h-6 bg-gray-200 rounded w-16" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MessagesList() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [loading, setLoading] = React.useState(true)
  const [expandedId, setExpandedId] = React.useState<string | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)

  React.useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    const data = await messagesService.getMessages()
    setMessages(data)
    setLoading(false)
  }

  const handleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null)
      return
    }

    const message = messages.find(m => m.id === id)
    if (message && !message.read) {
      await messagesService.markAsRead(id)
      setMessages(prev =>
        prev.map(m => (m.id === id ? { ...m, read: true } : m))
      )
    }
    setExpandedId(id)
  }

  const handleDelete = async () => {
    if (deleteId) {
      await messagesService.deleteMessage(deleteId)
      setMessages(prev => prev.filter(m => m.id !== deleteId))
      if (expandedId === deleteId) {
        setExpandedId(null)
      }
      setDeleteId(null)
    }
  }

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Messages"
          description="View contact form submissions"
        />
        <LoadingSkeleton />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Messages"
        description="View contact form submissions"
      />

      {messages.length === 0 ? (
        <EmptyState
          title="No messages yet"
          description="Contact form submissions will appear here"
        />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${!message.read ? "bg-blue-50/50" : ""} ${
                  expandedId === message.id ? "bg-gray-50" : ""
                }`}
              >
                <div
                  className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleExpand(message.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        !message.read ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                      }`}>
                        <Mail className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 truncate">
                          {message.name}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {message.email}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {message.message.slice(0, 80)}
                        {message.message.length > 80 ? "..." : ""}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-sm text-gray-500">
                        {message.phone || "—"}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        !message.read
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {!message.read ? "New" : "Read"}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(message.createdAt)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setDeleteId(message.id)
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {expandedId === message.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedId === message.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium text-gray-700">From:</span>
                        <span className="text-gray-900">{message.name}</span>
                        <span className="text-gray-500">&lt;{message.email}&gt;</span>
                        {message.phone && (
                          <>
                            <span className="font-medium text-gray-700 ml-4">Phone:</span>
                            <span className="text-gray-900">{message.phone}</span>
                          </>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-700">Received:</span>{" "}
                        {formatDate(message.createdAt)}
                      </div>
                      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-900 whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

export default MessagesList