import ResourcesListPage from "../../../components/ResourcesListPage";

export const dynamic = "force-dynamic";

export default function ClientResourcesPage() {
  return (
    <ResourcesListPage
      audience="patient"
      title="Patient Resources"
      subtitle="Handouts, guides, and links for patients."
    />
  );
}
