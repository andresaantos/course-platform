# Course Platform - SaaS Multiusuário

Plataforma completa de cursos online estilo Udemy com React, Node.js e PostgreSQL.

## Funcionalidades

- ✅ Autenticação JWT com múltiplos papéis (Aluno, Instrutor, Admin)
- ✅ Catálogo de cursos com busca e filtros
- ✅ Sistema de pagamentos via Stripe
- ✅ Upload e streaming de vídeos protegido
- ✅ Dashboard para instrutores com analytics
- ✅ Sistema de avaliações e comentários
- ✅ Painel administrativo completo
- ✅ Responsivo e mobile-first

## Instalação

1. Clone o repositório
2. Configure as variáveis de ambiente
3. Execute: `npm run setup`
4. Configure o banco: `cd backend && npm run migrate`
5. Inicie: `npm run dev`

## Tecnologias

- **Frontend**: React 18, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, Prisma ORM
- **Banco**: PostgreSQL
- **Pagamentos**: Stripe
- **Storage**: AWS S3
- **Deploy**: Docker ready

## Estrutura

```
├── backend/          # API Node.js
├── frontend/         # React App
├── docs/            # Documentação
└── docker/          # Configurações Docker
```

## Licença

MIT License