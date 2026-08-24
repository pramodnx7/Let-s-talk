import { supabase } from "@/lib/supabase";
import { deleteImage } from "@/lib/storage";
import type {
  AwardRecord,
  ContactMessageRecord,
  EventRecord,
  GalleryItem,
  PartnerRecord,
  ProgramRecord,
  PublishStatus,
  StorageBucket,
} from "@/types/database";

export type DashboardStats = {
  totalEvents: number;
  publishedEvents: number;
  galleryImages: number;
  awards: number;
  partners: number;
  unreadMessages: number;
};

export type RecentActivity = {
  events: Pick<EventRecord, "id" | "title" | "created_at" | "published">[];
  gallery: Pick<GalleryItem, "id" | "title" | "created_at" | "published">[];
  messages: Pick<ContactMessageRecord, "id" | "name" | "topic" | "created_at" | "read">[];
};

function requireData<T>(data: T | null, message: string): T {
  if (!data) throw new Error(message);
  return data;
}

function applySearch<T extends { ilike: (column: string, pattern: string) => T }>(
  query: T,
  search: string,
  column = "title",
) {
  return search.trim() ? query.ilike(column, `%${search.trim()}%`) : query;
}

function applyPublished<T extends { eq: (column: string, value: boolean) => T }>(
  query: T,
  status: PublishStatus,
  column = "published",
) {
  if (status === "published") return query.eq(column, true);
  if (status === "draft") return query.eq(column, false);
  return query;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [totalEvents, publishedEvents, galleryImages, awards, partners, unreadMessages] =
    await Promise.all([
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }).eq("published", true),
      supabase.from("gallery_items").select("id", { count: "exact", head: true }),
      supabase.from("awards").select("id", { count: "exact", head: true }),
      supabase.from("partners").select("id", { count: "exact", head: true }).eq("active", true),
      supabase
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("read", false),
    ]);

  const failed = [
    totalEvents,
    publishedEvents,
    galleryImages,
    awards,
    partners,
    unreadMessages,
  ].find((result) => result.error);

  if (failed?.error) throw new Error(failed.error.message);

  return {
    totalEvents: totalEvents.count ?? 0,
    publishedEvents: publishedEvents.count ?? 0,
    galleryImages: galleryImages.count ?? 0,
    awards: awards.count ?? 0,
    partners: partners.count ?? 0,
    unreadMessages: unreadMessages.count ?? 0,
  };
}

