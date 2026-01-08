// main.js
const CalcNumbers = {
  arg: null,
  decimal: 2,
  cor: "#ADFF2F",
  idioma: "eng-us",
  save: false,
  historyValue: document.getElementById("historyValue"),
  visor:        document.getElementById("visor"),
  resultado:    document.getElementById("resultado"),
  history: [],
  historyEprss: [],
  copyToClipboard: "",
  MENSAGEN: {
    divByZero  : "Divisão 0",
    OperInvalid: "Operação invalida",
    propertyInvalid: "Propiedade invalida"
  },
  // Unicas Possibilidades da property_ : decimal, cor, idioma
  property_: function(ch,vl="") {
      try {
        if ( ch in this){
          if (vl != "") {
            this[ch] = vl;
          } else {
            return this[ch];
          }
        } 
      } catch {
        console.log(this.MENSAGEN.propertyInvalid);
      }
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

  loadSetup: function() {
  
      if (localStorage.length > 3){  
      
        this.decimal       = localStorage.getItem("decimal"); 
        this.cor           = localStorage.getItem("cor"); 
        this.idioma        = localStorage.getItem("idioma"); 
        this.historyEprss  = localStorage.getItem("historyEprss").split("|");
      }

      this.historyEprss.forEach( el => {
        newOption             = document.createElement("option");
        newOption.value       = el;
        newOption.textContent = el;
        historyValue.appendChild(newOption);
      });

      document.querySelectorAll('input, select').forEach(function(elem) {
        elem.style.backgroundColor = this.cor;
      }.bind(this)); // usa o valor de this (o elemento color)
      
      document.getElementById('nDecimal').value = this.decimal;
      document.getElementById('cor').value = this.cor;
      document.getElementById('ptr-br').checked = (this.idioma=="ptr-br")?true:false;
      document.getElementById('eng-us').checked = (this.idioma=="eng-us")?true:false;

      if (this.idioma == "eng-us") {
        document.getElementById("spanPtr-Br").style.display="none";
        document.getElementById("spanEng-Us").style.display="block";
      } else if (this.idioma == "ptr-br") {
        document.getElementById("spanPtr-Br").style.display="block";
        document.getElementById("spanEng-Us").style.display="none";
      }
  
  },
  saveSetup: function() {
      
      if (localStorage.length == 0 ){
        const alertUsoLocalStorage =
        "Esta calculadora pode armazenar seu histórico de cálculos e preferências "
        +"(por exemplo, tema, casas decimais) no seu dispositivo, para que você "
        +"possa retomar de onde parou na próxima abertura. Os dados ficam no seu "
        +"navegador e não são enviados para a internet. Você concorda em salvar "
        +"esses dados localmente?\n"
        +"This calculator can store your calculation history and preferences "
        +"(e.g., theme, decimal places) on your device, so you can pick up "
        +"where you left off the next time you open it. The data is stored in "
        +"your browser and is not sent to the internet. Do you agree to save "
        +"this data locally?";
        
        youCan = confirm(alertUsoLocalStorage);
      } else {  youCan = true; }

      if ( youCan ){
        localStorage.setItem('decimal',       this.decimal);
        localStorage.setItem('cor',           this.cor);
        localStorage.setItem('idioma',        this.idioma);
        localStorage.setItem('historyEprss',  this.historyEprss.join("|"));
        window.location.reload();
      }
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
      historyEprss.push(visor.value+"->"+resultado.value);
      if (localStorage.length != 0){
          localStorage.setItem('historyEprss',  historyEprss.join("|"));
      }
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
function clickSaveSetup(){ CalcNumbers.saveSetup(); }

function resetSetup(){ 
  localStorage.clear(); 
  window.location.reload();
}
function copyToHistory(){

   navigator.clipboard.writeText(CalcNumbers.copyToClipboard);
}
function showHide(el){
    const elem = document.getElementById(el);
    elem.style.display = (elem.style.display == "block")?"none":"block";

    if (el == "tableShare"){
        let tbody = document.querySelector('#tableShareVal > tbody');
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        CalcNumbers.copyToClipboard = CalcNumbers.copyToClipboard 
        + "### Lista de Calculos\n"
        + "| expr| result |\n"
        + "| --- |:---:   |\n";

        CalcNumbers.historyEprss.forEach( ln => {
              tr = document.createElement('tr');
              tdExp = document.createElement('td');
              tdExp.textContent = ln.split("->")[0];
              tr.appendChild(tdExp);  
              tdVal = document.createElement('td');
              tdVal.textContent = ln.split("->")[1];
              tr.appendChild(tdVal);
              tbody.appendChild(tr);  

              CalcNumbers.copyToClipboard = CalcNumbers.copyToClipboard
              + "| "+ln.split("->")[0]+" | "+ln.split("->")[1]+" |\n";  
        });    
    }
}
// Pega mudança idioma
const radios = document.querySelectorAll('input[name="idioma"]');
radios.forEach(radio => {
  radio.addEventListener('change', function() {
      if (this.checked) { // Verifica se ele está marcado

          CalcNumbers.idioma = this.id;
          // console.log('Valor selecionado: ', this.id, this.value);
      }
  });
});

// Pega mudança cor
const cor = document.getElementById('cor');
cor.addEventListener('change', function() {
  CalcNumbers.cor = this.value;
  document.querySelectorAll('input, select').forEach(function(elem) {
    elem.style.backgroundColor = this.value;
  }.bind(this)); // usa o valor de this (o elemento color)

  // console.log('Valor selecionado: ', this.id, this.value);
});

const nDecimal = document.getElementById('nDecimal');
nDecimal.addEventListener('change', function() {
  CalcNumbers.decimal = this.value;
});


// Aguarda pagina carregar
setTimeout(() => {
  console.log('3 segundos passaram. Continuando...');
  // código a ser executado após a pausa
}, 3000);
// Recupera localStorage se houver
CalcNumbers.loadSetup();