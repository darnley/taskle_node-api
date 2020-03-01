# Taskle
Aplicação para gerenciamento de tarefas de projetos baseada em organização de palavras-chaves.

Este repositório é o código da API escrita em Typescript com Node.js a ser consumida pelo projeto.

# Requisitos
- [Node.js 12.x](https://nodejs.org)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [MongoDB](https://www.mongodb.com/download-center/community)*
- [Docker Desktop](https://www.docker.com/products/docker-desktop) _(apenas para desenvolvimento)_

# Execução da aplicação

Sendo a aplicação escrita em [Typescript](https://www.typescriptlang.org), existem alguns comando já prontos que fazem a transpilação para Javascript de forma automática. Quando em ambiente de desenvolvimento, utilizamos o [Sucrase](https://sucrase.io); quando em ambiente de produção, utilizamos os próprios comandos do [Typescript](https://www.npmjs.com/package/typescript) - o `tsc`.

## Ambiente de desenvolvimento
Esta aplicação está preparada para funcionar com o [Visual Studio Code](https://code.visualstudio.com), tendo os [Dev Containers](https://code.visualstudio.com/docs/remote/containers) já configurados. Caso utilize essa IDE, recomendamos que faça uso dos Dev Containers para que o ambiente de desenvolvimento fique pronto rapidamente com as extensões recomendadas e configuradas.

Antes de tudo, devemos obter todos os pacotes necessários para execução da aplicação. Para isso, use o seguinte comando:

```bash
$ yarn install
```

Após isso, é necessário criar o arquivo de configuração `.env`. O arquivo de exemplo para criar ele é o `.env.example`, então, pode duplicar ele, renomear a cópia para `.env` e configurar as variáveis dentro dele.

Na configuração atual, o [Visual Studio Code](https://code.visualstudio.com), tendo os [Dev Containers](https://code.visualstudio.com/docs/remote/containers) está configurado para [`Auto Attach`](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_auto-attach-feature). Sendo assim, para depurar a aplicação, use o seguinte comando:

```bash
$ yarn dev
```

Ao executar este comando, o [Visual Studio Code](https://code.visualstudio.com) deve automaticamente detectar a porta de `debug` e tudo já estará funcionando.

Esta aplicação utiliza o [MongoDB](https://www.mongodb.com/download-center/community) como banco de dados. O [Dev Containers](https://code.visualstudio.com/docs/remote/containers) automaticamente cria uma instância no Docker.

### Redirecionamento de portas no ambiente de desenvolvimento

O **servidor HTTP** terá, por padrão, sua porta redirecionada para a porta `4000`. Ou seja, após subir o servidor HTTP poderá acessar a página web acessando `http://localhost:4000` em seu navegador.

O **servidor MongoDB** terá, por padrão, sua porta redirecionada para a porta `14000`. Ou seja, após subir o servidor de banco de dados poderá acessar ele em `localhost:14000` com o usuário `root` e a senha `password123` com o MongoDB Compass, o Robo 3T ou sua ferramenta preferida. A _connection string_ de exemplo é a abaixo:

```
mongodb://root:password123@localhost:14000
```

Caso queira alterar as portas ou o usuário/senha, deve alterar em `.devcontainer/docker-compose.yml` nas variáveis de sistema e no arquivo `.env` na raíz do projeto.