export async function getRecentActivity(): Promise<RecentActivity> {
  const [events, gallery, messages] = await Promise.all([
    supabase
      .from("events")
      .select("id,title,created_at,published")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("gallery_items")
      .select("id,title,created_at,published")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("contact_messages")
      .select("id,name,topic,created_at,read")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  if (events.error) throw new Error(events.error.message);
  if (gallery.error) throw new Error(gallery.error.message);
  if (messages.error) throw new Error(messages.error.message);

  return {
    events: (events.data ?? []) as RecentActivity["events"],
    gallery: (gallery.data ?? []) as RecentActivity["gallery"],
    messages: (messages.data ?? []) as RecentActivity["messages"],
  };
}

export async function listEvents(search = "", status: PublishStatus = "all") {
  let query = supabase.from("events").select("*").order("event_date", { ascending: false });
  query = applyPublished(applySearch(query, search), status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as EventRecord[];
}

export async function saveEvent(input: Partial<EventRecord>) {
  const payload = {
    title: input.title,
    description: input.description,
    event_date: input.event_date,
    start_time: input.start_time || null,
    location: input.location,
    registration_url: input.registration_url || null,
    cover_image_url: input.cover_image_url || null,
    published: Boolean(input.published),
  };

  const request = input.id
    ? supabase.from("events").update(payload).eq("id", input.id).select("*").single()
    : supabase.from("events").insert(payload).select("*").single();

  const { data, error } = await request;
  if (error) throw new Error(error.message);
  return requireData(data as EventRecord | null, "Event was not saved.");
}

export async function deleteEvent(record: EventRecord) {
  const { error } = await supabase.from("events").delete().eq("id", record.id);
  if (error) throw new Error(error.message);
  await deleteImage("event-images", record.cover_image_url);
}

export async function listPrograms(search = "", status: PublishStatus = "all") {
  let query = supabase.from("programs").select("*").order("created_at", { ascending: false });
  query = applyPublished(applySearch(query, search), status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as ProgramRecord[];
}

export async function saveProgram(input: Partial<ProgramRecord>) {
  const payload = {
    title: input.title,
    description: input.description,
    cover_image_url: input.cover_image_url || null,
    published: Boolean(input.published),
  };
  const request = input.id
    ? supabase.from("programs").update(payload).eq("id", input.id).select("*").single()
    : supabase.from("programs").insert(payload).select("*").single();
  const { data, error } = await request;
  if (error) throw new Error(error.message);
  return requireData(data as ProgramRecord | null, "Program was not saved.");
}

export async function deleteProgram(record: ProgramRecord) {
  const { error } = await supabase.from("programs").delete().eq("id", record.id);
  if (error) throw new Error(error.message);
  await deleteImage("program-images", record.cover_image_url);
}

export async function listGallery(search = "", status: PublishStatus = "all") {
  let query = supabase
    .from("gallery_items")
    .select("*")
    .order("display_order", { ascending: true });
  query = applyPublished(applySearch(query, search), status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as GalleryItem[];
}

export async function saveGalleryItem(input: Partial<GalleryItem>) {
  const payload = {
    title: input.title,
    caption: input.caption || null,
    image_url: input.image_url,
    display_order: Number(input.display_order ?? 0),
    published: Boolean(input.published),
  };
  const request = input.id
    ? supabase.from("gallery_items").update(payload).eq("id", input.id).select("*").single()
    : supabase.from("gallery_items").insert(payload).select("*").single();
  const { data, error } = await request;
  if (error) throw new Error(error.message);
  return requireData(data as GalleryItem | null, "Gallery item was not saved.");
}

export async function deleteGalleryItem(record: GalleryItem) {
  const { error } = await supabase.from("gallery_items").delete().eq("id", record.id);
  if (error) throw new Error(error.message);
  await deleteImage("gallery-images", record.image_url);
}

export async function listAwards(search = "", status: PublishStatus = "all") {
  let query = supabase.from("awards").select("*").order("award_year", { ascending: false });
  query = applyPublished(applySearch(query, search), status);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as AwardRecord[];
}

export async function saveAward(input: Partial<AwardRecord>) {
  const payload = {
    title: input.title,
    description: input.description,
    award_year: input.award_year ? Number(input.award_year) : null,
    image_url: input.image_url || null,
    published: Boolean(input.published),
  };
  const request = input.id
    ? supabase.from("awards").update(payload).eq("id", input.id).select("*").single()
    : supabase.from("awards").insert(payload).select("*").single();
  const { data, error } = await request;
  if (error) throw new Error(error.message);
  return requireData(data as AwardRecord | null, "Award was not saved.");
}

export async function deleteAward(record: AwardRecord) {
  const { error } = await supabase.from("awards").delete().eq("id", record.id);
  if (error) throw new Error(error.message);
  await deleteImage("award-images", record.image_url);
}

export async function listPartners(search = "", status: "all" | "active" | "inactive" = "all") {
  let query = supabase.from("partners").select("*").order("display_order", { ascending: true });
  if (search.trim()) query = query.ilike("name", `%${search.trim()}%`);
  if (status === "active") query = query.eq("active", true);
  if (status === "inactive") query = query.eq("active", false);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as PartnerRecord[];
}

export async function savePartner(input: Partial<PartnerRecord>) {
  const payload = {
    name: input.name,
    logo_url: input.logo_url || null,
    website_url: input.website_url || null,
    display_order: Number(input.display_order ?? 0),
    active: Boolean(input.active),
  };
  const request = input.id
    ? supabase.from("partners").update(payload).eq("id", input.id).select("*").single()
    : supabase.from("partners").insert(payload).select("*").single();
  const { data, error } = await request;
  if (error) throw new Error(error.message);
  return requireData(data as PartnerRecord | null, "Partner was not saved.");
}

export async function deletePartner(record: PartnerRecord) {
  const { error } = await supabase.from("partners").delete().eq("id", record.id);
  if (error) throw new Error(error.message);
  await deleteImage("partner-logos", record.logo_url);
}

export async function listMessages(search = "", status: "all" | "read" | "unread" = "all") {
  let query = supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (search.trim()) {
    query = query.or(
      `name.ilike.%${search.trim()}%,email.ilike.%${search.trim()}%,topic.ilike.%${search.trim()}%`,
    );
  }
  if (status === "read") query = query.eq("read", true);
  if (status === "unread") query = query.eq("read", false);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as ContactMessageRecord[];
}

export async function updateMessageStatus(id: string, read: boolean) {
  const { error } = await supabase.from("contact_messages").update({ read }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteMessage(id: string) {
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export function bucketFor(
  kind: "event" | "program" | "gallery" | "award" | "partner",
): StorageBucket {
  return {
    event: "event-images",
    program: "program-images",
    gallery: "gallery-images",
    award: "award-images",
    partner: "partner-logos",
  }[kind];
}
