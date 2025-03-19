import html2pdf from 'html2pdf.js';

// Main function to handle form rendering and PDF download
const handleParticipationForm = ({formData = {}} = {}) => {
    const form1 = formData.form1;
    console.log(form1);
// sdnlsknd

// Create a container for our PDF content
    const pdfContent = document.createElement('div');
    pdfContent.style.fontFamily = 'Arial, sans-serif';
    // pdfContent.style.padding = '40px';
    pdfContent.innerHTML = generateFormHTML(form1);

// Temporarily add to document for rendering (will be removed after PDF generation)
//     pdfContent.style.position = 'absolute';
//     pdfContent.style.left = '-9999px';
    document.body.appendChild(pdfContent);

// Configure PDF options
    const options = {
        margin: 10,
        filename: 'BBPOU_Participation_Form.pdf',
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2, useCORS: true},
        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
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
// Destructure form data or use empty values if undefined
    const {
        bbpouName = '',
        entityType = '',
        bbpouType = '',
        headOfficeAddress = '',
        sponsorBank = '',
        dataCenterContact = '',
        mobileNumber = '',
        email = '',
        panNumber = '',
        gstinNumber = '',
        date = '',
        signatoryName = '',
        signatoryDesignation = '',
        uniqueId = ''
    } = formData || {};

    return `
<div style="width: 100%; max-width: 800px; margin: auto;">
    <h2 style="text-align: center; text-decoration: underline;">BBPOU Participation Form</h2>
    <p><strong>To,</strong><br>
        The Head,<br>
        Bharat Bill Payment System (BBPS),<br>
        National Payments Corporation of India,<br>
        The Capital, 1001A, B Wing,<br>
        Bandra-Kurla Complex, Bandra-East, Mumbai-400051
    </p>
    <h3 style="text-align: center; text-decoration: underline;">Application for participation as BBPOU</h3>

    <p>We <b>${formData['Name of BBPOU']}</b> (Name of the BBPOU) with Registered Office / Head Office at <b>${formData['BBPOU Address']}</b> having received in principle approval from RBI to function as a
        BBPOU, hereby apply for participation in Bharat Bill Payment System through our Sponsor Bank <b>${formData['Sponsor Bank']}</b> (Name of Sponsor Bank if applicable), and for that purpose, we hereby provide the following details to the NPCI:
    </p>

    <h4>1. Kindly take note of below details provided:</h4>
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Name of the BBPOU</th>
            <td style="border: 1px solid black; padding: 10px;"><b>${formData['Name of BBPOU']}</b></td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Type of Entity</th>
            <td style="border: 1px solid black; padding: 10px;"><b>${formData['Type of Entity']}</b></td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Type of BBPOU</th>
            <td style="border: 1px solid black; padding: 10px;"><b>${formData['Type of BBPOU']}</b></td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Address of BBPOU Head Office</th>
            <td style="border: 1px solid black; padding: 10px; word-wrap: break-word;"><b>${formData['BBPOU Address']}</b></td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Name of Sponsor Bank (if applicable)</th>
            <td style="border: 1px solid black; padding: 10px;"><b>${formData['Sponsor Bank']}</b></td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Address of Data Center</th>
            <td style="border: 1px solid black; padding: 10px;"><b>${formData['Address of Data center']}</b></td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Contact of Data Center</th>
            <td style="border: 1px solid black; padding: 10px;"><b>${formData['Contact of Data center']}</b></td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Mobile Number</th>
            <td style="border: 1px solid black; padding: 10px;"><b>${formData['Mobile Number']}</b></td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Email</th>
            <td style="border: 1px solid black; padding: 10px;"><b>${formData['Email']}</b></td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">Pan Number</th>
            <td style="border: 1px solid black; padding: 10px;"><b>${formData['PAN no']}</b></td>
        </tr>
        <tr>
            <th style="border: 1px solid black; padding: 10px; text-align: left;">GSTIN Number</th>
            <td style="border: 1px solid black; padding: 10px;"><b>${formData['GSTIN']}</b></td>
        </tr>
    </table>

    <br><br><br>

    <h4>2. Know Your Customer (KYC) / Anti Money Laundering (AML) Compliance</h4>
    <p>
        We have an established Know Your Customer (KYC) / Anti Money Laundering (AML) process and we shall comply with all the Reserve Bank of India norms and BBPS guidelines on KYC and AML.
    </p>

    <h4>3. Terms and Conditions Agreement</h4>
    <p>
        We have read and understood the terms and conditions stipulated in BBPS Procedural guidelines and we hereby agree to abide by them.
    </p>

    <h4>4. Required Documents</h4>
    <p>Please attach the following documents:</p>
    <p>
        a) In principal approval by RBI<br>
        b) Board Resolution<br>
        c) Letter of Authority (LOA)<br>
        d) Letter from Sponsor bank (for non-bank BBPOUs)<br>
        e) Tripartite Agreement (AGREEMENT WITH BBPOU/BPPCU WITH AREAS TO BE IDENTIFIED OR BBPOU AGREEING TO INCORPORATE)<br>
        f) Acceptance of BBPS business charges including onboarding / certification / one-time fees for BBPOUs sponsor bank<br>
    </p>

    <div style="margin-top: 60px; margin-bottom: 30px;">
        <label>Date:</label> <b>${date}</b>
    </div>

    <div style="text-align: right; margin-top: 40px; margin-bottom: 40px;">
        <p style="font-weight: bold;">Authorized Signatory of the BBPOU</p>
        <p>${signatoryName && signatoryDesignation ? `${signatoryName}, ${signatoryDesignation}` : 'Name and designation of Authorized Signatory'}</p>
    </div>

    <div style="text-align: center; font-weight: bold; margin-bottom: 30px;">
        <p>-------------------------------------For NPCI Use-------------------------------------</p>
    </div>

    <div style="margin-top: 20px; margin-bottom: 30px;">
        <label>Unique Identification Code:</label> <b>${uniqueId}</b>
    </div>

    <div style="text-align: right; margin-top: 40px; margin-bottom: 40px;">
        <p style="font-weight: bold;">Authorized Signatory of BBPOU</p>
    </div>

    <div style="margin-top: 40px; font-style: italic;">
        <p>This is a confidential document and should not be circulated without seeking permission from NPCI</p>
    </div>
</div>
`;
};

export default handleParticipationForm;