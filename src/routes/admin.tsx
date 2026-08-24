import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Inbox, RefreshCw, RotateCcw, Save, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getContactMessages,
  getSiteContent,
  restoreDefaultSiteContent,
  saveSiteContent,
} from "@/lib/content-actions";
import type { ContactMessage, SiteContent } from "@/lib/site-content";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel | IEEE LETs Talk" },
      {
        name: "description",
        content: "Manage IEEE LETs Talk website content and contact messages.",
      },
    ],
  }),
  component: AdminPanel,
});

function AdminPanel() {
  const queryClient = useQueryClient();
  const [pin, setPin] = useState("");
  const [editor, setEditor] = useState("");
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const { data: content, isLoading } = useQuery({
    queryKey: ["site-content"],
    queryFn: () => getSiteContent(),
  });

  useEffect(() => {
    if (content) setEditor(JSON.stringify(content, null, 2));
  }, [content]);

  const stats = useMemo(() => {
    if (!content) return [];
    return [
      { label: "Events", value: content.events.length },
      { label: "Milestones", value: content.journeyTracks.length },
      { label: "Partners", value: content.partners.length },
      { label: "Gallery", value: content.gallery.length },
    ];
  }, [content]);

  async function save() {
    try {
      setStatus("Saving...");
      const parsed = JSON.parse(editor) as SiteContent;
      await saveSiteContent({ data: { pin, content: parsed } });
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      setStatus("Saved. Public website content is updated.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save content.");
    }
  }

  async function reset() {
    try {
      setStatus("Restoring defaults...");
      const restored = await restoreDefaultSiteContent({ data: { pin } });
      setEditor(JSON.stringify(restored, null, 2));
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      setStatus("Default content restored.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not restore defaults.");
    }
  }

  async function loadMessages() {
    try {
      setStatus("Loading inbox...");
      const inbox = await getContactMessages({ data: { pin } });
      setMessages(inbox);
      setStatus(`Loaded ${inbox.length} message${inbox.length === 1 ? "" : "s"}.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not load messages.");
    }
  }

  return (
    <main className="min-h-screen bg-surface-gray text-heading">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-ieee">
              <ShieldCheck className="size-4" />
              IEEE LETs Talk Admin
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Website Management</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2 text-sm font-semibold text-ieee transition-colors hover:bg-ieee-tint"
            >
              <Eye className="size-4" />
              View Site
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-lg border border-border bg-white p-5 shadow-soft">
            <label className="text-xs font-semibold tracking-wide text-body uppercase">
              Admin PIN
            </label>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              type="password"
              className="mt-2 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-ieee"
              placeholder="Enter PIN"
            />
            <p className="mt-3 text-xs leading-relaxed text-body">
              Set `ADMIN_PIN` in production. Local default is `lets-talk-admin`.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-white p-4">
                <div className="text-2xl font-bold text-ieee">{item.value}</div>
                <div className="text-xs font-medium text-body">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-white p-4">
            <p className="text-xs font-semibold tracking-wide text-body uppercase">Status</p>
            <p className="mt-2 min-h-10 text-sm leading-relaxed text-heading">
              {status || "Ready."}
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-lg border border-border bg-white shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
              <div>
                <h2 className="text-xl font-bold">Content Editor</h2>
                <p className="mt-1 text-sm text-body">
                  Edit page sections, upcoming events, milestones, awards, partners, and contact
                  details.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => content && setEditor(JSON.stringify(content, null, 2))}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-ieee hover:bg-ieee-tint"
                >
                  <RefreshCw className="size-4" />
                  Reload
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-body hover:bg-surface-gray"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={save}
                  className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-orange)] px-4 py-2 text-sm font-semibold text-white shadow-glow"
                >
                  <Save className="size-4" />
                  Save
                </button>
              </div>
            </div>
            <textarea
              value={isLoading ? "Loading content..." : editor}
              onChange={(e) => setEditor(e.target.value)}
              spellCheck={false}
              className="min-h-[620px] w-full resize-y rounded-b-lg bg-[#101828] p-5 font-mono text-sm leading-relaxed text-white outline-none"
            />
          </section>

          <section className="rounded-lg border border-border bg-white shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
              <div>
                <h2 className="text-xl font-bold">Contact Inbox</h2>
                <p className="mt-1 text-sm text-body">
                  Messages sent from the website contact form are stored on the backend.
                </p>
              </div>
              <button
                type="button"
                onClick={loadMessages}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-ieee hover:bg-ieee-tint"
              >
                <Inbox className="size-4" />
                Load Messages
              </button>
            </div>
            <div className="divide-y divide-border">
              {messages.length === 0 ? (
                <p className="p-5 text-sm text-body">No messages loaded.</p>
              ) : (
                messages.map((message) => (
                  <article key={message.id} className="p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-heading">{message.name}</h3>
                        <a
                          className="text-sm font-medium text-ieee"
                          href={`mailto:${message.email}`}
                        >
                          {message.email}
                        </a>
                      </div>
                      <time className="text-xs text-body">
                        {new Date(message.createdAt).toLocaleString()}
                      </time>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-orange">{message.topic}</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-body">
                      {message.message || "No message body."}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
