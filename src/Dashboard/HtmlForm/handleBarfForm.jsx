import html2pdf from 'html2pdf.js';

const handleBarfForm = ({formData = {}} = {}) => {
    const barf = formData.barf;
    console.log(barf);

    const pdfContent = document.createElement('div');
    pdfContent.style.fontFamily = 'Arial, sans-serif';
    pdfContent.innerHTML = generateFormHTML(barf);
    document.body.appendChild(pdfContent);

    const options = {
        margin: 10,
        filename: 'BBPS_Access_Request_Form.pdf',
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2, useCORS: true},
        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
    };

    html2pdf().from(pdfContent).set(options).save()
        .then(() => {
            document.body.removeChild(pdfContent);
            console.log('PDF generated and downloaded successfully');
        })
        .catch(error => {
            document.body.removeChild(pdfContent);
            console.error('Error generating PDF:', error);
        });
};

const generateFormHTML = (formData) => {
    return `
<html lang="">
<head>
<title>BBPS - Access Request Form (BARF)</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
    }
    h2{
        margin-top: 0 !important;
        padding-top: 0 !important;
    }
    .container {
        max-width: 800px;
        margin: 0 auto 20px;
        padding: 20px;
        /*border: 1px solid #ddd;*/
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
        text-align: center;
        margin-top: 40px;
    }
    .logo {
        width: 150px;
        float: right;
        margin-top: 0;
        margin-right: 20px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
    }
    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
    }
    .declaration {
        margin-top: 20px;
        font-size: 14px;
    }
    .signature {
        margin-top: 40px;
    }
</style>
</head>
<body>
<div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div class="header">
            <h2>BBPS - Access Request Form (BARF)</h2>
        </div>
        <img src="npci.png" alt="NPCI Logo" class="logo">
    </div>
    <table>
        <tr>
            <td><b>Name of the BBPOU</b></td>
            <td>${formData['Name of BBPOU'] || ''}</td>
        </tr>
        <tr>
            <td><b>BBPOU ID</b></td>
            <td>${formData['BBPOU ID'] || ''}</td>
        </tr>
        <tr>
            <td><b>Date of Request</b></td>
            <td>${formData['DatePicker'] || ''}</td>
        </tr>
    </table>
    <h3>User Details:</h3>
    <table>
        <tr>
            <th></th>
            <th>Admin 1</th>
<!--            <th>Admin 2</th>-->
        </tr>
        <tr>
            <td><b>Name</b></td>
            <td>${formData['FirstName'] || ''}</td>
<!--            <td>${formData.admin2Name || ''}</td>-->
        </tr>
        <tr>
            <td><b>Surname</b></td>
            <td>${formData['LastName'] || ''}</td>
<!--            <td>${formData.admin2Surname || ''}</td>-->
        </tr>
        <tr>
            <td><b>Department</b></td>
            <td>${formData['Department'] || ''}</td>
<!--            <td>${formData.admin2Dept || ''}</td>-->
        </tr>
        <tr>
            <td><b>Designation</b></td>
            <td>${formData['Designation'] || ''}</td>
<!--            <td>${formData.admin2Designation || ''}</td>-->
        </tr>
        <tr>
            <td><b>Mobile Number</b></td>
            <td>${formData['MobileNumber'] || ''}</td>
<!--            <td>${formData.admin2Mobile || ''}</td>-->
        </tr>
        <tr>
            <td><b>Email ID</b></td>
            <td>${formData['Email'] || ''}</td>
<!--            <td>${formData.admin2Email || ''}</td>-->
        </tr>
        <tr>
            <td><b>Access Type</b></td>
            <td>Admin</td>
<!--            <td>Admin</td>-->
        </tr>
    </table>
    <div class="declaration">
        <b>Declaration:</b> I agree to abide by the provisions and measures delineated by NPCI under its IT security policy, procedures, and all guidelines issued from time to time in this regard. I will use the application and systems as per the laid-down procedures and will not attempt unauthorized access and changes to data.
    </div>
    <div class="declaration">
        I understand that NPCI’s role is limited to creating the Admin users based on this request and Admin Users will have the privileges to create the users and assign the rights to the said users. NPCI will not be in any way responsible for any action performed by the users, including the ones who have been allotted admin rights once.
    </div>
    <div class="signature">
        <b>Authorized by,</b><br>
        Name: ${formData.authorizedBy || ''}<br>
        Designation: ${formData.authorizedDesignation || ''}<br>
        Signature: _______________<br>
        <i style="float:right; margin-bottom: 20px">(Seal & Stamp)</i>
    </div>
</div>
</body>
</html>
`;
};

export default handleBarfForm;


// skfk