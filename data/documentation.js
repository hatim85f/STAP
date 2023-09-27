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
        step: "Navigating to the Target Section",
        details: ["How to access the target management section."],
      },
      {
        step: "Product Targets",
        details: [
          "Setting targets for each product, specifying the sales goals and assigning them to team members.",
        ],
      },
      {
        step: "Monthly Phasing (Optional)",
        details: [
          "Explaining how to distribute targets over months or keep them uniform across the year.",
        ],
      },
      {
        step: "Service Targets (If Applicable)",
        details: ["How to add targets for services or specify target values."],
      },
      {
        step: "Viewing Target Details",
        details: [
          "Accessing and reviewing the details of product and team targets.",
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
