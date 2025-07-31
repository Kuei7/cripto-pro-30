import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Play, Shield, FileText, Target, CheckCircle, Loader2 } from 'lucide-react';

interface Mission {
  id: number;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  type: 'activation' | 'survey' | 'agreement' | 'reading' | 'validation';
  options?: string[];
  content?: string;
}

interface MissionCardProps {
  mission: Mission;
  onComplete: (missionId: number, selectedOption?: string) => void;
  systemActivated: boolean;
}

const MissionCard: React.FC<MissionCardProps> = ({ 
  mission, 
  onComplete, 
  systemActivated 
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [agreed, setAgreed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleComplete = async () => {
    setIsVerifying(true);
    
    // Simula processo de verificação de 2-3 segundos
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsVerifying(false);
    onComplete(mission.id, selectedOption);
  };

  const canComplete = () => {
    switch (mission.type) {
      case 'activation':
        return true;
      case 'survey':
        return selectedOption !== '';
      case 'agreement':
        return agreed;
      case 'reading':
        return true;
      case 'validation':
        return true;
      default:
        return false;
    }
  };

  const getIcon = () => {
    switch (mission.type) {
      case 'activation':
        return <Play className="w-6 h-6 text-blue-500" />;
      case 'survey':
        return <Target className="w-6 h-6 text-green-500" />;
      case 'agreement':
        return <Shield className="w-6 h-6 text-yellow-500" />;
      case 'reading':
        return <FileText className="w-6 h-6 text-purple-500" />;
      case 'validation':
        return <CheckCircle className="w-6 h-6 text-blue-500" />;
    }
  };

  if (mission.completed) {
    return (
      <Card className="bg-slate-900 border-green-500/30 p-8">
        <div className="text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold text-green-400">
            {mission.title} - Concluída
          </h2>
          <p className="text-slate-300">
            +R$ {mission.reward.toFixed(2)} adicionados ao saldo
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-900 border-slate-700 p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {mission.title}
              </h2>
              <p className="text-slate-400 mt-1">
                {mission.description}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            +R$ {mission.reward.toFixed(2)}
          </Badge>
        </div>

        {/* Conteúdo da Missão */}
        <div className="space-y-4">
          {mission.type === 'activation' && (
            <div className="text-center space-y-4">
              <p className="text-slate-300">
                Clique no botão abaixo para ativar o sistema de extração de ativos digitais.
              </p>
              {!systemActivated && (
                <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                  <p className="text-sm text-slate-400">
                    ⚡ Após a ativação, o sistema iniciará a mineração automática em segundo plano
                  </p>
                </div>
              )}
            </div>
          )}

          {mission.type === 'survey' && mission.options && (
            <div className="space-y-4">
              <p className="text-slate-300">
                Selecione a opção que melhor representa seu perfil:
              </p>
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                {mission.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="text-slate-300 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {mission.type === 'agreement' && mission.content && (
            <div className="space-y-4">
              <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {mission.content}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="agree" 
                  checked={agreed} 
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <Label htmlFor="agree" className="text-slate-300 cursor-pointer">
                  Concordo com os termos apresentados
                </Label>
              </div>
            </div>
          )}

          {mission.type === 'reading' && mission.content && (
            <div className="space-y-4">
              <p className="text-slate-300 mb-4">
                Leia atentamente as informações técnicas abaixo:
              </p>
              <div className="bg-slate-800 border border-slate-600 rounded-lg p-6">
                <p className="text-slate-300 leading-relaxed">
                  {mission.content}
                </p>
              </div>
            </div>
          )}

          {mission.type === 'validation' && (
            <div className="text-center space-y-4">
              <p className="text-slate-300">
                Iniciando processo de pré-validação do ambiente...
              </p>
              {isVerifying && (
                <div className="bg-slate-800 border border-blue-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                    <span className="text-blue-400">Validando ambiente...</span>
                  </div>
                  <div className="mt-4 text-sm text-slate-400">
                    Verificando protocolos de segurança e integridade do sistema
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Indicador de Verificação */}
        {isVerifying && (
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-6">
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
              <span className="text-blue-300 font-medium">Verificando...</span>
            </div>
            <div className="mt-2 text-center text-sm text-blue-400">
              Processando dados e validando informações
            </div>
          </div>
        )}

        {/* Botão de Ação */}
        <div className="flex justify-center">
          <Button 
            onClick={handleComplete}
            disabled={!canComplete() || isVerifying}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
            size="lg"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verificando...
              </>
            ) : mission.type === 'activation' ? (
              'Ativar Extração'
            ) : mission.type === 'agreement' ? (
              'Concordar e Continuar'
            ) : mission.type === 'reading' ? (
              'Confirmar Leitura'
            ) : mission.type === 'validation' ? (
              'Iniciar Validação'
            ) : (
              'Confirmar Seleção'
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MissionCard;
