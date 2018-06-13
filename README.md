# BROdemy
BROdemy é um uma aplicação web voltada ao ensino de forma gratuita.
Seu objetivo é facilitar o acesso à educação de qualidade e sem custo.

## Instalação

+ Para executar é necessário ter o [Node JS](https://nodejs.org/en/) instalado. Faça download pelo link ou  [instale com o gerenciador de pacotes padrão do seu sistema](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).

+ Uma vez instalado, certifique-se de que a instalação foi bem sucedida checando a versão do Node e do [npm](https://www.npmjs.com/), gerenciador de pacotes do Javascript.

+ Exemplo:
```sh
$ node -v
v10.4.0
$ npm -v
6.1.0
```
+ Instalado o Node, clone o repositório do GitHub:
```sh
$ git clone https://github.com/LRAbbade/brodemy.git
```
+ Entre no diretório e faça o `npm` instalar as dependências necessárias:
```sh
$ cd brodemy
$ npm install
```
+ Baixe então o [MongoDB Enterprise](https://www.mongodb.com/lp/download/mongodb-enterprise)
+ Inicie o servidor local do MongoDB:
```sh
$ mongod
```
+ Para checar se o MongoDB está em execução, é possível acessá-lo diretamente pelo comando `mongo` no terminal, ou (somente no Linux) checar seu status com:
```sh
$ sudo service mongod status
```
+ Inicie então a aplicação:
```sh
$ node app
```
Para acessar o site clique no link [http://localhost:8080/](http://localhost:8080/)

## Testes

Para testar as funcionalidades do BRODemy, foi desenvolvida uma [classe de testes unitários em Python](https://docs.python.org/3/library/unittest.html), utilizando o [selenium](http://selenium-python.readthedocs.io/index.html).

+ Para executar o script de testes, primeiramente instale os requisitos utilizando o `pip`:
```sh
$ cd Tests
$ pip install requirements.txt
```
+ Baixe o [driver do chrome](http://chromedriver.chromium.org/downloads) e coloque o arquivo em uma pasta acessada pela variável `PATH` do sistema, usualmente `/usr/local/bin/`
```sh
$ sudo mv chromedriver /usr/local/bin
```
+ Execute o script de testes:
```sh
$ python bro_tests.py -v
```
+ O resultado esperado é como abaixo:
```sh
test_right_login (__main__.BRO_tests) ...
[SUCCESS] Found sign in button
[SUCCESS] Found buttons in login
[SUCCESS] Found two input elements in login page
[CHECKPOINT] Login executed
[SUCCESS] Found two account buttons on main page after login
[SUCCESS] Found 'Torne-se um instrutor' button
[SUCCESS] Found 'Minha Conta' button
[SUCCESS] Login worked correctly
ok
test_wrong_login (__main__.BRO_tests) ...
[SUCCESS] Found sign in button
[SUCCESS] Found buttons in login
[SUCCESS] Got invalid login element
ok

----------------------------------------------------------------------
Ran 2 tests in 11.172s

OK

Finished running tests
```
