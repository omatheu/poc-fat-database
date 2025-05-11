# POC Regras de Negócio

Este projeto é uma prova de conceito para implementação de regras de negócio em uma aplicação backend.

## Estrutura do Projeto

```
poc-regras-negocio/
├── backend/           # Aplicação Node.js/Express
│   ├── src/
│   │   ├── controllers/  # Controladores da aplicação
│   │   ├── services/     # Lógica de negócio
│   │   └── models/       # Modelos de dados
│   └── server.js      # Arquivo principal da aplicação
├── banco/             # Scripts SQL
│   ├── estrutura.sql  # Estrutura do banco de dados
│   ├── funcoes.sql    # Funções do banco de dados
│   ├── triggers.sql   # Triggers do banco de dados
│   └── inserts.sql    # Dados iniciais
└── docker-compose.yml # Configuração do ambiente Docker
```

## Requisitos

- Docker
- Docker Compose

## Como Executar

1. Clone o repositório
2. Na pasta raiz do projeto, execute:
   ```bash
   docker-compose up -d
   ```

A aplicação estará disponível em:
- Backend: http://localhost:3000
- MySQL: localhost:3306

## Desenvolvimento

Para adicionar novas funcionalidades:

1. Crie novos endpoints no arquivo `server.js`
2. Implemente a lógica de negócio em `services/`
3. Crie os controladores em `controllers/`
4. Defina os modelos em `models/`
5. Adicione as estruturas necessárias no banco de dados em `banco/estrutura.sql` 


## Conclusão
O objetivo deste projeto foi comparar duas abordagens para a implementação de regras de negócio em sistemas de vendas: uma com as regras aplicadas diretamente no backend da aplicação e outra com as regras delegadas ao banco de dados. Para isso, foram criados dois ambientes distintos, ambos com a mesma base de dados e regras, mas com a lógica de validação e desconto sendo processada em camadas diferentes.

Durante os testes de performance, foi possível observar que ambas as abordagens funcionaram corretamente quanto à integridade dos dados e à aplicação das regras, como validação de estoque e limites de desconto por tipo de cliente. O sistema foi capaz de identificar corretamente situações de erro, como a tentativa de realizar vendas acima do estoque disponível, demonstrando a robustez das validações implementadas.

No aspecto de desempenho, os testes mostraram que a abordagem com regras no banco de dados (DB Rules) apresentou um tempo médio de resposta inferior ao da abordagem com regras no backend (Backend Rules). Especificamente, a diferença percentual foi de aproximadamente -23,85%, indicando que a centralização das regras no banco pode trazer ganhos de performance em cenários de simplicidade dos projetos.

Esses resultados reforçam a importância de avaliar o contexto e as necessidades do sistema antes de decidir onde implementar as regras de negócio. Enquanto a abordagem no backend pode oferecer maior flexibilidade e facilidade de manutenção, a implementação no banco de dados pode ser vantajosa em termos de performance e integridade transacional, especialmente em operações críticas e de alto volume.

Em resumo, o projeto atingiu seu objetivo de demonstrar, na prática, as diferenças e impactos de cada abordagem, fornecendo dados concretos para embasar decisões arquiteturais em sistemas que dependem fortemente de regras de negócio e performance.
