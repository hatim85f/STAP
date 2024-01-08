const data = [
  {
    name: "Creating Your User Account",
    route: "Account is being created once registered as a User",
    steps: [
      {
        step: "Download the App or Visit the Website",
        details: [
          "Instructions on how to download the mobile app or access the website.",
        ],
      },
      {
        step: "Sign Up",
        details: [
          "Creating your personal user account by providing details such as name, email, and password.",
        ],
      },
      {
        step: "Account Verification",
        details: [
          "Verifying your email and phone number (if required) to activate your user account.",
        ],
      },
      {
        step: "Logging In",
        details: ["How to log in with your newly created user account."],
      },
    ],
  },
  {
    name: "Creating Your Business Account",
    route: "Account is being created once registered as Business Owner",
    steps: [
      {
        step: "Navigate to Business Account",
        details: [
          "How to access the business account creation section within the app or website.",
        ],
      },
      {
        step: "Business Details",
        details: [
          "Inputting your business name, logo, type, currency, contact information, and a brief description.",
        ],
      },
      {
        step: "Adding Products",
        details: [
          "Instructions for adding your products (physical goods or services) along with their pricing details.",
        ],
      },
      {
        step: "Business Account Confirmation",
        details: ["Confirming your business account setup."],
      },
    ],
  },
  {
    name: "Inviting and Creating Team Members",
    route: "Explore team management and member invitations",
    steps: [
      {
        step: "Accessing the Team Section",
        details: ["How to navigate to the team management section."],
      },
      {
        step: "Adding Team Members",
        details: [
          "Instructions for adding team members by providing their details and roles.",
        ],
      },
      {
        step: "Sending Invitations",
        details: [
          "How to send invitation emails to team members with temporary passwords and download links.",
        ],
      },
      {
        step: "Activation",
        details: [
          "Guide on how team members can activate their accounts and set their passwords.",
        ],
      },
      {
        step: "Team Member Management",
        details: [
          "Managing team members, modifying their details, and granting specific authorities (if applicable).",
        ],
      },
    ],
  },
  {
    name: "Setting Targets and Goals",
    route: "Guide on setting targets for products and sales teams",
    steps: [
      {
        step: "Option 1: Individual Target Setting",
        details: [
          "Navigate to the Products section.",
          "Select the product for which you want to add a target.",
          "Choose whether to keep the cost price the same or change it.",
          "Add the start period for the target.",
          "Set the target units for the corresponding product.",
          "Select the target period: Monthly, Quarterly, Yearly.",
          "Choose phasing data or distribute the target equally across months.",
          "Select the target type: Monthly, Quarterly, Yearly, Bulk.",
        ],
      },
      {
        step: "Option 2: Bulk Target Upload",
        details: [
          "Navigate to the Target section in the drawer menu.",
          "Click on 'Upload Target'.",
          "On the target upload page, you'll see a table of all your items.",
          "Set Starting Period which will be the same for all items.",
          "For each item, add target units, cost price, and select the target type.",
          "Choose phasing data or distribute the target equally across months.",
          "Submit the target for all items at once.",
          "Bulk target upload is the best option for adding targets for a samll number of units",
        ],
      },
      {
        step: "Viewing Targets",
        details: [
          "Navigate to the Target section.",
          "Select the year to view all target details for each item.",
          "Delete specific product targets if needed.",
          "To edit, either delete and add a new target or repeat the steps for the same product.",
          "Click on 'Target Details' to see monthly details for a selected item.",
        ],
      },
      {
        step: "Distributing Targets to Team Members",
        details: [
          "Navigate to the Target Details page for a selected item.",
          "If a 'Divide' sign is present, click on it.",
          "Navigate to a screen to distribute the target to team members.",
          "Add a percentage for each team member to distribute the target, this will set the total year target as percentage added to each team member and also will distribute the target monthly for the member as per the selected phasing when added the target startly.",
        ],
      },
      {
        step: "Alternative: Team Section Details",
        details: [
          "Navigate to the Team section.",
          "In the Bottom Bar menu Select the year and choose 'Monthly' to see monthly targets for team members.",
          "Choose 'Target' to see yearly target values for all employees.",
          "Click on a team member to view detailed target data per item yearly and monthly.",
        ],
      },
    ],
  },
  {
    name: "Phasing",
    route: "Manage and view phasing details",
    steps: [
      {
        step: "Viewing Phasing Details",
        details: [
          "Navigate to the Phasing section.",
          "View the list of added phases with an option to delete.",
          "To edit, delete the existing phase and add a new one.",
        ],
      },
      {
        step: "Adding New Phasing Data",
        details: [
          "Navigate to the Phasing section in the drawer menu.",
          "Click on the 'Add New Phasing Data' button.",
          "In the modal, set a name for the phasing.",
          "Add a percentage for each month; the total should equal 100%.",
          "This allows different targeting phases per item, such as seasonal or equal distribution.",
          "Save the phasing data.",
        ],
      },
    ],
  },
  {
    name: "Managing Business Details",
    route: "Learn how to manage and update your business information",
    steps: [
      {
        step: "Navigating to the Business Section",
        details: ["Accessing the business information management section."],
      },
      {
        step: "Editing Business Details",
        details: [
          "Instructions for modifying business logo, name, type, description, contact info, and more.",
        ],
      },
      {
        step: "Office Location and Website",
        details: ["Adding or updating your office location and website."],
      },
      {
        step: "Currency Settings",
        details: ["How to change the currency your business deals with."],
      },
    ],
  },
  {
    name: "Managing Team Members",
    route: "Explore various options for managing your sales team",
    steps: [
      {
        step: "Accessing the Team Section",
        details: ["Navigating to the team management section."],
      },
      {
        step: "Adding Team Members (Advanced)",
        details: [
          "Instructions for advanced options when adding team members, including authority types.",
        ],
      },
      {
        step: "Modifying Team Member Details",
        details: [
          "Editing team member information, excluding profile picture and password.",
        ],
      },
      {
        step: "Account Activation/Deactivation",
        details: [
          "How team members can activate, deactivate, or reset their accounts.",
        ],
      },
      {
        step: "Verifying Email and Phone",
        details: ["Verifying email and phone numbers for security."],
      },
    ],
  },
  {
    name: "Managing Clients",
    route: "Learn how to manage your client records and track their progress",
    steps: [
      {
        step: "Navigating to the Clients Section",
        details: ["Accessing the client management section."],
      },
      {
        step: "Adding Clients",
        details: [
          "Inputting client details, including name, type, address, contact info, and logo.",
        ],
      },
      {
        step: "Modifying Client Details",
        details: ["Editing and updating client information."],
      },
      {
        step: "Client Progress Tracking",
        details: ["Using the app to monitor client progress."],
      },
    ],
  },
  {
    name: "Adding and Managing Products",
    route: "Explore product management within your business account",
    steps: [
      {
        step: "Navigating to the Products Section",
        details: ["Accessing the product management section."],
      },
      {
        step: "Adding Products",
        details: [
          "Instructions for adding new products, specifying details like name, pricing, and description.",
        ],
      },
      {
        step: "Editing Product Details",
        details: [
          "Modifying product information, including pricing and descriptions.",
        ],
      },
      {
        step: "Product Categories",
        details: ["Managing product categories for better organization."],
      },
      {
        step: "Product Types",
        details: ["Differentiating between physical goods and services."],
      },
    ],
  },
  {
    name: "Managing Territories (Optional)",
    route: "Learn how to manage sales territories or areas",
    steps: [
      {
        step: "Navigating to the Territories Section",
        details: ["Accessing the territory management section."],
      },
      {
        step: "Adding Territories",
        details: [
          "Instructions for creating territories and assigning team members to them.",
        ],
      },
      {
        step: "Tracking Sales per Territory",
        details: ["Monitoring sales performance by territory or area."],
      },
    ],
  },
  {
    name: "Add Sales Manually",
    route: "Learn how to manually add sales to your records",
    steps: [
      {
        step: "Navigate to Team Section",
        details: [
          "Access the sales management section.",
          "Navigate to the Team Section.",
        ],
      },
      {
        step: "Select Sales from the Bottom Bar",
        details: ["Choose the Sales option from the bottom bar menu."],
      },
      {
        step: "Choose Business and User",
        details: [
          "Select your business name from the list.",
          "Click on the user to whom you want to add sales.",
        ],
      },
      {
        step: "Fill in Sales Details",
        details: [
          "Fill the table with details like item selection, quantity, client, bonuses, and special discounts.",
        ],
      },
      {
        step: "Submit Sales Entry",
        details: [
          "Press the submit button to save the manually entered sales data.",
        ],
      },
      {
        step: "Set Sales Version",
        details: [
          "Assign a name to the sales version.",
          "Set the start and end periods for this sales version.",
        ],
      },
      {
        step: "Allocate Sales to Targets",
        details: [
          "Specify the month against which the sales should be set.",
          "Press submit to complete the process.",
        ],
      },
      {
        step: "Repeat for All Team Members and Businesses",
        details: [
          "Repeat the same process for all team members and businesses.",
          "Optionally, assign someone from each business or team to handle this task.",
        ],
      },
    ],
  },
  {
    name: "Upload Sales Excel Sheet",
    route: "Learn how to upload sales data from an Excel sheet",
    steps: [
      {
        step: "Navigate to Sales Section",
        details: [
          "Access the sales management section by navigating to the Sales Section.",
        ],
      },
      {
        step: "Select Upload Sales from the Top Bar Menu",
        details: ["Choose the Upload Sales option from the top bar menu."],
      },
      {
        step: "Download the Sales Sheet",
        details: [
          "If you don't have the sales sheet, download it from the provided link.",
        ],
      },
      {
        step: "Fill the Sheet on Your PC",
        details: [
          "Fill in the necessary sales data in the downloaded Excel sheet on your PC.",
        ],
      },
      {
        step: "Upload the Sheet",
        details: ["Press the upload button and upload the filled sheet."],
      },
      {
        step: "Set Start and End Dates",
        details: [
          "Specify the start and end dates for the uploaded sales data.",
        ],
      },
      {
        step: "Set Version Name",
        details: [
          "Assign a name to the sales version generated from the uploaded sheet.",
        ],
      },
      {
        step: "Submit Sales Data",
        details: ["Press the submit button to complete the upload process."],
      },
    ],
  },
  {
    name: "Monitoring Business Performance",
    route: "Track and analyze your business's performance using the dashboard",
    steps: [
      {
        step: "Accessing the Dashboard",
        details: ["Navigating to the dashboard section."],
      },
      {
        step: "Dashboard Overview",
        details: [
          "Reviewing key business metrics such as sales, profit and loss, product profitability, and team performance.",
        ],
      },
      {
        step: "Individual Performance",
        details: [
          "Monitoring the performance and profitability of individual team members.",
        ],
      },
    ],
  },
  {
    name: "Conclusion and Support",
    route:
      "Conclusion: Congratulations! You've completed the journey through STAP's features",
    steps: [
      {
        step: "Conclusion",
        details: [
          "Congratulations! You've completed the journey through STAP's features.",
        ],
      },
      {
        step: "Support",
        details: [
          "Where to find additional help, support, and resources for using STAP effectively.",
        ],
      },
    ],
  },
  {
    name: "Add Sales Manually",
    route: "Learn how to manually add sales to your records",
    steps: [
      {
        step: "Navigate to Team Section",
        details: [
          "Access the sales management section.",
          "Navigate to the Team Section.",
        ],
      },
      {
        step: "Select Sales from the Bottom Bar",
        details: ["Choose the Sales option from the bottom bar menu."],
      },
      {
        step: "Choose Business and User",
        details: [
          "Select your business name from the list.",
          "Click on the user to whom you want to add sales.",
        ],
      },
      {
        step: "Fill in Sales Details",
        details: [
          "Fill the table with details like item selection, quantity, client, bonuses, and special discounts.",
        ],
      },
      {
        step: "Submit Sales Entry",
        details: [
          "Press the submit button to save the manually entered sales data.",
        ],
      },
      {
        step: "Set Sales Version",
        details: [
          "Assign a name to the sales version.",
          "Set the start and end periods for this sales version.",
        ],
      },
      {
        step: "Allocate Sales to Targets",
        details: [
          "Specify the month against which the sales should be set.",
          "Press submit to complete the process.",
        ],
      },
      {
        step: "Repeat for All Team Members and Businesses",
        details: [
          "Repeat the same process for all team members and businesses.",
          "Optionally, assign someone from each business or team to handle this task.",
        ],
      },
    ],
  },
  {
    name: "Upload Sales Excel Sheet",
    route: "Learn how to upload sales data from an Excel sheet",
    steps: [
      {
        step: "Navigate to Sales Section",
        details: [
          "Access the sales management section by navigating to the Sales Section.",
        ],
      },
      {
        step: "Select Upload Sales from the Top Bar Menu",
        details: ["Choose the Upload Sales option from the top bar menu."],
      },
      {
        step: "Download the Sales Sheet",
        details: [
          "If you don't have the sales sheet, download it from the provided link.",
        ],
      },
      {
        step: "Fill the Sheet on Your PC",
        details: [
          "Fill in the necessary sales data in the downloaded Excel sheet on your PC.",
        ],
      },
      {
        step: "Upload the Sheet",
        details: ["Press the upload button and upload the filled sheet."],
      },
      {
        step: "Set Start and End Dates",
        details: [
          "Specify the start and end dates for the uploaded sales data.",
        ],
      },
      {
        step: "Set Version Name",
        details: [
          "Assign a name to the sales version generated from the uploaded sheet.",
        ],
      },
      {
        step: "Submit Sales Data",
        details: ["Press the submit button to complete the upload process."],
      },
    ],
  },
  {
    name: "Check Your Sales (Added Manually)",
    route: "Review and edit sales details added manually",
    steps: [
      {
        step: "Navigate to Team Section",
        details: [
          "Access the sales management section.",
          "Navigate to the Team Section.",
        ],
      },
      {
        step: "Select Achievement from the Bottom Bar",
        details: ["Choose the Achievement option from the bottom bar menu."],
      },
      {
        step: "Select Month and Year",
        details: [
          "Select the month and year for which you want to review sales details.",
        ],
      },
      {
        step: "Review and Edit Sales Details",
        details: [
          "Get all the sales details you added manually with different version names.",
          "Press the version name to open the sales details for the team.",
          "Press the user name to open the sales details for the person.",
          "Edit the details and press submit when satisfied.",
        ],
      },
      {
        step: "Set as Final",
        details: [
          "Press 'Set as Final' for the version you want to consider as the final version.",
        ],
      },
      {
        step: "Important Note",
        details: [
          "Once you select a version as final, all other final versions, including those uploaded by Excel, will be considered non-final.",
          "They will be changed and not calculated in your sales.",
        ],
      },
    ],
  },
  {
    name: "Check Sales Uploaded by Excel",
    route: "Review and finalize sales data uploaded from Excel",
    steps: [
      {
        step: "Go to the Sales Section",
        details: [
          "Access the sales management section by navigating to the Sales Section.",
        ],
      },
      {
        step: "Select Sales Show from the Top Bar",
        details: ["Choose the Sales Show option from the top bar menu."],
      },
      {
        step: "Select Start and End Period",
        details: [
          "Select the start and end periods for which you want to review sales.",
        ],
      },
      {
        step: "Review Sales Details",
        details: [
          "Show the sales details, and if satisfied, select 'Set as Final'.",
        ],
      },
      {
        step: "Important Note",
        details: [
          "Once you select a version as final, all other final versions, including those uploaded by Excel, will be considered non-final.",
          "They will be changed and not calculated in your sales.",
        ],
      },
    ],
  },
  {
    name: "Ordered Sales",
    route: "Explore details of sales generated from invoices",
    steps: [
      {
        step: "Navigate to Sales Section",
        details: [
          "Access the sales management section by navigating to the Sales Section.",
        ],
      },
      {
        step: "View Sales Details",
        details: [
          "Explore details of sales generated from invoices in the Ordered Sales section.",
        ],
      },
    ],
  },
];

export default data;
