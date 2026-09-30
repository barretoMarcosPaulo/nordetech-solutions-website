# Requisitos técnicos — versão 1

## Arquitetura

- O Cursor deve criar os arquivos estáticos na pasta `site/`: `index.html`, `styles.css`, `_headers` e, se necessário, `assets/`.
- HTML semântico + CSS simples; JavaScript só se indispensável para comportamento visível. Zero dependências, npm, build, backend, banco e CMS.
- Prévia local via servidor HTTP estático. Publicação da **pasta `site/`**, com `index.html` na raiz publicada.
- Host recomendado: Netlify, pela publicação manual de HTML e Netlify Forms no mesmo painel. A troca de host no futuro exige adaptar o destino do formulário, não a página toda.

## Contato

Formulário HTML nativo renderizado no HTML entregue ao host:

```html
<form name="contato" method="POST" action="/"
      data-netlify="true" netlify-honeypot="bot-field">
  <p class="campo-antispam" aria-hidden="true">
    <label>Não preencha: <input name="bot-field" tabindex="-1" autocomplete="off"></label>
  </p>
  <label>Seu e-mail <input type="email" name="email" required></label>
  <!-- Demais campos: nome, perfil, organizacao, mensagem -->
  <button type="submit">Enviar mensagem</button>
</form>
```

O host detecta formulários no HTML publicado; não converter o formulário em componente gerado exclusivamente no navegador. `name="email"` permite usar o e-mail do visitante como endereço de resposta nas notificações. Não depender do e-mail como único registro: consultar também o painel Forms. Não adicionar código SMTP no frontend.

## SEO e qualidade

Práticas do [guia inicial de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=pt-br) que cabem nesta página única:

- `html lang="pt-BR"`, um `h1`, estrutura lógica `h2`, title e meta description específicos da página. Sem meta keywords: o Google não usa essa tag, e repetir a frase de busca no texto é enchimento.
- Canônico `https://nordetech.com.br/`. O `www` redireciona para esse endereço, para não haver duas cópias.
- `site/robots.txt` libera a página, o CSS e o JavaScript. `site/sitemap.xml` lista só a URL canônica e as capturas dos cases, com a mesma legenda do `alt`.
- Texto alternativo nas imagens informativas, ao lado do case que elas ilustram. A marca decorativa fica com `alt` vazio.
- Links externos que corroboram um case usam texto que diz o destino (edital, site do aplicativo, página do observatório). São fontes confiáveis, sem `nofollow`.
- Dados estruturados só com fatos já publicados: nome do site, serviço, razão social, CNPJ, e-mail, cidade e logo. Sem avaliação, horário ou perfil social inventado.
- CSS responsivo; fonte de sistema ou hospedada localmente; layout sem deslocamentos marcantes.
- Links de âncora corretos, labels explícitos, foco visível e contraste.
- Não bloquear a página inteira se JavaScript estiver indisponível.
- Não criar páginas artificiais para palavras-chave nem declarar relação oficial com instituições para ranquear. O Search Console continua sendo passo do proprietário, em `docs/05-pendencias-e-publicacao.md`.

## Dados e publicação

- Recolher somente os campos necessários para o contato; evitar anexos e conteúdo sensível enviado espontaneamente.
- A definição final da política de privacidade, identificação/contato da empresa e prazos internos de guarda/resposta pertence ao proprietário antes da publicação.
- Apenas `site/` é público; documentação do projeto permanece fora do diretório publicado.
- Sem chaves, tokens ou credenciais no HTML/CSS. Nenhum valor secreto é necessário nesta arquitetura.
- Criar `site/_headers` com uma política de conteúdo restrita ao próprio domínio, proibição de scripts na v1, limitações de enquadramento e permissões do navegador. Configuração proposta para o Cursor implementar e testar no deploy:

```text
/*
  Content-Security-Policy: default-src 'none'; style-src 'self'; img-src 'self' data:; font-src 'self'; script-src 'none'; connect-src 'none'; form-action 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: no-referrer
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

Se no futuro adicionar mapa, vídeo, analytics ou CAPTCHA, avaliar e testar a política antes de abrir exceções; não substituir por `*`.
- Os limites `maxlength` do HTML melhoram a experiência e reduzem envios acidentais; não são controle de segurança do servidor. O formulário é público e a filtragem depende do provedor.

## Referências técnicas verificadas em setembro de 2026

- [Netlify: publicação manual](https://docs.netlify.com/deploy/create-deploys/)
- [Netlify Forms: detecção, formulário HTML, sucesso e notificações](https://docs.netlify.com/manage/forms/setup/)
- [Netlify Forms: proteção antispam](https://docs.netlify.com/manage/forms/spam-filters/)
- [Netlify Forms: limites e cobrança](https://docs.netlify.com/manage/forms/usage-and-billing/)
- [Netlify: cabeçalhos personalizados](https://docs.netlify.com/manage/routing/headers/)
