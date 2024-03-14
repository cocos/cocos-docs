# Padrão de escrita do documento em inglês

O objetivo da especificação de formato é fornecer diretrizes de escrita uniformes e tornar o documento final ter uma melhor experiência de leitura.

## Use # para o título, separe o texto superior e inferior com uma linha em branco

Use # para o título de primeiro nível.<br>
Use ## para o título de segundo nível.<br>
Use ### para o título de terceiro nível.<br>
e assim por diante...

Em circunstâncias normais, não pule o uso de títulos, por exemplo, os títulos de terceiro nível não podem aparecer diretamente sob o título de primeiro nível.

Exemplo (correto):

> \# Título Principal
>
> \## Subtítulo 1
>
> \### Subtítulo 2

Exemplo (NÃO correto):

> \# Título Principal
>
> \### Subtítulo 1

## Use letras maiúsculas iniciais corretas para nomes próprios e nomes de componentes em inglês correto

Uso correto:

> Log in com o GitHub
>
> Componente Sprite

Uso incorreto:

> Login com github
>
> componente sprite

## Use espaços

### É necessário adicionar um espaço entre o número e a unidade

Uso correto:

> A largura de banda da minha casa é de 1 Gbps, e o disco rígido total é de 10 TB.

Uso incorreto:

> A largura de banda da minha casa é de 1Gbps, e o disco rígido total é de 10TB.

**Exceção: Não há necessidade de adicionar um espaço entre graus/porcentagem e número**

Uso correto:

> Hoje é uma temperatura alta de 233°.
>
> O novo MacBook Pro tem um aumento de 15% na performance da CPU.

Uso incorreto:

> Hoje é uma temperatura alta de 233 °.
>
> O novo MacBook Pro tem um aumento de 15% na performance da CPU.

### Adicione um link de salto a um documento neste repositório

Formato de link de URL: **[nome do documento da URL]\(caminho do documento da URL)**. Use pontuação em inglês de metade largura.

> por exemplo: [Monitorar e lançar eventos]\(../scripting/events.md).

Uso correto:

> Para mais detalhes, por favor consulte a documentação [Monitorar e Lançar Eventos](../scripting/events.md).

Uso incorreto:

> Para mais detalhes, por favor consulte a documentação [Monitorar e Lançar Eventos] (../scripting/events.md).

### Adicione uma URL para o documento da API

Formato de link de URL: **[nome do documento da URL]\(diretório do documento da URL)**. Use pontuação em inglês de meia largura, e não há espaços entre [] e ()

> por exemplo: [API Máscara]\(\_\_APIDOC\_\_/en/class/Mask). Use **.html** como sufixo do nome de arquivo em todos os documentos

## Use negrito entre o texto adjacente

**Nomes de painéis, componentes ou outros elementos importantes da interface no editor** são expressos em negrito.

> Formato: abra o painel \*\*Inspetor\*\* para visualizar propriedades.

Uso correto:

> Abra o painel **Inspetor** para visualizar propriedades.
>
> Clique no botão **Criar** para criar um novo nó.
>
> Arraste qualquer recurso de imagem para a propriedade **Quadro de Sprite**.

Note que o nome da propriedade no editor deve ser escrito no formato exibido no painel Inspetor.

## Use crase entre o texto adjacente

**Atributos de script e nomes de métodos são escritos de acordo com o formato exibido na API**, expressos por crase.

