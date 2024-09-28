var modal = document.getElementById("invoiceModal");

var btn = document.getElementById("openModal");

 
var span = document.getElementById("closeModal");


btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.getElementById("addItem").addEventListener("click", function() {
    
    const newRow = document.createElement("tr");

    
    newRow.innerHTML = `
        <td><input type="text" placeholder="Title"></td>
        <td><input type="text" placeholder="Description"></td>
        <td><input type="number" placeholder="Price"></td>
        <td><input type="number" placeholder="Quantity"></td>
        <td><input type="text" placeholder="Unit"></td>
    `;

    
    document.querySelector("#invoiceItemsTable tbody").appendChild(newRow);
});


function generateInvoiceNumber() {
    let invoicePrefix = '8F7S887-';
    let randomNumber = Math.floor(100 + Math.random() * 900); // Random number between 100-999
    return invoicePrefix + randomNumber;
}


function getTodayDate() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let year = today.getFullYear();
    return `${day}-${month}-${year}`;
}


document.getElementById('invoiceNumber').textContent = generateInvoiceNumber();
document.getElementById('invoiceDate').textContent = getTodayDate();


function generateInvoice() {
    alert('Invoice generated successfully!');
 
}function generateInvoicePDF() {
    var { jsPDF } = window.jspdf;
    var doc = new jsPDF();


    doc.setFontSize(14);
    doc.text(document.getElementById('businessName').value, 10, 20);
    doc.text(document.getElementById('address').value, 10, 30);
    doc.text(document.getElementById('phone').value, 10, 40);
    doc.text(document.getElementById('email').value, 10, 50);


    doc.setFontSize(12);
    doc.text("Invoice #: " + document.getElementById('invoiceNumber').textContent, 160, 20);
    doc.text("Payment Date: " + document.getElementById('paymentDate').value, 160, 30);
    doc.text("Invoice Date: " + document.getElementById('invoiceDate').value, 160, 40);

    
    doc.setFontSize(14);
    doc.text("Client Name: " + document.getElementById('clientName').value, 10, 70);
    doc.text("Client Address: " + document.getElementById('clientAddress').value, 10, 80);
    doc.text("Phone: " + document.getElementById('clientphone').value, 10, 90);
    doc.text("Email: " + document.getElementById('clientemail').value, 10, 100);


    doc.setFontSize(10);
    doc.text("#", 10, 120);
    doc.text("Title", 20, 120);
    doc.text("Description", 60, 120);
    doc.text("Price", 120, 120);
    doc.text("Quantity", 150, 120);
    doc.text("Unit", 170, 120);


    let yPos = 130; 
    document.querySelectorAll("#invoiceItemsTable tbody tr").forEach((row, index) => {
        const inputs = row.querySelectorAll('input');
        doc.text(String(index + 1), 10, yPos);
        doc.text(inputs[0].value, 20, yPos); 
        doc.text(inputs[1].value, 60, yPos); 
        doc.text(inputs[2].value, 120, yPos); 
        doc.text(inputs[3].value, 150, yPos); 
        doc.text(inputs[4].value, 170, yPos); 
        yPos += 10; 
    });

    
    doc.setFontSize(12);
    doc.text("Total: 145,250.50 ALL", 160, yPos + 20);

    let qrcodeContainer = document.getElementById('qrcode');
    new QRCode(qrcodeContainer, {
        text: document.getElementById('invoiceNumber').textContent,
        width: 128,
        height: 128,
        correctLevel: QRCode.CorrectLevel.H
    });

   let qrCodeImage = qrcodeContainer.querySelector('img').src;

    
    doc.addImage(qrCodeImage, 'PNG', 10, yPos + 40, 40, 40);

    // Add Invoice Note
    doc.text("Invoice Note:", 10, yPos + 100);
    doc.text(document.getElementById('invoiceNote').value, 10, yPos + 110);

    // Download the PDF
    doc.save("invoice.pdf");
    document.getElementById("submitInvoice").addEventListener("click", function() {
        generateInvoicePDF(); // Generate and download the PDF
    });
}

