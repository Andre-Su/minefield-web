# Minefield (Campo Minado)

Um simples jogo de Campo Minado desenvolvido para web, com interface responsiva e tema adaptável ao modo claro/escuro.

## Funcionalidades

- Interface responsiva, com cores baseado no Material Design 3.
- Suporte a temas claro e escuro, alternando automaticamente conforme o sistema.
- Fonte monoespaçada personalizada ([Ubuntu Mono](root/static/fonts/Ubuntu_Mono/UFL.txt)).
- Estrutura pronta para lógica de jogo em JavaScript. **EM CONSTRUÇÃO**
- Layout adaptável para dispositivos móveis.

## Estrutura do Projeto

```markdown
minefield/
├── public/
│   ├── index.html                # Página principal do jogo
│   ├── static/
│   │   ├── css/
│   │   │   └── theme.css         # CSS compilado do tema
│   │   ├── fonts/
│   │   │   └── Ubuntu_Mono/      # Fonte Ubuntu Mono e licença
│   │   ├── js/
│   │   │   └── game_logic.js     # (Lógica do jogo - a implementar)
│   │   └── site.webmanifest      # Manifesto PWA
├── scss/
│   ├── _variables.scss           # Variáveis de cor (Material Design)
│   └── theme.scss                # Tema principal em SCSS
├── temp/
│   └── scss/
│       └── theme.scss            # Versão alternativa/rascunho do tema
└── .gitignore
```

## Como rodar localmente

1. **Clone o repositório:**
   Requer Git.

   ```sh
   git clone https://github.com/Andre-Su/minefield.git
   cd minefield
   ```

2. **Compile o SCSS (opcional, se for editar o tema):**
   Requer [Sass](https://sass-lang.com/install).

   ```sh
   sass -w ./scss/theme.scss ./root/static/css/theme.css
   ```

3. **Abra o arquivo `root/index.html` no navegador.**

## Licença

### Este projeto

- O projeto é open source e está disponível para uso, estudo, modificação e distribuição do código com ou sem modificação, dando as devidas referências ao(s) autor(es).

- Não garanto o funcionamento apropriado do software e não me responsabilizo por eventuais danos causados por ele.

### Outros

- A fonte [Ubuntu Mono](root/static/fonts/Ubuntu_Mono/UFL.txt) está licenciada sob a Ubuntu Font Licence 1.0.

---

&copy; André Augusto, 2025 | Desenvolvido por [André Augusto](https://github.com/Andre-Su/)
