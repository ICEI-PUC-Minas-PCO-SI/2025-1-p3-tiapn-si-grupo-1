## 3.3.1 Processo 1 – Consultar Processos

O processo de Consultar Processos tem como principal objetivo centralizar e facilitar o acesso a informações sobre processos internos da organização. A proposta de melhoria visa eliminar a dependência de comunicação interpessoal, reduzir o tempo de resposta, evitar perda de dados e aumentar a autonomia dos colaboradores.

Ao ser modelado no padrão BPMN, o processo passa a ser automatizado e acessível por uma interface web amigável, com rastreabilidade, controle de permissões e registro histórico.

### Modelo BPMN de DOCUMENTAR PROCESSOS

![Modelo BPMN - Consultar Processos](/docs/images/bpmn_to_be_consultar_processo.png)

---

### Detalhamento das atividades

Abaixo estão descritas as atividades envolvidas no processo de Consultar Processos, juntamente com seus campos, tipos de dados, restrições e valores padrão.

---

#### Nome da atividade 1: Iniciar Consulta

| Campo        | Tipo          | Restrições                  | Valor default |
|--------------|---------------|------------------------------|---------------|
| código do processo | Caixa de Texto  | obrigatório, alfanumérico       |               |
| palavra-chave      | Caixa de Texto  | opcional                         |               |

**Comandos**

| Nome do botão/link | Atividade/processo de destino | Tipo     |
|--------------------|-------------------------------|----------|
| buscar             | Exibir Resultados             | default  |
| cancelar           | Fim do Processo 1             | cancel   |

---

#### Nome da atividade 2: Exibir Resultados

| Campo              | Tipo           | Restrições                      | Valor default |
|--------------------|----------------|----------------------------------|---------------|
| nome do processo   | Caixa de Texto | somente leitura                  |               |
| status atual       | Seleção única  | somente leitura                  |               |
| área responsável   | Caixa de Texto | somente leitura                  |               |
| última atualização | Data e Hora    | somente leitura                  |               |
| histórico completo | Tabela         | somente leitura                  |               |
| documento anexo    | Arquivo        | somente leitura                  |               |

**Comandos**

| Nome do botão/link | Atividade/processo de destino | Tipo     |
|--------------------|-------------------------------|----------|
| voltar             | Iniciar Consulta              | cancel   |
| finalizar          | Fim do Processo 1             | default  |

---

#### Nome da atividade 3: Fim do Processo 1

Atividade de encerramento automático do processo, sem necessidade de interação do usuário.
