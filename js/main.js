// main.js
const CalcNumbers = {
  arg: null,
  decimal: 2,
  historyValue: document.getElementById("historyValue"),
  visor:        document.getElementById("visor"),
  resultado:    document.getElementById("resultado"),
  history: [],
  MENSAGEN: {
    divByZero  : "Divisão 0",
    OperInvalid: "Operação invalida"
  },
  // Números: inteiros ou decimais, com sinal opcional
  isNu: function(val) {
    return /^-?\d+(\.\d+)?$/.test(val);
  },
  // Operadores válidos (com ponto de decimal)
  isOp: function(val) {
    const ops = ['/', '*', '+', '-', '%', '.'];
    return ops.includes(val);
  },

  backspace: function() {
    if (this.history.length > 0) {
      this.history.pop();
      this.visor.value = this.history.join("") || "0";
      this.tryEvaluate();
    }
  },

  // Validação simples de expressão para avaliação
  isExpss: function(expr) {
    if (!expr || expr.length === 0) return false;
    // Não começa com operador (exceto '-' para negativo)
    if (/^[+*/%]/.test(expr)) return false;
    // Não termina com operador
    if ( /[-+*/%]$/.test(expr) ) return false;
    return true;
  },

  clearAll: function() {
    this.history = [];
    this.visor.value = "0";
    this.resultado.value = "";
  },

  // Avaliação simples (opcional: substitua por parser)
  tryEvaluate: function() {
    const expr = this.visor.value;
    if (this.isExpss(expr)) {
      try {
        const val = eval(expr);
        this.resultado.value = (typeof val === "number" && isFinite(val)) ? val : "";
        this.resultado.value = parseFloat(this.resultado.value).toFixed(this.decimal);
      } catch {
        this.resultado.value = "";
      }
    } else {
      this.resultado.value = "";
    }
  },

  percentage: function(){
        vlrs = visor.value.replace("%","").split("*");
        vlr  = vlrs[0] * ( vlrs[1] / 100 );
        return vlr.toFixed(this.decimal);
  },

  main:    function() { 
    //  console.log('Ready ');  
  }
};

function returnValue(el) {
  with (CalcNumbers) {

      visor.value     = el.value.split("->")[0];
      resultado.value = el.value.split("->")[1];

      // Esvazia a pilha
      for (var i = history.length - 1; i >= 0; i--) {
        history.pop();
      }

      // Insere o valor recuperado
      for (var i = 0; i < visor.value.length; i++) {
        history.push(  visor.value[i] );
      }
  }
}

function clickButtons(a) {
  with (CalcNumbers) {
    arg = a.toString().toLowerCase().trim();
    main();  // Informa que está pronto

    // Aceita números ou operadores; evita '.' isolado como operador
    if (isNu(a) || isOp(a)) {
      // Evita duplicação de operadores: substitui último operador se houver
      if (isOp(a) && history.length > 0 && isOp(history[history.length - 1])) {
        history[history.length - 1] = a;
      } else {
        history.push(a);
      }
    }

    // Backspace
    if (history.length > 0 && arg == "backspace") {
      backspace();
    }

    if (arg == "c") { clearAll(); return ""; }

    if (arg == "=") { 
      newOption             = document.createElement("option");
      newOption.value       = visor.value+"->"+resultado.value;
      newOption.textContent = visor.value+"->"+resultado.value;
      historyValue.appendChild(newOption);
      return ""; 
    }

    if ( arg == "%" ){ 
        resultado.value = percentage();
        visor.value = visor.value + "%";
        return "";
    }

    try {
      // Exibe expressão completa no visor
      visor.value = history.join("");

      // Avalia se for uma expressão simples
      if (visor.value !== "0" && visor.value !== "" && isExpss(visor.value)) {
        tryEvaluate();
      }
    } catch (error) {
      resultado.value = MENSAGEN.OperInvalid;
    }
  }
}
