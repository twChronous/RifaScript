document.addEventListener("DOMContentLoaded", function() { 
  
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
});



