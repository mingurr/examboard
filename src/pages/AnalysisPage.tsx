import { useState } from "react";

import AnalysisFilterBar from "@/components/analysis/AnalysisFilterBar";
import AnalysisOverviewPanel from "@/components/analysis/AnalysisOverviewPanel";
import AnalysisQuestionPanel from "@/components/analysis/AnalysisQuestionPanel";
import AnalysisResourcePanel from "@/components/analysis/AnalysisResourcePanel";
import { analysisMockData } from "@/data/analysis";
import type { AnalysisFilterKey } from "@/types/analysis";

export default function AnalysisPage() {
  const [filters, setFilters] = useState(analysisMockData.defaultFilters);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    analysisMockData.questions[0]?.id ?? null,
  );
  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([]);

  const handleFilterChange = (key: AnalysisFilterKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAnalyze = () => {
    console.log("Analyze with filters:", filters);
  };

  const handleSelectQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
  };

  const handleToggleResource = (resourceId: string) => {
    setSelectedResourceIds((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId],
    );
  };

  const handleCreatePacket = () => {
    console.log("Create packet with resources:", selectedResourceIds);
  };

  return (
    <div className="space-y-6">
      <AnalysisFilterBar
        filters={filters}
        filterOptions={analysisMockData.filterOptions}
        onFilterChange={handleFilterChange}
        onAnalyze={handleAnalyze}
      />

      <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <AnalysisOverviewPanel summary={analysisMockData.summary} />

        <div className="grid gap-6">
          <AnalysisQuestionPanel
            questions={analysisMockData.questions}
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={handleSelectQuestion}
          />

          <AnalysisResourcePanel
            resources={analysisMockData.resources}
            selectedResourceIds={selectedResourceIds}
            onToggleResource={handleToggleResource}
            onCreatePacket={handleCreatePacket}
          />
        </div>
      </div>
    </div>
  );
}
