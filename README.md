# Qualime - Avaliação de Qualidade de Vida. &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/BE-UPP/be-upp-frontend/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react)

Parte _frontend_ desenvolvida em React do projeto Avaliação de Qualidade de Vida organizado pela _startup_ Qualime.

## Instalação e Comandos

Os arquivos do projeto se encontram na pasta [frontend](https://github.com/BE-UPP/be-upp-frontend/tree/main/frontend). Antes de tudo, use o comando `npm install` para instalação de dependências.

Ao clonar o repositório, entre na pasta [frontend](https://github.com/BE-UPP/be-upp-frontend/tree/main/frontend) para que seja possível executar os seguintes comandos:

- **Inicializar o servidor:** para iniciar o servidor de desenvolvimento, utilize o comando seguinte.

```
npm start
```

- **Rodar testes:** foram feitos alguns testes para assegurar o comportamento de algumas funções, eles são encontrados em [testes](https://github.com/BE-UPP/be-upp-frontend/blob/main/frontend/src/test/validation.test.js) e podem ser executados usando o comando seguinte.

```
npm test
```

## Variáveis de ambiente

O projeto necessita de variáveis de ambiente para funcionar corretamente. O arquivo [.env-example](https://github.com/BE-UPP/be-upp-frontend/blob/main/frontend/.env-example) consta valores de exemplo das variáveis de ambiente utilizadas. Mude conforme sua necessidade.

```
PORT: porta de execução do servidor
REACT_APP_API_DOMAIN: domínio de requisição das APIs
REACT_APP_API_PORT: porta de requisição das APIs
REACT_APP_DOMAIN: domínio do servidor
REACT_APP_PORT: cópia da porta de execução do servidor para utilização no código
```

## Padronização de Código

O _Prettier_ é utilizado para formatação e o _ESlint_, para encontrar possíveis problemas presentes no código. As configurações estão presentes nos arquivos [.prettierrc](https://github.com/BE-UPP/be-upp-frontend/blob/main/frontend/.prettierrc) e [.eslintrc.json](https://github.com/BE-UPP/be-upp-frontend/blob/main/frontend/.eslintrc.json).

Ambos são rodados quando é realizado um _commit_. Mas, é possível executá-los separadamente, utilizando os seguintes comandos:

```
npm run format
npm run lint
```

## Informações Detalhadas

Informações técnicas e adicionais a respeito do projeto podem ser encontradas em:

- [Estrutura e funcionamento](https://github.com/BE-UPP/be-upp-frontend/wiki/Workflow)
- [Estrutura JSON formulário](https://github.com/BE-UPP/be-upp-frontend/wiki/Formul%C3%A1rio)

## Contribuições

O projeto foi inicialmente desenvolvido por alunos da Universidade de São Paulo (USP):

- Bruno Mazetti Saito
- Daniel Angelo Esteves Lawand
- Davi de Menezes Pereira
- Eduardo dos Santos Fiedler
- Luciano Rodrigues Saraiva Leão
- Marcos Siolin Martins
- Willian Hiroshi Takihi

e Universidade Federal do ABC (UFABC):

- Igor Neres Trindade
- Joannis Basile
- Leonardo Alves
- Malcolm Risadeiro
- William Sena Silva

## Licença

Esse projeto possui a licença do MIT. Veja mais informações em [LICENSE](https://github.com/BE-UPP/be-upp-frontend/blob/main/LICENSE).
