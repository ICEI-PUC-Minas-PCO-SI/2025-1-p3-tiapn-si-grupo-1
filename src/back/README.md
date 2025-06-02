
# 🧪  KnowFlow Backend - Ambiente de Teste e Execução


Este repositório contém os arquivos necessários para rodar o backend do projeto **KnowFlow**, incluindo configuração do ambiente, dependências e coleção Postman para testar as rotas da API.


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

- Postman : (https://www.postman.com/downloads/)
- Insomnia : (https://insomnia.rest/download)


## 📬 Importar coleção Postman

➡️ [Clique aqui para visualizar a coleção Postman](./postman/knowflow_collection.json)

<a href="https://raw.githubusercontent.com/ICEI-PUC-Minas-PCO-SI/2025-1-p3-tiapn-si-grupo-1/developer/src/back/postman/knowflow_collection.json" download="knowflow_collection.json">
📥 Clique aqui para baixar a coleção Postman
</a>



Essa coleção contém exemplos de requisições prontas para testar todas as rotas do projeto.  



## 👽 
