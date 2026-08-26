import re

with open("scratch/catalog_strings.txt", "r", encoding="utf-8") as f:
    new_strings = f.read()

# Add extra manual strings
extra_strings = """
  "Browse & Search": { en: "Browse & Search" },
  "Describe what you need ✨": { en: "Describe what you need ✨" },
  "Search by service name or category...": { en: "Search by service name or category..." },
  "E.g. I bought a second-hand car...": { en: "E.g. I bought a second-hand car..." },
  "Most Used": { en: "Most Used" },
  "Renew Licence": { en: "Renew Licence" },
  "Transfer Vehicle": { en: "Transfer Vehicle" },
  "Pay Challan": { en: "Pay Challan" },
  "Track App": { en: "Track App" },
  "Search Results": { en: "Search Results" },
  "All Services": { en: "All Services" },
  "VANI is thinking...": { en: "VANI is thinking..." },
  "Tell me what you're trying to do on Parivahan.": { en: "Tell me what you're trying to do on Parivahan." },
  "Experience Preview": { en: "Experience Preview" },
  "What you'll need:": { en: "What you'll need:" },
  "RTO visit:": { en: "RTO visit:" },
  "Completely online.": { en: "Completely online." },
  "Required.": { en: "Required." },
  "May depend on the application and RTO.": { en: "May depend on the application and RTO." },
  "Start application": { en: "Start application" },
  "View experience preview": { en: "View experience preview" },
  "Explore service": { en: "Explore service" },
  "Tentative": { en: "Tentative" },
  "Browse services": { en: "Browse services" },
  "Try again": { en: "Try again" },
  "Open Help": { en: "Open Help" },
  "You also asked about:": { en: "You also asked about:" },
  "Related:": { en: "Related:" },
  "Working Prototype": { en: "Working Prototype" },
  "See how this service would work in the redesigned Parivahan experience. Backend integration will eventually connect this workflow to the official government system.": { en: "See how this service would work in the redesigned Parivahan experience. Backend integration will eventually connect this workflow to the official government system." },
  "Before you start": { en: "Before you start" },
  "Estimated Time": { en: "Estimated Time" },
  "Fee Information": { en: "Fee Information" },
  "RTO Visit Requirement": { en: "RTO Visit Requirement" },
  "Service Availability": { en: "Service Availability" },
  "Important Prerequisites": { en: "Important Prerequisites" },
  "Eligibility Criteria": { en: "Eligibility Criteria" },
  "Documents Checklist": { en: "Documents Checklist" },
  "Required Documents": { en: "Required Documents" },
  "Conditional Documents": { en: "Conditional Documents" },
  "Optional Documents": { en: "Optional Documents" },
  "Expected Process Timeline": { en: "Expected Process Timeline" },
  "Ready to proceed?": { en: "Ready to proceed?" },
  "Ensure you have all the required documents scanned and ready before beginning the official application process.": { en: "Ensure you have all the required documents scanned and ready before beginning the official application process." },
  "This service is currently in the Experience Preview phase. Explore how the workflow is designed to operate.": { en: "This service is currently in the Experience Preview phase. Explore how the workflow is designed to operate." },
  "Applicable fee will be calculated by the official backend.": { en: "Applicable fee will be calculated by the official backend." },
  "No physical visit expected for this eligible case.": { en: "No physical visit expected for this eligible case." },
  "Depends on service/state/RTO/application conditions.": { en: "Depends on service/state/RTO/application conditions." },
  "Physical verification/appointment is part of this workflow.": { en: "Physical verification/appointment is part of this workflow." },
  "States: ": { en: "States: " },
"""

all_new_strings = new_strings + "\n" + extra_strings

with open("lib/translations.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Insert before "};\n\nexport function t("
content = content.replace("};\n\nexport function t(", all_new_strings + "\n};\n\nexport function t(")

with open("lib/translations.ts", "w", encoding="utf-8") as f:
    f.write(content)
