
// Paid salary (cash)
let paySalary = 0;

// Money in the bank
let bank = 0;

// Payment on loan when money is transferred to the bank
let payment = 0;

// List of computer data objects
const computer_list = [];

 
// Add functionality to the "work" button
document.getElementById("work-btn").addEventListener("click", function() {

  // Add 100 NOK to the paid salary
  paySalary += 100;

  document.getElementById("wallet-account").innerHTML = "pay: kr" + paySalary;

});

document.getElementById("transfer-btn").addEventListener("click", function() {

    // check if outstanding loan
    outstandingLoan = document.getElementById("outstanding-loan").value;

    payment = 0;

    // Calculate payment on loan as 10 % of bank transfer
    if  (outstandingLoan > 0)  {

        payment = 0.1*paySalary;

	// Check if payment is greater than outstanding loan,
	// in that case reduce the payment
        if (outstandingLoan < payment) {

            payment = outstandingLoan;

        }

	// reduce outstanding loan by payment
        outstandingLoan -= payment;

    }

 
    // get the amount of money in the bank 
    bank = parseInt(document.getElementById("bank-balance").value);

    // add the transferred money minus payment of loan
    bank += (paySalary-payment);

    // update amount of money in the bank
    document.getElementById("bank-balance").value = bank;

    // update outstanding loan
    document.getElementById("outstanding-loan").value = outstandingLoan;

       

  // alert(paySalary);

  // set paid Salary = 0 since the money was transferred to the bank
  paySalary = 0;

  
  document.getElementById("wallet-account").innerHTML = "pay: kr" + paySalary;

  document.getElementById("bank-account").innerHTML = "Balance: kr" + bank;

});

("click", function() {

document.getElementById("balance-account").innerHTML = "Pay/Salary: $" + paySalary;

  document.getElementById("Balance").innerHTML = "Balance: kr" + bank;

});

 
// drop-down list
let computerSelect = document.getElementById("computer-select");


fetch('https://hickory-quilled-actress.glitch.me/computers')

    .then(function(response) {

        return response.json();

    })

    .then(function(computers) {

	// computers is a list of objects from the API

        computers.forEach(function(computer) {

	    // append each computer to the global array computer_list
            computer_list.push(computer);

	    // create a new item for the drop-down list
            var option = document.createElement("option");

	    // computer name
            option.text = computer.title;

            option.value = computer.id;

	    // add the item to the drop-down list
            computerSelect.appendChild(option);

 

        });

    });

   

    document.getElementById("computer-select").addEventListener("change", function() {

        let ind = this.value-1;

        let img_path  = 'https://hickory-quilled-actress.glitch.me/' + computer_list[ind].image;

        let pcname = computer_list[ind].title;

        let price = computer_list[ind].price;

        let description = computer_list[ind].description;

 

       

        document.getElementById("computer-img").src = img_path;

        document.getElementById("computer-name").innerHTML = pcname;

        document.getElementById("computer-price").innerHTML = price + " NOK";

        document.getElementById("computer-description").innerHTML = description;

       });

 

    document.getElementById("buy-btn").addEventListener("click", function() {

        // Get the drop-down list
        let select = document.getElementById("computer-select");

	// Get the selected computer position
	// in the drop-down list (1. item = 1, 2- item = 2, ---)
        let selectedValue = select.options[select.selectedIndex].value;

	// the index of the selected computer in the array computer_list
        let ind = selectedValue -1;

	// bank = money in the bank account
        bank = parseInt(document.getElementById("bank-balance").value);

	// computer price
        let price = parseInt(computer_list[ind].price);

        if (price > bank) {

            alert("You do nat have enough money to buy the computer!");

        }

        else {

            document.getElementById("bank-balance").value = bank - price;

            let navn = computer_list[ind].title;

            alert("You have bought a " + navn + ".");

     

        }

 

        });

   

   
    //  salary is not used
    //  outstandingLoan is the amount of money that the user owes to the bank
    //  loanAmount is not used
    //  loanRequest is the amount of money that the user wants to loan

    let salary, outstandingLoan, loanAmount, loanRequest;

 

    // disable input for loan amount and outstanding loan

    document.getElementById("bank-balance").disabled=true;

    document.getElementById("outstanding-loan").disabled=true;

    let rbtn = document.getElementById("repay-btn");

    rbtn.style.display = "none";

 

    document.getElementById("loan-btn").addEventListener("click", function() {

    // salary = document.getElementById("salary").value;

    loanRequest = prompt("Enter Loan amount:" + bank);

    outstandingLoan = parseInt(document.getElementById("outstanding-loan").value);

    if  (outstandingLoan > 0) {

        alert("You cannot take a loan when you have an outstanding loan!");

    }

    else {

        if (loanRequest > 2*bank) {

            alert("You cannot take a loan that is more than 2 times your bank balance!")

        }

        else {

            document.getElementById("outstanding-loan").value = loanRequest;

            document.getElementById("bank-balance").value = parseInt(loanRequest) + bank;

           

            // make repay-btn visible

            document.getElementById("repay-btn").style.display = "block";

        }

    }

    });

 

    document.getElementById("repay-btn").addEventListener("click", function() {

        outstandingLoan = parseInt(document.getElementById("outstanding-loan").value);

      if  (outstandingLoan > 0)  

    {

        bank = parseInt(document.getElementById("bank-balance").value);

        if (bank > 0) {

            if (bank >= outstandingLoan) {

                bank -= outstandingLoan;

                outstandingLoan = 0;

                let rbtn = document.getElementById("repay-btn");

                rbtn.style.display = "none";

            }

 

            }

           

            else {

                outstandingLoan -= bank;

                bank=0;

            }

            document.getElementById("outstanding-loan").value = outstandingLoan;

            document.getElementById("bank-balance").value = bank;

           

        }

   

    });

 

 
