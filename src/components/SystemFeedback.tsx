
import React from 'react';
import { Card } from '@/components/ui/card';
import { Activity } from 'lucide-react';

interface SystemFeedbackProps {
  feedback: string;
}

const SystemFeedback: React.FC<SystemFeedbackProps> = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <Card className="bg-slate-900 border-blue-500/30 p-4">
      <div className="flex items-center space-x-3">
        <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
        <div>
          <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">
            Sistema
          </div>
          <div className="text-sm text-slate-300">
            {feedback}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SystemFeedback;
