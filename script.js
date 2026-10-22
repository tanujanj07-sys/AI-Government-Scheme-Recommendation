const schemes = [
  {
    name: "PM-KISAN Samman Nidhi",
    category: "Agriculture",
    description: "Income support scheme for landholding farmer families.",
    benefits: [
      "Rs. 6,000 per year in three installments",
      "Direct Benefit Transfer to bank account"
    ],
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maxAnnualIncome: 999999999,
      states: ["ALL"],
      occupations: ["Farmer"],
      educationLevels: ["ALL"]
    },
    documents: [
      "Aadhaar Card",
      "Bank passbook",
      "Land ownership documents",
      "Mobile number"
    ],
    applicationSteps: [
      "Visit the official PM-KISAN portal.",
      "Click on New Farmer Registration.",
      "Enter Aadhaar, bank, and land details.",
      "Submit the application and save the registration number."
    ],
    officialLink: "https://pmkisan.gov.in/"
  },
  {
    name: "Pradhan Mantri Awas Yojana - Urban",
    category: "Housing",
    description: "Housing assistance for eligible urban families without a pucca house.",
    benefits: [
      "Interest subsidy or financial assistance",
      "Support for eligible EWS, LIG, and MIG families"
    ],
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maxAnnualIncome: 900000,
      states: ["ALL"],
      occupations: ["ALL"],
      educationLevels: ["ALL"]
    },
    documents: [
      "Aadhaar Card",
      "Income certificate",
      "Bank account details",
      "Address proof",
      "Declaration of not owning a pucca house"
    ],
    applicationSteps: [
      "Visit the official PMAY-Urban portal.",
      "Select the suitable application category.",
      "Enter personal, income, and bank details.",
      "Upload documents and submit the form."
    ],
    officialLink: "https://pmaymis.gov.in/"
  },
  {
    name: "National Scholarship Scheme",
    category: "Education",
    description: "Scholarship support for eligible school and college students.",
    benefits: [
      "Tuition fee support",
      "Maintenance allowance",
      "Direct scholarship transfer"
    ],
    eligibility: {
      minAge: 15,
      maxAge: 30,
      maxAnnualIncome: 250000,
      states: ["ALL"],
      occupations: ["Student"],
      educationLevels: ["School", "Undergraduate", "Postgraduate"]
    },
    documents: [
      "Aadhaar Card",
      "Previous marksheet",
      "Income certificate",
      "Bank passbook",
      "Bonafide/student certificate"
    ],
    applicationSteps: [
      "Visit the National Scholarship Portal.",
      "Register using mobile number and email.",
      "Fill academic and bank details.",
      "Upload documents and submit the application."
    ],
    officialLink: "https://scholarships.gov.in/"
  },
  {
    name: "Pradhan Mantri Mudra Yojana",
    category: "Business",
    description: "Collateral-free business loans for small and micro enterprises.",
    benefits: [
      "Loan support up to Rs. 10 lakh",
      "No collateral required",
      "Support for small businesses"
    ],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      maxAnnualIncome: 999999999,
      states: ["ALL"],
      occupations: ["Self-Employed", "Small Business Owner", "Farmer"],
      educationLevels: ["ALL"]
    },
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Bank statement",
      "Business plan",
      "Address proof"
    ],
    applicationSteps: [
      "Visit a bank or financial institution offering Mudra loans.",
      "Choose Shishu, Kishore, or Tarun category.",
      "Fill the application form.",
      "Attach KYC and business documents.",
      "Submit the form for verification."
    ],
    officialLink: "https://www.mudra.org.in/"
  },
  {
    name: "Ayushman Bharat - PM Jan Arogya Yojana",
    category: "Health",
    description: "Health coverage for eligible low-income families.",
    benefits: [
      "Cashless treatment at empanelled hospitals",
      "Coverage for approved medical procedures"
    ],
    eligibility: {
      minAge: 0,
      maxAge: 120,
      maxAnnualIncome: 300000,
      states: ["ALL"],
      occupations: ["ALL"],
      educationLevels: ["ALL"]
    },
    documents: [
      "Aadhaar Card",
      "Ration card",
      "Income certificate",
      "Mobile number"
    ],
    applicationSteps: [
      "Check eligibility on the official PM-JAY portal or nearest CSC.",
      "Verify your name in the beneficiary list.",
      "Collect the Ayushman card.",
      "Use the card at an empanelled hospital."
    ],
    officialLink: "https://pmjay.gov.in/"
  },
  {
    name: "Maharashtra Farmer Support Scheme",
    category: "Agriculture",
    description: "State-level agricultural assistance for farmers in Maharashtra.",
    benefits: [
      "Crop-related financial assistance",
      "Access to state agriculture services"
    ],
    eligibility: {
      minAge: 18,
      maxAge: 100,
      maxAnnualIncome: 999999999,
      states: ["Maharashtra"],
      occupations: ["Farmer"],
      educationLevels: ["ALL"]
    },
    documents: [
      "Aadhaar Card",
      "7/12 land record",
      "Bank passbook",
      "Domicile certificate"
    ],
    applicationSteps: [
      "Visit the Maharashtra Aaple Sarkar portal.",
      "Login using Aadhaar-based authentication.",
      "Select the agriculture service.",
      "Upload documents and submit the application."
    ],
    officialLink: "https://aaplesarkar.mahaonline.gov.in/"
  }
];

