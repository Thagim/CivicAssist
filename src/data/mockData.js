// ============================================================
// CIVICASSIST MOCK DATA
// ============================================================

// Generic user object
// This is only a fallback for existing components.
// Actual registered user information is stored in localStorage.

export const user = {
  name: "",
  initials: "",
  mobile: "",
  email: "",
  address: "",
  dob: "",
  gender: ""
};


// ============================================================
// GOVERNMENT SERVICES
// ============================================================

export const services = [
  {
    id: "caste-certificate",
    title: "Caste Certificate",
    category: "Certificates",
    department:
      "Department of Revenue, Registration & Land Reforms",
    govLevel: "Government of Jharkhand",

    description:
      "An official document issued by the government to certify the caste of a person for availing reservation and welfare benefits.",

    processingTime: "15 – 30 Days",
    fee: "₹50 (approx.)",
    mode: "Online",

    benefits: [
      "Educational reservation",
      "Government job reservation",
      "Scholarships & welfare schemes",
      "Fee concessions",
      "Other government benefits"
    ],

    eligibility: [
      "Applicant must be a resident of the state for at least 10 years",
      "Applicant must belong to a recognized caste/community",
      "Family/community records must support the claim"
    ],

    documents: [
      {
        label: "Identity Proof",
        detail: "Aadhaar Card / Voter ID / PAN Card"
      },
      {
        label: "Address Proof",
        detail: "Ration Card / Electricity Bill"
      },
      {
        label: "Supporting Caste Document",
        detail: "Community certificate / Family record"
      }
    ]
  },

  {
    id: "income-certificate",
    title: "Income Certificate",
    category: "Certificates",
    department: "Department of Revenue Administration",
    govLevel: "State Government",

    description:
      "Certifies the annual income of an individual or family, used for scholarships, loans, and welfare scheme eligibility.",

    processingTime: "7 – 15 Days",
    fee: "₹30 (approx.)",
    mode: "Online",

    benefits: [
      "Scholarship eligibility",
      "Fee waivers",
      "Loan subsidy proof",
      "Welfare scheme access"
    ],

    eligibility: [
      "Applicant must be a resident of the state",
      "Income details must be verifiable"
    ],

    documents: [
      {
        label: "Identity Proof",
        detail: "Aadhaar Card / Voter ID"
      },
      {
        label: "Salary Slip / Income Proof",
        detail: "Employer certificate or self-declaration"
      },
      {
        label: "Address Proof",
        detail: "Ration Card / Electricity Bill"
      }
    ]
  },

  {
    id: "domicile-certificate",
    title: "Domicile Certificate",
    category: "Certificates",
    department: "Department of Revenue Administration",
    govLevel: "State Government",

    description:
      "Proves residency status of an applicant within a state, required for admissions and jobs.",

    processingTime: "10 – 20 Days",
    fee: "₹40 (approx.)",
    mode: "Online",

    benefits: [
      "State quota admissions",
      "State government job eligibility",
      "Domicile-based scholarships"
    ],

    eligibility: [
      "Applicant must have resided in the state for the required duration"
    ],

    documents: [
      {
        label: "Identity Proof",
        detail: "Aadhaar Card / Voter ID"
      },
      {
        label: "Residence Proof",
        detail:
          "Ration Card / Rent Agreement / Electricity Bill"
      }
    ]
  },

  {
    id: "birth-certificate",
    title: "Birth Certificate",
    category: "Certificates",
    department: "Department of Civil Registration",
    govLevel: "Municipal / Panchayat",

    description:
      "Official record of a person's birth, essential for identity documents and school admissions.",

    processingTime: "5 – 10 Days",
    fee: "₹20 (approx.)",
    mode: "Online",

    benefits: [
      "School admissions",
      "Passport applications",
      "Legal identity proof"
    ],

    eligibility: [
      "Birth must be registered within the jurisdiction"
    ],

    documents: [
      {
        label: "Hospital Birth Record",
        detail: "Discharge summary / birth slip"
      },
      {
        label: "Parents' ID Proof",
        detail: "Aadhaar Card / Voter ID"
      }
    ]
  },

  {
    id: "scholarship-post-matric",
    title: "Post Matric Scholarship",
    category: "Education",
    department:
      "Department of Higher & Technical Education",
    govLevel: "Central & State Government",

    description:
      "Financial assistance for students pursuing education after Class 10 from eligible communities.",

    processingTime: "20 – 45 Days",
    fee: "Free",
    mode: "Online",

    benefits: [
      "Tuition fee reimbursement",
      "Maintenance allowance",
      "Book grants"
    ],

    eligibility: [
      "Family income below prescribed limit",
      "Enrolled in a recognized institution"
    ],

    documents: [
      {
        label: "Income Certificate",
        detail: "Issued within last 12 months"
      },
      {
        label: "Caste Certificate",
        detail: "If applicable"
      },
      {
        label: "Institution Bonafide Certificate",
        detail: "From current institution"
      }
    ]
  },

  {
    id: "pension-scheme",
    title: "Old Age Pension Scheme",
    category: "Health",
    department: "Department of Social Welfare",
    govLevel: "State Government",

    description:
      "Monthly financial support for senior citizens without a stable source of income.",

    processingTime: "15 – 25 Days",
    fee: "Free",
    mode: "Online / Offline",

    benefits: [
      "Monthly pension amount",
      "Priority healthcare access"
    ],

    eligibility: [
      "Applicant must be 60+ years",
      "Below poverty line preferred"
    ],

    documents: [
      {
        label: "Age Proof",
        detail: "Aadhaar Card / Voter ID"
      },
      {
        label: "Income Certificate",
        detail: "Issued within last 12 months"
      }
    ]
  }
];


// ============================================================
// APPLICATIONS
// ============================================================

export const applications = [
  {
    id: "JH-2024-1234567",
    serviceId: "caste-certificate",
    title: "Caste Certificate",
    submitted: "20 May 2024",
    status: "Under Verification",
    step: 3,

    steps: [
      "Submitted",
      "Documents Received",
      "Under Verification",
      "Certificate Generated"
    ]
  },

  {
    id: "JH-2024-9876543",
    serviceId: "income-certificate",
    title: "Income Certificate",
    submitted: "10 May 2024",
    status: "Completed",
    step: 4,

    steps: [
      "Submitted",
      "Documents Received",
      "Under Verification",
      "Certificate Generated"
    ]
  },

  {
    id: "JH-2024-5678901",
    serviceId: "scholarship-post-matric",
    title: "Scholarship (Post Matric)",
    submitted: "18 May 2024",
    status: "Processing",
    step: 2,

    steps: [
      "Submitted",
      "Documents Received",
      "Under Verification",
      "Disbursed"
    ]
  }
];


// ============================================================
// NOTIFICATIONS
// ============================================================

export const notifications = [
  {
    id: 1,
    text:
      "Your Caste Certificate application is under verification.",
    time: "2 hours ago",
    type: "pending"
  },

  {
    id: 2,
    text:
      "Income Certificate has been generated successfully.",
    time: "1 day ago",
    type: "success"
  },

  {
    id: 3,
    text:
      "Please upload additional document for Scholarship application.",
    time: "2 days ago",
    type: "action"
  }
];


// ============================================================
// POPULAR SEARCHES
// ============================================================

export const popularSearches = [
  "Caste Certificate",
  "Income Certificate",
  "Domicile Certificate",
  "Birth Certificate"
];


// ============================================================
// AI ASSISTANT SUGGESTIONS
// ============================================================

export const aiSuggestions = [
  "I need a caste certificate",
  "Scholarship for college",
  "Income certificate",
  "How do I track my application?"
];