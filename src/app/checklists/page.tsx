import { redirect } from "next/navigation";

export default function ChecklistsPage() {
  redirect("/discover?tab=checklists");
}
