import React, { useState } from 'react';
import type { AnalysisResult, AnalysisReport } from '../../types/analysis';
import { ReportOverview } from './ReportOverview';
import { ReportStrategy } from './ReportStrategy';
import { ReportNews } from './ReportNews';
import { ReportDetails } from './ReportDetails';
import { ReportMarkdown } from './ReportMarkdown';

interface ReportSummaryProps {
  data: AnalysisResult | AnalysisReport;
  isHistory?: boolean;
}

/**
 * 完整报告展示组件
 * 整合概览、策略、资讯、详情四个区域
 * 当有 dashboardMarkdown 时支持切换到完整报告视图
 */
export const ReportSummary: React.FC<ReportSummaryProps> = ({
  data,
  isHistory = false,
}) => {
  // 兼容 AnalysisResult 和 AnalysisReport 两种数据格式
  const report: AnalysisReport = 'report' in data ? data.report : data;
  const queryId = 'queryId' in data ? data.queryId : report.meta.queryId;

  const { meta, summary, strategy, details } = report;

  const hasMarkdown = !!report.dashboardMarkdown;
  const [viewMode, setViewMode] = useState<'structured' | 'markdown'>(
    hasMarkdown ? 'markdown' : 'structured'
  );

  return (
    <div className="space-y-3 animate-fade-in">
      {/* View toggle (only when markdown is available) */}
      {hasMarkdown && (
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/5 border border-white/5 w-fit">
          <button
            type="button"
            onClick={() => setViewMode('structured')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'structured'
                ? 'bg-cyan/20 text-cyan'
                : 'text-white/40 hover:text-white'
            }`}
          >
            Structured
          </button>
          <button
            type="button"
            onClick={() => setViewMode('markdown')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'markdown'
                ? 'bg-cyan/20 text-cyan'
                : 'text-white/40 hover:text-white'
            }`}
          >
            Full Report
          </button>
        </div>
      )}

      {viewMode === 'markdown' && report.dashboardMarkdown ? (
        <ReportMarkdown markdown={report.dashboardMarkdown} />
      ) : (
        <>
          {/* 概览区（首屏） */}
          <ReportOverview
            meta={meta}
            summary={summary}
            isHistory={isHistory}
          />

          {/* 策略点位区 */}
          <ReportStrategy strategy={strategy} />

          {/* 资讯区 */}
          <ReportNews queryId={queryId} />

          {/* 透明度与追溯区 */}
          <ReportDetails details={details} queryId={queryId} />
        </>
      )}
    </div>
  );
};
