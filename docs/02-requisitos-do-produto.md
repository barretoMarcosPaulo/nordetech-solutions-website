# Requisitos do produto — versão 1

## Escopo

Uma landing page (`/`) com navegação interna. A confirmação do contato aparece na própria seção, sem página separada. Não criar rotas de serviços, blog, área administrativa ou página de case individual nesta fase.

## Seções da landing page, nesta ordem

1. **Hero:** software sob medida e duas entradas claras: empresas e projetos de pesquisa. CTA para contato e âncora de pesquisa.
2. **O que fazemos:** web, mobile, backend/APIs, integrações e dados, descritos pelo benefício.
3. **Experiência:** texto institucional com fatos confirmados. Lista nominal/logos de empresas apenas após validação individual.
4. **Tecnologia para Pesquisa:** principal diferencial comercial, com mensagem dirigida a pesquisadores, exemplos concretos de entregáveis e convite para conversar mesmo sem especificação técnica.
5. **Como trabalhamos:** entender problema → definir proposta e escopo → desenvolver com acompanhamento → entregar e evoluir. A contratação depende dos processos de cada projeto/instituição.
6. **Cases:** mostrar somente projetos autorizados e documentados. Sem cases confirmados, usar uma explicação discreta de abordagens possíveis, sem disfarçá-las de resultados reais.
7. **Contato:** formulário curto que atende ambos os públicos.
8. **Rodapé:** identificação empresarial e canais reais depois de confirmados.

## Conversão e formulário

Um único formulário, campos: nome (obrigatório), e-mail (obrigatório), perfil/assunto (obrigatório: empresa, pesquisa ou outro), organização (opcional), descrição (obrigatório). Sem anexos, telefone obrigatório ou questionário longo. CTA principal: **Conversar sobre meu projeto**. Texto auxiliar: basta explicar a necessidade em poucas palavras. Não pedir dados de saúde, documentos pessoais de terceiros ou dados de participantes no primeiro contato.

Após envio aceito pelo provedor, a confirmação permanece na seção de contato. Uma falha de envio não pode ser apresentada como sucesso. O comportamento de envio real não pode ser comprovado apenas com servidor local.

## Critérios de conclusão

- Navegação funcional em celular e desktop; conteúdo legível, teclado e foco visível.
- Mensagem de pesquisa compreensível para quem não é desenvolvedor.
- Sem fatos de clientes/cases não comprovados e sem parceiros institucionais implícitos.
- HTML estático publicável arrastando `site/` para o host.
- Formulário aparece como formulário ativo no painel do host; teste de envio chega ao painel e ao e-mail configurado.
- Título, descrição, idioma `pt-BR` e hierarquia de títulos coerentes.
