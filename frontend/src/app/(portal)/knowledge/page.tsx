"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { KnowledgeTable } from "@/components/knowledge/knowledge-table";
import { KnowledgeFilters } from "@/components/knowledge/knowledge-filters";
import { UploadDialog } from "@/components/knowledge/upload-dialog";

export type KnowledgeType = {
  id: string;
  slug: string;
  name: string;
  color: string;
};

export type Source = {
  id: string;
  title: string;
  file_type: string;
  status: string;
  knowledge_type_id?: string;
  knowledge_type_name?: string;
  knowledge_type_color?: string;
  created_at: string;
};

export default function KnowledgePage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [types, setTypes] = useState<KnowledgeType[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);

  const loadSources = useCallback(async () => {
    setLoading(true);
    try {
      const params = selectedType ? `?knowledge_type=${selectedType}` : "";
      const data = await api<{ items: Source[] }>(`/api/sources${params}`);
      setSources(data.items || []);
    } catch {
      setSources([]);
    } finally {
      setLoading(false);
    }
  }, [selectedType]);

  useEffect(() => {
    async function loadTypes() {
      try {
        const data = await api<KnowledgeType[]>("/api/knowledge-types");
        setTypes(data);
      } catch {
        setTypes([]);
      }
    }
    loadTypes();
  }, []);

  useEffect(() => {
    loadSources();
  }, [loadSources]);

  return (
    <>
      <PageHeader
        title="Knowledge Base"
        description="Manage and organize your organization's documents and data."
        action={
          <Button
            onClick={() => setUploadOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <span className="material-symbols-outlined text-base mr-1">
              add
            </span>
            Upload Document
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <KnowledgeFilters
            types={types}
            selectedType={selectedType}
            onSelectType={setSelectedType}
          />
        </div>

        {/* Documents Table */}
        <div className="lg:col-span-3">
          <KnowledgeTable
            sources={sources}
            loading={loading}
            onRefresh={loadSources}
          />
        </div>
      </div>

      <UploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        types={types}
        onUploaded={loadSources}
      />
    </>
  );
}
