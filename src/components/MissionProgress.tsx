
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle, Circle, Lock } from 'lucide-react';

interface Mission {
  id: number;
  title: string;
  completed: boolean;
}

interface MissionProgressProps {
  currentMission: number;
  totalMissions: number;
  missions: Mission[];
}

const MissionProgress: React.FC<MissionProgressProps> = ({ 
  currentMission, 
  totalMissions, 
  missions 
}) => {
  const completedMissions = missions.filter(m => m.completed).length;
  const progressPercentage = (completedMissions / totalMissions) * 100;

  return (
    <Card className="bg-slate-900 border-slate-700 p-6">
      <h3 className="text-lg font-semibold mb-4">Progresso das Validações</h3>
      
      {/* Barra de Progresso */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Progresso</span>
          <span>{completedMissions}/{totalMissions}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Lista de Missões */}
      <div className="space-y-3">
        {missions.map((mission, index) => {
          const isCompleted = mission.completed;
          const isCurrent = index === currentMission;
          const isLocked = index > currentMission;

          return (
            <div 
              key={mission.id}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                isCurrent ? 'bg-slate-800 border border-blue-500/30' : ''
              }`}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : isLocked ? (
                  <Lock className="w-5 h-5 text-slate-500" />
                ) : (
                  <Circle className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${
                  isCompleted ? 'text-green-400' : 
                  isCurrent ? 'text-white' : 
                  'text-slate-500'
                }`}>
                  {mission.title}
                </div>
                <div className="text-xs text-slate-500">
                  Validação {mission.id}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default MissionProgress;
