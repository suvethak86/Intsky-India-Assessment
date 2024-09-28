var modal = document.getElementById("invoiceModal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementById("closeModal");

// When the user clicks the button, open the modal

btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.getElementById("addItem").addEventListener("click", function() {
    // Create a new table row
    const newRow = document.createElement("tr");

    // Populate the row with input fields
    newRow.innerHTML = `
        <td><input type="text" placeholder="Title"></td>
        <td><input type="text" placeholder="Description"></td>
        <td><input type="number" placeholder="Price"></td>
        <td><input type="number" placeholder="Quantity"></td>
        <td><input type="text" placeholder="Unit"></td>
    `;

    // Append the new row to the table body
    document.querySelector("#invoiceItemsTable tbody").appendChild(newRow);
});


function generateInvoiceNumber() {
    let invoicePrefix = '8F7S887-';
    let randomNumber = Math.floor(100 + Math.random() * 900); // Random number between 100-999
    return invoicePrefix + randomNumber;
}

// Function to generate today's date
function getTodayDate() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let year = today.getFullYear();
    return `${day}-${month}-${year}`;
}

// Display auto-generated invoice number and date
document.getElementById('invoiceNumber').textContent = generateInvoiceNumber();
document.getElementById('invoiceDate').textContent = getTodayDate();

// Function to handle form submission
function generateInvoice() {
    alert('Invoice generated successfully!');
    // Here you can add the code to handle form data
}function generateInvoicePDF() {
    var { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    // Add Business Information
    doc.setFontSize(14);
    doc.text(document.getElementById('businessName').value, 10, 20);
    doc.text(document.getElementById('address').value, 10, 30);
    doc.text(document.getElementById('phone').value, 10, 40);
    doc.text(document.getElementById('email').value, 10, 50);

    // Invoice Number and Dates
    doc.setFontSize(12);
    doc.text("Invoice #: " + document.getElementById('invoiceNumber').textContent, 160, 20);
    doc.text("Payment Date: " + document.getElementById('paymentDate').value, 160, 30);
    doc.text("Invoice Date: " + document.getElementById('invoiceDate').value, 160, 40);

    // Add Client Information
    doc.setFontSize(14);
    doc.text("Client Name: " + document.getElementById('clientName').value, 10, 70);
    doc.text("Client Address: " + document.getElementById('clientAddress').value, 10, 80);
    doc.text("Phone: " + document.getElementById('clientphone').value, 10, 90);
    doc.text("Email: " + document.getElementById('clientemail').value, 10, 100);

    // Table Headers
    doc.setFontSize(10);
    doc.text("#", 10, 120);
    doc.text("Title", 20, 120);
    doc.text("Description", 60, 120);
    doc.text("Price", 120, 120);
    doc.text("Quantity", 150, 120);
    doc.text("Unit", 170, 120);

    // Table Data (This can be dynamic based on your inputs)
    let yPos = 130; // Initial position for table data
    document.querySelectorAll("#invoiceItemsTable tbody tr").forEach((row, index) => {
        const inputs = row.querySelectorAll('input');
        doc.text(String(index + 1), 10, yPos);
        doc.text(inputs[0].value, 20, yPos); // Title
        doc.text(inputs[1].value, 60, yPos); // Description
        doc.text(inputs[2].value, 120, yPos); // Price
        doc.text(inputs[3].value, 150, yPos); // Quantity
        doc.text(inputs[4].value, 170, yPos); // Unit
        yPos += 10; // Move to next line
    });

    // Add Total (You can calculate this dynamically)
    doc.setFontSize(12);
    doc.text("Total: 145,250.50 ALL", 160, yPos + 20);

    // Generate QR Code for the invoice number
    let qrcodeContainer = document.getElementById('qrcode');
    new QRCode(qrcodeContainer, {
        text: document.getElementById('invoiceNumber').textContent,
        width: 128,
        height: 128,
        correctLevel: QRCode.CorrectLevel.H
    });

    // Get the generated QR code as an image
    let qrCodeImage = qrcodeContainer.querySelector('img').src;

    // Add QR code to the PDF
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

