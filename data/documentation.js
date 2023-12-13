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
    name: "Adding Sales",
    route: "Explore how to add sales to your records",
    steps: [
      {
        step: "Navigating to the Sales Section",
        details: ["Accessing the sales management section."],
      },
      {
        step: "Manual Sales Entry",
        details: [
          "Manually entering sales data, including item selection, quantity, client, bonuses, and special discounts.",
        ],
      },
      {
        step: "Uploading Sales Data (Advanced)",
        details: ["Uploading sales data from an Excel sheet or file."],
      },
      {
        step: "Ordered Sales",
        details: ["Viewing sales details generated from invoices."],
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
];

export default data;
