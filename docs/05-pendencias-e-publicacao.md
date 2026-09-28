# Dados a confirmar e publicação

## O que a versão 1 omitiu

A pasta `site/` é a página publicada em **https://nordetech.com.br**. O canônico está em `site/index.html`. O DNS fica no Registro.br; os servidores de nome não mudam, porque o e-mail do domínio está na Hostinger (MX e SPF atuais). No Registro.br, zona DNS avançada: registro A do apex para `75.2.60.5` e CNAME `www` para o endereço `*.netlify.app` que o painel da Netlify mostrar ao adicionar o domínio. Na Netlify, o domínio principal é `nordetech.com.br`. O rodapé publica a razão social Norde Tech Solutions Ltda, o CNPJ 50.355.235/0001-74, Teresina, Piauí e o canal contato@nordetech.com.br. A marca comercial permanece NordeTech Solutions. Continuam de fora: anos de experiência, nomes de empresas e instituições, cases autorizados e política de privacidade. A seção `#cases` publica o aplicativo Caminhos de Dandara como produto final do projeto de vigilância popular em saúde com mulheres quilombolas piauienses, da 2ª chamada do edital Territórios Sustentáveis e Saudáveis na Atenção à Saúde (Inova Fiocruz), com financiamento da Fiocruz e parceria com a Fiotec e a Universidade Federal do Piauí, sem métricas. O carrossel também inclui o aplicativo VacinAção, projeto da Universidade Federal do Piauí, com o prêmio publicado no site do próprio aplicativo, e o Opepi (Observatório da Política Educacional Piauiense), com consultoria da NordeTech para a evolução da plataforma, sem métricas. Outros cases continuam de fora até haver autorização. A frase de busca da página é “desenvolvimento de sistema para projeto de pesquisa”. A garantia publicada é a entrega do software do escopo e dos critérios de aceite, não resultado científico, edital, prazo ou reembolso. O orçamento pode ser ajustado ao recurso liberado pelo projeto, sem dispensar o processo de contratação da instituição.

O JavaScript é local (`site/script.js`): revela seções ao rolar e marca o item atual do menu. `script-src` em `site/_headers` passou de `'none'` para `'self'`. Não há script externo. Sem JavaScript, o conteúdo continua visível.

## Antes de liberar o conteúdo

- [x] Nome jurídico, CNPJ e cidade no rodapé: Norde Tech Solutions Ltda, CNPJ 50.355.235/0001-74, Teresina, Piauí. A marca comercial permanece NordeTech Solutions.
- [x] Canal empresarial público no rodapé: contato@nordetech.com.br. O formulário continua sendo o caminho principal de contato.
- [ ] No painel da Netlify, adicionar `nordetech.com.br` como domínio principal e, no Registro.br, publicar o A `75.2.60.5` e o CNAME de `www`, sem apagar MX nem SPF da Hostinger. Conferir HTTPS e repetir o envio de teste do formulário em `https://nordetech.com.br`.
- [ ] Confirmar números de anos de experiência do fundador e do CNPJ antes de transformá-los em destaque.
- [ ] Validar nomes de empresas, a natureza de cada vínculo e a permissão de divulgação/logotipos.
- [ ] Fornecer ao menos um case com autorização, escopo, papel real e resultados comprováveis; preferencialmente um da área de pesquisa.
- [ ] Confirmar se Fiocruz/Fiotec/Fiape podem ser mencionadas e de que modo, com suporte documental. Não declarar credenciamento sem comprovação.
- [ ] Revisar o texto de privacidade. O canal para solicitações sobre os dados de contato é contato@nordetech.com.br. Se for publicar uma política, não usar texto fictício ou incompleto.

## Ativar recebimento de contatos (Netlify)

1. Criar/acessar a conta Netlify e abrir o projeto.
2. Em **Forms**, ativar **Enable form detection**. A detecção vale para a próxima publicação; publique novamente se tiver ativado depois da primeira.
3. Após o Cursor implementar a página, arrastar **somente `site/`** para [Netlify Drop](https://app.netlify.com/drop). Conferir se `index.html` está na raiz publicada. A pasta `site/` não existe neste ZIP de especificações. Se o deploy for pelo Git ou pela CLI a partir da raiz do repositório, o `netlify.toml` já define `publish = "site"`. Esse arquivo não substitui o Drop: arrastar a raiz do repositório publicaria a documentação.
4. Em **Forms**, confirmar que o formulário `contato` foi detectado. Em **Forms → Submission notifications → Add notification**, escolher e verificar o e-mail que receberá os avisos.
5. Enviar uma mensagem de teste pelo site **já publicado**. Conferir a confirmação na própria página, a entrada em **Forms** e a caixa de e-mail (incluindo spam). Responder ao teste.
6. Verificar em **Forms → Usage** o uso do plano. A documentação atual distingue contas com preços baseados em créditos e planos legados; conferir os limites da conta efetivamente criada.
7. Se usar domínio próprio, configurar DNS e HTTPS pelo painel e revisar metadados/endereço canônico. Fazer novo envio de teste.

## Indexação no Google

A prévia local não é indexada. `site/robots.txt` e `site/sitemap.xml` passam a valer depois da publicação. O sitemap tem uma URL: `https://nordetech.com.br/`.

1. Abrir o [Google Search Console](https://search.google.com/search-console) e adicionar a propriedade `https://nordetech.com.br/`.
2. Verificar pelo arquivo HTML ou pela metatag que o Console fornecer. Esse código entra no repositório só quando o valor for colado.
3. Enviar `https://nordetech.com.br/sitemap.xml` e pedir a indexação da página inicial.
4. Conferir no Console, dias depois, se a URL está indexada e se o título e a descrição exibidos são os da página.

## Segurança na operação

- [ ] Ativar autenticação em duas etapas na conta Netlify **e** na conta de e-mail que recebe os avisos; não compartilhar o login.
- [ ] Confirmar que o endereço publicado abre com HTTPS válido, especialmente após adicionar domínio próprio.
- [ ] Manter acesso ao painel e à caixa de e-mail apenas com quem responde aos contatos; revisar acessos periodicamente.
- [ ] Conferir no formulário publicado a indicação de proteção adicional antispam e testar uma mensagem legítima. A Netlify também filtra spam automaticamente; revisar ocasionalmente a pasta de spam para não perder contatos reais.
- [ ] Definir rotina de exclusão das mensagens que não forem mais necessárias, tanto no painel como no e-mail. A Netlify recomenda gestão ativa de envios com dados pessoais.
- [ ] Verificar na resposta publicada os cabeçalhos que o Cursor criará em `site/_headers` e confirmar que CSS e formulário continuam funcionando. Se o Cursor introduzir scripts ou serviços externos, reavaliar a política de conteúdo antes de publicar.
- [ ] Não incluir upload de arquivos, dados clínicos ou coleta de participantes nesta landing page. Se surgir essa necessidade, fazer projeto específico de segurança e privacidade.

## Limitações conhecidas

- Abrir `index.html` localmente permite revisar o visual, mas **não valida a entrega de mensagens**.
- O envio depende de a Netlify estar ativa e da detecção de formulários no deploy. Notificações por e-mail precisam ser configuradas no painel.
- A escolha concentra hospedagem e mensagens na Netlify. Para migrar a outro host, substituir o mecanismo de recebimento do formulário.
- Não divulgar informação sensível de participantes/pacientes no formulário inicial.
- Filtros antispam e validação do navegador reduzem abuso, mas não tornam impossível o envio malicioso. Não tratar mensagens recebidas como texto confiável se forem copiadas para outro sistema.
