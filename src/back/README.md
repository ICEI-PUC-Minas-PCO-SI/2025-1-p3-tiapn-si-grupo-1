
# 🧪 KnowFlow Process - Teste do Backend

Este repositório contém arquivos necessarios para usar as rotas do projeto knowflow

## 🚀 Instalação e Execução


1 - Crie uma pasta no seu computador chamada Knowflow 

![Pasta Criada](../../docs/images/pasta_criada.png)

2 - Abra seu Editor de Código nesta pasta vazia

![Mudar de Pasta](../../docs/images/mude_pasta.png)

3 - Faça o clone do repositorio com o comando: 

```bash
git clone https://github.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-1.git .
```

4 - Certifique-se no seu terminal que você possui NodeJs instalado com o comando:

```bash
node -v
```

![Versão node](../../docs/images/node_version.png)

5 - Caso não possua realize a instalação pelo link:

```bash
https://nodejs.org/dist/v22.16.0/node-v22.16.0-x64.msi
``` 

6 - Ainda no diretório Knowflow navegue até pasta do back:

```bash
cd src/back
```

7 - Apos isso instale as dependências do projeto:

```
npm install
```

8 - Crie um Arquivo .env na raiz da pasta back:

![Criando o Env](../../docs/images/create_env.png)

9 - Coloque o conteudo no arquivo .env ou dados do seu Postgres:
```bash
DATABASE_DIALECT=postgres
PGHOST={HOST}
PGUSER={USER}
PGPORT={PORT}
PGDATABASE={DATABASE_NAME}
PGPASSWORD={DATABASE_PASSWORD}
JWT_SECRET={FRASE_SEGURA}
```


## 📖 Testes

1 - Instale na sua maquina o Postman ou algum Client Http e importe o arquivo de Collection abaixo:
    (https://www.postman.com/downloads/)
    (https://insomnia.rest/download)


## 📬 Importar coleção Postman

Você pode importar essa coleção no [Postman](https://www.postman.com/) ou outro cliente HTTP compatível.

➡️ [Clique aqui para baixar a coleção Postman](./postman/minha-colecao.postman_collection.json)
