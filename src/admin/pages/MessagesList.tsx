import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, MailOpen, Archive, Trash2, Tag } from "lucide-react"
import { 
  PageHeader, 
  LoadingState, 
  EmptyState, 
  StatusBadge,
  SearchInput,
  SelectInput,
  ConfirmDialog
} from "../components/ui"
import { messagesService } from "../services"
import { Message, MessageStatus } from "../types"
import { MESSAGE_STATUS_OPTIONS } from "../constants"

export function MessagesList() {
  const navigate = useNavigate()
  const [messages, setMessages] = React.useState<Message[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("")
  const [deleteId, setDeleteId] = React.useState<string | null>(null)

  React.useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    const data = await messagesService.getAll()
    setMessages(data)
    setLoading(false)
  }

  const handleArchive = async (id: string) => {
    await messagesService.archive(id)
    await loadMessages()
  }

  const handleDelete = async () => {
    if (deleteId) {
      await messagesService.delete(deleteId)
      await loadMessages()
      setDeleteId(null)
    }
  }

  const filteredMessages = messages.filter(m => {
    const matchesSearch = !search || 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || m.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div>
        <PageHeader 
          title="Messages" 
          description="View contact form submissions"
        />
        <LoadingState />
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Messages" 
        description="View contact form submissions"
      />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <SearchInput placeholder="Search messages..." value={search} onChange={setSearch} />
          <SelectInput
            value={statusFilter}
            onChange={setStatusFilter}
            options={MESSAGE_STATUS_OPTIONS as { label: string; value: string }[]}
            placeholder="All Status"
          />
        </div>

        {filteredMessages.length === 0 ? (
          <EmptyState 
            title="No messages"
            description={search || statusFilter ? "Try adjusting your filters" : "No messages received yet"}
          />
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">From</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Subject</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Date</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <tr key={message.id} className={`hover:bg-gray-50 ${message.status === 'unread' ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <Link to={`/admin/messages/${message.id}`} className="font-medium text-gray-900 hover:text-gray-600">
                      {message.name}
                    </Link>
                    <p className="text-sm text-gray-500">{message.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/admin/messages/${message.id}`} className="text-gray-900 hover:text-gray-600">
                      {message.subject}
                    </Link>
                    <p className="text-sm text-gray-500">{message.message.slice(0, 50)}...</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={message.status} type="message" />
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(message.dateTime).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {message.status === 'unread' && (
                        <button
                          onClick={() => messagesService.markAsRead(message.id).then(loadMessages)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Mark as Read"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      )}
                      {message.status === 'read' && (
                        <button
                          onClick={() => messagesService.markAsUnread(message.id).then(loadMessages)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Mark as Unread"
                        >
                          <MailOpen className="w-4 h-4" />
                        </button>
                      )}
                      {message.status !== 'archived' && (
                        <button
                          onClick={() => handleArchive(message.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Archive"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteId(message.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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