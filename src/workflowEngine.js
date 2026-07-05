export const workflowStatuses = {
  DRAFT: "Draft",
  SENT_TO_SAS: "Sent to SAS",
  SAS_REVIEW: "SAS Review",
  SAS_APPROVED: "SAS Approved",
  SENT_TO_LEGAL: "Sent to Legal",
  LEGAL_REVIEW: "Legal Review",
  LEGAL_APPROVED: "Legal Approved",
  IRO_REVIEW: "IRO Staff Review",
  IRO_ADMIN_REVIEW: "IRO Admin Review",
  PRESIDENT_REVIEW: "President Review",
  FINAL_APPROVED: "Final Approved",
  SAS_REJECTED: "SAS Rejected",
  SENT_BACK_TO_SCS: "Sent Back to SCS",
  LEGAL_REJECTED: "Legal Rejected",
  LEGAL_REVISION_REQUIRED: "Legal Revision Required",
  IRO_REJECTED: "IRO Rejected",
  PRESIDENT_REJECTED: "President Rejected",
  FINAL_REJECTED: "Final Rejected",
};

export const workflowSteps = [
  "SCS Department",
  "SAS Department",
  "Legal",
  "IRO Staff",
  "IRO Admin",
  "President",
  "Repository",
];

const statusStepIndex = {
  DRAFT: 0,
  SENT_BACK_TO_SCS: 0,
  SENT_TO_SAS: 1,
  SAS_REVIEW: 1,
  SAS_APPROVED: 1,
  SENT_TO_LEGAL: 2,
  LEGAL_REVIEW: 2,
  LEGAL_APPROVED: 2,
  LEGAL_REVISION_REQUIRED: 0,
  IRO_REVIEW: 3,
  IRO_ADMIN_REVIEW: 4,
  PRESIDENT_REVIEW: 5,
  FINAL_APPROVED: 6,
  SAS_REJECTED: 1,
  LEGAL_REJECTED: 2,
  IRO_REJECTED: 4,
  PRESIDENT_REJECTED: 5,
  FINAL_REJECTED: 6,
};

const terminalStatuses = new Set([
  "FINAL_APPROVED",
  "SAS_REJECTED",
  "LEGAL_REJECTED",
  "IRO_REJECTED",
  "PRESIDENT_REJECTED",
  "FINAL_REJECTED",
]);

export const workflowActionDefinitions = {
  createDraft: {
    label: "Create MOA Draft",
    modalTitle: "Create SCS MOA Draft",
    primary: "Create Draft",
    nextStatus: "DRAFT",
    tone: "green",
    roles: ["scs-department-staff"],
    statuses: [],
  },
  editDraft: {
    label: "Edit Draft",
    modalTitle: "Edit MOA Draft",
    primary: "Save Draft",
    nextStatus: "DRAFT",
    tone: "green",
    roles: ["scs-department-staff"],
    statuses: ["DRAFT"],
  },
  sendToSas: {
    label: "Send to SAS",
    modalTitle: "Send MOA to SAS",
    primary: "Send to SAS",
    nextStatus: "SENT_TO_SAS",
    tone: "gold",
    roles: ["scs-department-staff"],
    statuses: ["DRAFT"],
  },
  revise: {
    label: "Revise Returned MOA",
    modalTitle: "Revise Returned MOA",
    primary: "Save Revision",
    nextStatus: "DRAFT",
    tone: "green",
    roles: ["scs-department-staff"],
    statuses: ["SENT_BACK_TO_SCS", "LEGAL_REVISION_REQUIRED"],
  },
  resubmitToSas: {
    label: "Resubmit to SAS",
    modalTitle: "Resubmit MOA to SAS",
    primary: "Resubmit",
    nextStatus: "SENT_TO_SAS",
    tone: "gold",
    roles: ["scs-department-staff"],
    statuses: ["SENT_BACK_TO_SCS", "LEGAL_REVISION_REQUIRED"],
  },
  sasReview: {
    label: "Mark SAS Review",
    modalTitle: "Review SCS Submission",
    primary: "Mark Reviewed",
    nextStatus: "SAS_REVIEW",
    tone: "green",
    roles: ["sas-department-staff"],
    statuses: ["SENT_TO_SAS"],
  },
  sasApprove: {
    label: "Approve to Legal",
    modalTitle: "Approve MOA to Legal",
    primary: "Approve to Legal",
    nextStatus: "SENT_TO_LEGAL",
    tone: "gold",
    roles: ["sas-department-staff"],
    statuses: ["SENT_TO_SAS", "SAS_REVIEW"],
  },
  sasReturn: {
    label: "Return to SCS",
    modalTitle: "Return MOA to SCS",
    primary: "Return to SCS",
    nextStatus: "SENT_BACK_TO_SCS",
    tone: "red",
    roles: ["sas-department-staff"],
    statuses: ["SENT_TO_SAS", "SAS_REVIEW"],
  },
  sasReject: {
    label: "Reject",
    modalTitle: "Reject SAS Review",
    primary: "Reject MOA",
    nextStatus: "SAS_REJECTED",
    tone: "red",
    roles: ["sas-department-staff"],
    statuses: ["SENT_TO_SAS", "SAS_REVIEW"],
  },
  legalApprove: {
    label: "Clear to IRO Staff",
    modalTitle: "Legal Clearance",
    primary: "Clear to IRO Staff",
    nextStatus: "IRO_REVIEW",
    tone: "gold",
    roles: ["legal"],
    statuses: ["SENT_TO_LEGAL", "LEGAL_REVIEW"],
  },
  legalRevision: {
    label: "Request Revision",
    modalTitle: "Request Legal Revision",
    primary: "Request Revision",
    nextStatus: "LEGAL_REVISION_REQUIRED",
    tone: "red",
    roles: ["legal"],
    statuses: ["SENT_TO_LEGAL", "LEGAL_REVIEW"],
  },
  legalReject: {
    label: "Reject",
    modalTitle: "Reject Legal Review",
    primary: "Reject MOA",
    nextStatus: "LEGAL_REJECTED",
    tone: "red",
    roles: ["legal"],
    statuses: ["SENT_TO_LEGAL", "LEGAL_REVIEW"],
  },
  iroForward: {
    label: "Forward to IRO Admin",
    modalTitle: "Forward Completeness Review",
    primary: "Forward to IRO Admin",
    nextStatus: "IRO_ADMIN_REVIEW",
    tone: "gold",
    roles: ["iro-staff"],
    statuses: ["IRO_REVIEW"],
  },
  iroComment: {
    label: "Add Completeness Comment",
    modalTitle: "Add IRO Staff Comment",
    primary: "Save Comment",
    nextStatus: "IRO_REVIEW",
    tone: "green",
    roles: ["iro-staff"],
    statuses: ["IRO_REVIEW"],
  },
  iroAdminEndorse: {
    label: "Endorse to President",
    modalTitle: "Endorse to President",
    primary: "Endorse",
    nextStatus: "PRESIDENT_REVIEW",
    tone: "gold",
    roles: ["iro-admin"],
    statuses: ["IRO_ADMIN_REVIEW"],
  },
  iroAdminReject: {
    label: "Reject",
    modalTitle: "Reject Before Executive Review",
    primary: "Reject MOA",
    nextStatus: "IRO_REJECTED",
    tone: "red",
    roles: ["iro-admin"],
    statuses: ["IRO_ADMIN_REVIEW"],
  },
  presidentApprove: {
    label: "Final Approve",
    modalTitle: "Final Executive Approval",
    primary: "Final Approve",
    nextStatus: "FINAL_APPROVED",
    tone: "gold",
    roles: ["president"],
    statuses: ["PRESIDENT_REVIEW"],
  },
  presidentReject: {
    label: "Final Reject",
    modalTitle: "Final Executive Rejection",
    primary: "Final Reject",
    nextStatus: "FINAL_REJECTED",
    tone: "red",
    roles: ["president"],
    statuses: ["PRESIDENT_REVIEW"],
  },
};

