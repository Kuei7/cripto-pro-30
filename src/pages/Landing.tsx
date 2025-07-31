
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bitcoin, Shield, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { SparklesCore } from '@/components/ui/sparkles';
import { LogoCarousel } from '@/components/ui/logo-carousel';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { Meteors } from '@/components/ui/meteors';
import { cryptoLogos } from '@/components/CryptoLogos';

const Landing = () => {
  const navigate = useNavigate();

  const handleStartNow = () => {
    navigate('/dashboard');
  };

  const testimonials = [
    {
      author: {
        name: "Carlos Silva",
        handle: "@carlostech",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "Recebi R$ 427,80 em apenas 3 dias completando as etapas. Sistema realmente funciona!"
    },
    {
      author: {
        name: "Maria Santos",
        handle: "@mariainvest",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "Consegui acumular R$ 523,45 nas primeiras semanas. A plataforma é séria e confiável."
    },
    {
      author: {
        name: "João Pereira",
        handle: "@joaocripto",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      text: "R$ 312,60 acumulados até agora. Processo simples e transparente, recomendo!"
    },
    {
      author: {
        name: "Ana Costa",
        handle: "@anacripto",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "Já resgatei R$ 689,20 em duas semanas. O CriptoPro mudou minha vida financeira."
    },
    {
      author: {
        name: "Pedro Lima",
        handle: "@pedroganhos",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      text: "Sistema confiável! Acumulei R$ 445,30 seguindo as etapas exatamente como indicado."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.5}
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center relative z-20 px-4">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-orange-500/20 rounded-full border border-orange-500/30">
              <Bitcoin className="w-12 h-12 md:w-16 md:h-16 text-orange-500" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            CriptoPro
          </h1>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
            Ganhe dinheiro ao avançar etapas dentro do{' '}
            <span className="text-orange-500">CriptoPro</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Participe de uma jornada interativa onde você ativa um sistema de extração digital 
            e acumula recompensas em cada fase. Sem cadastro. Totalmente online.
          </p>
          
          <div className="relative mb-8 max-w-md mx-auto">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 transform scale-[0.80] rounded-lg blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-green-500/30 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <div className="text-green-400 font-semibold text-sm uppercase tracking-wider mb-2">
                Saldo Médio Acumulado
              </div>
              <div className="text-3xl md:text-4xl font-bold text-green-400">
                R$ 552,20
              </div>
              <div className="text-sm text-slate-400 mt-1">por participante ativo</div>
              <Meteors number={20} />
            </div>
          </div>
          
          <RainbowButton 
            onClick={handleStartNow}
            className="text-lg font-semibold px-8 py-4"
          >
            Começar Agora!
          </RainbowButton>
        </div>
      </section>

      {/* Container Scroll Animation - Celular com Dashboard */}
      <div className="bg-black py-8 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SparklesCore
            id="tsparticlesscroll"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.3}
          />
        </div>
        <ContainerScroll
          titleComponent={
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Veja como funciona na{' '}
                <span className="text-orange-500">prática</span>
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Interface real da plataforma onde você acompanha seus ganhos em tempo real
              </p>
            </div>
          }
        >
          <div className="flex items-center justify-center h-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-4">
            <div className="bg-slate-900 rounded-3xl p-2 border-4 border-slate-700 shadow-2xl max-w-[220px] w-full" style={{ aspectRatio: '9/16' }}>
              <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-3 text-center h-full flex flex-col">
                <div className="flex items-center justify-center mb-3">
                  <Bitcoin className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-xs font-bold text-white">CriptoPro</span>
                </div>
                
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-2 mb-3">
                  <div className="text-green-400 text-xs font-semibold mb-1">SALDO MINERADO</div>
                  <div className="text-base font-bold text-green-500">R$ 387,45</div>
                </div>
                
                <div className="space-y-1 mb-3 flex-1">
                  <div className="bg-slate-700/50 rounded-lg p-1.5 flex justify-between items-center">
                    <span className="text-slate-300 text-xs">Etapa 1 - Concluída</span>
                    <span className="text-green-500 font-semibold text-xs">+R$ 45,20</span>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-1.5 flex justify-between items-center">
                    <span className="text-slate-300 text-xs">Etapa 2 - Concluída</span>
                    <span className="text-green-500 font-semibold text-xs">+R$ 78,15</span>
                  </div>
                  <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-1.5 flex justify-between items-center">
                    <span className="text-orange-300 text-xs">Etapa 3 - Em progresso</span>
                    <span className="text-orange-500 font-semibold text-xs">75%</span>
                  </div>
                </div>
                
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-1.5 mt-auto">
                  <div className="text-blue-400 text-xs font-semibold mb-1">PRÓXIMO GANHO</div>
                  <div className="text-blue-300 font-bold text-xs">R$ 125,80</div>
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>

      {/* Logo Carousel Section */}
      <section className="px-4 py-12 bg-black relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SparklesCore
            id="tsparticleslogos"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={25}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.3}
          />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <GradientHeading variant="secondary" size="lg">
              Suportamos as principais
            </GradientHeading>
            <GradientHeading size="xl">
              <span className="text-orange-500">Criptomoedas</span>
            </GradientHeading>
          </div>
          
          <div className="flex justify-center px-4">
            <LogoCarousel columnCount={3} logos={cryptoLogos} />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SparklesCore
            id="tsparticlestestimonials"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.3}
          />
        </div>
        <TestimonialsSection
          title="Mais de 2.500 pessoas já lucraram"
          description="Veja o que nossos usuários estão dizendo sobre seus ganhos reais"
          testimonials={testimonials}
          className="bg-black py-12 relative z-10"
        />
      </div>

      {/* Prova Social Section */}
      <section className="px-4 py-8 bg-gradient-to-r from-green-900/30 to-blue-900/30 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SparklesCore
            id="tsparticlessocial"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={15}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.3}
          />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative max-w-xs mx-auto w-full">
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 transform scale-[0.80] rounded-lg blur-3xl" />
              <div className="relative shadow-xl bg-gray-900 border border-green-500/30 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                <div className="flex items-center justify-center mb-3 w-full">
                  <Users className="w-8 h-8 text-green-500 mr-3" />
                  <span className="text-2xl font-bold text-green-500">+2.847</span>
                </div>
                <p className="text-slate-300 text-center w-full">usuários ativos lucrando nas últimas 24h</p>
                <Meteors number={15} />
              </div>
            </div>
            
            <div className="relative max-w-xs mx-auto w-full">
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 transform scale-[0.80] rounded-lg blur-3xl" />
              <div className="relative shadow-xl bg-gray-900 border border-orange-500/30 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                <div className="flex items-center justify-center mb-3 w-full">
                  <Bitcoin className="w-8 h-8 text-orange-500 mr-3" />
                  <span className="text-2xl font-bold text-orange-500">R$ 847.320</span>
                </div>
                <p className="text-slate-300 text-center w-full">total pago aos participantes hoje</p>
                <Meteors number={15} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Autoridade Section */}
      <section className="px-4 py-12 bg-black relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SparklesCore
            id="tsparticlesauthority"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={20}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.3}
          />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Segurança e Privacidade
          </h2>
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 transform scale-[0.80] rounded-lg blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-blue-500/30 px-8 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-6" />
              <p className="text-lg text-slate-300 leading-relaxed text-center">
                CriptoPro foi desenvolvido com base em protocolos de interação segura. 
                Nenhum dado sensível é armazenado, e todo o processo ocorre diretamente 
                no navegador do usuário.
              </p>
              <Meteors number={20} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="px-4 py-12 bg-gradient-to-r from-orange-900/30 to-slate-900 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SparklesCore
            id="tsparticlescta"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={25}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.3}
          />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            O sistema já está em funcionamento. Você só precisa ativar.
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Quanto mais rápido você entra, mais cedo começa a acumular.<br />
            Muitos já estão com saldo liberado. Agora é sua vez.
          </p>
          <RainbowButton 
            onClick={handleStartNow}
            className="text-lg font-semibold px-10 py-4"
          >
            Começar
            <ArrowRight className="ml-2 w-5 h-5" />
          </RainbowButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 bg-black border-t border-slate-800 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <SparklesCore
            id="tsparticlesfooter"
            background="transparent"
            minSize={0.3}
            maxSize={0.8}
            particleDensity={15}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.2}
          />
        </div>
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Bitcoin className="w-6 h-6 text-orange-500 mr-2" />
            <span className="text-xl font-bold">CriptoPro</span>
          </div>
          <p className="text-slate-400 text-sm">
            Sistema Profissional de Mineração de Ativos Digitais
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