document.getElementById("schemeForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const age = Number(document.getElementById("age").value);
  const income = Number(document.getElementById("income").value);
  const state = document.getElementById("state").value;
  const occupation = document.getElementById("occupation").value;
  const education = document.getElementById("education").value;

  const eligible = [];
  const partial = [];

  schemes.forEach((scheme) => {
    const e = scheme.eligibility;

    const ageOk = age >= e.minAge && age <= e.maxAge;
    const incomeOk = income <= e.maxAnnualIncome;
    const stateOk = e.states.includes("ALL") || e.states.includes(state);
    const occupationOk =
      e.occupations.includes("ALL") || e.occupations.includes(occupation);
    const educationOk =
      e.educationLevels.includes("ALL") || e.educationLevels.includes(education);

    const checks = [ageOk, incomeOk, stateOk, occupationOk, educationOk];
    const passed = checks.filter(Boolean).length;
    const matchPercent = Math.round((passed / checks.length) * 100);

    const result = {
      ...scheme,
      matchPercent,
      ageOk,
      incomeOk,
      stateOk,
      occupationOk,
      educationOk
    };

    if (ageOk && incomeOk && stateOk && occupationOk && educationOk) {
      eligible.push(result);
    } else if (matchPercent >= 60) {
      partial.push(result);
    }
  });

  eligible.sort((a, b) => b.matchPercent - a.matchPercent);
  partial.sort((a, b) => b.matchPercent - a.matchPercent);

  displayResults(eligible, partial);
});

function displayResults(eligible, partial) {
  const results = document.getElementById("results");
  let html = "";

  if (eligible.length === 0 && partial.length === 0) {
    html = `
      <div class="scheme-card">
        <h3>No Matching Schemes Found</h3>
        <p>Please change your income, occupation, education, or state details and try again.</p>
      </div>`;
    results.innerHTML = html;
    return;
  }

  if (eligible.length > 0) {
    html += `<h2>Eligible Schemes</h2>`;
    eligible.forEach((scheme) => {
      html += createSchemeCard(scheme, "Eligible", "eligible");
    });
  }

  if (partial.length > 0) {
    html += `<h2>Possible Schemes</h2>`;
    partial.forEach((scheme) => {
      html += createSchemeCard(scheme, "Partially Eligible", "partial");
    });
  }

  results.innerHTML = html;
}

function createSchemeCard(scheme, badgeText, badgeClass) {
  return `
    <div class="scheme-card">
      <span class="badge ${badgeClass}">${badgeText}</span>
      <h3>${scheme.name}</h3>

      <p><strong>Category:</strong> ${scheme.category}</p>
      <p>${scheme.description}</p>

      <div class="progress">
        <div style="width:${scheme.matchPercent}%"></div>
      </div>
      <p><strong>Match Score:</strong> ${scheme.matchPercent}%</p>

      <h4>Benefits</h4>
      <ul>
        ${scheme.benefits.map((item) => `<li>${item}</li>`).join("")}
      </ul>

      <h4>Required Documents</h4>
      <ul>
        ${scheme.documents.map((item) => `<li>${item}</li>`).join("")}
      </ul>

      <h4>How to Apply</h4>
      <ol>
        ${scheme.applicationSteps.map((item) => `<li>${item}</li>`).join("")}
      </ol>

      <p>
        <a href="${scheme.officialLink}" target="_blank">
          Visit Official Portal
        </a>
      </p>
    </div>`;
}