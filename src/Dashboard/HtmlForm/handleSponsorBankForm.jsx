import html2pdf from 'html2pdf.js';

const handleSponsorBankForm = ({ formData = {} } = {}) => {
    const sponsorBankForm = formData.sponsorBankForm;
    console.log(sponsorBankForm);

    const pdfContent = document.createElement('div');
    pdfContent.style.fontFamily = 'Arial, sans-serif';
    pdfContent.innerHTML = generateFormHTML(sponsorBankForm);
    document.body.appendChild(pdfContent);

    // Configure PDF options
    const options = {
        margin: 10,
        filename: 'Sponsor_Bank_Form.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate and download PDF
    html2pdf().from(pdfContent).set(options).save()
        .then(() => {
            // Clean up - remove the temporary element
            document.body.removeChild(pdfContent);
            console.log('PDF generated and downloaded successfully');
        })
        .catch(error => {
            document.body.removeChild(pdfContent);
            console.error('Error generating PDF:', error);
        });
};

// Function to generate HTML from form data
const generateFormHTML = (formData) => {
    return `
    <!DOCTYPE html>
<html lang="">
<head>
  <title>Undertaking to Act as Sponsor Bank</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin-top: 200px;
      font-size: 10pt;
    }
    .container {
      width: 700px;
      margin: auto;
    }
    .subject {
      font-weight: bold;
      /*text-decoration: underline;*/
    }
    .signature {
      margin-top: 20px;
      text-align: right;
    }
  </style>
</head>
<body>
  <div class="container">
    <p>To,</p>
    <p>
      The Head,<br>
      Bharat Bill Payment Service (BBPS),<br>
      National Payments Corporation of India,<br>
      Mumbai
    </p>
    <p>Dear Sir,</p>
    <p class="subject">Subject: Undertaking to act as Sponsor bank & Net Debit Cap allocation for "${formData['NameOfBBPOU'] || ''}"</p>
    <p>We, the <b>${formData['Name of Sponsor Bank'] || ''}</b>, having its registered office at <b>${formData['Sponsor bank address'] || ''}</b>, have agreed to become the Sponsor Bank for <b>${formData['NameOfBBPOU'] || ''}</b>.</p>
    <p>We do hereby declare and undertake to NPCI that:</p>
    <ol>
      <li>We shall abide by all applicable rules, regulations, and guidelines of Bharat Bill Payment System (BBPS).</li>
      <li>The Net Debit Cap per settlement cycle for <b>${formData['NameOfBBPOU'] || ''}</b> should be allocated at Rupees <b>${formData['Net debit cap per settlement cycle for BBPOU'] || ''}</b> out of the total Net Debit Cap of Rs. <b>${formData['Total net debit cap for BBPS'] || ''}</b> allocated to us.</li>
    </ol><br><br><br>
    <p>Date: <b>${formData['timestamp'] || ''}</b></p>
    <p>Place: <b>${formData['place'] || ''}</b></p>
    <p class="signature">(Authorized Signatory)</p>
  </div>
</body>
</html>
    `;
};

export default handleSponsorBankForm;
