const vendedores = [
    { nome: "Luis Eduardo Lima", rifas: 0 },
    { nome: "Matheus Rodrigues", rifas: 0 },
    { nome: "Matheus Farias", rifas: 0 }
];

document.addEventListener("DOMContentLoaded", () => {
    const divrfTable = document.getElementById("rifasTable");
    const rftable = document.createElement("table");
    const rftableHead = rftable.createTHead().insertRow();
    ["Vendedor", "Rifas Vendidas"].forEach(text => {
        let th = document.createElement("th");
        th.textContent = text;
        rftableHead.appendChild(th);
    });
    const rftableBody = rftable.createTBody();
    divrfTable.appendChild(rftable);

    const updateVendedoresTable = () => {
        rftableBody.innerHTML = "";
        vendedores.forEach(vendedor => {
            const line = rftableBody.insertRow();
            line.insertCell().textContent = vendedor.nome;
            line.insertCell().textContent = vendedor.rifas;
        });
    };

    updateVendedoresTable();

    const hideButton = document.getElementById("tableButton");
    hideButton.addEventListener("click", () => {
        divrfTable.style.display = divrfTable.style.display === "none" ? "block" : "none";
        hideButton.textContent = divrfTable.style.display === "none" ? "Mostrar Tabela" : "Esconder Tabela";
    });

    const compradores = [];
    let cmpCount = 1;
    const divcmpTable = document.getElementById("cmpTable");
    const cmpTable = document.createElement("table");
    const cmpHead = cmpTable.createTHead().insertRow();
    ["ID", "Nome"].forEach(text => {
        let th = document.createElement("th");
        th.textContent = text;
        cmpHead.appendChild(th);
    });
    const cmpTableBody = cmpTable.createTBody();
    divcmpTable.appendChild(cmpTable);

    const printVendedores = vendedores => {
        vendedores.forEach(vendedor => console.log(`Nome: ${vendedor.nome}, Rifas: ${vendedor.rifas}`));
    };

    const select = document.getElementById("selectVendedor");
    vendedores.forEach(vendedor => {
        let option = document.createElement("option");
        option.textContent = vendedor.nome;
        option.value = vendedor.nome;
        select.appendChild(option);
    });

    window.cadastrar = () => {
        const comprador = {
            nome: document.getElementById("nomeInput").value,
            email: document.getElementById("emailInput").value,
            numero: document.getElementById("numeroInput").value
        };
        const quant = parseInt(document.getElementById("rifasInput").value);
        const selectedVendedor = document.getElementById("selectVendedor").value;

        compradores.push(comprador);
        localStorage.setItem('compradores', JSON.stringify(compradores));

        const vendedor = vendedores.find(v => v.nome === selectedVendedor);
        if (vendedor) vendedor.rifas += quant;

        const line = cmpTableBody.insertRow();
        line.insertCell().textContent = cmpCount++;
        line.insertCell().textContent = comprador.nome;

        updateVendedoresTable();
        printVendedores(vendedores);

        ["nomeInput", "emailInput", "numeroInput", "rifasInput"].forEach(id => document.getElementById(id).value = "");
    };
});
