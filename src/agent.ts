import {
  type JobContext,
  type JobProcess,
  WorkerOptions,
  cli,
  defineAgent,
  metrics,
  voice,
} from '@livekit/agents';
import * as livekit from '@livekit/agents-plugin-livekit';
import * as silero from '@livekit/agents-plugin-silero';
import { BackgroundVoiceCancellation } from '@livekit/noise-cancellation-node';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: '.env.local' });

class Assistant extends voice.Agent {
  constructor() {
    super({
      instructions: `You are an expert AI assistant providing a real-time, voice-driven demo of a SaaS platform.
Your knowledge is strictly limited to the provided video context JSON.
Your primary goal is to give the platform demo the video will already be played on the user end you just explain.
Please make sure that you manage the pace of your speech to match the video progress.
Start by introducing yourself and the purpose of the demo before the user speaks




 

      
      {
  "version": "1.0.0",
  "video_info": {
    "total_duration_sec": 344,
    "total_screens": 21,
    "total_clips": 19,
    "total_trimmed_sec": 7.93,
    "notes": "Video shows a walkthrough of Salesforce CRM features including account/contact management, scheduling, sales opportunities, email templates, customer service cases, and reports/dashboards."
  },
  "trim_segments": [
    {
      "id": "trim_001",
      "reason": "static_content",
      "start_sec": 3.49,
      "end_sec": 8,
      "duration_sec": 4.51,
      "description": "Intro title card for the video."
    },
    {
      "id": "trim_002",
      "reason": "static_content",
      "start_sec": 13.56,
      "end_sec": 18,
      "duration_sec": 4.44,
      "description": "Company logo transition sequence."
    }
  ],
  "screens": [
    {
      "id": "scr_001",
      "start_sec": 0,
      "end_sec": 3.49,
      "screen_type": "dashboard",
      "title": "Salesforce Dashboard Overview",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Welcome Message",
          "type": "text",
          "location": "center-left",
          "description": "Personalized welcome message to the user."
        },
        {
          "name": "Suggested Actions Cards",
          "type": "card",
          "location": "top-center",
          "description": "Cards suggesting actions like creating contacts, leads, and opportunities."
        },
        {
          "name": "My Leads Card",
          "type": "card",
          "location": "bottom-left",
          "description": "Overview of leads with 'View Report' and 'New' buttons."
        },
        {
          "name": "My Opportunities Card",
          "type": "card",
          "location": "bottom-center",
          "description": "Overview of opportunities with 'View Report' and 'New' buttons."
        },
        {
          "name": "My Contacts Card",
          "type": "card",
          "location": "bottom-right",
          "description": "Overview of contacts with 'View Report' and 'New' buttons."
        }
      ],
      "events_during_screen": [
        {
          "time_sec": 22.5,
          "type": "hover",
          "element": "Service Dropdown Menu",
          "result": "Dropdown menu expanded to show Sales, Knowledge, and Quick Text options."
        }
      ],
      "context": "The video opens with a view of the Salesforce dashboard, introducing the speaker and the purpose of the demo. The speaker explains Salesforce's cloud-based tools for sales processes and marketing efforts, highlighting its ability to track contacts, leads, and accounts in a centralized database."
    },
    {
      "id": "scr_002",
      "start_sec": 41.2,
      "end_sec": 44.6,
      "screen_type": "dashboard",
      "title": "Accounts List",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Accounts' selected."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Accounts Header",
          "type": "text",
          "location": "top-left",
          "description": "Header indicating the current page is 'Accounts'."
        },
        {
          "name": "All Accounts Dropdown",
          "type": "select",
          "location": "top-left",
          "description": "Dropdown to filter the accounts list."
        },
        {
          "name": "Search List Input",
          "type": "input",
          "location": "top-right",
          "description": "Search field for the current list of accounts."
        },
        {
          "name": "New Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new account."
        },
        {
          "name": "Import Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to import accounts."
        },
        {
          "name": "Accounts Table Header",
          "type": "table",
          "location": "center",
          "description": "Table headers for Account Name, Phone, Website, Billing City, Billing State/Province, Account Owner Alias."
        },
        {
          "name": "Accounts Show Where Your Contacts Work Message",
          "type": "text",
          "location": "center",
          "description": "Informational message about the purpose of accounts."
        },
        {
          "name": "Add Account Button",
          "type": "button",
          "location": "center",
          "description": "Call to action button to add an account."
        }
      ],
      "events_during_screen": [],
      "context": "The speaker navigates to the 'Accounts' page from the main dashboard, which displays a list of all existing accounts and options to filter, search, or add new ones."
    },
    {
      "id": "scr_003",
      "start_sec": 44.6,
      "end_sec": 102.5,
      "screen_type": "modal",
      "title": "New Account Modal",
      "ui_inventory": [
        {
          "name": "New Account Modal Header",
          "type": "modal",
          "location": "top-center",
          "description": "Modal header for creating a new account."
        },
        {
          "name": "Account Name Input",
          "type": "input",
          "location": "top-center",
          "description": "Text input field for the account's name (required)."
        },
        {
          "name": "Website Input",
          "type": "input",
          "location": "top-center",
          "description": "Text input field for the account's website."
        },
        {
          "name": "Type Dropdown",
          "type": "select",
          "location": "center",
          "description": "Dropdown to select the type of account."
        },
        {
          "name": "Description Input",
          "type": "input",
          "location": "center",
          "description": "Text area for account description."
        },
        {
          "name": "Parent Account Search",
          "type": "input",
          "location": "center",
          "description": "Searchable input to link a parent account."
        },
        {
          "name": "Account Owner Field",
          "type": "text",
          "location": "center",
          "description": "Displays the assigned account owner."
        },
        {
          "name": "Phone Input",
          "type": "input",
          "location": "bottom-center",
          "description": "Text input field for the account's phone number."
        },
        {
          "name": "Billing Address Fields",
          "type": "form",
          "location": "bottom-center",
          "description": "Group of fields for billing address details."
        },
        {
          "name": "Shipping Address Fields",
          "type": "form",
          "location": "bottom-center",
          "description": "Group of fields for shipping address details."
        },
        {
          "name": "Cancel Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to cancel account creation."
        },
        {
          "name": "Save & New Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the account and start a new one."
        },
        {
          "name": "Save Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the new account."
        }
      ],
      "events_during_screen": [],
      "context": "A modal window appears for creating a new account, prompting the user to fill in various details such as account name, website, type, description, contact information, and billing/shipping addresses."
    },
    {
      "id": "scr_004",
      "start_sec": 102.5,
      "end_sec": 118,
      "screen_type": "dashboard",
      "title": "Account Details Page",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Accounts' selected."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Account Name Header",
          "type": "text",
          "location": "top-left",
          "description": "Header displaying the name of the created account."
        },
        {
          "name": "New Contact Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new contact related to this account."
        },
        {
          "name": "New Opportunity Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new opportunity related to this account."
        },
        {
          "name": "Edit Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to edit account details."
        },
        {
          "name": "About Section",
          "type": "card",
          "location": "center-left",
          "description": "Card displaying detailed information about the account including name, website, type, description, and owner."
        },
        {
          "name": "Upcoming & Overdue Activities",
          "type": "card",
          "location": "center",
          "description": "Card showing scheduled and past activities with options to create new events, log calls, or assign tasks."
        },
        {
          "name": "Contacts List Card",
          "type": "card",
          "location": "top-right",
          "description": "Card displaying related contacts for the account."
        },
        {
          "name": "Opportunities List Card",
          "type": "card",
          "location": "center-right",
          "description": "Card displaying related opportunities for the account."
        },
        {
          "name": "Cases List Card",
          "type": "card",
          "location": "center-right",
          "description": "Card displaying related cases for the account."
        },
        {
          "name": "Files Upload Card",
          "type": "card",
          "location": "bottom-right",
          "description": "Card for uploading and managing files related to the account."
        },
        {
          "name": "New Event Button",
          "type": "button",
          "location": "center",
          "description": "Button to create a new event related to the account."
        },
        {
          "name": "Log a Call Button",
          "type": "button",
          "location": "center",
          "description": "Button to log a call related to the account."
        },
        {
          "name": "New Task Button",
          "type": "button",
          "location": "center",
          "description": "Button to assign a new task related to the account."
        }
      ],
      "events_during_screen": [],
      "context": "After saving, the system navigates to the detailed view of the newly created account. This page consolidates all relevant information and activities, offering options to schedule meetings or tasks and add more leads."
    },
    {
      "id": "scr_005",
      "start_sec": 118,
      "end_sec": 151.8,
      "screen_type": "settings",
      "title": "Meeting Settings",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Quick Find Input",
          "type": "input",
          "location": "left",
          "description": "Search input for quick navigation within settings."
        },
        {
          "name": "Personal Information Sidebar",
          "type": "sidebar",
          "location": "left",
          "description": "Navigation menu for various personal settings, with 'Meeting Settings' highlighted."
        },
        {
          "name": "Meeting Availability Calendar",
          "type": "calendar",
          "location": "center",
          "description": "Calendar interface displaying days of the week with editable time slots for meeting availability."
        },
        {
          "name": "Save Changes Button",
          "type": "button",
          "location": "bottom-center",
          "description": "Button to save modifications to meeting availability."
        },
        {
          "name": "Copy Time to All Days Button",
          "type": "button",
          "location": "center-right",
          "description": "Button to apply selected time slots to all days of the week."
        },
        {
          "name": "Meeting Details Section",
          "type": "text",
          "location": "bottom-center",
          "description": "Information regarding how meeting settings impact scheduling links and email invitations."
        }
      ],
      "events_during_screen": [],
      "context": "The screen shifts to meeting availability settings, presenting a calendar interface where the user can define their availability for meetings by selecting specific time slots on different days of the week. Salesforce integrates with email and calendar applications to synchronize meeting details."
    },
    {
      "id": "scr_006",
      "start_sec": 151.8,
      "end_sec": 200.7,
      "screen_type": "dashboard",
      "title": "Contacts List",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Contacts' selected."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Contacts Header",
          "type": "text",
          "location": "top-left",
          "description": "Header indicating the current page is 'Contacts'."
        },
        {
          "name": "All Contacts Dropdown",
          "type": "select",
          "location": "top-left",
          "description": "Dropdown to filter the contacts list."
        },
        {
          "name": "Import Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to import contacts."
        },
        {
          "name": "Add to Campaign Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to add contacts to a marketing campaign."
        },
        {
          "name": "New Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new contact."
        },
        {
          "name": "Contacts Table Header",
          "type": "table",
          "location": "center",
          "description": "Table headers for Name, Account Name, Title, Phone, Email, Contact Owner Alias."
        },
        {
          "name": "Top Sellers Add Their Contacts First Message",
          "type": "text",
          "location": "center",
          "description": "Motivational message to add contacts."
        },
        {
          "name": "Add Contact Button",
          "type": "button",
          "location": "center",
          "description": "Call to action button to add a contact."
        }
      ],
      "events_during_screen": [],
      "context": "The user navigates to the 'Contacts' list, which shows a tabular view of all contacts in the system, similar to the accounts page, and prompts for adding new contacts."
    },
    {
      "id": "scr_007",
      "start_sec": 200.7,
      "end_sec": 209.5,
      "screen_type": "modal",
      "title": "New Contact Modal",
      "ui_inventory": [
        {
          "name": "New Contact Modal Header",
          "type": "modal",
          "location": "top-center",
          "description": "Modal header for creating a new contact."
        },
        {
          "name": "Salutation Dropdown",
          "type": "select",
          "location": "top-center",
          "description": "Dropdown for contact salutation (Mr., Ms., etc.)."
        },
        {
          "name": "First Name Input",
          "type": "input",
          "location": "top-center",
          "description": "Text input field for the contact's first name."
        },
        {
          "name": "Last Name Input",
          "type": "input",
          "location": "top-center",
          "description": "Text input field for the contact's last name (required)."
        },
        {
          "name": "Account Name Input",
          "type": "input",
          "location": "center",
          "description": "Text input field to link the contact to an existing account."
        },
        {
          "name": "Title Input",
          "type": "input",
          "location": "center",
          "description": "Text input field for the contact's job title."
        },
        {
          "name": "Reports To Search",
          "type": "input",
          "location": "center",
          "description": "Searchable input to link reporting structure."
        },
        {
          "name": "Description Input",
          "type": "input",
          "location": "bottom-center",
          "description": "Text area for contact description."
        },
        {
          "name": "Contact Owner Field",
          "type": "text",
          "location": "bottom-center",
          "description": "Displays the assigned contact owner."
        },
        {
          "name": "Cancel Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to cancel contact creation."
        },
        {
          "name": "Save & New Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the contact and start a new one."
        },
        {
          "name": "Save Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the new contact."
        }
      ],
      "events_during_screen": [],
      "context": "A modal appears for creating a new contact, requiring the user to fill in personal details such as name, account association, title, and other descriptive information."
    },
    {
      "id": "scr_008",
      "start_sec": 209.5,
      "end_sec": 249.5,
      "screen_type": "dashboard",
      "title": "Contact Details Page",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Contacts' selected."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Contact Name Header",
          "type": "text",
          "location": "top-left",
          "description": "Header displaying the name of the created contact."
        },
        {
          "name": "New Opportunity Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new opportunity related to this contact."
        },
        {
          "name": "Edit Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to edit contact details."
        },
        {
          "name": "About Section",
          "type": "card",
          "location": "center-left",
          "description": "Card displaying detailed information about the contact including name, account, title, and owner."
        },
        {
          "name": "Upcoming & Overdue Activities",
          "type": "card",
          "location": "center",
          "description": "Card showing scheduled and past activities with options to create new events, log calls, or assign tasks."
        },
        {
          "name": "Show All Activities Button",
          "type": "button",
          "location": "center",
          "description": "Button to expand and view all activities for this contact."
        },
        {
          "name": "Opportunities List Card",
          "type": "card",
          "location": "top-right",
          "description": "Card displaying related opportunities for the contact."
        },
        {
          "name": "Cases List Card",
          "type": "card",
          "location": "center-right",
          "description": "Card displaying related cases for the contact."
        },
        {
          "name": "Files Upload Card",
          "type": "card",
          "location": "bottom-right",
          "description": "Card for uploading and managing files related to the contact."
        }
      ],
      "events_during_screen": [],
      "context": "The contact details page is shown, displaying comprehensive information about the new contact, including related activities, opportunities, cases, and file management options."
    },
    {
      "id": "scr_009",
      "start_sec": 249.5,
      "end_sec": 257.5,
      "screen_type": "dashboard",
      "title": "Opportunities List",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Sales' dropdown activated."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Opportunities Header",
          "type": "text",
          "location": "top-left",
          "description": "Header indicating the current page is 'All Opportunities'."
        },
        {
          "name": "New Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new opportunity."
        },
        {
          "name": "Import Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to import opportunities."
        },
        {
          "name": "Opportunities Table Header",
          "type": "table",
          "location": "center",
          "description": "Table headers for Opportunity Name, Account Name, Amount, Close Date, Stage, Opportunity Owner Alias."
        },
        {
          "name": "Opportunities Are Knocking Message",
          "type": "text",
          "location": "center",
          "description": "Informational message about tracking opportunities."
        },
        {
          "name": "Add an Opportunity Button",
          "type": "button",
          "location": "center",
          "description": "Call to action button to add an opportunity."
        }
      ],
      "events_during_screen": [],
      "context": "The user accesses the 'Sales' section and selects 'Opportunities', which presents a list of all sales opportunities, along with options to create new ones and track their progress."
    },
    {
      "id": "scr_010",
      "start_sec": 257.5,
      "end_sec": 320.9,
      "screen_type": "modal",
      "title": "New Opportunity Modal",
      "ui_inventory": [
        {
          "name": "New Opportunity Modal Header",
          "type": "modal",
          "location": "top-center",
          "description": "Modal header for creating a new opportunity."
        },
        {
          "name": "Opportunity Name Input",
          "type": "input",
          "location": "top-center",
          "description": "Text input field for the opportunity's name (required)."
        },
        {
          "name": "Account Name Input",
          "type": "input",
          "location": "top-center",
          "description": "Searchable input to link the opportunity to an account (required)."
        },
        {
          "name": "Close Date Picker",
          "type": "input",
          "location": "center",
          "description": "Date picker for the expected closing date (required)."
        },
        {
          "name": "Amount Input",
          "type": "input",
          "location": "center",
          "description": "Text input field for the opportunity's amount."
        },
        {
          "name": "Description Input",
          "type": "input",
          "location": "center",
          "description": "Text area for opportunity description."
        },
        {
          "name": "Opportunity Owner Field",
          "type": "text",
          "location": "bottom-center",
          "description": "Displays the assigned opportunity owner."
        },
        {
          "name": "Stage Dropdown",
          "type": "select",
          "location": "bottom-center",
          "description": "Dropdown to select the current stage of the opportunity (required)."
        },
        {
          "name": "Probability Input",
          "type": "input",
          "location": "bottom-center",
          "description": "Input field for the probability of closing the opportunity."
        },
        {
          "name": "Forecast Category Dropdown",
          "type": "select",
          "location": "bottom-center",
          "description": "Dropdown to categorize the opportunity for forecasting (required)."
        },
        {
          "name": "Next Step Input",
          "type": "input",
          "location": "bottom-center",
          "description": "Text input field for the next required action."
        },
        {
          "name": "Cancel Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to cancel opportunity creation."
        },
        {
          "name": "Save & New Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the opportunity and start a new one."
        },
        {
          "name": "Save Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the new opportunity."
        }
      ],
      "events_during_screen": [],
      "context": "A modal appears for creating a new sales opportunity, where the user inputs details such as the opportunity name, associated account, closing date, amount, stage in the sales process, and forecast category."
    },
    {
      "id": "scr_011",
      "start_sec": 320.9,
      "end_sec": 340.5,
      "screen_type": "dashboard",
      "title": "Opportunity Details Page",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Sales' selected."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Opportunity Name Header",
          "type": "text",
          "location": "top-left",
          "description": "Header displaying the name of the created opportunity."
        },
        {
          "name": "Stage Pipeline View",
          "type": "other",
          "location": "top-center",
          "description": "Visual pipeline showing stages: Qualify, Meet to Present, Propose, Negotiate, Closed."
        },
        {
          "name": "Mark Stage as Complete Button",
          "type": "button",
          "location": "center",
          "description": "Button to mark the current sales stage as complete."
        },
        {
          "name": "About Section",
          "type": "card",
          "location": "center-left",
          "description": "Card displaying detailed information about the opportunity, including name, date, amount, description, and owner."
        },
        {
          "name": "Stage Qualify Guidance",
          "type": "card",
          "location": "center",
          "description": "Guidance text for the 'Qualify' stage, outlining necessary considerations."
        },
        {
          "name": "New Event Button",
          "type": "button",
          "location": "bottom-left",
          "description": "Button to create a new event related to the opportunity."
        },
        {
          "name": "New Task Button",
          "type": "button",
          "location": "bottom-left",
          "description": "Button to assign a new task related to the opportunity."
        },
        {
          "name": "Log a Call Button",
          "type": "button",
          "location": "bottom-left",
          "description": "Button to log a call related to the opportunity."
        },
        {
          "name": "Contact Roles Card",
          "type": "card",
          "location": "top-right",
          "description": "Card for managing contact roles associated with the opportunity."
        },
        {
          "name": "Files Upload Card",
          "type": "card",
          "location": "center-right",
          "description": "Card for uploading and managing files related to the opportunity."
        },
        {
          "name": "Products Card",
          "type": "card",
          "location": "bottom-right",
          "description": "Card for associating products with the opportunity."
        }
      ],
      "events_during_screen": [],
      "context": "The detailed view of the new opportunity is displayed, showcasing its current stage in the sales pipeline and providing guidance for the 'Qualify' stage. Options to update the stage, add team members, or log activities are available."
    },
    {
      "id": "scr_012",
      "start_sec": 340.5,
      "end_sec": 352,
      "screen_type": "dashboard",
      "title": "Email Templates List",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Outreach' dropdown activated."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Email Templates Header",
          "type": "text",
          "location": "top-left",
          "description": "Header indicating the current page is 'Email Templates'."
        },
        {
          "name": "Recent Email Templates List",
          "type": "table",
          "location": "center",
          "description": "List of recently accessed email templates."
        },
        {
          "name": "New Email Template Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new email template."
        },
        {
          "name": "New Folder Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new folder for organizing email templates."
        }
      ],
      "events_during_screen": [],
      "context": "The user navigates to 'Email Templates' under the 'Outreach' section, displaying a list of recent templates and options to create new ones or organize them into folders for email marketing campaigns."
    },
    {
      "id": "scr_013",
      "start_sec": 352,
      "end_sec": 408,
      "screen_type": "modal",
      "title": "New Email Template Modal",
      "ui_inventory": [
        {
          "name": "New Email Template Modal Header",
          "type": "modal",
          "location": "top-center",
          "description": "Modal header for creating a new email template."
        },
        {
          "name": "Email Template Name Input",
          "type": "input",
          "location": "top-center",
          "description": "Text input field for the email template's name (required)."
        },
        {
          "name": "Related Entity Type Dropdown",
          "type": "select",
          "location": "top-center",
          "description": "Dropdown to select the type of entity this template relates to."
        },
        {
          "name": "Description Input",
          "type": "input",
          "location": "center-left",
          "description": "Text input field for a description of the template."
        },
        {
          "name": "Folder Selection",
          "type": "button",
          "location": "center-right",
          "description": "Button to select a folder for the template."
        },
        {
          "name": "Subject Input",
          "type": "input",
          "location": "center",
          "description": "Text input field for the email's subject line."
        },
        {
          "name": "Message Content Editor",
          "type": "form",
          "location": "center",
          "description": "Rich text editor for composing the email's body content."
        },
        {
          "name": "Cancel Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to cancel email template creation."
        },
        {
          "name": "Save Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the new email template."
        }
      ],
      "events_during_screen": [],
      "context": "A modal appears for creating a new email template, prompting the user to fill in the template name, select a related entity type, add a description, and compose the message content with a subject line."
    },
    {
      "id": "scr_014",
      "start_sec": 408,
      "end_sec": 422.5,
      "screen_type": "dashboard",
      "title": "Email Template Details Page",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Outreach' selected."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Email Template Header",
          "type": "text",
          "location": "top-left",
          "description": "Header displaying the name of the created email template."
        },
        {
          "name": "Edit Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to edit the email template."
        },
        {
          "name": "Close Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to close the email template."
        },
        {
          "name": "Delete Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to delete the email template."
        },
        {
          "name": "Details Tab",
          "type": "button",
          "location": "center-left",
          "description": "Tab for viewing email template details."
        },
        {
          "name": "Related Tab",
          "type": "button",
          "location": "center-left",
          "description": "Tab for viewing related files or records."
        },
        {
          "name": "Files Card",
          "type": "card",
          "location": "center-left",
          "description": "Card for managing files related to the email template."
        },
        {
          "name": "Upload Files Button",
          "type": "button",
          "location": "center",
          "description": "Button to upload new files."
        },
        {
          "name": "Add Files Button",
          "type": "button",
          "location": "center-right",
          "description": "Button to add existing files."
        }
      ],
      "events_during_screen": [],
      "context": "The system displays the detailed view of the newly created email template, offering options to edit, close, or delete it, and manage any related files. Salesforce provides customer service and support features for tracking and managing inquiries, issues, and resolutions."
    },
    {
      "id": "scr_015",
      "start_sec": 422.5,
      "end_sec": 426.5,
      "screen_type": "dashboard",
      "title": "Cases List",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Service' dropdown activated."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "All Open Cases Header",
          "type": "text",
          "location": "top-left",
          "description": "Header indicating the current page is 'All Open Cases'."
        },
        {
          "name": "New Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new case."
        },
        {
          "name": "Change Owner Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to change the owner of selected cases."
        },
        {
          "name": "Merge Cases Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to merge multiple cases."
        },
        {
          "name": "Printable View Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to view cases in a printable format."
        },
        {
          "name": "Cases Table Header",
          "type": "table",
          "location": "center",
          "description": "Table headers for Case Number, Contact Name, Subject, Status, Priority, Date/Time Opened, Case Owner Alias."
        },
        {
          "name": "Track Customer Support in One Place Message",
          "type": "text",
          "location": "center",
          "description": "Informational message about unified customer support."
        }
      ],
      "events_during_screen": [],
      "context": "The user navigates to the 'Cases' list under the 'Service' section, which displays all open customer support cases with options to create new ones, manage owners, or merge cases."
    },
    {
      "id": "scr_016",
      "start_sec": 426.5,
      "end_sec": 440.9,
      "screen_type": "modal",
      "title": "New Case Modal",
      "ui_inventory": [
        {
          "name": "New Case Modal Header",
          "type": "modal",
          "location": "top-center",
          "description": "Modal header for creating a new case."
        },
        {
          "name": "Status Dropdown",
          "type": "select",
          "location": "top-center",
          "description": "Dropdown to select the current status of the case (required)."
        },
        {
          "name": "Case Origin Dropdown",
          "type": "select",
          "location": "top-center",
          "description": "Dropdown to select the origin of the case (e.g., Email, Phone) (required)."
        },
        {
          "name": "Priority Dropdown",
          "type": "select",
          "location": "center-left",
          "description": "Dropdown to set the priority level of the case."
        },
        {
          "name": "User Owner Field",
          "type": "text",
          "location": "center-right",
          "description": "Displays the assigned user owner for the case."
        },
        {
          "name": "Contact Name Search",
          "type": "input",
          "location": "center",
          "description": "Searchable input to link the case to a contact."
        },
        {
          "name": "Account Name Search",
          "type": "input",
          "location": "center",
          "description": "Searchable input to link the case to an account."
        },
        {
          "name": "Subject Input",
          "type": "input",
          "location": "bottom-center",
          "description": "Text input field for the case subject."
        },
        {
          "name": "Description Input",
          "type": "input",
          "location": "bottom-center",
          "description": "Text area for a detailed description of the case."
        },
        {
          "name": "Send Notification Email Checkbox",
          "type": "checkbox",
          "location": "bottom-left",
          "description": "Checkbox to send an email notification to the contact."
        },
        {
          "name": "Cancel Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to cancel case creation."
        },
        {
          "name": "Save & New Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the case and start a new one."
        },
        {
          "name": "Save Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the new case."
        }
      ],
      "events_during_screen": [],
      "context": "A modal appears for creating a new customer service case, requiring details such as status, origin, priority, associated contact and account, and a subject and description of the issue."
    },
    {
      "id": "scr_017",
      "start_sec": 440.9,
      "end_sec": 444.5,
      "screen_type": "dashboard",
      "title": "Calendar Page",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Calendar' selected."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Calendar Header",
          "type": "text",
          "location": "top-left",
          "description": "Header displaying the current calendar view, showing the date range."
        },
        {
          "name": "Previous Day/Week/Month Button",
          "type": "button",
          "location": "top-center",
          "description": "Button to navigate to the previous period in the calendar."
        },
        {
          "name": "Today Button",
          "type": "button",
          "location": "top-center",
          "description": "Button to jump to the current day in the calendar."
        },
        {
          "name": "Next Day/Week/Month Button",
          "type": "button",
          "location": "top-center",
          "description": "Button to navigate to the next period in the calendar."
        },
        {
          "name": "Calendar View Options",
          "type": "button",
          "location": "top-right",
          "description": "Buttons to switch between different calendar views (e.g., day, week, month)."
        },
        {
          "name": "New Event Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new event."
        },
        {
          "name": "Main Calendar Grid",
          "type": "calendar",
          "location": "center-left",
          "description": "The main grid displaying daily time slots for events and meetings."
        },
        {
          "name": "Mini Calendar",
          "type": "calendar",
          "location": "center-right",
          "description": "A small calendar for quick date navigation."
        }
      ],
      "events_during_screen": [],
      "context": "The user accesses the 'Calendar' section, which displays a weekly calendar view. This page allows managing and accessing scheduled meetings, calls, and events."
    },
    {
      "id": "scr_018",
      "start_sec": 444.5,
      "end_sec": 457,
      "screen_type": "modal",
      "title": "New Event Modal",
      "ui_inventory": [
        {
          "name": "New Event Modal Header",
          "type": "modal",
          "location": "top-center",
          "description": "Modal header for creating a new event."
        },
        {
          "name": "Subject Input",
          "type": "input",
          "location": "top-center",
          "description": "Text input field for the event subject (required)."
        },
        {
          "name": "Description Input",
          "type": "input",
          "location": "center",
          "description": "Text area for the event description."
        },
        {
          "name": "Start Date Picker",
          "type": "input",
          "location": "center-left",
          "description": "Date picker for the event's start date (required)."
        },
        {
          "name": "Start Time Picker",
          "type": "input",
          "location": "center-left",
          "description": "Time picker for the event's start time (required)."
        },
        {
          "name": "End Date Picker",
          "type": "input",
          "location": "center-right",
          "description": "Date picker for the event's end date (required)."
        },
        {
          "name": "End Time Picker",
          "type": "input",
          "location": "center-right",
          "description": "Time picker for the event's end time (required)."
        },
        {
          "name": "Attendees Search Input",
          "type": "input",
          "location": "bottom-center",
          "description": "Searchable input to add attendees to the event."
        },
        {
          "name": "Related Contacts Search",
          "type": "input",
          "location": "bottom-center",
          "description": "Searchable input to relate the event to a contact."
        },
        {
          "name": "Related Accounts Search",
          "type": "input",
          "location": "bottom-center",
          "description": "Searchable input to relate the event to an account."
        },
        {
          "name": "Assigned To Field",
          "type": "text",
          "location": "bottom-center",
          "description": "Displays the user assigned to the event."
        },
        {
          "name": "Cancel Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to cancel event creation."
        },
        {
          "name": "Save & New Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the event and create a new one."
        },
        {
          "name": "Send Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to send event invitations."
        },
        {
          "name": "Save Button",
          "type": "button",
          "location": "bottom-right",
          "description": "Button to save the new event."
        }
      ],
      "events_during_screen": [],
      "context": "A modal appears for creating a new event, where the user fills in the subject, description, start and end dates/times, adds attendees, and relates the event to contacts or accounts."
    },
    {
      "id": "scr_019",
      "start_sec": 519,
      "end_sec": 521,
      "screen_type": "other",
      "title": "Reports List (Brief)",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Reports' selected."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Reports Header",
          "type": "text",
          "location": "top-left",
          "description": "Header indicating the current page is 'Reports'."
        },
        {
          "name": "Recent Reports List (Empty)",
          "type": "table",
          "location": "center",
          "description": "An empty list area where recent reports would typically be displayed."
        },
        {
          "name": "Search Reports Input",
          "type": "input",
          "location": "top-right",
          "description": "Search field for reports."
        },
        {
          "name": "New Report Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new report."
        },
        {
          "name": "New Folder Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new folder for reports."
        }
      ],
      "events_during_screen": [],
      "context": "The user briefly navigates to the 'Reports' section, which would typically display a list of reports for analysis, but the content area appears empty in this view."
    },
    {
      "id": "scr_020",
      "start_sec": 521,
      "end_sec": 526,
      "screen_type": "dashboard",
      "title": "Dashboards List",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Dashboards' selected."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Dashboards Header",
          "type": "text",
          "location": "top-left",
          "description": "Header indicating the current page is 'Dashboards'."
        },
        {
          "name": "Recent Dashboards List",
          "type": "table",
          "location": "center",
          "description": "List of recently viewed dashboards with names, descriptions, and creation details."
        },
        {
          "name": "Search Dashboards Input",
          "type": "input",
          "location": "top-right",
          "description": "Search field for dashboards."
        },
        {
          "name": "View Dashboard Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to view an existing dashboard."
        },
        {
          "name": "New Folder Button",
          "type": "button",
          "location": "top-right",
          "description": "Button to create a new folder for dashboards."
        }
      ],
      "events_during_screen": [],
      "context": "The user navigates to the 'Dashboards' section, presenting a list of available dashboards, including 'Service Ptn Dashboard' and 'My Service Dashboard', which offer insights into various activities."
    },
    {
      "id": "scr_021",
      "start_sec": 526,
      "end_sec": 344,
      "screen_type": "dashboard",
      "title": "Salesforce Dashboard Overview (Final)",
      "ui_inventory": [
        {
          "name": "Salesforce Logo",
          "type": "icon",
          "location": "top-left",
          "description": "Salesforce application logo."
        },
        {
          "name": "Top Navigation Bar",
          "type": "header",
          "location": "top-center",
          "description": "Contains Home, Accounts, Contacts, Sales, Outreach, Service, Calendar, and Reports tabs, with 'Home' selected."
        },
        {
          "name": "Search Bar",
          "type": "input",
          "location": "top-center",
          "description": "Global search functionality."
        },
        {
          "name": "User Profile Icon",
          "type": "icon",
          "location": "top-right",
          "description": "Access to user settings and profile."
        },
        {
          "name": "Welcome Message",
          "type": "text",
          "location": "center-left",
          "description": "Personalized welcome message to the user."
        },
        {
          "name": "Suggested Actions Cards",
          "type": "card",
          "location": "top-center",
          "description": "Cards suggesting actions like creating contacts, leads, and opportunities."
        },
        {
          "name": "My Leads Card",
          "type": "card",
          "location": "bottom-left",
          "description": "Overview of leads with 'View Report' and 'New' buttons."
        },
        {
          "name": "My Opportunities Card",
          "type": "card",
          "location": "bottom-center",
          "description": "Overview of opportunities with 'View Report' and 'New' buttons."
        },
        {
          "name": "My Contacts Card",
          "type": "card",
          "location": "bottom-right",
          "description": "Overview of contacts with 'View Report' and 'New' buttons."
        }
      ],
      "events_during_screen": [],
      "context": "The demo concludes by returning to the main Salesforce dashboard, emphasizing the platform's efficiency in managing customer relationships and sales activities."
    }
  ],
  "interaction_clips": [
    {
      "id": "clip_001",
      "title": "Hover • Service Dropdown",
      "category": "hover",
      "start_sec": 20.5,
      "interaction_sec": 22.5,
      "end_sec": 24.5,
      "ui_element": "Service Dropdown Menu",
      "action_description": "The user hovers over the 'Service' dropdown menu in the top navigation bar. This action expands the menu to reveal options like Sales, Knowledge, and Quick Text.",
      "use_case": "Demonstrates how to access various service-related modules within Salesforce, providing quick navigation to different functionalities.",
      "focus_region_norm": [
        0.49,
        0.12,
        0.08,
        0.04
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    },
    {
      "id": "clip_002",
      "title": "Click • Accounts Tab",
      "category": "click",
      "start_sec": 39.2,
      "interaction_sec": 41.2,
      "end_sec": 43.2,
      "ui_element": "Accounts Tab",
      "action_description": "The user clicks on the 'Accounts' tab in the main navigation bar. This action navigates the user to the Accounts list page.",
      "use_case": "Initiates the process of managing customer accounts, allowing access to view, edit, or create new account records.",
      "focus_region_norm": [
        0.18,
        0.12,
        0.06,
        0.04
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    },
    {
      "id": "clip_003",
      "title": "Click • New Button (Accounts List)",
      "category": "click",
      "start_sec": 42.6,
      "interaction_sec": 44.6,
      "end_sec": 46.6,
      "ui_element": "New Button",
      "action_description": "The user clicks the 'New' button located in the top-right corner of the Accounts list page. This action opens the 'New Account' modal.",
      "use_case": "Starts the workflow for creating a new customer account, enabling the user to input details for a new client or business entity.",
      "focus_region_norm": [
        0.82,
        0.17,
        0.04,
        0.04
      ],
      "zoom_depth": 3,
      "confidence": 0.95
    },
    {
      "id": "clip_004_cluster",
      "title": "Multi-Interaction • Create New Account",
      "category": "form_submission",
      "start_sec": 46.3,
      "interaction_sec": 74.9,
      "end_sec": 103.5,
      "ui_element": "New Account Modal Form",
      "action_description": "The user enters 'project 1' into the Account Name field, 'weddingcraft' into the Website field, selects 'Partner' from the Type dropdown, then types a phone number, and finally clicks the 'Save' button to create the new account. These actions are performed sequentially within the New Account modal.",
      "use_case": "Demonstrates the complete process of adding a new account, including essential identifying information and saving the record to the database, ensuring all relevant details are captured efficiently.",
      "focus_region_norm": [
        0.25,
        0.2,
        0.5,
        0.6
      ],
      "zoom_depth": 1.5,
      "confidence": 0.95
    },
    {
      "id": "clip_009",
      "title": "Click • Log a Call Dropdown",
      "category": "click",
      "start_sec": 112,
      "interaction_sec": 114,
      "end_sec": 116,
      "ui_element": "Log a Call Dropdown",
      "action_description": "The user clicks on the 'Log a Call' button's dropdown arrow next to 'New Event' on the Account Details page. This expands a menu of call-related options.",
      "use_case": "Allows the user to access different call management functionalities, such as logging a call or setting meeting availability for an account.",
      "focus_region_norm": [
        0.49,
        0.24,
        0.03,
        0.03
      ],
      "zoom_depth": 3,
      "confidence": 0.9
    },
    {
      "id": "clip_010",
      "title": "Selection • Set My Meeting Availability",
      "category": "selection",
      "start_sec": 114,
      "interaction_sec": 116,
      "end_sec": 118,
      "ui_element": "Set My Meeting Availability Option",
      "action_description": "The user selects 'Set My Meeting Availability' from the dropdown menu. This action navigates to the Meeting Settings page.",
      "use_case": "Enables the user to configure their personal meeting schedule, which is crucial for coordinating client interactions and internal team meetings.",
      "focus_region_norm": [
        0.44,
        0.32,
        0.18,
        0.04
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    },
    {
      "id": "clip_011_cluster",
      "title": "Multi-Interaction • Set Meeting Availability",
      "category": "selection",
      "start_sec": 121.7,
      "interaction_sec": 125.7,
      "end_sec": 129.7,
      "ui_element": "Meeting Availability Time Slots and Save Button",
      "action_description": "The user selects '9:00 AM' as the start time and '1:00 AM' as the end time for Tuesday in the meeting availability calendar, then clicks 'Save Changes'. This updates the user's weekly meeting schedule.",
      "use_case": "Demonstrates how to quickly update and save specific time slots for meeting availability, ensuring that scheduling tools reflect the user's current schedule.",
      "focus_region_norm": [
        0.25,
        0.4,
        0.5,
        0.4
      ],
      "zoom_depth": 1.5,
      "confidence": 0.95
    },
    {
      "id": "clip_014",
      "title": "Click • Contacts Tab",
      "category": "click",
      "start_sec": 147.8,
      "interaction_sec": 149.8,
      "end_sec": 151.8,
      "ui_element": "Contacts Tab",
      "action_description": "The user clicks on the 'Contacts' tab in the main navigation bar. This action navigates the user to the Contacts list page.",
      "use_case": "Allows the user to view and manage all individual contact records, crucial for customer relationship management.",
      "focus_region_norm": [
        0.25,
        0.12,
        0.06,
        0.04
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    },
    {
      "id": "clip_015",
      "title": "Click • New Button (Contacts List)",
      "category": "click",
      "start_sec": 197.7,
      "interaction_sec": 199.7,
      "end_sec": 201.7,
      "ui_element": "New Button",
      "action_description": "The user clicks the 'New' button on the Contacts list page. This opens the 'New Contact' modal.",
      "use_case": "Initiates the creation of a new contact record, allowing the user to input details for a new individual connection.",
      "focus_region_norm": [
        0.88,
        0.17,
        0.04,
        0.04
      ],
      "zoom_depth": 3,
      "confidence": 0.95
    },
    {
      "id": "clip_016_cluster",
      "title": "Multi-Interaction • Create New Contact",
      "category": "form_submission",
      "start_sec": 201.9,
      "interaction_sec": 206.2,
      "end_sec": 210.5,
      "ui_element": "New Contact Modal Form",
      "action_description": "The user types 'Joe' into the First Name field, 'Welem' into the Last Name field, and then clicks the 'Save' button. This creates a new contact record.",
      "use_case": "Demonstrates the efficient entry of new contact information, highlighting the essential fields for quick contact creation and saving.",
      "focus_region_norm": [
        0.25,
        0.2,
        0.5,
        0.6
      ],
      "zoom_depth": 1.5,
      "confidence": 0.95
    },
    {
      "id": "clip_019",
      "title": "Click • Show All Activities",
      "category": "click",
      "start_sec": 220,
      "interaction_sec": 222,
      "end_sec": 224,
      "ui_element": "Show All Activities Button",
      "action_description": "The user clicks the 'Show All Activities' button within the 'Upcoming & Overdue' activities card. This action expands the view to show a more comprehensive list of activities.",
      "use_case": "Allows teams to gain a full historical overview of all interactions, calls, and tasks associated with a particular contact, improving context and follow-up.",
      "focus_region_norm": [
        0.38,
        0.7,
        0.15,
        0.05
      ],
      "zoom_depth": 2.5,
      "confidence": 0.9
    },
    {
      "id": "clip_020",
      "title": "Click • Sales Dropdown",
      "category": "click",
      "start_sec": 245.5,
      "interaction_sec": 247.5,
      "end_sec": 249.5,
      "ui_element": "Sales Dropdown Menu",
      "action_description": "The user clicks on the 'Sales' dropdown menu in the top navigation bar. This action expands the menu to show options like Opportunities, Leads, and Campaigns.",
      "use_case": "Provides access to core sales management functionalities, enabling the user to navigate to different sales-related modules.",
      "focus_region_norm": [
        0.34,
        0.12,
        0.05,
        0.04
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    },
    {
      "id": "clip_021",
      "title": "Selection • Opportunities",
      "category": "selection",
      "start_sec": 247.5,
      "interaction_sec": 249.5,
      "end_sec": 251.5,
      "ui_element": "Opportunities Option",
      "action_description": "The user selects 'Opportunities' from the 'Sales' dropdown menu. This navigates to the Opportunities list page.",
      "use_case": "Initiates the management of sales opportunities, allowing the user to track the progress of deals from initial lead to closure.",
      "focus_region_norm": [
        0.3,
        0.22,
        0.12,
        0.03
      ],
      "zoom_depth": 2.5,
      "confidence": 0.95
    },
    {
      "id": "clip_022",
      "title": "Click • New Button (Opportunities List)",
      "category": "click",
      "start_sec": 255.5,
      "interaction_sec": 257.5,
      "end_sec": 259.5,
      "ui_element": "New Button",
      "action_description": "The user clicks the 'New' button on the Opportunities list page. This opens the 'New Opportunity' modal.",
      "use_case": "Starts the process of creating a new sales opportunity, allowing sales teams to log and track potential deals.",
      "focus_region_norm": [
        0.82,
        0.17,
        0.04,
        0.04
      ],
      "zoom_depth": 3,
      "confidence": 0.95
    },
    {
      "id": "clip_023",
      "title": "Typing • Opportunity Name",
      "category": "typing",
      "start_sec": 257,
      "interaction_sec": 259,
      "end_sec": 261,
      "ui_element": "Opportunity Name Input",
      "action_description": "The user types 'project 1' into the 'Opportunity Name' field in the 'New Opportunity' modal.",
      "use_case": "Provides a clear and descriptive name for the sales opportunity, making it easily identifiable and trackable throughout the sales pipeline.",
      "focus_region_norm": [
        0.33,
        0.2,
        0.4,
        0.04
      ],
      "zoom_depth": 3,
      "confidence": 0.95
    },
    {
      "id": "clip_024_cluster",
      "title": "Multi-Interaction • Set Opportunity Stage & Save",
      "category": "form_submission",
      "start_sec": 311,
      "interaction_sec": 315.95,
      "end_sec": 320.9,
      "ui_element": "Opportunity Status, Forecast Category, and Save Button",
      "action_description": "The user clicks the 'Stage' dropdown and selects 'Qualify', then clicks the 'Forecast Category' dropdown and selects 'Pipeline'. Finally, the user clicks the 'Save' button to finalize the new opportunity.",
      "use_case": "Illustrates how sales teams can update key progress metrics for a sales opportunity and save the changes, ensuring accurate tracking and forecasting.",
      "focus_region_norm": [
        0.25,
        0.6,
        0.5,
        0.3
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    },
    {
      "id": "clip_028",
      "title": "Click • Mark Stage as Complete",
      "category": "click",
      "start_sec": 323.5,
      "interaction_sec": 325.5,
      "end_sec": 327.5,
      "ui_element": "Mark Stage as Complete Button",
      "action_description": "The user clicks the 'Mark Stage as Complete' button for the 'Qualify' stage. This progresses the opportunity to the next stage in the sales pipeline.",
      "use_case": "Advances a sales opportunity through its lifecycle, updating its status and enabling further actions and team collaboration.",
      "focus_region_norm": [
        0.61,
        0.49,
        0.15,
        0.04
      ],
      "zoom_depth": 2.5,
      "confidence": 0.95
    },
    {
      "id": "clip_029",
      "title": "Click • Outreach Dropdown",
      "category": "click",
      "start_sec": 338.5,
      "interaction_sec": 340.5,
      "end_sec": 342.5,
      "ui_element": "Outreach Dropdown Menu",
      "action_description": "The user clicks on the 'Outreach' dropdown menu in the top navigation bar. This action expands the menu to show options related to email and communication.",
      "use_case": "Provides access to marketing and communication tools, allowing users to manage email campaigns and templates.",
      "focus_region_norm": [
        0.42,
        0.12,
        0.08,
        0.04
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    },
    {
      "id": "clip_030",
      "title": "Selection • Email Templates",
      "category": "selection",
      "start_sec": 340.5,
      "interaction_sec": 342.5,
      "end_sec": 344,
      "ui_element": "Email Templates Option",
      "action_description": "The user selects 'Email Templates' from the 'Outreach' dropdown menu. This navigates to the Email Templates list page.",
      "use_case": "Enables the user to create, manage, and utilize standardized email templates for efficient and consistent marketing and communication efforts.",
      "focus_region_norm": [
        0.38,
        0.35,
        0.15,
        0.04
      ],
      "zoom_depth": 2.5,
      "confidence": 0.95
    },
    {
      "id": "clip_031",
      "title": "Click • New Email Template Button",
      "category": "click",
      "start_sec": 350,
      "interaction_sec": 352,
      "end_sec": 354,
      "ui_element": "New Email Template Button",
      "action_description": "The user clicks the 'New Email Template' button on the Email Templates list page. This opens the 'New Email Template' modal.",
      "use_case": "Initiates the creation of a new reusable email template, simplifying the process of sending consistent communications.",
      "focus_region_norm": [
        0.73,
        0.2,
        0.12,
        0.04
      ],
      "zoom_depth": 3,
      "confidence": 0.95
    },
    {
      "id": "clip_032_cluster",
      "title": "Multi-Interaction • Create Email Template Details",
      "category": "typing",
      "start_sec": 354.5,
      "interaction_sec": 358.25,
      "end_sec": 362,
      "ui_element": "Email Template Name, Related Entity Type, Subject",
      "action_description": "The user types 'project 1' into the 'Email Template Name' field, selects 'Case' from the 'Related Entity Type' dropdown, and then types 'Subject' into the subject line field.",
      "use_case": "Demonstrates the initial steps of setting up a new email template, including naming it, linking it to a specific entity type, and defining the subject line for future use in marketing campaigns.",
      "focus_region_norm": [
        0.25,
        0.2,
        0.5,
        0.3
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    },
    {
      "id": "clip_035",
      "title": "Click • Save Button (Email Template)",
      "category": "click",
      "start_sec": 404,
      "interaction_sec": 406,
      "end_sec": 408,
      "ui_element": "Save Button",
      "action_description": "The user clicks the 'Save' button in the 'New Email Template' modal. This saves the new email template and navigates to its details page.",
      "use_case": "Finalizes the creation of the email template, making it available for use in marketing automation and outreach.",
      "focus_region_norm": [
        0.46,
        0.9,
        0.08,
        0.04
      ],
      "zoom_depth": 3,
      "confidence": 0.95
    },
    {
      "id": "clip_036",
      "title": "Click • Service Dropdown",
      "category": "click",
      "start_sec": 416.5,
      "interaction_sec": 418.5,
      "end_sec": 420.5,
      "ui_element": "Service Dropdown Menu",
      "action_description": "The user clicks on the 'Service' dropdown menu in the top navigation bar. This expands the menu to show options like Cases, Knowledge, and Quick Text.",
      "use_case": "Provides access to customer service and support features, allowing users to track and manage customer inquiries and issues.",
      "focus_region_norm": [
        0.55,
        0.12,
        0.06,
        0.04
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    },
    {
      "id": "clip_037",
      "title": "Selection • Cases",
      "category": "selection",
      "start_sec": 418.5,
      "interaction_sec": 420.5,
      "end_sec": 422.5,
      "ui_element": "Cases Option",
      "action_description": "The user selects 'Cases' from the 'Service' dropdown menu. This navigates to the Cases list page.",
      "use_case": "Initiates the management of customer service cases, allowing support teams to track, manage, and resolve customer issues efficiently.",
      "focus_region_norm": [
        0.5,
        0.22,
        0.08,
        0.03
      ],
      "zoom_depth": 2.5,
      "confidence": 0.95
    },
    {
      "id": "clip_038",
      "title": "Click • New Button (Cases List)",
      "category": "click",
      "start_sec": 424.5,
      "interaction_sec": 426.5,
      "end_sec": 428.5,
      "ui_element": "New Button",
      "action_description": "The user clicks the 'New' button on the Cases list page. This opens the 'New Case' modal.",
      "use_case": "Starts the process of logging a new customer service case, enabling support agents to quickly record and address customer issues.",
      "focus_region_norm": [
        0.82,
        0.17,
        0.04,
        0.04
      ],
      "zoom_depth": 3,
      "confidence": 0.95
    },
    {
      "id": "clip_039_cluster",
      "title": "Multi-Interaction • Create New Case",
      "category": "form_submission",
      "start_sec": 428,
      "interaction_sec": 434.45,
      "end_sec": 440.9,
      "ui_element": "Case Status, Origin, Priority, Contact/Account Name, and Save Button",
      "action_description": "The user selects 'Working' for Status, 'Email' for Case Origin, 'High' for Priority, types a contact name ('joe welem') and an account name ('project1'), and then clicks the 'Save' button. This creates a new case record.",
      "use_case": "Demonstrates the complete workflow of logging a new customer support case, ensuring all critical information, such as priority, origin, and associated contacts, is accurately captured and saved.",
      "focus_region_norm": [
        0.25,
        0.2,
        0.5,
        0.6
      ],
      "zoom_depth": 1.5,
      "confidence": 0.95
    },
    {
      "id": "clip_045",
      "title": "Click • New Event Button (Calendar)",
      "category": "click",
      "start_sec": 440.5,
      "interaction_sec": 442.5,
      "end_sec": 444.5,
      "ui_element": "New Event Button",
      "action_description": "The user clicks the 'New Event' button on the Calendar page. This action opens the 'New Event' modal.",
      "use_case": "Initiates the process of scheduling a new event or meeting directly from the calendar, allowing for easy planning and collaboration.",
      "focus_region_norm": [
        0.85,
        0.17,
        0.08,
        0.04
      ],
      "zoom_depth": 3,
      "confidence": 0.95
    },
    {
      "id": "clip_046_cluster",
      "title": "Multi-Interaction • Schedule New Event",
      "category": "form_submission",
      "start_sec": 444,
      "interaction_sec": 450.5,
      "end_sec": 457,
      "ui_element": "New Event Modal Form",
      "action_description": "The user types 'meeting' into the 'Subject' field, selects a start date and time (Jan 16, 2024, 1:00 AM) and an end date and time, adds an attendee ('aiman nadeem'), and then clicks the 'Save' button. This creates a new event.",
      "use_case": "Illustrates how to quickly schedule a new event or meeting, including setting the subject, time, and attendees, thereby centralizing scheduling within Salesforce.",
      "focus_region_norm": [
        0.25,
        0.2,
        0.5,
        0.7
      ],
      "zoom_depth": 1.5,
      "confidence": 0.95
    },
    {
      "id": "clip_051",
      "title": "Click • Reports Tab",
      "category": "click",
      "start_sec": 517,
      "interaction_sec": 519,
      "end_sec": 521,
      "ui_element": "Reports Tab",
      "action_description": "The user clicks on the 'Reports' tab in the top navigation bar. This action navigates to the Reports list page.",
      "use_case": "Provides access to analytical reports, allowing users to gain insights into sales, marketing, and customer service activities for data-driven decision-making.",
      "focus_region_norm": [
        0.72,
        0.12,
        0.06,
        0.04
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    },
    {
      "id": "clip_052",
      "title": "Click • Dashboards Tab",
      "category": "click",
      "start_sec": 524,
      "interaction_sec": 526,
      "end_sec": 528,
      "ui_element": "Dashboards Tab",
      "action_description": "The user clicks on the 'Dashboards' tab in the top navigation bar. This action navigates to the Dashboards list page.",
      "use_case": "Allows users to access and view various dashboards, providing a visual overview of key performance indicators across different business functions.",
      "focus_region_norm": [
        0.65,
        0.12,
        0.08,
        0.04
      ],
      "zoom_depth": 2,
      "confidence": 0.95
    }
  ],
  "full_transcript": "[00:00] Hey everyone, I am Bryce. [00:01] And today, I am going to explain to you what is Salesforce and how it works. [00:06] So make sure to stick around till the very end to completely understand how you can use Salesforce to easily handle customer relationships. [00:18] Salesforce provides cloud-based tools and services, sales processes, and marketing efforts. [00:24] It helps businesses keep track of their contacts, leads, and accounts in a centralized database. [00:30] This includes information such as customer details, communication history, and any ongoing opportunities. [00:37] So first thing, start by adding your contacts or accounts. [00:40] For that, click on accounts from the homepage. [00:43] Then, click on new from your top right corner. [00:46] So here, you guys can add a new contact by adding their information, like account name, website, description, and other details. [00:55] You guys can also add their contact details, billing, and shipping address. [01:00] So once you are done, hit the save button to save this account. [01:03] In this way, you can add multiple customer accounts or leads to follow. [01:08] Once it is added, you can change multiple settings. [01:10] For example, schedule a meeting or assign a new task for this newly added lead. [01:16] Let us proceed with setting meeting availability. [01:19] Now here, we have the calendar of whole week, on which we can schedule the meeting depending on our availability time. [01:27] Once the meeting details are entered, Salesforce allows you to send invitations to attendees. [01:33] This can include email notifications with meeting details and calendar invites. [01:38] The good thing is that Salesforce can integrate with popular email and calendar applications, ensuring that meeting details are synchronized across platforms and providing a unified view of your schedule. [01:49] Now as you guys can see, our first lead or customer account has been added. [01:55] Similarly, you can create a list of contacts on this platform by clicking on the new button. [02:00] You will get to see this page. [02:03] Here, you can add a contact name, account name, title, description, and other details. [02:09] In the reports two section, you can add a member of your organization, who will follow up with the contact added. [02:16] You can email, add, and manage multiple contacts on this page. [02:20] By clicking on the show all activities button, your team will be able to see all of the meetings, calls, or tasks scheduled for this contact. [02:29] From the right side, you can upload any document, pictures, videos, or other files for your contacts. [02:37] So, Salesforce is very useful for marketing automation, as it enables businesses to create and manage marketing campaigns, track their effectiveness, and analyze customer responses. [02:47] So, from this section, you can manage sales opportunities and deals through Salesforce. [02:53] Tracking the progress of sales from the initial lead to the final closure. [02:57] So, you just need to fill in the necessary details like a descriptive name for the opportunity. [03:03] The account associated with this opportunity. [03:05] The expected or target closing date for the opportunity. [03:09] The stage in the sales process and the potential review associated with the opportunity. [03:14] Here, you can also add the status of the opportunity to see its progress stage. [03:20] After saving, you can review the opportunity details and make any necessary updates. [03:25] This includes updating the stage as the opportunity progresses through the sales pipeline. [03:30] If you are working in a team, you can add team members who are involved in working on this opportunity. [03:36] This could include sales representatives, managers, or any other stakeholders. [03:41] Salesforce is also well known for integrating and managing email marketing campaigns. [03:47] It offers various email templates, by which you can create email lists for your contacts. [03:52] By clicking on the new email template option, you will get this form that you need to fill out to add a new email template. [03:59] On scrolling down, you will have the option to add message content to it. [04:04] Once you are done, you just need to hit the save button and your email template is all set to be used. [04:09] On the back end, you can add different related files linked to this campaign. [04:16] Here, you will get to see several features for customer service and support, allowing businesses to track and manage customer inquiries, issues, and resolutions. [04:24] So, go to service and click on cases. [04:26] Click on new and then add complete details about the new case that you need to deal with. [04:32] Fill in information like status, case origin, priority, case owner, subject, and description. [04:39] In the calendar section, you can manage and access your schedule of meetings, calls, or events. [04:44] You can also add a new event from here that you can share with the team. [04:49] Just fill in the information like starting and ending date and time. [04:52] Next, you can add people in the attendee section. [04:56] Once you have saved it, you can easily see this event in your Salesforce calendar. [05:00] Salesforce automatically logs the meeting as an activity in the associated records, providing a comprehensive view of interactions with a particular contact, account, or opportunity. [05:11] After the meeting, you can log follow-up actions, update records, and track any outcomes or next steps discussed during the meeting. [05:19] Here, you can access reports and dashboards to gain insights into your sales, marketing, and customer service activity. [05:26] This helps in data-driven decision-making. [05:29] Businesses of all sizes can choose Salesforce to improve their connections with customers and make their sales and marketing activities more efficient. [05:38] On that note, that will be it for this video. [05:40] I hope you guys got some value. [05:41] Thank you for watching and see you in the next one."
}
      `,

      // To add tools, specify `tools` in the constructor.
      // Here's an example that adds a simple weather tool.
      // You also have to add `import { llm } from '@livekit/agents' and `import { z } from 'zod'` to the top of this file
      // tools: {
      //   getWeather: llm.tool({
      //     description: `Use this tool to look up current weather information in the given location.
      //
      //     If the location is not supported by the weather service, the tool will indicate this. You must tell the user the location's weather is unavailable.`,
      //     parameters: z.object({
      //       location: z
      //         .string()
      //         .describe('The location to look up weather information for (e.g. city name)'),
      //     }),
      //     execute: async ({ location }) => {
      //       console.log(`Looking up weather for ${location}`);
      //
      //       return 'sunny with a temperature of 70 degrees.';
      //     },
      //   }),
      // },
    });
  }
}

