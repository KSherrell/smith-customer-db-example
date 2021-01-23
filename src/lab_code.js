let labBillingApp_Id = "";
let smithId = "";

function sampleIntake() {
    let tmp_sampleIntake = HtmlService.createTemplateFromFile('lab_sampleIntake');
    tmp_companyNameList = fetchActiveCustomers();
    ui.showSidebar(tmp_sampleIntake.evaluate().setTitle("Lab: Sample Intake"));
}

function labJobComplete() {
    let tmp_lab_jobComplete = HtmlService.createTemplateFromFile('lab_jobComplete');
    ui.showSidebar(tmp_lab_jobComplete.evaluate().setTitle("Lab: Job Complete"));
}

function hCCA() {
    //move this to a use-managed solution -- and quit judging me, Me :) 
        let hardCodedCheatingArr = [
"Natural Gas 6+/C7+  (GPA 2261)",
"Natural Gas 6+/C7+ with H2S or O2  (GPA 2261)",
"Refinery Gas 6+/C7+  (ASTM D1945/ UOP539)", 
"Natural Gas Extended C10+, BTEX  (GPA 2286)",
"Gas HSE Fee  (Fees)",
"NGL/LPG/Pure Product C6+/C7+  (GPA 2177)",
"Condensate/Crude Oil C6+  (GPA 2103M)",
"Condensate/Crude Oil C7+  (GPA 2103M)",
"NGL/LPG/Pure Product Extended C10+  (GPA 2186)",
"Condensate/Crude Oil C10+  (GPA 2103/2186M)",
"Condensate/Crude Oil C31+  (GPA 2186M)",
"Sulfur Analysis  (ASTM D5623)",
"Detailed Hydrocarbon Analysis  (ASTM D 6730)",
"Refinery Liquid Analysis  (ASTM 4424)",
"RVP Analysis #1 (Petroleum Products)  (ASTM D 5191)",
"RVP Analysis #2 (Crude Oil)  (ASTM D 6377)",
"H2S in Crude Oil  (ASTM D 5705)",
"Distillation/Liquid Hydrocarbon  (ASTM D 86)",
"BS & W Analysis  (ASTM D 4007)",
"Condensate/Crude Oil Shrinkage  (API 20.1M)",
"API Gravity of Crude/ Light Petroleum products  (ASTM D 1298)",
"API/ Specific Gravity of Crude Oil by Hydrometer  (ASTM D 287)",
"Natural Gas Extended C9 BLM (GPA 2261)"
    ];

    return hardCodedCheatingArr;
}

function getCustomQuoteArray(tabName, compName){
let quoteTab = SpreadsheetApp.openById(labBillingApp_Id).getSheetByName(tabName);
let customQuote = quoteTab.createTextFinder(compName).matchCase(true).matchEntireCell(true).findNext();

if(!customQuote){
return;
}
let quoteRow = customQuote.getRow();
let cols = 23;//there are 23 lab tests right now
let myArray = [
        "labtest01",
        "labtest02",
        "labtest03",
        "labtest04",
        "labtest05",
        "labtest06",
        "labtest07",
        "labtest08",
        "labtest09",
        "labtest10",
        "labtest11",
        "labtest12",
        "labtest13",
        "labtest14",
        "labtest15",
        "labtest16",
        "labtest17",
        "labtest18",
        "labtest19",
        "labtest20",
        "labtest21",
        "labtest22",
        "labtest23"
    ];

let customQuoteArr = quoteTab.getRange(quoteRow, 3, 1, cols).getValues()[0];
let greenQuotesArr = [];
let len = customQuoteArr.length;

for(i = 0; i< len; i++){

  if(customQuoteArr[i] != ""){
     greenQuotesArr.push(myArray[i])
    }
}
    return greenQuotesArr;
}

//this function is smith-tab-specific -- ON PURPOSE, FutureMe. :) 
function fetchActiveCustomers(origin) {
    let masterListSheet = SpreadsheetApp.openById(smithId).getSheetByName("MASTER_LIST_COMPANY_NAMES");
    
    //to return the active customers, for now -- will inform from the customerData tab during updateCustomer coding
    let lr = masterListSheet.getLastRow();
    let smith_activeCustArr = masterListSheet.getRange(2, 1, lr, 3).getValues(); 
    let activeCustomers = [];
    let custListObj = {};
    let theListHtml = '';
    activeCustomers = smith_activeCustArr.filter(function (cust) {
        return cust[0] == false;
    })
    let len = activeCustomers.length;
    if (origin == "autoComp") {
        for (let i = 0; i < len; i++) {
            custListObj[activeCustomers[i][1]] = null
        }
        return custListObj;
    } else if (origin == "autoCompCode") {
        for (let i = 0; i < len; i++) {
            custListObj[activeCustomers[i][2]] = null
        }
        return custListObj;
    } else {
        for (let i = 0; i < len; i++) {
            theListHtml += '<option>' + activeCustomers[i][1] + '</option>';
        }
        return theListHtml;
    }
};


function logJobComplete(dataObj) {
    let labJobCompletedDate = new Date().toDateString();
    let completedJobId = dataObj.labJobId;
    let labBilling = SpreadsheetApp.openById(labBillingApp_Id);
    let tab = labBilling.getSheetByName("labSamples");
    let range = tab.createTextFinder(completedJobId).matchCase(true).matchEntireCell(true).findNext();
    
    if (!range) {
        return 'notFound'
    };
    
    
    let row = range.getRow();
    //labJobCompletedDate is in col 57
    let alreadyLogged = tab.getRange(row, 57).getValue();

    if (alreadyLogged) {
        ui.alert("This job was logged as Complete on " + alreadyLogged);
        return "OOPS"
    }
    
    //write the values to the job complete cells
   tab.getRange(row, 52).setValue(dataObj.collectionFees); 
   tab.getRange(row, 53).setValue(dataObj.liquidHD);
   tab.getRange(row, 54).setValue(dataObj.cylRental);
   tab.getRange(row, 55).setValue(dataObj.chemConsult);
   tab.getRange(row, 56).setValue(dataObj.pistonRental);
   tab.getRange(row, 57).setValue(labJobCompletedDate);
    
    //proper formatting is so important
    tab.getRange(row, 1, 1, 57).setBackground("#eeffd5");
    tab.getRange(row, 58).insertCheckboxes();
    
    try {
        //send mail: recipient, subject, body, options
        GmailApp.sendEmail('', 'Lab Job Complete', 'Hi!\n\nLab services have been completed for job ID:  ' + completedJobId  ) + "\n\nHave a great day!\n--Kim :)";
    } catch (err) {
        console.error(err)
    };
    return "AOK";
}

//in case I need to capture the formObj before it goes to submitForm()
function scrubForm(formObj) {
    return submitForm(formObj);
}

function getTheCompCode(compName) {
    let smith = SpreadsheetApp.openById(smithId);
    let range = smith.getSheetByName("MASTER_LIST_COMPANY_NAMES").createTextFinder(compName).matchCase(true).matchEntireCell(true).findNext();
    let row = range.getRow();
    let code = smith.getSheetByName("MASTER_LIST_COMPANY_NAMES").getRange(row, 3).getValue();
    return code;
};

function getDropDownArray() {
    let labBilling = SpreadsheetApp.openById(labBillingApp_Id);
    //the OneBigListofFieldNames
    let tab = labBilling.getSheetByName("fieldNames");
    let lastRow = tab.getLastRow();
    return tab.getRange(2, 1, lastRow, 4).getValues();
};
