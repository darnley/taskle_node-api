# Taskle
Aplicação para gerenciamento de tarefas de projetos baseada em organização de palavras-chaves.
Este repositório é o código da API a ser consumida pelo projeto.

# Requisitos
- [Node.js 12.x](https://nodejs.org)
- [Yarn](https://yarnpkg.com/getting-started/install)

# Ambiente de desenvolvimento
Esta aplicação está preparada para funcionar com o [Visual Studio Code](https://code.visualstudio.com), tendo os [Dev Containers](https://code.visualstudio.com/docs/remote/containers) já configurados. Caso utilize essa IDE, recomendamos que faça uso dos Dev Containers para que o ambiente de desenvolvimento fique pronto rapidamente com as extensões recomendadas e configuradas.

Nesta configuração, o Visual Studio Code está configurado para `Auto Attach`. Sendo assim, para depurar a aplicação, use o seguinte comando:

```bash
$ yarn dev
```

Ao executar este comando, o Visual Studio Code deve automaticamente detectar a porta de `debug` e tudo já estará funcionando.