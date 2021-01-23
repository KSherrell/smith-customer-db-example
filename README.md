# Smith: Customer Database
## Description
Smith: Customer Database is a Sheets application we use to organize our customer information and files. It allows our office team to easily add customers to a Google Sheets database and upload customer files to Google Drive folders.

Smith automatically creates the new customer folder on the GDrive and names it after the company name. The app also creates the subfolders named after the file categories ... and then gently puts the new customer files to bed.&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;)

The vision for Smith is big: it serves as the source of truth for all our customer data and informs all our other company apps, such as the Lab Billing app mentioned below. 

## Features
- Custom menu and user interface -- UI opens in the right sidebar
- During data entry, Smith searches existing customers to help prevent duplicates
- Each customer receives a unique identifier (assigned, not app-generated -- bc this is how we do it here&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;) ) 
- Input up to 36 unique pieces of data for each customer
    - in addition, there's room for 23 lab services quotes 
        - these quotes are written to a separate job tracking and billing app (also shared on Github)
- Easily review and correct customer info before submission  
- Adds new customer names to a master name list
    - one source of customer names for all our apps, so we're all on the same page
    - this list is easily maintained by the billing team
- Attach and upload files to Google Drive folders
    - add customer files to five different categories *(we use: MSA, Quotes, COI, Name Change and Misc)*
        - attach multiple files to two of those cateogries *(Quotes, Misc)*
    - the main folders are created and named after the customer
        - a subfolder is created for each category

## Project Tech
- Javascript
- jQuery
- Node, npm
- Google App Script (and its native editor)
- CLASP
- Visual Studio Code
- HTML 
- CSS
- Materialize.css
- Github
- Git, Windows command line
- Google Drive, Sheets

## Thanks to
- This gorgeous script, Gmail2GDrive (https://github.com/ahochsteger/gmail2gdrive), which I used as the starting point for Smith's 'Write Files to Specific GDrive Folders' functionality
- Materialize.css for making it Easy Like Sunday Morning to implement a search-while-you-type feature in my user interfaces
## Working on next ...
- removing the hardCodedCheatingArray, currently dancing between Smith and the Lab Billing App 

    The hCCA exists bc I patched together the quotes functionality while tired and impatient and under the impression that the list of lab tests never ...ever... changes.
    
    So, so many lessons learned.&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;) 

