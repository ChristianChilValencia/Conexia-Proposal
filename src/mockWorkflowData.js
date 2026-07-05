import { getCurrentAssignee } from "./workflowEngine";

export const workflowUsers = [
  { roleKey: "scs-department-staff", name: "Dr. Andrea Lim", department: "SCS - School of Computer Studies" },
  { roleKey: "sas-department-staff", name: "Prof. Lina Reyes", department: "SAS - School of Arts and Sciences" },
  { roleKey: "legal", name: "Atty. Elena Santos", department: "Legal Counsel" },
  { roleKey: "iro-staff", name: "Maria J. Santos", department: "International Relations Office" },
  { roleKey: "iro-admin", name: "Admin User", department: "International Relations Office" },
  { roleKey: "president", name: "Office of the President", department: "President's Office" },
];

export const workflowDepartments = [
  "SCS - School of Computer Studies",
  "SAS - School of Arts and Sciences",
  "SBM - School of Business and Management",
  "SEA - School of Engineering and Architecture",
  "SAMS - School of Allied and Medical Sciences",
  "SED - School of Education",
  "SOL - School of Law",
  "ETEEAP - Expanded Tertiary Education Equivalency and Accreditation Program",
];

export const partnerInstitutions = [
  "Axiom Systems Research",
  "University of Pleasant Valley",
  "Cebu General Hospital",
];

export function createInitialWorkflowState() {
  const records = [
    {
      id: "MOA-2026-SCS-SAS",
      partner: "Axiom Systems Research",
      department: "SCS -> SAS",
      type: "MOA",
      status: "DRAFT",
      owner: "Dr. Andrea Lim",
      expiry: "Draft",
      title: "Joint Applied AI Research MOA",
      assignee: getCurrentAssignee("DRAFT"),
    },
    {
      id: "MOA-2026-0842",
      partner: "Cebu General Hospital",
      department: "SCS -> SAS",
      type: "MOA",
      status: "SENT_TO_SAS",
      owner: "Dr. Andrea Lim",
      expiry: "45 days",
      title: "Clinical Informatics Extension MOA",
      assignee: getCurrentAssignee("SENT_TO_SAS"),
    },
    {
      id: "MOU-2026-0911",
      partner: "University of Pleasant Valley",
      department: "SCS -> SAS",
      type: "MOU",
      status: "IRO_REVIEW",
      owner: "Prof. Lina Reyes",
      expiry: "112 days",
      title: "Faculty Research Exchange MOU",
      assignee: getCurrentAssignee("IRO_REVIEW"),
    },
    {
      id: "MOA-2026-1035",
      partner: "Global Health Institute",
      department: "SCS -> SAS",
      type: "MOA",
      status: "PRESIDENT_REVIEW",
      owner: "Dr. Andrea Lim",
      expiry: "Active",
      title: "Data Privacy Training MOA",
      assignee: getCurrentAssignee("PRESIDENT_REVIEW"),
    },
  ];

  return {
    records,
    comments: [
      {
        id: "C-001",
        recordId: "MOA-2026-SCS-SAS",
        actor: "SCS Department Staff",
        note: "Draft prepared with SAS partner department indicated.",
        time: "Today, 8:20 AM",
      },
      {
        id: "C-002",
        recordId: "MOA-2026-0842",
        actor: "SAS Department Staff",
        note: "Awaiting department review for scope and faculty load alignment.",
        time: "Today, 9:15 AM",
      },
    ],
    notifications: [
      {
        id: "N-001",
        recordId: "MOA-2026-0842",
        actor: "SAS Department Staff",
        note: "SAS review queue has one SCS submission.",
        time: "12 minutes ago",
      },
      {
        id: "N-002",
        recordId: "MOA-2026-1035",
        actor: "President's Office",
        note: "Executive decision pending.",
        time: "1 hour ago",
      },
    ],
    auditLogs: [
      {
        id: "A-001",
        recordId: "MOA-2026-SCS-SAS",
        actor: "SCS Department Staff",
        event: "Created draft record",
        time: "Today, 8:10 AM",
      },
      {
        id: "A-002",
        recordId: "MOA-2026-0842",
        actor: "SCS Department Staff",
        event: "Sent record to SAS",
        time: "Today, 9:00 AM",
      },
    ],
    statusHistory: [
      { id: "H-001", recordId: "MOA-2026-SCS-SAS", status: "DRAFT", time: "Today, 8:10 AM" },
      { id: "H-002", recordId: "MOA-2026-0842", status: "DRAFT", time: "Today, 8:45 AM" },
      { id: "H-003", recordId: "MOA-2026-0842", status: "SENT_TO_SAS", time: "Today, 9:00 AM" },
      { id: "H-004", recordId: "MOU-2026-0911", status: "SENT_TO_LEGAL", time: "Yesterday" },
      { id: "H-005", recordId: "MOU-2026-0911", status: "IRO_REVIEW", time: "Today, 10:30 AM" },
      { id: "H-006", recordId: "MOA-2026-1035", status: "PRESIDENT_REVIEW", time: "Jul 4, 2026" },
    ],
    activity: [
      { actor: "SAS Department Staff", event: "SCS submission received", time: "12 minutes ago" },
      { actor: "Legal", event: "Legal clearance prepared for IRO", time: "1 hour ago" },
      { actor: "SCS Department Staff", event: "Draft MOA updated", time: "Yesterday" },
      { actor: "President's Office", event: "Executive review scheduled", time: "Jul 4, 2026" },
    ],
  };
}
