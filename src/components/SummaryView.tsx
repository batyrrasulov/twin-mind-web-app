// src/components/SummaryView.tsx
import React, { useState } from 'react';
import { Summary } from '../types';

interface SummaryViewProps {
  summary: Summary;
}

const SummaryView: React.FC<SummaryViewProps> = ({ summary }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = formatSummaryForCopy(summary);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSummaryForCopy = (summary: Summary): string => {
    return `Meeting Summary

Key Points:
${summary.keyPoints.map(point => `• ${point}`).join('\n')}

Action Items:
${summary.actionItems.map(item => `• ${item}`).join('\n')}

Decisions Made:
${summary.decisions.map(decision => `• ${decision}`).join('\n')}

Highlights:
${summary.highlights.map(highlight => `• ${highlight}`).join('\n')}`;
  };

  const SummarySection: React.FC<{
    title: string;
    items: string[];
    icon: string;
    color: string;
  }> = ({ title, items, icon, color }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center mb-3">
        <span className={`text-2xl mr-2 ${color}`}>{icon}</span>
        <h4 className="font-medium text-gray-800">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-gray-400 mr-2">•</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="card my-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-lg">Meeting Summary</h3>
        <div className="flex space-x-2">
          <button 
            onClick={handleCopy}
            className="btn btn-outline btn-sm"
          >
            {copied ? '✓ Copied!' : 'Copy to Clipboard'}
          </button>
          <button className="btn btn-primary btn-sm">
            Export as PDF
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummarySection
          title="Key Points"
          items={summary.keyPoints}
          icon="📌"
          color="text-blue-500"
        />
        
        <SummarySection
          title="Action Items"
          items={summary.actionItems}
          icon="✅"
          color="text-green-500"
        />
        
        <SummarySection
          title="Decisions"
          items={summary.decisions}
          icon="🎯"
          color="text-purple-500"
        />
        
        <SummarySection
          title="Highlights"
          items={summary.highlights}
          icon="✨"
          color="text-yellow-500"
        />
      </div>
    </div>
  );
};

export default SummaryView;