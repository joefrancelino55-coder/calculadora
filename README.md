# Documentação do Projeto: Calculadora Web

Calculadora simples implementada em HTML, CSS e JavaScript. O objetivo é fornecer uma visão clara do funcionamento, componentes, fluxos de dados e diretrizes de uso.

## Visão Geral

- Interface simples de usuário baseada em HTML:
  - Visor de entrada (display) para a expressão.
  - Visor de resultado com o valor calculado.
  - Histórico de operações salvas.
  - Teclado numérico e operacional disposto em uma tabela (UI de botões).
- Lógica de cálculo implementada em JavaScript:
  - Validação básica de expressão.
  - Avaliação de expressões simples usando `eval` (com validações para evitar erros comuns).
  - Suporte a operações aritméticas básicas: adição, subtração, multiplicação, divisão, porcentagem.
  - Funções de controle: limpar tudo (C/AC), backspace, "=" para salvar no histórico.
- Estilos básicos com CSS para uma aparência legível.

---
## Estrutura do Projeto

- index.html
  - Estrutura da página com o display, resultado, histórico e a tabela de botões.
- js/main.js
  - Lógica principal da calculadora:
    - Objeto CalcNumbers com estado e funções auxiliares.
    - Funções: isNu, isOp, backspace, isExpss, clearAll, tryEvaluate, percentage, main.
    - Função global returnValue para recuperar valores do histórico.
    - Função global clickButtons para tratar cliques nos botões.
- css/style.css
  - Regras de estilo para a página, botões, tabelas e inputs.

---
## Funcionamento Detalhado

### Estados Principais (CalcNumbers)
- arg: valor do segundo plano de entrada atual (string).
- decimal: número de casas decimais para o resultado (default 2).
- historyValue: referência ao elemento `<select id="historyValue">` para selecionar itens do histórico.
- visor: referência ao `<input id="visor">` que exibe a expressão atual.
- resultado: referência ao `<input id="resultado">` que exibe o resultado.
- history: array que armazena os tokens da expressão atual.
- MENSAGEN: mensagens de erro para divisão por zero e operação inválida.

### Funções Principais
- isNu(val): verifica se o valor é numérico (inteiro ou decimal, com sinal).
- isOp(val): verifica se o valor é um operador válido (/, *, +, -, %, .).
- backspace(): remove o último token da expressão se houver, atualiza visor e tenta reavaliar.
- isExpss(expr): valida expressão simples (não pode começar com operador, não pode terminar com operador).
- clearAll(): limpa o histórico e zera os visores.
- tryEvaluate(): avalia a expressão atual no visor se válida, atualiza resultado com formatação decimal.
- percentage(): calcula a porcentagem com base na expressão antes do "%".
- main(): placeholder de inicialização.

### Interações de Botões
- clickButtons(a):
  - Normaliza o valor de entrada para string minúscula.
  - Aceita números e operadores, evitando duplicação de operadores.
  - Suporte a backspace, C/AC, e "=" (salva no histórico com a forma "expr -> resultado").
  - Para "%", calcula o valor de porcentagem e atualiza os visores.
  - Atualiza visor com a expressão completa (history.join("")) e tenta avaliação conforme a validação isExpss.

### Histórico
- Ao pressionar "=", o código cria uma nova opção no select de histórico com o formato "visor -> resultado" e adiciona ao `<select id="historyValue">`.
- A função returnValue(el) restaura a expressão e o resultado a partir do valor selecionado do histórico, esvaziando a pilha de histórico antes de reconstruí-la com os caracteres da expressão recuperada.

---
## Instruções de Uso

1. Abrir a página HTML (index.html) em um navegador.
2. Digitar expressões usando os botões da calculadora.
   - Números: 0-9
   - Operadores: /, *, +, -, %, .
   - Botões adicionais: Clr/AC (limpa tudo), bksp (backspace), = (calcula e salva no histórico)
3. Ao pressionar "=", a expressão atual é salva no histórico com o valor resultante no formato: expr -> result.
4. Selecionar itens do Histórico:
   - O `<select id="historyValue">` permite selecionar uma expressão anterior. A função returnValue recria a expressão e o resultado correspondentes.
5. Cuidado com porcentagem:
   - Ao pressionar "%", o código tenta computar a porcentagem com base na expressão atual.

---
## Requisitos Técnicos

- HTML5
- JavaScript moderno (ES6+)
- CSS básico (sem dependência externa)



## Atualizações

| Quando?    | O que? |
| ---------- |:-------------:|
| 2026Jan04  | PC SPaulo     |
