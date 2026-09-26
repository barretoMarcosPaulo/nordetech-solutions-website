# Decisão: como receber contatos sem backend

| Opção | Implementação | Consequência para o visitante | Decisão |
| --- | --- | --- | --- |
| `mailto:` | Só um link | Precisa de cliente de e-mail configurado; não há confirmação de recebimento no site | Não usar como CTA principal |
| WhatsApp | Só um link com número real | Rápido para alguns visitantes, mas exige informar número e abrir outro aplicativo | Opcional depois de fornecer número empresarial |
| Formspree | HTML simples e conta externa | Formulário no site; funciona em vários hosts, mas exige gerenciar outro serviço | Alternativa se sair da Netlify |
| Netlify Forms | HTML puro no próprio host | Preenche no site, vê confirmação; mensagens ficam no painel e avisos por e-mail | **Escolhida para v1** |

Um formulário único evita criar backend, banco, credenciais SMTP, automações e integrações. A Netlify exige habilitar detecção de formulários e configurar a notificação de e-mail. O Cursor deve criar um campo antispam simples e uma página de sucesso. Não há garantia de entrega sem um teste real depois da publicação.

## Segurança que acompanha esta escolha

- A arquitetura pedida serve apenas arquivos estáticos, sem credenciais, servidor próprio ou base de dados exposta.
- Requisitos para o Cursor: recursos locais e `site/_headers` restringindo scripts, enquadramento e origem de envio do formulário. O site publicado deve usar HTTPS.
- A Netlify aplica filtro de spam e reconhece o honeypot do formulário. CAPTCHA fica reservado para abuso persistente, pois acrescenta atrito e dependência externa.
- O formulário solicitado deve coletar somente dados comerciais de contato, sem upload. O painel guardará as mensagens e o aviso por e-mail gerará outra cópia, que deve ser protegida e eliminada conforme a rotina definida pelo proprietário.
- A conta de hospedagem e o e-mail de recebimento precisam de autenticação em duas etapas e acesso limitado. Cabeçalhos e entrega devem ser verificados após a publicação, pois a prévia local não testa a infraestrutura de produção.

Fontes oficiais: [Netlify Forms](https://docs.netlify.com/manage/forms/setup/), [notificações](https://docs.netlify.com/manage/forms/notifications/), [filtro antispam](https://docs.netlify.com/manage/forms/spam-filters/), [gestão dos envios](https://docs.netlify.com/manage/forms/submissions/), [HTTPS](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/), [2FA](https://docs.netlify.com/manage/accounts-and-billing/user-settings/), [Formspree](https://help.formspree.io/articles/account-management/account-limits), [publicação manual](https://docs.netlify.com/deploy/create-deploys/).
