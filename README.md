# Requisitos da aplicação

## Cadastro de carro

**RF**

- Deve ser possível cadastrar um novo carro.
**RN** 

- Não deve ser possível cadastrar um carro com uma placa existente.
- Não deve ser possível a placa de um carro cadastrado.
- O carro deve ser cadastrado com disponibilidade por padrão.
- O usuário responsável pelo castrado deve ser um usuário administrador.

## Listagem de carros

**RF**

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**

- O usuário não precisa estar logado no sistema.

## Cadastro de Especificação no carro

**RF**
- Deve ser possível cadastrar uma especificação para um carro.


**RN**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.


## Cadastro de imagens do carro

**RF**

- Deve ser possível cadastrar a imagem de um carro.


**RNF**

- Utilizar o multer para upload dos arquivos.

**RN**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

## Aluguel de carro

**RF**

- Deve ser possível cadastrar um aluguel.

**RN**

- O aluguel deve ter duração mínima de  24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

- O usuário deve estar com sessão ativa para fazer um aluguel
- Ao realizar um aluguel, o status do carro deverá ser alterado para indispónivel.

## Devolução de um carro
**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do  aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.

## Listagem de alugueis para usuário

**RF**
Deve ser possível realizar a busca de todos os alugueis para o usuario

**RN**
O usuário deve ter uma sessão ativa na aplicação



# Recuperar Senha
**RF**
- Deve ser possível o usuário recuperar a senha informada por email
- O usuário deve receber um e-mail com o passo a passo para recuperar a senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas.

### Legendas: 

**RF** => Requisitos funcionais

**RNF** => Requisitos não funcionais

**RN** Regra de negócio