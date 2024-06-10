document.addEventListener("DOMContentLoaded", function() { 
    let vendedores = [
        { nome: "Luis Eduardo Lima", rifas: 0 },
        { nome: "Matheus Rodrigues", rifas: 0 },
        { nome: "Matheus Rodrigues", rifas: 0 },
        //{ nome: "Nome do Meliante", rifas: 0 },
        { nome: "Matheus Farias", rifas: 0 }
    ];

    let divrfTable = document.getElementById("rifasTable");
    let rftable = document.createElement("table");
    let rftableHead = rftable.createTHead();
    let linerftableHead = rftableHead.insertRow();
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    th1.textContent = "Vendedor";
    th2.textContent = "Rifas Vendidas";
    linerftableHead.appendChild(th1);
    linerftableHead.appendChild(th2);
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

    let compradores = [];
    let cmpCount = 1;
    let divcmpTable = document.getElementById("cmpTable");
    let cmpTable = document.getElementById("idTable");
    //let cmpTable = document.createElement("table");
/*
    let cmpHead = cmpTable.createTHead();
    let linecmpHead = cmpHead.insertRow();
    linecmpHead.insertCell().textContent = "ID";
    linecmpHead.insertCell().textContent = "Nome";
*/
    let cmpTableBody = cmpTable.createTBody();
    divcmpTable.appendChild(cmpTable);

function cadastrar() {
    let nomeIN = document.getElementById("nomeInput").value;
    let emailIN = document.getElementById("emailInput").value;
    let numeroIN = document.getElementById("numeroInput").value;
    let quant = document.getElementById("rifasInput").value;
  
    let comprador = { nome: nomeIN, email: emailIN, numero: numeroIN };
    for(let i=0; i<quant; i++){
      compradores.push(comprador);
      console.log(quant);
      localStorage.setItem('compradores', JSON.stringify(compradores));
      let cmpTableBody = document.querySelector("#cmpTable table tbody");
      let line = cmpTableBody.insertRow();
      line.insertCell().textContent = cmpCount++;
      line.insertCell().textContent = comprador.nome;
    }

    console.log("Cadastrando Usuários");

    document.getElementById("nomeInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("numeroInput").value = "";
    document.getElementById("rifasInput").value = "";
}

