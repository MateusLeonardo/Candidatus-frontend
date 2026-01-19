"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { 
  Briefcase, 
  CheckCircle2, 
  BarChart3, 
  Building2, 
  Globe, 
  ArrowRight,
  FileText,
  Target,
  Zap,
  Sparkles,
  TrendingUp,
  Clock,
  Shield,
  Star
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configure-store";

export default function Home() {
  const { email } = useSelector((state: RootState) => state.user);
  const isAuthenticated = !!email;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="h-4 w-4" />
              <span>Plataforma #1 para gerenciar candidaturas</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              Transforme sua{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                busca por emprego
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              O <span className="font-semibold text-foreground">Candidatus</span> é a plataforma completa para organizar, 
              acompanhar e otimizar suas candidaturas. Tenha controle total sobre sua carreira profissional.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <Link href="/dashboard" className="flex items-center gap-2">
                      Acessar Dashboard
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 h-14 border-2 hover:scale-105 transition-all">
                    <Link href="/dashboard/aplicacoes">
                      Ver Candidaturas
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-r from-primary to-primary/90">
                    <Link href="/registrar" className="flex items-center gap-2">
                      Começar Grátis Agora
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 h-14 border-2 hover:scale-105 transition-all">
                    <Link href="/login">
                      Fazer Login
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Gratuito</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">∞</div>
                <div className="text-sm text-muted-foreground">Candidaturas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Disponível</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              <span>Funcionalidades</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Tudo que você precisa em{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                um só lugar
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Funcionalidades poderosas projetadas para transformar sua busca por emprego
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group p-8 rounded-2xl bg-card border-2 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Gestão Completa</h3>
              <p className="text-muted-foreground leading-relaxed">
                Organize todas as suas candidaturas em um único lugar. Acompanhe status, 
                datas e detalhes importantes de cada processo seletivo com facilidade.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-card border-2 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Banco de Empresas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mantenha um banco de dados completo das empresas onde você se candidatou. 
                Facilite o acompanhamento e análise de oportunidades.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-card border-2 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Múltiplas Plataformas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Registre de onde você encontrou cada vaga. LinkedIn, Indeed, Gupy e muito mais. 
                Identifique quais plataformas trazem melhores resultados.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-card border-2 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Acompanhamento Visual</h3>
              <p className="text-muted-foreground leading-relaxed">
                Visualize o progresso de todas as suas candidaturas. Pendente, em análise, 
                entrevista, aprovado ou recusado - tudo organizado visualmente.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-card border-2 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Informações Detalhadas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Registre salário, modalidade de trabalho, descrição da vaga e links importantes. 
                Nunca perca informações relevantes novamente.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-card border-2 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Organização Geográfica</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cadastre cidades e estados para filtrar e organizar suas candidaturas por 
                localização geográfica de forma inteligente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <TrendingUp className="h-4 w-4" />
                <span>Vantagens</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-8">
                Por que escolher o{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Candidatus?
                </span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <CheckCircle2 className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Organização Total</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Nunca mais perca o controle sobre suas candidaturas. Tudo organizado 
                      e acessível em um único lugar, quando você precisar.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Clock className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Economia de Tempo</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Pare de perder tempo procurando informações espalhadas. Tudo que você precisa 
                      está organizado e fácil de encontrar em segundos.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <BarChart3 className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Insights Valiosos</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Identifique padrões, melhore suas estratégias e aumente suas chances 
                      de sucesso na busca por emprego com dados reais.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Shield className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Seguro e Confiável</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Seus dados estão seguros conosco. Plataforma confiável e privada para 
                      gerenciar sua carreira profissional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 p-12 flex items-center justify-center shadow-2xl border-2 border-primary/20">
                <div className="text-center space-y-6">
                  <div className="relative inline-block">
                    <Briefcase className="h-32 w-32 text-primary mx-auto opacity-80 animate-pulse" />
                    <Sparkles className="h-8 w-8 text-primary absolute -top-2 -right-2 animate-bounce" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    Sua carreira em suas mãos
                  </p>
                  <p className="text-muted-foreground">
                    Controle total sobre seu futuro profissional
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <Sparkles className="h-12 w-12 text-primary-foreground/80 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-primary-foreground">
            Pronto para transformar sua busca por emprego?
          </h2>
          <p className="text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto">
            Junte-se ao Candidatus e tenha controle total sobre suas candidaturas. 
            Comece agora e acelere sua carreira profissional.
          </p>
          {isAuthenticated ? (
            <Button asChild size="lg" variant="secondary" className="text-lg px-10 h-14 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 bg-white text-primary hover:bg-white/90">
              <Link href="/dashboard" className="flex items-center gap-2">
                Acessar Dashboard
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg" variant="secondary" className="text-lg px-10 h-14  shadow-2xl hover:shadow-3xl transition-all hover:scale-105  text-primary ">
              <Link href="/registrar" className="flex items-center gap-2">
                Criar Conta Grátis Agora
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 border-t bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <p className="text-xl font-bold">Candidatus</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Plataforma de gerenciamento de candidaturas profissionais
              </p>
            </div>
            <div className="flex gap-8 text-sm">
              {isAuthenticated ? (
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                    Login
                  </Link>
                  <Link href="/registrar" className="text-muted-foreground hover:text-primary transition-colors font-medium">
                    Registrar
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Candidatus. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
