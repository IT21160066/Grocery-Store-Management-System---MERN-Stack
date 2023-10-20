module.exports = (purchase) => {
    const today = new Date()
    console.log('data passed')
    console.log(purchase)
    console.log("inside the pdf model")


    return `
        
        <!doctype html>
        <html lang="en">
    
        <head>
    
        <meta charset="utf-8">
        <titel></titel>
        <style>
        
        .clearfix:after {
            content: "";
            display: table;
            clear: both;
          }
          
          a {
            color: #5D6975;
            text-decoration: underline;
          }
          
          body {
            position: relative;
            width: 21cm;  
            height: 29.7cm; 
            margin: 0 auto; 
            color: #001028;
            background: #FFFFFF; 
            font-family: Arial, sans-serif; 
            font-size: 12px; 
            font-family: Arial;
          }
          
          header {
            padding: 10px 0;
            margin-bottom: 30px;
          }
          
          #logo {
            text-align: center;
            margin-bottom: 10px;
          }
          
          #logo img {
            width: 400px;
            object-fit: cover;
          }
          
          h1 {
            border-top: 1px solid  #5D6975;
            border-bottom: 1px solid  #5D6975;
            color: #5D6975;
            font-size: 2.4em;
            line-height: 1.4em;
            font-weight: normal;
            text-align: center;
            margin: 0 0 20px 0;
            background: url(dimension.png);
          }
          
          #project {
            float: left;
          }
          
          #project span {
            color: #5D6975;
            text-align: right;
            width: 52px;
            margin-right: 10px;
            display: inline-block;
            font-size: 0.8em;
          }
          
          #company {
            float: right;
            text-align: right;
          }
          
          #project div,
          #company div {
            white-space: nowrap;        
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin-bottom: 20px;
          }
          
          table tr:nth-child(2n-1) td {
            background: #F5F5F5;
          }
          
          table th,
          table td {
            text-align: center;
          }
          
          table th {
            padding: 5px 20px;
            color: #5D6975;
            border-bottom: 1px solid #C1CED9;
            white-space: nowrap;        
            font-weight: normal;
          }
          
          table .service,
          table .desc {
            text-align: left;
          }
          
          table td {
            padding: 20px;
            text-align: right;
          }
          
          table td.service,
          table td.desc {
            vertical-align: top;
          }
          
          table td.unit,
          table td.qty,
          table td.total {
            font-size: 1.2em;
          }
          
          table td.grand {
            border-top: 1px solid #5D6975;;
          }
          
          #notices .notice {
            color: #5D6975;
            font-size: 1.2em;
          }
          
          footer {
            color: #5D6975;
            width: 100%;
            height: 30px;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #C1CED9;
            padding: 8px 0;
            text-align: center;
          }
        
        </style>
    
        </head>
    
        <body>
    
        <header class="clearfix">
            <div id="logo">
                <img src="http://localhost:3000/logo.png" height="100px">
            </div>
        <!-- <h1><b>Nandana Tea</b></h1> -->
        <h1>Employee Details</h1>
    
        <div id="company" class="clearfix">
          <div>Nandana Tea PVT LTD</div>
          <div>Matara<br /> No 85004, Srilanka</div>
          <div>04122#####</div>
          <div><a href="#">peiris.anoj@gmail.com</a></div>
        </div>
        <div id="project">
          <div><span>Position</span>Employee Manager</div>
          <div><span>Name</span>Thyagi Jayathunge</div>
         
          <div><span>EMAIL</span> <a href="#">peiris.marketing@gmail.com</a></div>
          <div><span>DATE</span>${`${today}`}</div>
         
        </div>
      </header>
      <main>
        <table>
          <thead>
            <tr>
                <th>Supplier Name</th>
                <th>Item Name</th>
                <th>Price of One pieces</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Date</th>
            </tr>
          </thead>
          <tbody>
    
         ${purchase.map((pur) => {
            return (
                `   <tr>
                <td class="service">${pur.personal_name}</td>
                <td class="desc">${pur.Itemname}</td>
                <td class="desc">${pur.Price_of_one_pieces}</td>
                <td class="desc">${pur.quantity}</td>
                <td class="unit">${pur.total_amount}</td>
                <td class="unit">${pur.Date}</td>         
                </tr> `
            )
         })}  
          </tbody>
        </table>
        <div id="notices"> 
        </div>
      </main>
      <footer>
      </footer>
        </body>
        </html>
        `
  }