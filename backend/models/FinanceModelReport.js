module.exports = (finances) => {
    const today = new Date()
    console.log('data passed')
    console.log(finances)
    console.log("inside the pdf model")


    return `
        
    <!doctype html>
    <html lang="en">

    <head>

    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
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
    
      .myContainer2{
        background-color: yellowgreen;

      }
    </style>

    </head>

    <body>

    <header class="clearfix">
        <div id="logo">
            <img src="http://localhost:3000/logo.png" height="100px">
        </div>
    <!-- <h1><b>Nandana Tea</b></h1> -->
    <h1>Profit / Loss Report</h1>

    <div id="company" class="clearfix">
      <div>Nandana Tea PVT LTD</div>
      <div>Matara<br /> No 85004, Srilanka</div>
      <div>04122#####</div>
      <div><a href="#">peiris.marketing@gmail.com</a></div>
    </div>
    <div id="project">
      <div><span>Position</span>Financial Manager</div>
      <div><span>Name</span>Poorna Gunasekera</div>
     
      <div><span>EMAIL</span> <a href="#">poorna.gunasekera@gmail.com</a></div>
      <div><span>DATE</span>${`${today}`}</div>
     
    </div>
  </header>
  <main>
<div class='container'>
        <br/>
        <center>
          <h2 className='profitOrLossH'>Profit / Loss Report</h2><br/>
        </center>
        
        <form className='assetsForm'>
            <div className='reportContainerProfit'>
                <div className='profitThisMonth'>
                    
                  <center>
                  <table style="width: 60%">
                  <tr>
                    <td><h5>Total Sales</h5></td>
                    <td><h5>${finances.totalSaleAmount}</h5</td>
                  </tr>
                  <tr>
                    <td><h5>Total Other Revenues</h5></td>
                    <td><h5>${finances.totalRevenue}</h5></td>
                  </tr>
                  <tr>
                    <td><h5>Total Revenue</h5></td>
                    <td><h5>${finances.totalRevenue}</h5></td>
                  </tr>
                  <tr>
                    <td><h5>Total Purchases</h5></td>
                    <td><h5>${finances.totalPurchases}</h5></td>
                  </tr>
                  <tr>
                    <td><h5>Total Other Expenses</h5></td>
                    <td><h5>${finances.totalOtherExpenses}</h5></td>
                  </tr>
                  <tr>
                    <td><h5>Total Expenses</h5></td>
                    <td><h5>${finances.totalExpense}</h5></td>
                  </tr>
                  <tr>
                    <td><h5>Profit / Loss</h5></td>
                    <td><h5>${finances.profit}</h5></td>
                  </tr>
                </table>
                  </center>
                    
                </div>
            </div>
        </form>            

    </div>
      
  
  </main>
  <footer>
  </footer>
    </body>
    </html>
        `
  }