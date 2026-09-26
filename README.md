# NordeTech Solutions — site institucional

Landing estática da vertical Tecnologia para Pesquisa. O site publicado é a pasta `site/`. O restante do repositório é briefing e regra de trabalho; não entra no ar.

## Publicação

A Netlify deve importar este repositório. O `netlify.toml` define `publish = "site"`, então `docs/` e `.cursor/` ficam fora do site mesmo estando no Git.

Antes do deploy que vai receber mensagens, em **Forms** ligue **Enable form detection**. Se ligar depois, publique de novo. Em **Forms → Submission notifications**, configure o e-mail que recebe os avisos e teste um envio no endereço publicado. O formulário local não entrega mensagem.

## Estrutura

```text
nordetech-solutions-website/
├── .cursor/rules/               Regras curtas do Cursor
├── docs/                        Contexto, produto, técnica, conteúdo e publicação
├── site/                        Única pasta publicada
├── netlify.toml                 Publica somente site/
├── PROMPT_PARA_CURSOR.md        Pedido inicial do Agent
└── README.md
```

Sem Next.js, backend, banco, npm ou pipeline de build. Pendências de domínio, canônico e dados ainda não confirmados estão em `docs/05-pendencias-e-publicacao.md`.