export default defineAgent({
  prewarm: async (proc: JobProcess) => {
    proc.userData.vad = await silero.VAD.load();
  },
  entry: async (ctx: JobContext) => {
    // Set up a voice AI pipeline using OpenAI, Cartesia, AssemblyAI, and the LiveKit turn detector
    const session = new voice.AgentSession({
      // Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
      // See all available models at https://docs.livekit.io/agents/models/stt/
      stt: 'assemblyai/universal-streaming:en',

      // A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
      // See all providers at https://docs.livekit.io/agents/models/llm/
      llm: 'openai/gpt-4.1-mini',

      // Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
      // See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
      tts: 'cartesia/sonic-2:9626c31c-bec5-4cca-baa8-f8ba9e84c8bc',

      // VAD and turn detection are used to determine when the user is speaking and when the agent should respond
      // See more at https://docs.livekit.io/agents/build/turns
      turnDetection: new livekit.turnDetector.MultilingualModel(),
      vad: ctx.proc.userData.vad! as silero.VAD,
    });

    // To use a realtime model instead of a voice pipeline, use the following session setup instead.
    // (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    // 1. Install '@livekit/agents-plugin-openai'
    // 2. Set OPENAI_API_KEY in .env.local
    // 3. Add import `import * as openai from '@livekit/agents-plugin-openai'` to the top of this file
    // 4. Use the following session setup instead of the version above
    // const session = new voice.AgentSession({
    //   llm: new openai.realtime.RealtimeModel({ voice: 'marin' }),
    // });

    // Metrics collection, to measure pipeline performance
    // For more information, see https://docs.livekit.io/agents/build/metrics/
    const usageCollector = new metrics.UsageCollector();
    session.on(voice.AgentSessionEventTypes.MetricsCollected, (ev) => {
      metrics.logMetrics(ev.metrics);
      usageCollector.collect(ev.metrics);
    });

    const logUsage = async () => {
      const summary = usageCollector.getSummary();
      console.log(`Usage: ${JSON.stringify(summary)}`);
    };

    ctx.addShutdownCallback(logUsage);

    // Start the session, which initializes the voice pipeline and warms up the models
    await session.start({
      agent: new Assistant(),
      room: ctx.room,
      inputOptions: {
        // LiveKit Cloud enhanced noise cancellation
        // - If self-hosting, omit this parameter
        // - For telephony applications, use `BackgroundVoiceCancellationTelephony` for best results
        noiseCancellation: BackgroundVoiceCancellation(),
      },
    });

    // Join the room and connect to the user
    await ctx.connect();
  },
});

cli.runApp(new WorkerOptions({ agent: fileURLToPath(import.meta.url) }));