export function isWorkflowRole(roleKey) {
  return [
    "scs-department-staff",
    "sas-department-staff",
    "legal",
    "iro-staff",
    "iro-admin",
    "president",
  ].includes(roleKey);
}

export function getAllowedWorkflowActions(roleKey, record) {
  if (!record || terminalStatuses.has(record.status)) return [];

  return Object.entries(workflowActionDefinitions)
    .filter(([, action]) => action.roles.includes(roleKey) && action.statuses.includes(record.status))
    .map(([id, action]) => ({ id, ...action }));
}

export function getWorkflowStepIndex(status) {
  return statusStepIndex[status] ?? 0;
}

export function getStatusLabel(status) {
  return workflowStatuses[status] ?? status;
}

export function getCurrentAssignee(status) {
  if (["DRAFT", "SENT_BACK_TO_SCS", "LEGAL_REVISION_REQUIRED"].includes(status)) return "SCS Department Staff";
  if (["SENT_TO_SAS", "SAS_REVIEW", "SAS_APPROVED"].includes(status)) return "SAS Department Staff";
  if (["SENT_TO_LEGAL", "LEGAL_REVIEW"].includes(status)) return "Legal";
  if (status === "IRO_REVIEW") return "IRO Staff";
  if (status === "IRO_ADMIN_REVIEW") return "IRO Admin";
  if (status === "PRESIDENT_REVIEW") return "President's Office";
  if (status === "FINAL_APPROVED") return "Protected Repository";
  return "Workflow Closed";
}

export function getNextActionText(status) {
  if (terminalStatuses.has(status)) return "No further workflow action";
  if (status === "DRAFT") return "SCS sends the draft to SAS";
  if (["SENT_BACK_TO_SCS", "LEGAL_REVISION_REQUIRED"].includes(status)) return "SCS revises and resubmits to SAS";
  if (["SENT_TO_SAS", "SAS_REVIEW"].includes(status)) return "SAS reviews and decides";
  if (["SENT_TO_LEGAL", "LEGAL_REVIEW"].includes(status)) return "Legal clears, rejects, or requests revision";
  if (status === "IRO_REVIEW") return "IRO Staff forwards complete records";
  if (status === "IRO_ADMIN_REVIEW") return "IRO Admin endorses or rejects";
  if (status === "PRESIDENT_REVIEW") return "President's Office issues final decision";
  return "Awaiting workflow action";
}

export function applyWorkflowTransition(record, actionId) {
  const action = workflowActionDefinitions[actionId];
  if (!action) return record;
  return {
    ...record,
    status: action.nextStatus,
    assignee: getCurrentAssignee(action.nextStatus),
  };
}
