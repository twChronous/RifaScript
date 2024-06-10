document.addEventListener("DOMContentLoaded", function() { 

  //const compradores = JSON.parse(localStorage.getItem('compradores')) || [];

  let vendedores = [
    { nome: "Luis Eduardo Lima", rifas: 0 },
    { nome: "a", rifas: 0 },
    { nome: "b", rifas: 0 },
    { nome: "c", rifas: 0 }
  ];
  
  let divrfTable = document.getElementById("rifasTable");
  let rftable = document.createElement("table");
  let rftableHead = rftable.createTHead();
  let linerftableHead =rftable.insertRow();
  linerftableHead.insertCell().textContent = "Vendedor";
  linerftableHead.insertCell().textContent = "Rifas Vendidas";
  let rftableBody = rftable.createTBody(); 
  vendedores.forEach(vendedor => {
    let line = rftableBody.insertRow();
    line.insertCell().textContent = vendedor.nome;
    line.insertCell().textContent = vendedor.rifas;
  });
  divrfTable.appendChild(rftable);
  
  let hideButton = document.getElementById("tableButton");
  hideButton.addEventListener("click", () => { 
    if (divrfTable.style.display === "none") {
      divrfTable.style.display = "block";
      hideButton.textContent = "Esconder Tabela";
    } else {
      divrfTable.style.display = "none";
      hideButton.textContent = "Mostrar Tabela";
    }
  });

  //fazer buttao de adicionar comprador
  //fazer tabela de compradores
  //mostar ultimpos x compradores
  //fazer senha pra ver os comppradores
  //criar dicionarios para colocar os compradoers
  //mostar nome e quantidade apenas, mas salvar email e numero
  //fazer html bonitnn
  //ver de subir site no github pages
 
  let compradores = [];
  let cmpCount = 0;
  let divcmpTable = document.getElementById("cmpTable");
  let cmpTable = document.createElement("table");
  let cmpHead = cmpTable.createTHead();
  let linecmpHead = cmpTable.insertRow();
  linecmpHead.insertCell().textContent = cmpCount++;
  linecmpHead.insertCell().textContent = "Nome";
  let cmpTableBody = cmpTable.createTBody();
  divcmpTable.appendChild(cmpTable);

  function cadastrar(){
    let quant = document.getElementById("rifasInput");
    let nomeIN = document.getElementById("nomeInput");
    let emailIN = document.getElementById("emailInput");
    let numeroIN = document.getElementById("numeroInput");
      
    //for(let i=0; i < quant; i++){
      let comprador = { nome: nomeIN, email: emailIN, numero: numeroIN };
      compradores.push(comprador);
      localStorage.setItem('compradores', JSON.stringify(compradores));
    //}

    let line = cmpTableBody.insertRow();
    line.insertCell().textContent = cmpCount++;
    line.insertCell().textContent = comprador.nome;



    document.getElementById("nomeInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("numeroInput").value = "";
    document.getElementById("rifasInput").value = "";
  }
});



