import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bitcoin, TrendingUp, Activity, Cpu, Thermometer, Zap, UserPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Meteors } from '@/components/ui/meteors';

const MiningDashboard = () => {
  const [balance, setBalance] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [powerLevel, setPowerLevel] = useState('100%');
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [ganhosDiarios, setGanhosDiarios] = useState([
    { dia: 'Dom', ganhos: 0 },
    { dia: 'Seg', ganhos: 0 },
    { dia: 'Ter', ganhos: 0 },
    { dia: 'Qua', ganhos: 0 },
    { dia: 'Qui', ganhos: 0 },
    { dia: 'Sex', ganhos: 0 },
    { dia: 'Sáb', ganhos: 0 }
  ]);
  const [ganhosMensais, setGanhosMensais] = useState([
    { mes: 'Jan', ganhos: 0 },
    { mes: 'Fev', ganhos: 0 },
    { mes: 'Mar', ganhos: 0 },
    { mes: 'Abr', ganhos: 0 },
    { mes: 'Mai', ganhos: 0 },
    { mes: 'Jun', ganhos: 0 },
    { mes: 'Jul', ganhos: 0 },
    { mes: 'Ago', ganhos: 0 },
    { mes: 'Set', ganhos: 0 },
    { mes: 'Out', ganhos: 0 },
    { mes: 'Nov', ganhos: 0 },
    { mes: 'Dez', ganhos: 0 }
  ]);
  const [totalGanhosDia, setTotalGanhosDia] = useState(0);
  const [stats, setStats] = useState({
    ganhoHora: 720.00,
    ganhoDia: 17280.00,
    peers: 106,
    tarefasMinuto: 0,
    temperaturaCpu: 35.0,
    threadsAtivas: 1,
    eficiencia: 0.50,
    blocosValidos: 102,
    usoCpu: 5.9,
    errosHardware: 0
  });

  // Função para tocar som de dinheiro
  const playMoneySound = () => {
    try {
      const audio = new Audio('/sounds/money-sound.mp3');
      audio.volume = 0.7;
      audio.play().catch(() => {
        console.log('Audio autoplay blocked');
      });
    } catch (error) {
      console.log('Audio not available');
    }
  };

  // Função para gerar hash aleatório
  const generateRandomHash = () => {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 16; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  // Função para adicionar log
  const addLogMessage = () => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const blockNumber = Math.floor(Math.random() * 999999) + 100000;
    const hash = generateRandomHash();
    const message = `[${time}] Bloco #${blockNumber} processado: 0x${hash}`;
    
    setLogMessages(prev => {
      const newMessages = [...prev, message];
      return newMessages.slice(-10); // Manter apenas os últimos 10 logs
    });
  };

  // Atualizar estatísticas aleatoriamente
  const updateStats = () => {
    setStats(prev => ({
      ...prev,
      peers: Math.floor(Math.random() * 20) + 90,
      tarefasMinuto: isProcessing ? Math.floor(Math.random() * 50) + 10 : 0,
      temperaturaCpu: isProcessing ? 35 + Math.random() * 10 : 35,
      threadsAtivas: isProcessing ? Math.floor(Math.random() * 4) + 1 : 1,
      blocosValidos: prev.blocosValidos + (isProcessing ? 1 : 0),
      usoCpu: isProcessing ? Math.random() * 15 + 5 : Math.random() * 5
    }));
  };

  // Effect para mineração
  useEffect(() => {
    if (!isProcessing) return;

    const miningInterval = setInterval(() => {
      setBalance(prev => {
        const newBalance = prev + (Math.random() * 2 + 0.5); // Entre R$ 0.50 e R$ 2.50
        
        // Verificar limite de R$ 60
        if (newBalance >= 60) {
          setIsProcessing(false);
          toast({
            title: "Limite Diário Atingido",
            description: "Você atingiu o limite máximo diário de R$ 60,00 para contas que não são PRO.",
            duration: 5000,
            className: "bg-orange-900 border-orange-500 text-orange-100",
          });
          return 60; // Fixar no limite
        }
        
        // Atualizar gráficos
        const hoje = new Date().getDay();
        const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const mesAtual = new Date().getMonth();
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        
        setGanhosDiarios(prev => 
          prev.map((item, index) => 
            index === hoje ? { ...item, ganhos: newBalance } : item
          )
        );
        
        setGanhosMensais(prev => 
          prev.map((item, index) => 
            index === mesAtual ? { ...item, ganhos: newBalance * 30 } : item
          )
        );
        
        playMoneySound();
        return newBalance;
      });
    }, Math.random() * 2000 + 3000); // Entre 3-5 segundos

    const logInterval = setInterval(() => {
      addLogMessage();
    }, 3000);

    const statsInterval = setInterval(() => {
      updateStats();
    }, 5000);

    return () => {
      clearInterval(miningInterval);
      clearInterval(logInterval);
      clearInterval(statsInterval);
    };
  }, [isProcessing]);

  const toggleProcessing = () => {
    if (balance >= 60) {
      toast({
        title: "Limite Atingido",
        description: "Você já atingiu o limite diário de R$ 60,00. Faça o upgrade para PRO para minerar mais!",
        duration: 4000,
        className: "bg-orange-900 border-orange-500 text-orange-100",
      });
      return;
    }
    
    setIsProcessing(prev => !prev);
    if (!isProcessing) {
      toast({
        title: "Mineração Iniciada",
        description: "O processamento foi iniciado com sucesso!",
        duration: 3000,
        className: "bg-green-900 border-green-500 text-green-100",
      });
    } else {
      toast({
        title: "Mineração Parada",
        description: "O processamento foi interrompido.",
        duration: 3000,
        className: "bg-red-900 border-red-500 text-red-100",
      });
    }
  };

  const handleSaque = () => {
    if (balance >= 50) {
      setShowRegisterDialog(true);
    }
  };

  const handleRegister = () => {
    setShowRegisterDialog(false);
    toast({
      title: "Cadastro Necessário",
      description: "Para sacar, você precisa se cadastrar primeiro!",
      duration: 4000,
      className: "bg-orange-900 border-orange-500 text-orange-100",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bitcoin className="w-8 h-8 text-orange-500 animate-pulse" />
              <h1 className="text-xl font-bold text-orange-500">Painel de Mineração</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isProcessing ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-sm text-slate-400">
                {isProcessing ? 'Processando' : 'Inativo'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seção de Ganhos e Saque */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saldo Atual */}
            <Card className="bg-slate-900 border-slate-700 p-6">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">Saldo Atual</h3>
                <div className="text-4xl font-bold text-green-500">
                  R$ {balance.toFixed(2)}
                </div>
                {balance >= 50 ? (
                  <RainbowButton 
                    onClick={handleSaque}
                    className="w-full px-8 py-3 text-lg font-semibold"
                  >
                    💰 SACAR AGORA!
                  </RainbowButton>
                ) : (
                  <Button 
                    disabled
                    className="w-full px-8 py-3 text-lg font-semibold bg-slate-600 text-slate-400 cursor-not-allowed"
                    size="lg"
                  >
                    Sacar
                  </Button>
                )}
                <p className="text-sm text-slate-400">Saque mínimo: R$ 50,00</p>
              </div>
            </Card>

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ganhos Diários */}
              <Card className="bg-slate-900 border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-4 text-slate-300">Ganhos Diários</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={ganhosDiarios}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="dia" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F3F4F6'
                      }}
                    />
                    <Line type="monotone" dataKey="ganhos" stroke="#EAB308" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Ganhos Mensais */}
              <Card className="bg-slate-900 border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-4 text-slate-300">Ganhos Mensais</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={ganhosMensais}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="mes" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F3F4F6'
                      }}
                    />
                    <Line type="monotone" dataKey="ganhos" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>

          {/* Seção de Controle e Estatísticas */}
          <div className="space-y-6">
            {/* Controles */}
            <Card className="bg-slate-900 border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-300">Controles</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Nível de Potência:
                  </label>
                  <Select value={powerLevel} onValueChange={setPowerLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100%">100% (Capacidade Máxima)</SelectItem>
                      <SelectItem value="75%">75% (Performance)</SelectItem>
                      <SelectItem value="50%">50% (Balanceado)</SelectItem>
                      <SelectItem value="25%">25% (Econômico)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={toggleProcessing}
                  disabled={balance >= 60}
                  className={`w-full px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                    balance >= 60
                      ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      : isProcessing 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg'
                  }`}
                  size="lg"
                >
                  {balance >= 60 
                    ? '⚠️ LIMITE ATINGIDO' 
                    : isProcessing 
                      ? 'Parar Processamento' 
                      : '🚀 COMEÇAR AGORA!'
                  }
                </Button>
              </div>
            </Card>

            {/* Estatísticas */}
            <Card className="bg-slate-900 border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-300">Estatísticas</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-slate-400">Ganho/Hora</div>
                  <div className="font-semibold text-green-400">R$ {stats.ganhoHora.toFixed(2)}</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-slate-400">Ganho/Dia</div>
                  <div className="font-semibold text-green-400">R$ {stats.ganhoDia.toFixed(2)}</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-slate-400">Peers</div>
                  <div className="font-semibold text-blue-400">{stats.peers}</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-slate-400">Tarefas/Min</div>
                  <div className="font-semibold text-purple-400">{stats.tarefasMinuto}</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-slate-400">CPU Temp</div>
                  <div className="font-semibold text-orange-400">{stats.temperaturaCpu.toFixed(1)}°C</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-slate-400">Threads</div>
                  <div className="font-semibold text-cyan-400">{stats.threadsAtivas}</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-slate-400">Eficiência</div>
                  <div className="font-semibold text-yellow-400">{stats.eficiencia.toFixed(2)} GF/W</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-slate-400">Blocos</div>
                  <div className="font-semibold text-green-400">{stats.blocosValidos}</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-slate-400">CPU Uso</div>
                  <div className="font-semibold text-indigo-400">{stats.usoCpu.toFixed(1)}%</div>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="text-slate-400">Erros HW</div>
                  <div className="font-semibold text-red-400">{stats.errosHardware}</div>
                </div>
              </div>
            </Card>

            {/* Log de Atividades */}
            <Card className="bg-slate-900 border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-300">Log de Atividades</h3>
              <div className="bg-black border border-slate-600 rounded-lg p-4 h-48 overflow-y-auto font-mono text-xs">
                {logMessages.length === 0 ? (
                  <div className="text-slate-500">Aguardando início do processamento...</div>
                ) : (
                  logMessages.map((message, index) => (
                    <div key={index} className="text-green-400 mb-1">
                      {message}
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog de Cadastro */}
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent className="sm:max-w-md bg-slate-800 border-slate-600 text-white overflow-hidden">
          <div className="relative">
            {/* Meteors effect */}
            <Meteors number={15} />
            
            <div className="relative z-10">
              <DialogHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <DialogTitle className="text-2xl font-bold text-white">
                  Usuário não cadastrado
                </DialogTitle>
                
                <DialogDescription className="text-slate-300 text-base">
                  Cadastre-se para realizar seu saque e aproveitar todos os benefícios.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col space-y-3 mt-8">
                <Button
                  onClick={handleRegister}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg py-3 rounded-lg"
                >
                  Cadastrar Agora
                </Button>
                
                <Button
                  onClick={() => setShowRegisterDialog(false)}
                  variant="ghost"
                  className="w-full text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MiningDashboard;