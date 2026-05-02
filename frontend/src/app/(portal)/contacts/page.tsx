"use client";

import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        title="Contacts"
        description="Directory of contacts available for AI lookup."
      />

      <div className="bg-card rounded-xl border border-border shadow-sahara">
        <EmptyState
          icon="contacts"
          title="Contact directory"
          description="Contact management coming soon"
        />
      </div>
    </>
  );
}
