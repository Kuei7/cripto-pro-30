
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';

const LiveUsers: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [connectedUsers, setConnectedUsers] = useState(7);

  const states = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'PE', 'CE', 'DF', 'ES'];

  const generateRandomNotification = () => {
    const randomState = states[Math.floor(Math.random() * states.length)];
    const randomValue = (Math.random() * (550 - 300) + 300).toFixed(2);
    return `Usuário de ${randomState} acabou de desbloquear R$${randomValue}`;
  };

  useEffect(() => {
    // Atualiza número de usuários conectados a cada 15 segundos
    const usersInterval = setInterval(() => {
      setConnectedUsers(Math.floor(Math.random() * (14 - 7 + 1)) + 7);
    }, 15000);

    // Atualiza notificações a cada 8 segundos
    const notificationsInterval = setInterval(() => {
      const randomNotification = generateRandomNotification();
      setNotifications(prev => {
        const newNotifications = [randomNotification, ...prev.slice(0, 2)];
        return newNotifications;
      });
    }, 8000);

    return () => {
      clearInterval(usersInterval);
      clearInterval(notificationsInterval);
    };
  }, []);

  return (
    <Card className="bg-slate-900 border-slate-700 p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Users className="w-4 h-4 text-green-500" />
        <span className="text-sm text-green-400">+{connectedUsers} pessoas conectadas agora</span>
      </div>
      
      <div className="space-y-2">
        {notifications.map((notification, index) => (
          <div 
            key={index}
            className={`text-xs text-slate-400 animate-fade-in ${
              index === 0 ? 'text-green-400' : ''
            }`}
          >
            • {notification}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LiveUsers;
