import * as React from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Mail, MailOpen, Archive, Trash2 } from "lucide-react"
import { PageHeader, LoadingState, StatusBadge } from "../components/ui"
import { messagesService } from "../services"
import { Message } from "../types"

export function MessageDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [message, setMessage] = React.useState<Message | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (id) {
      loadMessage(id)
    }
  }, [id])

  const loadMessage = async (messageId: string) => {
    const data = await messagesService.getById(messageId)
    setMessage(data || null)
    if (data?.status === 'unread') {
      await messagesService.markAsRead(messageId)
    }
    setLoading(false)
  }

  const handleArchive = async () => {
    if (id) {
      await messagesService.archive(id)
      navigate("/admin/messages")
    }
  }

  const handleDelete = async () => {
    if (id) {
      await messagesService.delete(id)
      navigate("/admin/messages")
    }
  }

  if (loading) {
    return (
      <div>
        <PageHeader 
          title="Message Details"
          action={{ label: "Back to Messages", href: "/admin/messages" }}
        />
        <LoadingState />
      </div>
    )
  }

  if (!message) {
    return (
      <div>
        <PageHeader 
          title="Message Not Found"
          action={{ label: "Back to Messages", href: "/admin/messages" }}
        />
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-gray-500">This message could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Message Details"
        action={{ label: "Back to Messages", href: "/admin/messages" }}
      />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold text-gray-900">{message.subject}</h2>
                <StatusBadge status={message.status} type="message" />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{message.name}</span>
                <span>•</span>
                <a href={`mailto:${message.email}`} className="hover:text-gray-700">{message.email}</a>
                <span>•</span>
                <span>{new Date(message.dateTime).toLocaleString()}</span>
              </div>
              {message.sourcePage && (
                <p className="text-sm text-gray-500 mt-2">
                  From: {message.sourcePage}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {message.status === 'unread' ? (
                <button
                  onClick={() => messagesService.markAsRead(id!).then(() => loadMessage(id!))}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <MailOpen className="w-4 h-4" />
                  Mark as Read
                </button>
              ) : (
                <button
                  onClick={() => messagesService.markAsUnread(id!).then(() => loadMessage(id!))}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Mark as Unread
                </button>
              )}
              {message.status !== 'archived' && (
                <button
                  onClick={handleArchive}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                >
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
              )}
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="prose prose-gray max-w-none">
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {message.message}
            </p>
          </div>
        </div>

        {message.tags && message.tags.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Tags:</span>
              {message.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageDetail