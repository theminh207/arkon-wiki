"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { KnowledgeTypeCards } from "@/components/types/knowledge-type-cards";
import { KnowledgeTypeDialog } from "@/components/types/knowledge-type-dialog";

export type KnowledgeType = {
  id: string;
  slug: string;
  name: string;
  color: string;
  description?: string;
  sort_order: number;
  source_count?: number;
};

export default function KnowledgeTypesPage() {
  const [types, setTypes] = useState<KnowledgeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editType, setEditType] = useState<KnowledgeType | null>(null);

  const loadTypes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api<KnowledgeType[]>("/api/knowledge-types");
      setTypes(data);
    } catch {
      setTypes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTypes();
  }, [loadTypes]);

  return (
    <>
      <PageHeader
        title="Knowledge Types"
        description="Define and manage categories for your knowledge base documents."
        action={
          <Button
            onClick={() => { setEditType(null); setDialogOpen(true); }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <span className="material-symbols-outlined text-base mr-1">add</span>
            Add Type
          </Button>
        }
      />

      <KnowledgeTypeCards
        types={types}
        loading={loading}
        onEdit={(t) => { setEditType(t); setDialogOpen(true); }}
        onRefresh={loadTypes}
      />

      <KnowledgeTypeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        knowledgeType={editType}
        onSaved={loadTypes}
      />
    </>
  );
}
