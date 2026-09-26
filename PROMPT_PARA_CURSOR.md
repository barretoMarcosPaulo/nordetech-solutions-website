# Cole esta mensagem no Agent do Cursor

Leia `README.md`, todos os arquivos em `docs/` e as regras em `.cursor/rules/`. Crie do zero a landing page da NordeTech Solutions na pasta `site/`, seguindo a arquitetura e os critérios documentados. Este ZIP contém somente especificações: a implementação cabe a você.

Objetivo: um site estático, responsivo, leve e institucional, em português do Brasil, que apresente o desenvolvimento de software sob medida para empresas e dê destaque à vertical **Tecnologia para Pesquisa**. Mantenha uma única página principal com navegação por âncoras, mais a página de agradecimento. Siga a copy e a ordem de seções propostas, aprimorando a redação e a direção visual sem inventar clientes, métricas, certificados, projetos, credenciamentos nem parcerias institucionais.

Implemente em HTML/CSS e JavaScript apenas se alguma interação exigir. Não adicione framework, backend, banco, CMS, npm, serviços de envio externos ou analytics nesta etapa. Crie o formulário HTML nativo compatível com Netlify Forms: `name="contato"`, `method="POST"`, `data-netlify="true"`, `action="/obrigado.html"`, campo de e-mail com `name="email"`, honeypot e os nomes dos campos definidos nos requisitos. Não substitua o formulário por `mailto:` nem por um formulário montado apenas via JavaScript. A pasta `site/` precisa ser publicável diretamente.

Não coloque no site dados fictícios para preencher espaço. Caso faltem detalhes comerciais ou autorização para um case, mantenha uma pendência em `docs/05-pendencias-e-publicacao.md` e apresente uma seção editorial que não faça afirmações não verificadas. Não publique as pastas `docs/` nem `.cursor/`.

Segurança é requisito central: crie `site/_headers` com a política descrita nos requisitos e teste seu funcionamento; use somente recursos locais e nenhum JavaScript desnecessário. Não inclua upload ou campos de dados sensíveis. Implemente o honeypot e limites de tamanho dos campos, sabendo que validação do navegador não substitui a filtragem do host. Não invente uma política de privacidade: deixe como pendência a revisão dos dados da empresa e do processo de retenção.

Ao concluir: execute uma prévia local; confira layout móvel e desktop, âncoras, HTML semântico, foco por teclado, contraste e ausência de links quebrados. Explique os arquivos alterados e quais dados ainda precisam ser fornecidos pelo proprietário. O envio real do formulário deve ser testado **depois** da ativação e publicação na Netlify.
