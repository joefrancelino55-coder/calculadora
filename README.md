# Project Documentation: Web Calculator

A simple calculator implemented in HTML, CSS, and JavaScript. The goal is to provide a clear view of how it works, its components, data flows, and usage guidelines.

## Overview

- HTML-based user interface:
  - Input display for the expression.
  - Result display for the calculated value.
  - Saved operation history.
  - Numeric and operator keypad laid out in a table (button UI).
- Calculation logic implemented in JavaScript:
  - Basic expression validation.
  - Evaluation of simple expressions using `eval` (with safeguards to avoid common errors).
  - Support for basic arithmetic operations: addition, subtraction, multiplication, division, percentage.
  - Control functions: clear all (C/AC), backspace, "=" to save to history.
- Basic CSS styling for readability.

---
## Project Structure

- index.html
  - Page structure with the display, result, history, and the button table.
- js/main.js
  - Main calculator logic:
    - CalcNumbers object with state and helper functions.
    - Functions: isNu, isOp, backspace, isExpss, clearAll, tryEvaluate, percentage, main.
    - Global function returnValue to retrieve values from history.
    - Global function clickButtons to handle button clicks.
- css/style.css
  - Styling rules for the page, buttons, tables, and inputs.

---
## Detailed How It Works

### Main States (CalcNumbers)
- arg: current input backdrop value (string).
- decimal: number of decimal places for the result (default 2).
- historyValue: reference to the `<select id="historyValue">` for selecting history items.
- visor: reference to the `<input id="visor">` displaying the current expression.
- resultado: reference to the `<input id="resultado">` displaying the result.
- history: array storing tokens of the current expression.
- MENSAGEN: error messages for division by zero and invalid operation.

### Main Functions
- isNu(val): checks if the value is numeric (integer or decimal, with sign).
- isOp(val): checks if the value is a valid operator (/, *, +, -, %, .).
- backspace(): removes the last token from the expression if any, updates visor, and tries to re-evaluate.
- isExpss(expr): validates a simple expression (cannot start with an operator, cannot end with an operator).
- clearAll(): clears history and resets the displays.
- tryEvaluate(): evaluates the current expression in the visor if valid, updates result with decimal formatting.
- percentage(): calculates percentage based on the expression before the "%".
- main(): initialization placeholder.

### Button Interactions
- clickButtons(a):
  - Normalizes the input value to a lowercase string.
  - Accepts numbers and operators, avoiding duplicate operators.
  - Supports backspace, Clr/AC, and "=" (saves to history in the form "expr -> result").
  - For "%", computes the percentage value and updates the displays.
  - Updates visor with the full expression (history.join("")) and attempts evaluation per isExpss validation.

### History
- Pressing "=" creates a new option in the history select with the format "visor -> result" and adds it to `<select id="historyValue">`.
- The function returnValue(el) restores the expression and result from the selected history item, emptying the history stack before rebuilding it from the characters of the recovered expression.

---
## How to Use

1. Open the HTML page (index.html) in a browser.
2. Enter expressions using the calculator buttons.
   - Numbers: 0-9
   - Operators: /, *, +, -, %, .
   - Additional buttons: Clr/AC (clear all), bksp (backspace), = (calculate and save to history)
3. Press "=" to save the current expression to history with the resulting value in the format: expr -> result.
4. Select items from History:
   - The `<select id="historyValue">` lets you choose a previous expression. The returnValue function recreates the corresponding expression and result.
5. Note on percentage:
   - Pressing "%" attempts to compute the percentage based on the current expression.

---
## Technical Requirements

- HTML5
- Modern JavaScript (ES6+)
- Basic CSS (no external dependencies)

## Updates

| When?    | What? |
|----------|:-------------:|
| 2026-01-04 | PC SPaulo |
