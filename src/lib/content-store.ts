import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { defaultSiteContent, type ContactMessage, type SiteContent } from "./site-content";

const dbPath = join(process.cwd(), ".data", "site-content.json");
const messagesPath = join(process.cwd(), ".data", "contact-messages.json");

const iconSchemas = {
  event: z.enum(["mic", "brain", "lightbulb"]),
  journey: z.enum(["mic", "graduation", "sparkles", "brain", "users"]),
  pillar: z.enum(["lightbulb", "mic", "brain", "network"]),
  gallery: z.enum(["gallery-1", "gallery-2", "gallery-3", "gallery-4"]),
};

export const siteContentSchema: z.ZodType<SiteContent> = z.object({
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    highlightedTitle: z.string().min(1),
    description: z.string().min(1),
    stats: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).min(1),
  }),
  about: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    highlightedWords: z.string().min(1),
    accentWords: z.string().min(1),
    copy: z.string().min(1),
    quote: z.string().min(1),
    quoteBy: z.string().min(1),
    pillars: z
      .array(
        z.object({
          icon: iconSchemas.pillar,
          title: z.string().min(1),
          copy: z.string().min(1),
          accent: z.boolean().optional(),
        }),
      )
      .min(1),
  }),
  events: z
    .array(
      z.object({
        tag: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        icon: iconSchemas.event,
        badge: z.string().min(1),
        featured: z.boolean().optional(),
        dateLabel: z.string().min(1),
      }),
    )
    .min(1),
  journeyTracks: z
    .array(
      z.object({
        title: z.string().min(1),
        subtitle: z.string().min(1),
        description: z.string().min(1),
        badge: z.string().min(1),
        icon: iconSchemas.journey,
      }),
    )
    .min(1),
  gallery: z
    .array(
      z.object({
        image: iconSchemas.gallery,
        alt: z.string().min(1),
        caption: z.string().min(1),
        span: z.string().optional(),
      }),
    )
    .min(1),
  awards: z.object({
    title: z.string().min(1),
    awardName: z.string().min(1),
    program: z.string().min(1),
    description: z.string().min(1),
    label: z.string().min(1),
  }),
  partners: z.array(z.string().min(1)).min(1),
  connected: z.object({
    title: z.string().min(1),
    copy: z.string().min(1),
    primaryCta: z.string().min(1),
    secondaryCta: z.string().min(1),
  }),
  contact: z.object({
    email: z.string().email(),
    whatsappLabel: z.string().min(1),
    organization: z.string().min(1),
    copy: z.string().min(1),
  }),
});

export const contactMessageSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  topic: z.string().max(180).optional().default("General inquiry"),
  message: z.string().max(3000).optional().default(""),
});

function assertAdmin(pin: string) {
  const expected = process.env.ADMIN_PIN || "lets-talk-admin";
  if (pin !== expected) {
    throw new Error("Invalid admin PIN");
  }
}

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

async function readJsonFile<T>(path: string, fallback: T, schema: z.ZodType<T>): Promise<T> {
  try {
    const raw = await readFile(path, "utf8");
    return schema.parse(JSON.parse(raw));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    console.error(error);
    return fallback;
  }
}

async function writeJsonFile(path: string, value: unknown) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(value, null, 2), "utf8");
}

export async function readSiteContent(): Promise<SiteContent> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "site")
      .maybeSingle();

    if (!error && data?.content) return siteContentSchema.parse(data.content);
    if (error) console.error(error);
  }

  return readJsonFile(dbPath, defaultSiteContent, siteContentSchema);
}

export async function updateSiteContent(pin: string, content: SiteContent): Promise<SiteContent> {
  assertAdmin(pin);
  const parsed = siteContentSchema.parse(content);
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: "site", content: parsed, updated_at: new Date().toISOString() });

    if (error) throw new Error(error.message);
    return parsed;
  }

  await writeJsonFile(dbPath, parsed);
  return parsed;
}

export async function readContactMessages(pin: string): Promise<ContactMessage[]> {
  assertAdmin(pin);
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("id,name,email,topic,message,created_at")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map((item) => ({
      id: String(item.id),
      name: item.name,
      email: item.email,
      topic: item.topic,
      message: item.message,
      createdAt: item.created_at,
    }));
  }

  return readJsonFile(messagesPath, [], z.array(z.custom<ContactMessage>()));
}

export async function addContactMessage(input: z.infer<typeof contactMessageSchema>) {
  const parsed = contactMessageSchema.parse(input);
  const messages = await readJsonFile(messagesPath, [], z.array(z.custom<ContactMessage>()));
  const message: ContactMessage = {
    id: crypto.randomUUID(),
    ...parsed,
    topic: parsed.topic || "General inquiry",
    message: parsed.message || "",
    createdAt: new Date().toISOString(),
  };
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      id: message.id,
      name: message.name,
      email: message.email,
      topic: message.topic,
      message: message.message,
      created_at: message.createdAt,
    });

    if (error) throw new Error(error.message);
    return { ok: true };
  }

  await writeJsonFile(messagesPath, [message, ...messages]);
  return { ok: true };
}

export async function resetSiteContent(pin: string): Promise<SiteContent> {
  assertAdmin(pin);
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: "site", content: defaultSiteContent, updated_at: new Date().toISOString() });

    if (error) throw new Error(error.message);
    return defaultSiteContent;
  }

  await writeJsonFile(dbPath, defaultSiteContent);
  return defaultSiteContent;
}
