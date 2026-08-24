import { createFileRoute } from "@tanstack/react-router";
import { ProtectedAdminRoute } from "@/admin/components/AdminLayout";
import { Dashboard } from "@/admin/pages/Dashboard";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard | IEEE LETs Talk CMS" },
      { name: "description", content: "IEEE LETs Talk content management dashboard." },
    ],
  }),
  component: () => (
    <ProtectedAdminRoute>
      <Dashboard />
    </ProtectedAdminRoute>
  ),
});
