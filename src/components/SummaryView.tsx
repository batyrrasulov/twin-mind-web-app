// src/components/SummaryView.tsx
import React from 'react';
import { Summary } from '../types';

interface SummaryViewProps {
  summary: Summary;
}

const SummaryView: React.FC<SummaryViewProps> = ({ summary }) => {
  return (
    <div className="card my-4">
      <h3 className="font-medium text-lg mb-4">Meeting Summary</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-primary mb-2">Key Points</h4>
          <ul className="list-disc pl-5 space-y-1">
            {summary.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-primary mb-2">Action Items</h4>
          <ul className="list-disc pl-5 space-y-1">
            {summary.actionItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-primary mb-2">Decisions</h4>
          <ul className="list-disc pl-5 space-y-1">
            {summary.decisions.map((decision, index) => (
              <li key={index}>{decision}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-primary mb-2">Highlights</h4>
          <ul className="list-disc pl-5 space-y-1">
            {summary.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="btn btn-outline mr-2">
          Copy to Clipboard
        </button>
        <button className="btn btn-primary">
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default SummaryView;