export const mockPosts = [
  {
    id: 1,
    title: "Como implementamos um sistema de onboarding que reduziu o tempo de integração em 60%",
    content: `Após 6 meses testando diferentes abordagens, conseguimos criar um processo que realmente funciona.

**O problema:** Nossos novos funcionários levavam em média 3 meses para se tornarem produtivos. Muitos se sentiam perdidos e alguns até pediram demissão nas primeiras semanas.

**Nossa solução:**
1. **Buddy System**: Cada novo funcionário é pareado com um colega experiente
2. **Checklist Interativo**: 30-60-90 dias com marcos claros
3. **Feedback Contínuo**: Reuniões semanais nas primeiras 8 semanas
4. **Gamificação**: Pontos e badges para completar tarefas

**Resultados:**
- Tempo de integração: 3 meses → 1.2 meses
- Satisfação dos novos funcionários: 6.2/10 → 8.7/10
- Taxa de retenção no primeiro ano: 78% → 94%

Alguém mais teve experiências similares? Que estratégias funcionaram na sua empresa?`,
    author: {
      name: "Ana Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Head of People",
      reputation: 2450,
    },
    type: "Discussão",
    category: "Recursos Humanos",
    tags: ["onboarding", "rh", "processo", "eficiência", "retenção"],
    upvotes: 47,
    downvotes: 3,
    comments: 23,
    createdAt: "2h atrás",
    hasFlow: true,
    flowId: 1,
    isUpvoted: false,
    isDownvoted: false,
    isSaved: false,
  },
  {
    id: 2,
    title: "Preciso de ajuda: Como convencer a diretoria a investir em automação de processos?",
    content: `Trabalho numa empresa tradicional de 500+ funcionários e vejo muitas oportunidades de automação que poderiam economizar milhares de horas por mês.

**Situação atual:**
- Relatórios manuais que levam 2 dias para fazer
- Aprovações que passam por 6 pessoas via email
- Dados duplicados em 4 sistemas diferentes
- Funcionários fazendo trabalho repetitivo que poderia ser automatizado

**O desafio:**
A diretoria tem medo de "mexer no que está funcionando" e sempre pergunta sobre ROI, mas não conseguem ver além dos custos iniciais.

**O que já tentei:**
- Apresentação com números e projeções
- Casos de sucesso de outras empresas
- Piloto pequeno (que foi bem sucedido, mas não expandiram)

Como vocês conseguiram "vender" a automação internamente? Que argumentos funcionaram? Alguma estratégia específica para empresas mais conservadoras?

Qualquer dica é muito bem-vinda! 🙏`,
    author: {
      name: "Carlos Mendes",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Analista de Processos",
      reputation: 890,
    },
    type: "Pergunta",
    category: "Gestão",
    tags: ["automação", "gestão", "roi", "mudança", "diretoria"],
    upvotes: 34,
    downvotes: 1,
    comments: 18,
    createdAt: "4h atrás",
    hasFlow: false,
    isUpvoted: true,
    isDownvoted: false,
    isSaved: true,
  },
  {
    id: 3,
    title: "Flow Compartilhado: Sistema de Vendas B2B que aumentou nossa conversão em 40%",
    content: `Pessoal, depois de muito teste e refinamento, criei um flow completo para vendas B2B que está dando resultados incríveis aqui na empresa.

**O que o flow inclui:**
- Qualificação automática de leads (BANT + scoring personalizado)
- Sequência de follow-up baseada no perfil do prospect
- Templates de email personalizados por segmento
- Triggers automáticos baseados em comportamento
- Dashboard de acompanhamento em tempo real

**Métricas antes vs depois:**
- Taxa de conversão: 12% → 16.8%
- Tempo médio de fechamento: 45 dias → 32 dias
- Leads qualificados: +65%
- Produtividade da equipe: +30%

**Principais insights:**
1. **Timing é tudo**: Contato em até 5 minutos após interesse aumenta conversão em 900%
2. **Personalização escala**: Templates inteligentes funcionam melhor que emails genéricos
3. **Dados comportamentais**: Rastreamento de engajamento prevê intenção de compra

O flow está disponível para download e adaptação. Feedback e sugestões são muito bem-vindos!

**Próximos passos:** Estou trabalhando numa versão 2.0 com IA para scoring preditivo.`,
    author: {
      name: "Roberto Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Sales Operations Manager",
      reputation: 1650,
    },
    type: "Flow Compartilhado",
    category: "Vendas",
    tags: ["vendas", "b2b", "conversão", "automação", "crm"],
    upvotes: 89,
    downvotes: 2,
    comments: 31,
    createdAt: "6h atrás",
    hasFlow: true,
    flowId: 2,
    isUpvoted: false,
    isDownvoted: false,
    isSaved: false,
  },
  {
    id: 4,
    title: "Showcase: Dashboard de Compliance em tempo real que criamos internamente",
    content: `Queria compartilhar um projeto que desenvolvemos aqui na empresa e que está salvando nossa vida no compliance.

**O contexto:**
Empresa do setor financeiro, regulamentações pesadas, auditorias constantes. Antes tínhamos que compilar relatórios manualmente toda semana - um pesadelo de planilhas e emails.

**O que construímos:**
- Dashboard centralizado com todas as métricas de compliance
- Alertas automáticos quando algo sai dos parâmetros
- Relatórios gerados automaticamente para auditores
- Integração com todos os sistemas internos
- Histórico completo para análise de tendências

**Tecnologias usadas:**
- Backend: Python + FastAPI
- Frontend: React + D3.js para visualizações
- Banco: PostgreSQL + Redis para cache
- Monitoramento: Prometheus + Grafana

**Resultados:**
- Tempo para gerar relatórios: 8 horas → 5 minutos
- Detecção de problemas: Reativa → Proativa
- Satisfação da equipe: 📈📈📈
- Zero não-conformidades nas últimas 3 auditorias

**Screenshots e código:**
Posso compartilhar algumas telas (sem dados sensíveis) e partes do código se alguém tiver interesse.

Alguém mais trabalha com compliance? Como vocês lidam com o volume de regulamentações?`,
    author: {
      name: "Maria Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Compliance Tech Lead",
      reputation: 2100,
    },
    type: "Showcase",
    category: "Compliance",
    tags: ["compliance", "dashboard", "automação", "fintech", "regulamentação"],
    upvotes: 67,
    downvotes: 0,
    comments: 19,
    createdAt: "8h atrás",
    hasFlow: true,
    flowId: 4,
    isUpvoted: false,
    isDownvoted: false,
    isSaved: false,
  },
  {
    id: 5,
    title: "Discussão: Remote work está matando a cultura da empresa ou estamos fazendo errado?",
    content: `Trabalho numa startup que cresceu de 20 para 120 pessoas durante a pandemia, tudo remoto. Agora estamos enfrentando alguns desafios que não sei se são "normais" do remote ou se estamos fazendo algo errado.

**Problemas que estamos vendo:**
- Silos entre equipes (cada time virou uma "ilha")
- Menos inovação espontânea (aquelas ideias que surgiam no café)
- Onboarding mais difícil (especialmente para juniores)
- Algumas pessoas se sentem desconectadas da missão da empresa
- Reuniões viraram o novo email (muitas e improdutivas)

**O que já tentamos:**
- Coffee chats virtuais (baixa adesão)
- All-hands semanais (viraram monólogos)
- Slack channels temáticos (alguns funcionam, outros morrem)
- Eventos presenciais trimestrais (caros e logisticamente complexos)

**Minhas dúvidas:**
1. Isso é normal em empresas remote-first?
2. Cultura pode ser construída virtualmente ou precisa de presença física?
3. Como vocês mantêm a "magia" da startup remotamente?
4. Vale a pena investir em escritório híbrido?

**Context:** Somos uma fintech B2B, equipe jovem (média 28 anos), crescimento de 300% ao ano.

Experiências similares? Soluções que funcionaram? Estou começando a questionar se remote-first é sustentável a longo prazo...`,
    author: {
      name: "João Pedro",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Head of Operations",
      reputation: 1320,
    },
    type: "Discussão",
    category: "Gestão",
    tags: ["remote-work", "cultura", "startup", "gestão", "equipe"],
    upvotes: 42,
    downvotes: 8,
    comments: 35,
    createdAt: "12h atrás",
    hasFlow: false,
    isUpvoted: false,
    isDownvoted: false,
    isSaved: false,
  },
  {
    id: 6,
    title: "Ajuda urgente: Sistema de CRM travou e perdemos dados de 3 meses",
    content: `Pessoal, estou desesperado. Nosso CRM (Salesforce) teve um problema na migração de dados e perdemos informações de leads dos últimos 3 meses.

**Situação:**
- 2.500+ leads perdidos
- Histórico de interações sumiu
- Pipeline de R$ 1.2M em risco
- Equipe de vendas em pânico
- Backup mais recente é de 4 meses atrás

**O que aconteceu:**
Tentamos migrar para uma nova instância do Salesforce e algo deu errado no processo. A empresa que fez a migração está "investigando" há 3 dias.

**O que precisamos:**
1. Estratégias para recuperar dados de outras fontes
2. Como reconstruir o pipeline rapidamente
3. Ferramentas para consolidar informações dispersas
4. Processo para evitar que isso aconteça novamente

**Fontes de dados que ainda temos:**
- Emails (Gmail/Outlook)
- Planilhas antigas (desatualizadas)
- LinkedIn Sales Navigator
- Alguns relatórios em PDF

Alguém já passou por algo similar? Como recuperaram? Qualquer dica pode salvar nosso trimestre...

**Update:** Conseguimos acesso a alguns backups parciais, mas ainda falta muito.`,
    author: {
      name: "Lucas Ferreira",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Sales Manager",
      reputation: 450,
    },
    type: "Ajuda",
    category: "Vendas",
    tags: ["crm", "salesforce", "recuperação", "dados", "urgente"],
    upvotes: 28,
    downvotes: 0,
    comments: 16,
    createdAt: "1d atrás",
    hasFlow: false,
    isUpvoted: false,
    isDownvoted: false,
    isSaved: false,
  },
];

export const postTypes = ["Todos", "Discussão", "Pergunta", "Flow Compartilhado", "Showcase", "Ajuda"];
export const categories = ["Todos", "Recursos Humanos", "Vendas", "Tecnologia", "Compliance", "Marketing", "Gestão"];