> Formato: defina a escala do nó por meio de \`this.node.scale\`

Uso correto:

> Defina a escala do nó por meio de `this.node.scale`.

**Nome de arquivo e caminho de arquivo**, use crase para indicar.

Formato: \`/mypath/myfile.ts\`

Se for um caminho completo, você precisa adicionar / antes dele, se não for um caminho completo, você não precisa.

Uso correto:

> O diretório de subpacote está sob o diretório `build/quickgame/dist`.

## Use linhas em branco

### O parágrafo de código e o contexto precisam ser separados por uma linha em branco

Exemplo:

> Salvar Prefab, o exemplo de código é o seguinte:
>
> ```js
> Editor.Ipc.sendToPanel('scene','scene:apply-prefab', node.uuid);
> ```
>
> Continuar parte de texto.

### A imagem e o texto superior e inferior precisam ser separados por uma linha em branco

Formato da imagem: **![Descrição da imagem]\(caminho relativo da imagem)**. Use pontuação em inglês de meia largura, e não há espaços entre !, [], ().

> por exemplo: ![background]\(quick-start/background.png)

Se a imagem for adicionada ao texto, precisa haver um espaço entre o texto adjacente

## Use linhas em branco ou \<br\> para quebra de linha

Se você usar a tecla Enter para quebrar a linha, não haverá efeito de quebra na GitBook e um espaço será adicionado.

**Efeito de quebra de linha com linha em branco**:

> Primeira linha
>
> Segunda linha

**Efeito de quebra de linha com \<br\>**:

> Primeira linha<br>
> Segunda linha

**Efeito de quebra de linha com a tecla Enter (não recomendado)**:

> Primeira linha
> Segunda linha

## Formato de escrita de nota

> Formato: **> **Nota**: não misture símbolos chinês e inglês em documentos chinês e inglês.**

Quando a nota tem mais de dois pontos, o formato de escrita é o seguinte:

> > **Notas**:<br>
> > 1. O primeiro ponto.<br>
> > 2. O segundo ponto.<br>
> > 3. Um último ponto.<br>

O efeito é o seguinte:

> **Notas**:
> 1. O primeiro ponto.
> 2. O segundo ponto.
> 3. Um último ponto.

## Introdução

### Usado na introdução de pontos de texto

Quando o texto principal é introduzido com pontos, o texto principal nos pontos, incluindo imagens, precisa ser recuado com 2/4 espaços. Geralmente, recua-se com dois espaços. por exemplo:

> - Introdução de ponto 1
>
> (Dois espaços) Parte do corpo que inicia a primeira divisão.
>
> - Introdução de ponto 2
>
> (Dois espaços) Parte do corpo que inicia a segunda divisão.
>
> (Dois espaços) ![imagem]\(link da imagem)

O efeito é o seguinte:

> - Introdução de ponto 1
>
>   Iniciar a parte de texto da primeira divisão.
>
> - Introdução de ponto 2
>
>   Iniciar a parte de texto do segundo ponto.
>
>   ![imagem]\(link da imagem)

### Introdução ao uso de pontos digitais no texto

Quando o texto principal é introduzido com pontos de **número**, o texto principal nos pontos, incluindo imagens, precisa ser recuado com **4** espaços. por exemplo:

> 1. Introdução de ponto 1
>
> (4 espaços) Parte do corpo que inicia a primeira divisão.
>
> 2. Introdução de ponto 2
>
> (4 espaços) Parte do corpo que inicia a segunda divisão.
>
> (4 espaços) ![imagem]\(link da imagem)

O efeito é o seguinte:

> 1. Introdução de sub-ponto 1
>
>     Iniciar a parte de texto da primeira divisão.
>
> 2. Introdução de sub-ponto 2
>
>     Iniciar a parte de texto do segundo ponto.
>
>     ![imagem]\(link da imagem)

## A tabela usa alinhamento à esquerda de forma uniforme

Exemplo:

| Propriedade | Descrição da Função |
| :---- | :------ |
| Propriedade 1 | Descrição 1 |
| Propriedade 2 | Descrição 2 |

Espaços apropriados podem ser reservados antes e depois para facilitar a edição.

## Dicas de gramática

- __Inicialmente__ -> __Primeiramente__.
- Atualmente, -> Atualmente,
- Links de referência relacionados -> Documentação de referência
- Não use frases como: "Agora deixe-me explicar", "ele deveria fazer isso"
- Evite textos como: "Se você nunca escreveu um programa e não se preocupe, forneceremos todo o código necessário no tutorial, basta copiar e colar na localização correta e então encontrar seu parceiro de programação para resolver esta parte do trabalho. Vamos começar a criar o script que dirige as ações do personagem principal."
- Evite textos como: "Então, "

## Sobre o nome do produto

1. Cocos Creator
2. Cocos Creator 2.4.3
3. v2.4.3
4. v3.0
5. O motor (onde se refere ao tempo de execução)
6. O editor (onde se refere ao IDE)

**Versões**:

- 2.4.3 (3.0.0)
- 2.4.3 Preview (GA/RC/Alpha/Beta ...)
- 2.4.x (3.0.x)
- 2.4 (3.0)
- 2.x (3.x)

**Nunca use**:

1. CCC ou ccc
2. Cocos (onde se refere ao Cocos Creator)
3. IDE (onde se refere ao Cocos Creator)

## Denominações técnicas

- json -> JSON
- js ou JS -> JavaScript
- ts ou TS -> TypeScript

## Nota de rodapé

Exemplo:

Texto anterior à referência de nota de rodapé.[^1]

[^1]: Comentário para incluir na nota de rodapé.

O efeito é o seguinte:

Texto anterior à referência de nota de rodapé.[^1]

[^1]: Comentário para incluir na nota de rodapé.
