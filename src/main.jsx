import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCheck,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Download,
  Eye,
  FileArchive,
  FileCheck2,
  FileClock,
  FileSearch,
  FileText,
  Filter,
  Gavel,
  Grid2X2,
  History,
  KeyRound,
  Landmark,
  LockKeyhole,
  LogOut,
  Menu,
  MessageSquare,
  NotebookPen,
  Plus,
  Route,
  Search,
  Send,
  Settings,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  UserCog,
  UsersRound,
  Workflow,
  X,
} from "lucide-react";
import hallImage from "./assets/campus-hall.png";
import { createInitialWorkflowState, workflowDepartments } from "./mockWorkflowData";
import {
  applyWorkflowTransition,
  getAllowedWorkflowActions,
  getCurrentAssignee,
  getNextActionText,
  getStatusLabel,
  getWorkflowStepIndex,
  isWorkflowRole,
  workflowActionDefinitions,
  workflowSteps,
} from "./workflowEngine";
import "./styles.css";

const roleConfigs = {
  "department-staff": {
    label: "Department Staff",
    shortLabel: "Dept Staff",
    subtitle: "Creates and revises authorized engagements",
    user: "Dr. Andrea Lim",
    initials: "AL",
    defaultRoute: "/department-staff/dashboard",
    permissions: ["create", "upload", "revise", "authorized-documents"],
    canCreateEngagement: true,
    icon: Landmark,
    pages: [
      ["dashboard", "Dashboard", Grid2X2],
      ["engagement-wizard", "Engagement Wizard", NotebookPen],
      ["my-submissions", "My Submissions", FileClock],
      ["submission-detail", "Submission Detail", FileSearch],
      ["revision-workspace", "Revision Workspace", MessageSquare],
      ["document-archive", "Document Archive", FileArchive],
      ["collaboration", "Collaboration", UsersRound],
      ["budget-resources", "Budget & Resources", BriefcaseBusiness],
    ],
  },
  "scs-department-staff": {
    label: "SCS Department Staff",
    shortLabel: "SCS Staff",
    subtitle: "SCS drafts and resubmits SAS-bound MOAs",
    user: "Dr. Andrea Lim",
    initials: "AL",
    departmentScope: "SCS - School of Computer Studies",
    defaultRoute: "/scs-department-staff/dashboard",
    permissions: ["create", "draft", "revise", "resubmit", "send-to-sas"],
    canCreateEngagement: true,
    workflowOnly: true,
    icon: Landmark,
    pages: [
      ["dashboard", "Dashboard", Grid2X2],
      ["engagement-wizard", "Engagement Wizard", NotebookPen],
      ["my-submissions", "My SCS Submissions", FileClock],
      ["submission-detail", "SCS MOA Detail", FileSearch],
      ["revision-workspace", "Revision Workspace", MessageSquare],
      ["collaboration", "SAS Collaboration", UsersRound],
    ],
  },
  "sas-department-staff": {
    label: "SAS Department Staff",
    shortLabel: "SAS Staff",
    subtitle: "SAS reviews, returns, or approves SCS MOAs",
    user: "Prof. Lina Reyes",
    initials: "LR",
    departmentScope: "SAS - School of Arts and Sciences",
    defaultRoute: "/sas-department-staff/dashboard",
    permissions: ["review", "comment", "approve", "reject", "return-to-scs"],
    workflowOnly: true,
    icon: Building2,
    pages: [
      ["dashboard", "Dashboard", Grid2X2],
      ["review-queue", "SCS Review Queue", FileCheck2],
      ["review-detail", "SAS Review Detail", ClipboardCheck],
      ["returned-records", "Returned to SCS", TriangleAlert],
      ["approved-routing", "Approved to Legal", Send],
      ["comments-history", "Comments History", MessageSquare],
    ],
  },
  "iro-staff": {
    label: "IRO Staff",
    shortLabel: "IRO Staff",
    subtitle: "Completeness review and verification",
    user: "Maria J. Santos",
    initials: "MS",
    defaultRoute: "/iro-staff/dashboard",
    permissions: ["review", "comment", "request-revision", "forward"],
    icon: UsersRound,
    pages: [
      ["dashboard", "Dashboard", Grid2X2],
      ["review-queue", "Review Queue", FileCheck2],
      ["review-detail", "Review Detail", ClipboardCheck],
      ["engagement-directory", "Engagement Directory", Building2],
      ["expiry-monitoring", "Expiry Monitoring", CalendarClock],
      ["remarks-history", "Remarks History", MessageSquare],
      ["document-repository", "Document Repository", FileArchive],
    ],
  },
  "iro-admin": {
    label: "IRO Admin",
    shortLabel: "IRO Admin",
    subtitle: "Operational document controller",
    user: "Admin User",
    initials: "CV",
    defaultRoute: "/iro-admin/dashboard",
    permissions: ["approve", "reject", "route", "repository", "accounts"],
    canCreateEngagement: true,
    icon: Shield,
    pages: [
      ["dashboard", "Dashboard", Grid2X2],
      ["approval-queue", "Approval Queue", FileCheck2],
      ["engagement-records", "Engagement Records", Building2],
      ["document-repository", "Document Repository", FileArchive],
      ["permission-registry", "Permission Registry", KeyRound],
      ["access-requests", "Access Requests", ShieldCheck],
      ["user-management", "User Management", UsersRound],
      ["audit-logs", "Audit Logs", SlidersHorizontal],
      ["reports", "Reports", Download],
      ["workflow-routing", "Workflow Routing", Route],
    ],
  },
  "iro-reads": {
    label: "IRO READS",
    shortLabel: "IRO READS",
    subtitle: "Read-only institutional records",
    user: "IRO Records Viewer",
    initials: "IR",
    defaultRoute: "/iro-reads/dashboard",
    permissions: ["read-only", "reports", "history"],
    readOnly: true,
    icon: Eye,
    pages: [
      ["dashboard", "Dashboard", Grid2X2],
      ["engagement-records", "Engagement Records", FileArchive],
      ["memorandum-documents", "Memorandum Documents", FileText],
      ["submission-statuses", "Submission Statuses", FileClock],
      ["approval-history", "Approval History", History],
      ["dashboards-reports", "Dashboards & Reports", FileSearch],
    ],
  },
  legal: {
    label: "Legal",
    shortLabel: "Legal",
    subtitle: "Assigned memorandum legal review",
    user: "Atty. Elena Santos",
    initials: "ES",
    defaultRoute: "/legal/dashboard",
    permissions: ["assigned-review", "legal-comments", "request-revision", "forward-president"],
    icon: Gavel,
    pages: [
      ["dashboard", "Dashboard", Grid2X2],
      ["legal-review-queue", "Legal Review Queue", Gavel],
      ["legal-review-detail", "Legal Review Detail", ClipboardCheck],
      ["approved-memorandums", "Approved Memorandums", FileCheck2],
      ["document-repository", "Document Repository", FileArchive],
      ["audit-logs", "Audit Logs", History],
    ],
  },
  president: {
    label: "President's Office",
    shortLabel: "President",
    subtitle: "Final executive review",
    user: "Office of the President",
    initials: "OP",
    defaultRoute: "/president/executive-dashboard",
    permissions: ["executive-review", "digital-approval", "return-recommendation"],
    icon: Landmark,
    pages: [
      ["executive-dashboard", "Executive Dashboard", Grid2X2],
      ["approval-queue", "Approval Queue", FileCheck2],
      ["submission-review-detail", "Submission Review Detail", Eye],
      ["partnership-summaries", "Partnership Summaries", Building2],
      ["reports-audit-logs", "Reports & Audit Logs", FileSearch],
      ["expiry-monitoring", "Expiry Monitoring", CalendarClock],
    ],
  },
  "super-admin": {
    label: "Super Admin",
    shortLabel: "Super Admin",
    subtitle: "System governance without document access",
    user: "Security Administrator",
    initials: "SA",
    defaultRoute: "/super-admin/system-dashboard",
    permissions: ["users", "roles", "settings", "security", "audit"],
    restricted: ["view-confidential-documents", "download-documents", "approve", "reject", "modify-submission"],
    icon: UserCog,
    pages: [
      ["system-dashboard", "System Dashboard", Grid2X2],
      ["user-role-management", "User & Role Management", UsersRound],
      ["workflow-monitor", "Workflow Monitor", Workflow],
      ["audit-logs", "Audit Logs", History],
      ["reports", "Reports", Download],
      ["system-settings", "System Settings", Settings],
      ["notification-center", "Notification Center", Bell],
      ["user-activity", "User Activity", FileSearch],
    ],
  },
  "department-admin": {
    label: "Department Admin",
    shortLabel: "Dept Admin",
    subtitle: "Department-level management",
    user: "Dean Rafael Cruz",
    initials: "RC",
    defaultRoute: "/department-admin/department-dashboard",
    permissions: ["department-users", "department-logs", "department-reports", "department-monitoring"],
    icon: Building2,
    pages: [
      ["department-dashboard", "Department Dashboard", Grid2X2],
      ["department-users", "Department Users", UsersRound],
      ["department-engagements", "Department Engagements", Building2],
      ["department-audit-logs", "Department Audit Logs", History],
      ["compliance-reports", "Compliance Reports", FileCheck2],
      ["submissions-monitor", "Submissions Monitor", FileClock],
    ],
  },
  "department-reads": {
    label: "Department READS",
    shortLabel: "Dept READS",
    subtitle: "Department read-only records",
    user: "Department Records Viewer",
    initials: "DR",
    defaultRoute: "/department-reads/dashboard",
    permissions: ["department-read-only", "comments", "approved-documents", "reports"],
    readOnly: true,
    icon: Eye,
    pages: [
      ["dashboard", "Dashboard", Grid2X2],
      ["department-records", "Department Records", FileArchive],
      ["memorandum-documents", "Memorandum Documents", FileText],
      ["submission-statuses", "Submission Statuses", FileClock],
      ["review-comments", "Review Comments", MessageSquare],
      ["approved-documents", "Approved Documents", FileCheck2],
      ["department-reports", "Department Reports", FileSearch],
    ],
  },
};

const modalRegistry = {
  createEngagement: {
    title: "Create Engagement",
    tone: "green",
    body: "Start a new MOA, MOU, or MOF record and choose the USJR department organizing or partnering in the engagement.",
    fields: ["Partner institution", "Memorandum type", "Organizing / partner department"],
    primary: "Create Draft",
    next: "/department-staff/engagement-wizard",
  },
  editEngagement: {
    title: "Edit Engagement",
    tone: "green",
    body: "Update partner metadata, document tags, and internal ownership before the next review step.",
    fields: ["Engagement code", "Partner contact", "Internal owner"],
    primary: "Save Changes",
  },
  uploadPdf: {
    title: "Upload PDF Memorandum",
    tone: "green",
    body: "Attach the signed memorandum PDF to the selected engagement record.",
    fields: ["Engagement ID", "Document classification", "PDF file"],
    primary: "Attach File",
  },
  submitReview: {
    title: "Submit for IRO Review",
    tone: "gold",
    body: "Move this draft into the IRO staff queue for completeness and compliance review.",
    fields: ["Submission checklist", "Department sign-off", "Routing note"],
    primary: "Submit",
    next: "/department-staff/my-submissions",
  },
  returnRevision: {
    title: "Return for Revision",
    tone: "red",
    body: "Send the submission back to the originating department with reviewer remarks.",
    fields: ["Deficiency summary", "Required action", "Due date"],
    primary: "Return Submission",
  },
  approvalDecision: {
    title: "Approve or Reject",
    tone: "gold",
    body: "Record the final IRO or executive decision for the selected submission.",
    fields: ["Decision", "Approver note", "Effective date"],
    primary: "Confirm Decision",
  },
  remarks: {
    title: "Add Remarks",
    tone: "green",
    body: "Add deficiency notes, reviewer remarks, or collaboration comments to the workflow history.",
    fields: ["Remark type", "Visibility", "Comment"],
    primary: "Save Remark",
  },
  checklist: {
    title: "Review Checklist",
    tone: "green",
    body: "Validate memorandum completeness, partner details, signatures, dates, and required attachments.",
    fields: ["Partner metadata", "Required signatures", "PDF attachment"],
    primary: "Mark Reviewed",
  },
  legalClearance: {
    title: "Legal Clearance",
    tone: "gold",
    body: "Mock legal clearance with a two-factor signing step for routed legal documents.",
    fields: ["Compliance result", "2FA code", "Legal note"],
    primary: "Clear Legally",
  },
  accessRequest: {
    title: "Access Request",
    tone: "green",
    body: "Approve or deny access to a protected memorandum record.",
    fields: ["Requester", "Document scope", "Expiration"],
    primary: "Approve Access",
  },
  assignPermissions: {
    title: "Assign Permissions",
    tone: "green",
    body: "Set per-document visibility for users, departments, and reviewer roles.",
    fields: ["Document", "User or role", "Permission level"],
    primary: "Assign",
  },
  resetPassword: {
    title: "Reset Document Password",
    tone: "red",
    body: "Issue a new protected document password and invalidate the previous one.",
    fields: ["Document ID", "Reason", "Admin confirmation"],
    primary: "Reset Password",
  },
  userAccount: {
    title: "User Account",
    tone: "green",
    body: "Create, edit, or deactivate a Conexia user account for the selected role scope.",
    fields: ["Full name", "Role", "Account status"],
    primary: "Save User",
  },
  exportReport: {
    title: "Export Report",
    tone: "gold",
    body: "Prepare a filtered compliance, workflow, or audit report for download.",
    fields: ["Report type", "Date range", "Format"],
    primary: "Export",
  },
  auditDetail: {
    title: "Audit Log Detail",
    tone: "green",
    body: "Review the event trail for document access, workflow changes, and account activity.",
    fields: ["Event ID", "Actor", "Integrity status"],
    primary: "Close Review",
  },
  notificationDetail: {
    title: "Notification Detail",
    tone: "gold",
    body: "View routing alerts, expiry warnings, and action reminders assigned to this role.",
    fields: ["Alert type", "Priority", "Related record"],
    primary: "Mark Read",
  },
};

const usjrDepartments = [
  "SCS - School of Computer Studies",
  "SAS - School of Arts and Sciences",
  "SBM - School of Business and Management",
  "SEA - School of Engineering and Architecture",
  "SAMS - School of Allied and Medical Sciences",
  "SED - School of Education",
  "SOL - School of Law",
  "ETEEAP - Expanded Tertiary Education Equivalency and Accreditation Program",
];

const records = [
  {
    id: "MOA-2026-0842",
    partner: "Cebu General Hospital",
    department: "School of Nursing",
    type: "MOA",
    status: "Pending Review",
    owner: "Dr. Andrea Lim",
    expiry: "45 days",
  },
  {
    id: "MOU-2026-0911",
    partner: "University of Pleasant Valley",
    department: "School of Arts and Sciences",
    type: "MOU",
    status: "Returned",
    owner: "Prof. Lina Reyes",
    expiry: "112 days",
  },
  {
    id: "MOF-2026-1002",
    partner: "Axiom Systems Research",
    department: "Computer Studies",
    type: "MOF",
    status: "Legal Review",
    owner: "Engr. Paolo Tan",
    expiry: "18 days",
  },
  {
    id: "MOA-2026-1035",
    partner: "Global Health Institute",
    department: "Medicine",
    type: "MOA",
    status: "Approved",
    owner: "Dr. Rhea Santos",
    expiry: "Active",
  },
];

const activity = [
  ["IRO Staff", "Completeness checklist updated", "12 minutes ago"],
  ["Legal Counsel", "Data privacy clause flagged", "1 hour ago"],
  ["Department Staff", "Revised budget annex attached", "Yesterday"],
  ["President's Office", "Executive review scheduled", "Jul 4, 2026"],
];

function App() {
  const [path, setPath] = useState(getPath());
  const [modal, setModal] = useState(null);
  const [workflowState, setWorkflowState] = useState(createInitialWorkflowState);
  const [selectedRecordId, setSelectedRecordId] = useState("MOA-2026-SCS-SAS");
  const currentRoleKey = getRoleKeyFromPath(path);

  useEffect(() => {
    const onPop = () => setPath(getPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (nextPath) => {
    window.history.pushState({}, "", nextPath);
    setPath(getPath());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = (name) => setModal(name);
  const closeModal = () => setModal(null);
  const selectedRecord = workflowState.records.find((record) => record.id === selectedRecordId) ?? workflowState.records[0];

  const handleWorkflowAction = (actionId, note = "Mock workflow decision recorded.") => {
    const action = workflowActionDefinitions[actionId];
    if (!action || !selectedRecord) return;

    const actor = getActorLabel(action.roles[0]);
    const nextStatus = action.nextStatus;
    const stamp = "Just now";
    const involvedRoles = getInvolvedEngagementRoles();

    setWorkflowState((current) => ({
      records: current.records.map((record) => (
        record.id === selectedRecord.id ? applyWorkflowTransition(record, actionId) : record
      )),
      comments: [
        {
          id: `C-${Date.now()}`,
          recordId: selectedRecord.id,
          actor,
          note,
          time: stamp,
        },
        ...current.comments,
      ],
      notifications: [
        {
          id: `N-${Date.now()}`,
          recordId: selectedRecord.id,
          actor,
          note: `${selectedRecord.id} moved to ${getStatusLabel(nextStatus)}. ${getCurrentAssignee(nextStatus)} is the current assignee.`,
          time: stamp,
          audience: involvedRoles,
        },
        ...current.notifications,
      ],
      auditLogs: [
        {
          id: `A-${Date.now()}`,
          recordId: selectedRecord.id,
          actor,
          event: `${action.label}: ${getStatusLabel(selectedRecord.status)} -> ${getStatusLabel(nextStatus)}`,
          time: stamp,
        },
        ...current.auditLogs,
      ],
      statusHistory: [
        ...current.statusHistory,
        {
          id: `H-${Date.now()}`,
          recordId: selectedRecord.id,
          status: nextStatus,
          time: stamp,
        },
      ],
      activity: [
        {
          actor,
          event: `${action.label} for ${selectedRecord.id}`,
          time: stamp,
        },
        ...current.activity,
      ],
    }));
    closeModal();
  };

  const handleAddComment = (note) => {
    if (!selectedRecord || !note.trim()) return;

    const actor = getActorLabel(currentRoleKey);
    const stamp = "Just now";
    const involvedRoles = getInvolvedEngagementRoles();

    setWorkflowState((current) => ({
      ...current,
      comments: [
        {
          id: `C-${Date.now()}`,
          recordId: selectedRecord.id,
          actor,
          note: note.trim(),
          time: stamp,
        },
        ...current.comments,
      ],
      notifications: [
        {
          id: `N-${Date.now()}`,
          recordId: selectedRecord.id,
          actor,
          note: `${actor} added a collaboration comment on ${selectedRecord.id}.`,
          time: stamp,
          audience: involvedRoles.filter((roleKey) => roleKey !== currentRoleKey),
        },
        ...current.notifications,
      ],
      auditLogs: [
        {
          id: `A-${Date.now()}`,
          recordId: selectedRecord.id,
          actor,
          event: "Added collaboration comment",
          time: stamp,
        },
        ...current.auditLogs,
      ],
      activity: [
        {
          actor,
          event: `Commented on ${selectedRecord.id}`,
          time: stamp,
        },
        ...current.activity,
      ],
    }));
  };

  return (
    <>
      <Router
        path={path}
        navigate={navigate}
        openModal={openModal}
        selectedRecordId={selectedRecordId}
        setSelectedRecordId={setSelectedRecordId}
        workflowState={workflowState}
        onAddComment={handleAddComment}
      />
      <ModalHost
        modal={modal}
        navigate={navigate}
        onClose={closeModal}
        onWorkflowAction={handleWorkflowAction}
        selectedRecord={selectedRecord}
        currentRoleKey={currentRoleKey}
        workflowState={workflowState}
      />
    </>
  );
}

function getPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function Router({ path, navigate, openModal, selectedRecordId, setSelectedRecordId, workflowState, onAddComment }) {
  if (path === "/") {
    return <Landing navigate={navigate} />;
  }

  if (path === "/roles") {
    return <RoleSelection navigate={navigate} />;
  }

  const [, roleKey, pageKey = "dashboard"] = path.split("/");
  const role = roleConfigs[roleKey];

  if (!role) {
    return <NotFound navigate={navigate} />;
  }

  const selectedPage = role.pages.find(([key]) => key === pageKey);
  if (!selectedPage) {
    return <NotFound navigate={navigate} role={role} />;
  }

  return (
    <PortalShell
      roleKey={roleKey}
      role={role}
      pageKey={pageKey}
      navigate={navigate}
      openModal={openModal}
      selectedRecordId={selectedRecordId}
      setSelectedRecordId={setSelectedRecordId}
      workflowState={workflowState}
      onAddComment={onAddComment}
    />
  );
}

function Landing({ navigate }) {
  return (
    <main className="landing-page">
      <header className="landing-nav">
        <button className="brand-lockup" onClick={() => navigate("/roles")} type="button">
        {/* ari e add ang logo */}
          <span>
            <strong>CONEXIA</strong>
            <small>International Relations Office</small>
          </span>
        </button>
        <nav aria-label="Landing navigation">
          <button onClick={() => navigate("/roles")} type="button">Portal Access</button>
          <button onClick={() => navigate("/iro-admin/document-repository")} type="button">Repository</button>
          <button className="pill-button" onClick={() => navigate("/roles")} type="button">
            <LockKeyhole size={19} />
            Institutional Login
          </button>
        </nav>
      </header>

      <section className="landing-hero">
        <div className="hero-copy">
          <span className="gateway-tag">
            <span />
            Official Admin Gateway
          </span>
          <h1>
            Welcome to <strong>CONEXIA</strong>
          </h1>
          <h2>Automated Workflow and Document Repository System for Academic Partnerships.</h2>
          <p>
            Manage, track, review, and archive MOA, MOU, and MOF submissions across departments,
            IRO, legal review, and executive approval.
          </p>
          <div className="hero-buttons">
            <button className="gold-button" onClick={() => navigate("/roles")} type="button">
              Get Started
              <ArrowRight size={24} />
            </button>
            <button className="outline-button" onClick={() => navigate("/iro-admin/document-repository")} type="button">
              <FileArchive size={24} />
              Public Repository
            </button>
          </div>
          <div className="landing-stats">
            <MetricMini value="2.5k+" label="Stored Agreements" />
          <MetricMini value="9" label="Role Workspaces" />
            <MetricMini value="24/7" label="Workflow Visibility" />
          </div>
        </div>

        <div className="hero-visual" aria-label="Conexia secure document workflow">
          <img src={hallImage} alt="" />
          <article className="hero-ticket top">
            <FileCheck2 size={26} />
            <span>
              <strong>Pending Approval</strong>
              <small>MOA-2026-0842</small>
            </span>
          </article>
          <article className="hero-ticket bottom">
            <ShieldCheck size={26} />
            <span>
              <strong>Document Protected</strong>
              <small>Per-document registry</small>
            </span>
          </article>
        </div>
      </section>
    </main>
  );
}

function MetricMini({ value, label }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function RoleSelection({ navigate }) {
  return (
    <main className="role-page">
      <header className="role-header">
        <button className="wordmark" onClick={() => navigate("/")} type="button">CONEXIA</button>
        <button className="gateway-button" onClick={() => navigate("/iro-admin/dashboard")} type="button">
          <Shield size={20} />
          Institutional Gateway
        </button>
      </header>

      <section className="role-main">
        <div className="role-visual" style={{ backgroundImage: `linear-gradient(120deg, rgba(0, 60, 37, 0.88), rgba(0, 104, 63, 0.58)), url(${hallImage})` }}>
          <div className="role-copy">
            <h1>
              Inter-Institutional <strong>Intelligence</strong>
            </h1>
            <p>Choose the workspace that matches your responsibility in the memorandum lifecycle.</p>
          </div>
        </div>

        <aside className="role-panel">
          <div className="role-panel-copy">
            <h2>Select Your Role</h2>
            <p>Each role opens a dedicated page set, modal flow, and navigation path.</p>
          </div>
          <div className="role-options">
            {Object.entries(roleConfigs).map(([key, role]) => {
              const Icon = role.icon;
              return (
                <button className="role-card" key={key} onClick={() => navigate(role.defaultRoute)} type="button">
                  <span className="role-icon">
                    <Icon size={25} />
                  </span>
                  <span>
                    <strong>{role.label}</strong>
                    <small>{role.subtitle}</small>
                  </span>
                  <ChevronRight size={20} />
                </button>
              );
            })}
          </div>
        </aside>
      </section>
    </main>
  );
}

function PortalShell({ roleKey, role, pageKey, navigate, openModal, selectedRecordId, setSelectedRecordId, workflowState, onAddComment }) {
  const page = role.pages.find(([key]) => key === pageKey);
  const pageTitle = page?.[1] ?? "Dashboard";

  return (
    <main className="portal-layout">
      <aside className="portal-sidebar">
        <button className="mobile-menu" aria-label="Menu" type="button">
          <Menu size={22} />
        </button>
        <button className="portal-brand" onClick={() => navigate("/roles")} type="button">
          <span className="portal-brand-seal">CX</span>
          <span>
            <strong>CONEXIA</strong>
            <small>{role.subtitle}</small>
          </span>
        </button>
        <div className="portal-sidebar-body">
          <nav aria-label={`${role.label} navigation`}>
            {role.pages.map(([key, label, Icon]) => (
              <button
                className={key === pageKey ? "active" : ""}
                key={key}
                onClick={() => navigate(`/${roleKey}/${key}`)}
                type="button"
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="portal-sidebar-spacer" />
          <SidebarEngagementButton role={role} openModal={openModal} />
          <div className="sidebar-bottom">
            <button onClick={() => openModal("notificationDetail")} type="button">
              <Bell size={20} />
              <span>Notifications</span>
            </button>
            <button onClick={() => navigate("/")} type="button">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      <section className="portal-workspace">
        <Topbar role={role} navigate={navigate} openModal={openModal} />
        <PageView
          roleKey={roleKey}
          role={role}
          pageKey={pageKey}
          pageTitle={pageTitle}
          navigate={navigate}
          openModal={openModal}
          selectedRecordId={selectedRecordId}
          setSelectedRecordId={setSelectedRecordId}
          workflowState={workflowState}
          onAddComment={onAddComment}
        />
      </section>
    </main>
  );
}

function SidebarEngagementButton({ role, openModal }) {
  const locked = !role.canCreateEngagement;
  return (
    <button
      className={locked ? "sidebar-engagement locked" : "sidebar-engagement"}
      disabled={locked}
      onClick={() => openModal("createEngagement")}
      title={locked ? "This role cannot create engagement records" : "Create a new engagement"}
      type="button"
    >
      <span>
        {locked ? <LockKeyhole size={20} /> : <Plus size={20} />}
      </span>
      <strong>New Engagement</strong>
      <small>{locked ? "Not available for this role" : "Create MOA, MOU, or MOF"}</small>
    </button>
  );
}

function Topbar({ role, navigate, openModal }) {
  return (
    <header className="portal-topbar">
      <label className="topbar-search">
        <Search size={19} />
        <input placeholder="Search records, users, documents..." />
      </label>
      <div className="topbar-actions">
        <button aria-label="Notifications" onClick={() => openModal("notificationDetail")} type="button">
          <Bell size={20} />
          <i />
        </button>
        <button aria-label="Settings" onClick={() => navigate("/super-admin/system-settings")} type="button">
          <Settings size={20} />
        </button>
        <button aria-label="Help" onClick={() => openModal("remarks")} type="button">
          <CircleAlert size={20} />
        </button>
      </div>
      <div className="topbar-user">
        <span>
          <strong>{role.user}</strong>
          <small>{role.shortLabel}</small>
        </span>
        <b>{role.initials}</b>
      </div>
    </header>
  );
}

function PageView({ roleKey, role, pageKey, pageTitle, navigate, openModal, selectedRecordId, setSelectedRecordId, workflowState, onAddComment }) {
  const isSuperAdmin = roleKey === "super-admin";
  const selectedRecord = workflowState.records.find((record) => record.id === selectedRecordId) ?? workflowState.records[0];
  const workflowActions = getAllowedWorkflowActions(roleKey, selectedRecord);
  const metrics = getMetrics(roleKey, pageKey, workflowState);
  const quickActions = getQuickActions(roleKey, pageKey, isSuperAdmin, workflowActions);

  return (
    <div className="portal-content">
      <section className="page-title">
        <div>
          <span className="eyebrow">{role.label}</span>
          <h1>{pageTitle}</h1>
          <p>{getPageCopy(roleKey, pageKey)}</p>
        </div>
        <div className="title-actions">
          {quickActions.map((action) => (
            <button
              className={action.primary ? "solid-mini" : "plain-mini"}
              key={action.label}
              onClick={() => {
                if (action.route) navigate(action.route);
                else if (action.actionId) openModal({ type: "workflowDecision", actionId: action.actionId, recordId: selectedRecord.id });
                else openModal(action.modal);
              }}
              type="button"
            >
              <action.icon size={18} />
              {action.label}
            </button>
          ))}
        </div>
      </section>

      <section className="metric-row" aria-label={`${pageTitle} metrics`}>
        {metrics.map(({ label, value, detail, tone, icon: Icon }) => (
          <article className={`metric-card ${tone}`} key={label}>
            <span className="metric-icon">
              <Icon size={22} />
            </span>
            <div>
              <small>{label}</small>
              <strong>{value}</strong>
              <span>{detail}</span>
            </div>
          </article>
        ))}
      </section>

      <section className={isWorkflowRole(roleKey) ? "workspace-grid workflow-workspace" : "workspace-grid"}>
        <article className="panel-card table-panel">
          <div className="panel-heading">
            <div>
              <h2>{getTableTitle(pageKey)}</h2>
              <p>Current working records in this role scope.</p>
            </div>
            <div className="queue-tools">
              <button className="plain-mini" onClick={() => openModal("checklist")} type="button">
                <Filter size={16} />
                Checklist
              </button>
              <button className="solid-mini" onClick={() => openModal("exportReport")} type="button">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
          <RecordTable
            roleKey={roleKey}
            pageKey={pageKey}
            navigate={navigate}
            openModal={openModal}
            records={workflowState.records}
            selectedRecordId={selectedRecord.id}
            setSelectedRecordId={setSelectedRecordId}
          />
        </article>

        <aside className="side-stack">
          <ActionCenter
            roleKey={roleKey}
            isSuperAdmin={isSuperAdmin}
            navigate={navigate}
            openModal={openModal}
            selectedRecord={selectedRecord}
            workflowActions={workflowActions}
          />
          <ActivityPanel activity={workflowState.activity} openModal={openModal} />
        </aside>
      </section>

      {canViewWorkflowDetail(roleKey) ? (
        <WorkflowDetail
          openModal={openModal}
          record={selectedRecord}
          roleKey={roleKey}
          workflowActions={workflowActions}
          workflowState={workflowState}
          onAddComment={onAddComment}
        />
      ) : null}

    </div>
  );
}

function getMetrics(roleKey, pageKey, workflowState) {
  const shared = [
    { label: "Active Records", value: "24", detail: "Across active scope", tone: "green", icon: FileArchive },
    { label: "Pending", value: "8", detail: "Needs action", tone: "gold", icon: FileClock },
    { label: "Returned", value: "3", detail: "Revision required", tone: "red", icon: TriangleAlert },
    { label: "Approved", value: "156", detail: "This year", tone: "soft", icon: CheckCheck },
  ];

  if (roleKey === "super-admin") {
    return [
      { label: "Active Users", value: "214", detail: "All roles", tone: "green", icon: UsersRound },
      { label: "Security Events", value: "17", detail: "Last 24 hours", tone: "gold", icon: ShieldCheck },
      { label: "Locked Accounts", value: "4", detail: "Requires review", tone: "red", icon: LockKeyhole },
      { label: "Audit Integrity", value: "100%", detail: "Verified", tone: "soft", icon: FileSearch },
    ];
  }

  if (isWorkflowRole(roleKey)) {
    const pendingCount = workflowState.records.filter((record) => !["FINAL_APPROVED", "FINAL_REJECTED"].includes(record.status)).length;
    const returnedCount = workflowState.records.filter((record) => ["SENT_BACK_TO_SCS", "LEGAL_REVISION_REQUIRED"].includes(record.status)).length;
    const approvedCount = workflowState.records.filter((record) => record.status === "FINAL_APPROVED").length;
    return [
      { label: "Demo MOAs", value: String(workflowState.records.length), detail: "SCS to SAS route", tone: "green", icon: Workflow },
      { label: "Pending Action", value: String(pendingCount), detail: "Across mock state", tone: "gold", icon: FileClock },
      { label: "Returned", value: String(returnedCount), detail: "Revision required", tone: "red", icon: TriangleAlert },
      { label: "Final Approved", value: String(approvedCount), detail: "President completed", tone: "soft", icon: CheckCheck },
    ];
  }

  if (roleConfigs[roleKey]?.readOnly) {
    return [
      { label: "Readable Records", value: roleKey === "iro-reads" ? "2,418" : "126", detail: "No edit access", tone: "green", icon: Eye },
      { label: "Status Updates", value: "38", detail: "Recently changed", tone: "gold", icon: FileClock },
      { label: "Approved Docs", value: "91", detail: "Reference access", tone: "soft", icon: FileCheck2 },
      { label: "Blocked Actions", value: "0", detail: "Write permissions", tone: "red", icon: LockKeyhole },
    ];
  }

  if (roleKey === "department-admin") {
    return [
      { label: "Dept Users", value: "34", detail: "Department scope", tone: "green", icon: UsersRound },
      { label: "Dept Records", value: "18", detail: "Monitored only", tone: "soft", icon: Building2 },
      { label: "Compliance Reports", value: "6", detail: "This month", tone: "gold", icon: FileSearch },
      { label: "Audit Events", value: "142", detail: "Department log", tone: "green", icon: History },
    ];
  }

  if (roleKey === "iro-admin") {
    return [
      { label: "Approval Queue", value: "12", detail: "Final IRO action", tone: "gold", icon: FileCheck2 },
      { label: "Protected Docs", value: "84", detail: "Repository scope", tone: "green", icon: LockKeyhole },
      { label: "Access Requests", value: "9", detail: "Needs decision", tone: "red", icon: ShieldCheck },
      { label: "Expiring 90d", value: "19", detail: "Renewal watch", tone: "soft", icon: CalendarClock },
    ];
  }

  if (roleKey === "iro-staff") {
    return [
      { label: "Review Queue", value: "18", detail: "Completeness check", tone: "gold", icon: ClipboardCheck },
      { label: "Returned", value: "5", detail: "Revision requested", tone: "red", icon: TriangleAlert },
      { label: "Forwarded", value: "22", detail: "To IRO Admin", tone: "green", icon: Send },
      { label: "Remarks Added", value: "41", detail: "This month", tone: "soft", icon: MessageSquare },
    ];
  }

  if (roleKey === "legal") {
    return [
      { label: "Assigned Reviews", value: "8", detail: "Legal queue", tone: "gold", icon: Gavel },
      { label: "Deficiencies", value: "3", detail: "Clause issues", tone: "red", icon: TriangleAlert },
      { label: "Cleared", value: "16", detail: "To President", tone: "green", icon: ShieldCheck },
      { label: "High Value", value: "4", detail: "Priority agreements", tone: "soft", icon: BriefcaseBusiness },
    ];
  }

  if (roleKey === "president") {
    return [
      { label: "Executive Queue", value: "6", detail: "Final review", tone: "gold", icon: FileCheck2 },
      { label: "Digitally Approved", value: "14", detail: "This quarter", tone: "green", icon: CheckCheck },
      { label: "Returned", value: "2", detail: "Revision recommended", tone: "red", icon: TriangleAlert },
      { label: "Executive Reports", value: "9", detail: "Available", tone: "soft", icon: FileSearch },
    ];
  }

  if (pageKey.includes("expiry")) {
    return [
      { label: "Expiring 30d", value: "7", detail: "Immediate review", tone: "red", icon: CalendarClock },
      { label: "Expiring 90d", value: "19", detail: "Renewal watch", tone: "gold", icon: FileClock },
      { label: "Renewed", value: "11", detail: "This quarter", tone: "green", icon: CheckCheck },
      { label: "Notified", value: "22", detail: "Departments alerted", tone: "soft", icon: Bell },
    ];
  }

  return shared;
}

function getQuickActions(roleKey, pageKey, isSuperAdmin, workflowActions = []) {
  if (isSuperAdmin) {
    return [
      { label: "User Account", modal: "userAccount", icon: UserCog, primary: true },
      { label: "Audit Detail", modal: "auditDetail", icon: FileSearch },
      { label: "Export", modal: "exportReport", icon: Download },
    ];
  }

  if (roleConfigs[roleKey]?.readOnly) {
    return [
      { label: "View History", route: getDetailRoute(roleKey), icon: History, primary: true },
      { label: "Export", modal: "exportReport", icon: Download },
    ];
  }

  if (isWorkflowRole(roleKey)) {
    const primaryWorkflowActions = workflowActions.slice(0, 3).map((action, index) => ({
      label: action.label,
      actionId: action.id,
      icon: getWorkflowActionIcon(action.id, action.tone),
      primary: index === 0,
    }));

    if (primaryWorkflowActions.length > 0) return primaryWorkflowActions;

    const fallback = [
      { label: "View Detail", route: getDetailRoute(roleKey), icon: Eye, primary: true },
      { label: "Notifications", modal: "notificationDetail", icon: Bell },
    ];
    if (canAddWorkflowComment(roleKey)) {
      fallback.splice(1, 0, { label: "Comment", route: getCommentRoute(roleKey), icon: MessageSquare });
    }
    return fallback;
  }

  if (roleKey === "department-staff") {
    return [
      { label: "New Engagement", modal: "createEngagement", icon: Plus, primary: true },
      { label: "Upload PDF", modal: "uploadPdf", icon: FileText },
      { label: "Submit", modal: "submitReview", icon: Send },
    ];
  }

  if (roleKey === "department-admin") {
    return [
      { label: "Department User", modal: "userAccount", icon: UserCog, primary: true },
      { label: "Compliance Report", modal: "exportReport", icon: FileSearch },
      { label: "Audit Detail", modal: "auditDetail", icon: History },
    ];
  }

  if (roleKey === "iro-admin") {
    return [
      { label: "Decision", modal: "approvalDecision", icon: FileCheck2, primary: true },
      { label: "Assign Access", modal: "assignPermissions", icon: KeyRound },
      { label: "Reset Password", modal: "resetPassword", icon: LockKeyhole },
    ];
  }

  if (roleKey === "iro-staff") {
    return [
      { label: "Checklist", modal: "checklist", icon: ClipboardCheck, primary: true },
      { label: "Return", modal: "returnRevision", icon: TriangleAlert },
      { label: "Remarks", modal: "remarks", icon: MessageSquare },
    ];
  }

  if (roleKey === "legal") {
    return [
      { label: "Legal Clearance", modal: "legalClearance", icon: Gavel, primary: true },
      { label: "Remarks", modal: "remarks", icon: MessageSquare },
      { label: "Checklist", modal: "checklist", icon: ClipboardCheck },
    ];
  }

  if (roleKey === "president") {
    return [
      { label: "Executive Decision", modal: "approvalDecision", icon: FileCheck2, primary: true },
      { label: "Return Recommendation", modal: "returnRevision", icon: TriangleAlert },
      { label: "Executive Report", modal: "exportReport", icon: Download },
    ];
  }

  return [
    { label: "Review", modal: "checklist", icon: ClipboardCheck, primary: true },
    { label: "Remarks", modal: "remarks", icon: MessageSquare },
    { label: "Decision", modal: "approvalDecision", icon: FileCheck2 },
  ];
}

function getPageCopy(roleKey, pageKey) {
  const readable = pageKey.replaceAll("-", " ");
  const role = roleConfigs[roleKey]?.label ?? "Conexia";
  if (roleConfigs[roleKey]?.readOnly) {
    return `Read-only access to ${readable}; creation, upload, edit, approval, rejection, and deletion are disabled.`;
  }
  if (roleKey === "super-admin") {
    return `Manage ${readable} for system governance without confidential memorandum access unless IRO Admin authorizes it.`;
  }
  if (roleKey === "department-admin") {
    return `Monitor ${readable}, users, reports, and audit logs within the department scope only.`;
  }
  if (roleKey === "iro-admin") {
    return `Operate ${readable}, approvals, protected repository access, expiry tracking, and IRO-managed accounts.`;
  }
  if (roleKey === "iro-staff") {
    return `Review ${readable}, validate completeness, add comments, request revision, and forward complete records.`;
  }
  if (roleKey === "legal") {
    return `Review assigned ${readable} for legal sufficiency and forward compliant memorandums to the President's Office.`;
  }
  if (roleKey === "president") {
    return `Conduct final executive review for legally cleared high-value or interdepartmental memorandums.`;
  }
  if (pageKey.includes("detail")) {
    return `Review the selected record, history, document state, and next routing action.`;
  }
  return `Manage ${readable} for ${role.toLowerCase()} responsibilities.`;
}

function getTableTitle(pageKey) {
  if (pageKey.includes("user")) return "Users";
  if (pageKey.includes("audit")) return "Audit Events";
  if (pageKey.includes("report")) return "Reports";
  if (pageKey.includes("permission")) return "Document Permissions";
  if (pageKey.includes("access")) return "Access Requests";
  return "Engagement Records";
}

function RecordTable({ roleKey, pageKey, navigate, openModal, records, selectedRecordId, setSelectedRecordId }) {
  const detailRoute = getDetailRoute(roleKey);
  const isSuperAdmin = roleKey === "super-admin";
  const isReadOnly = roleConfigs[roleKey]?.readOnly;
  const canEdit = ["department-staff"].includes(roleKey);
  const canComment = ["department-staff"].includes(roleKey);
  const canReview = false;
  const canDecide = false;

  return (
    <div className={isWorkflowRole(roleKey) ? "record-table workflow-record-table" : "record-table"}>
      <div className="record-head">
        <span>Reference</span>
        <span>Partner / Item</span>
        <span>Department</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      {records.map((record) => {
        const workflowActions = getAllowedWorkflowActions(roleKey, record);
        return (
        <div className={record.id === selectedRecordId ? "record-row selected" : "record-row"} key={`${pageKey}-${record.id}`}>
          <span className="reference">{record.id}</span>
          <span>
            <strong>{record.title ?? record.partner}</strong>
            <small>{record.type} by {record.owner}</small>
          </span>
          <span>{record.department}</span>
          <span className={`status-pill ${statusClass(record.status)}`}>{getStatusLabel(record.status)}</span>
          <span className="row-actions">
            <button
              aria-label={`View ${record.id}`}
              onClick={() => {
                setSelectedRecordId(record.id);
                navigate(detailRoute);
              }}
              type="button"
            >
              <Eye size={18} />
            </button>
            {isWorkflowRole(roleKey) ? workflowActions.slice(0, 2).map((action) => {
              const Icon = getWorkflowActionIcon(action.id, action.tone);
              return (
                <button
                  aria-label={`${action.label} for ${record.id}`}
                  key={action.id}
                  onClick={() => {
                    setSelectedRecordId(record.id);
                    openModal({ type: "workflowDecision", actionId: action.id, recordId: record.id });
                  }}
                  type="button"
                >
                  <Icon size={18} />
                </button>
              );
            }) : null}
            {canComment ? (
              <button aria-label={`Add remarks to ${record.id}`} onClick={() => openModal("remarks")} type="button">
                <MessageSquare size={18} />
              </button>
            ) : null}
            {canEdit ? (
              <button aria-label={`Edit ${record.id}`} onClick={() => openModal("editEngagement")} type="button">
                <NotebookPen size={18} />
              </button>
            ) : null}
            {canReview ? (
              <button aria-label={`Review ${record.id}`} onClick={() => openModal("checklist")} type="button">
                <ClipboardCheck size={18} />
              </button>
            ) : null}
            {canDecide ? (
              <button aria-label={`Decide ${record.id}`} onClick={() => openModal("approvalDecision")} type="button">
                <FileCheck2 size={18} />
              </button>
            ) : null}
            {isReadOnly || isSuperAdmin ? (
              <button aria-label={`Export ${record.id}`} onClick={() => openModal("exportReport")} type="button">
                <Download size={18} />
              </button>
            ) : null}
          </span>
        </div>
      )})}
    </div>
  );
}

function statusClass(status) {
  const label = getStatusLabel(status);
  if (label.includes("Returned") || label.includes("Rejected") || label.includes("Required")) return "returned";
  if (label.includes("Legal") || label.includes("Review")) return "review";
  if (label.includes("Sent") || label.includes("Pending")) return "pending";
  if (label.includes("Approved")) return "active";
  return "neutral";
}

function getDetailRoute(roleKey) {
  const routes = {
    "department-staff": "/department-staff/submission-detail",
    "scs-department-staff": "/scs-department-staff/submission-detail",
    "sas-department-staff": "/sas-department-staff/review-detail",
    "iro-staff": "/iro-staff/review-detail",
    "iro-admin": "/iro-admin/approval-queue",
    "iro-reads": "/iro-reads/approval-history",
    legal: "/legal/legal-review-detail",
    president: "/president/submission-review-detail",
    "super-admin": "/super-admin/audit-logs",
    "department-admin": "/department-admin/submissions-monitor",
    "department-reads": "/department-reads/review-comments",
  };
  return routes[roleKey] ?? "/";
}

function ActionCenter({ roleKey, isSuperAdmin, navigate, openModal, selectedRecord, workflowActions }) {
  const actionMap = {
    "department-staff": [
      ["Upload memorandum", "uploadPdf", FileText],
      ["Submit for IRO review", "submitReview", Send],
      ["Respond to comments", "remarks", MessageSquare],
    ],
    "department-admin": [
      ["Manage department users", "userAccount", UserCog],
      ["Department audit detail", "auditDetail", History],
      ["Compliance report", "exportReport", FileSearch],
    ],
    "department-reads": [
      ["View review comments", "auditDetail", MessageSquare],
      ["Export department report", "exportReport", Download],
      ["Notification detail", "notificationDetail", Bell],
    ],
    "iro-staff": [
      ["Completeness checklist", "checklist", ClipboardCheck],
      ["Request revision", "returnRevision", TriangleAlert],
      ["Forward with remarks", "remarks", Send],
    ],
    "iro-admin": [
      ["Approve or reject", "approvalDecision", FileCheck2],
      ["Assign document access", "assignPermissions", KeyRound],
      ["Reset document password", "resetPassword", LockKeyhole],
    ],
    "iro-reads": [
      ["View approval history", "auditDetail", History],
      ["Export institutional report", "exportReport", Download],
      ["Notification detail", "notificationDetail", Bell],
    ],
    legal: [
      ["Legal clearance", "legalClearance", Gavel],
      ["Request legal revision", "returnRevision", TriangleAlert],
      ["Add legal comments", "remarks", MessageSquare],
    ],
    president: [
      ["Executive approval", "approvalDecision", FileCheck2],
      ["Return recommendation", "returnRevision", TriangleAlert],
      ["Executive report", "exportReport", FileSearch],
    ],
    "super-admin": [
      ["Manage users and roles", "userAccount", UserCog],
      ["Inspect audit event", "auditDetail", FileSearch],
      ["System report", "exportReport", Download],
    ],
  };
  const actions = actionMap[roleKey] ?? [];
  const panelActions = isWorkflowRole(roleKey)
    ? [
        ...workflowActions.map((action) => [action.label, action.id, getWorkflowActionIcon(action.id, action.tone), true, false]),
        ...(canAddWorkflowComment(roleKey) ? [["Comment on file", getCommentRoute(roleKey), MessageSquare, false, true]] : []),
        ["Notification detail", "notificationDetail", Bell, false, false],
      ]
    : actions;

  return (
    <article className="panel-card action-center">
      <div className="panel-heading compact">
        <h2>Action Center</h2>
        <button onClick={() => openModal("notificationDetail")} type="button">
          <Bell size={18} />
        </button>
      </div>
      <div className="action-list">
        {panelActions.length > 0 ? panelActions.map(([label, modal, Icon, workflowAction, routeAction]) => (
          <button
            key={label}
            onClick={() => {
              if (workflowAction) openModal({ type: "workflowDecision", actionId: modal, recordId: selectedRecord.id });
              else if (routeAction) navigate(modal);
              else openModal(modal);
            }}
            type="button"
          >
            <Icon size={19} />
            <span>{label}</span>
            <ChevronRight size={16} />
          </button>
        )) : (
          <div className="read-only-note">
            <LockKeyhole size={18} />
            <span>No workflow action available at this stage.</span>
          </div>
        )}
      </div>
      <button className="wide-link" onClick={() => navigate(roleConfigs[roleKey].defaultRoute)} type="button">
        Open {roleConfigs[roleKey].shortLabel} dashboard
      </button>
    </article>
  );
}

function ActivityPanel({ activity, openModal }) {
  return (
    <article className="panel-card">
      <div className="panel-heading compact">
        <h2>Recent Activity</h2>
        <button onClick={() => openModal("auditDetail")} type="button">
          <History size={18} />
        </button>
      </div>
      <div className="activity-feed">
        {activity.map(({ actor, event, time }) => (
          <button key={`${actor}-${event}-${time}`} onClick={() => openModal("auditDetail")} type="button">
            <strong>{actor}</strong>
            <span>{event}</span>
            <small>{time}</small>
          </button>
        ))}
      </div>
    </article>
  );
}

function WorkflowDetail({ record, roleKey, workflowActions, workflowState, openModal, onAddComment }) {
  const relatedComments = workflowState.comments.filter((item) => item.recordId === record.id);
  const relatedAudit = workflowState.auditLogs.filter((item) => item.recordId === record.id).slice(0, 3);
  const relatedNotifications = workflowState.notifications.filter((item) => item.recordId === record.id).slice(0, 3);
  const relatedHistory = workflowState.statusHistory.filter((item) => item.recordId === record.id);
  const reachedIndex = getWorkflowStepIndex(record.status);

  return (
    <section className="workflow-detail-grid" aria-label={`${record.id} workflow detail`}>
      <article className="panel-card workflow-detail-main">
        <div className="panel-heading">
          <div>
            <h2>{record.title}</h2>
            <p>{record.id} is assigned to {record.assignee}.</p>
          </div>
          <span className={`status-pill ${statusClass(record.status)}`}>{getStatusLabel(record.status)}</span>
        </div>
        <div className="status-timeline">
          {workflowSteps.map((step, index) => (
            <span className={index === reachedIndex ? "current" : index < reachedIndex ? "reached" : ""} key={step}>
              {step}
            </span>
          ))}
        </div>
        <div className="workflow-action-row">
          {workflowActions.length > 0 ? workflowActions.map((action) => {
            const Icon = getWorkflowActionIcon(action.id, action.tone);
            return (
              <button
                className={action.tone === "red" ? "danger-mini" : action.tone === "gold" ? "solid-mini" : "plain-mini"}
                key={action.id}
                onClick={() => openModal({ type: "workflowDecision", actionId: action.id, recordId: record.id })}
                type="button"
              >
                <Icon size={17} />
                {action.label}
              </button>
            );
          }) : (
            <span className="read-only-note">
              <LockKeyhole size={18} />
              {roleConfigs[roleKey]?.readOnly ? "Read-only access only." : getNextActionText(record.status)}
            </span>
          )}
        </div>
      </article>

      <CollaborationLedger
        canComment={canAddWorkflowComment(roleKey)}
        comments={relatedComments}
        onAddComment={onAddComment}
      />
      <WorkflowList title="Audit Trail" items={relatedAudit.map((item) => ({ ...item, note: item.event }))} empty="No audit events yet." />
      <WorkflowList title="Notifications" items={relatedNotifications} empty="No notifications for this MOA." />

      <article className="panel-card">
        <div className="panel-heading compact">
          <h2>Status History</h2>
          <History size={18} />
        </div>
        <div className="compact-list">
          {relatedHistory.map((item) => (
            <div key={item.id}>
              <strong>{getStatusLabel(item.status)}</strong>
              <small>{item.time}</small>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function WorkflowList({ title, items, empty }) {
  return (
    <article className="panel-card">
      <div className="panel-heading compact">
        <h2>{title}</h2>
        <MessageSquare size={18} />
      </div>
      <div className="compact-list">
        {items.length > 0 ? items.map((item) => (
          <div key={item.id}>
            <strong>{item.actor}</strong>
            <span>{item.note}</span>
            <small>{item.time}</small>
          </div>
        )) : <p className="empty-copy">{empty}</p>}
      </div>
    </article>
  );
}

function CollaborationLedger({ canComment, comments, onAddComment }) {
  const [draft, setDraft] = useState("");

  const submitComment = () => {
    if (!draft.trim()) return;
    onAddComment(draft);
    setDraft("");
  };

  return (
    <article className="panel-card collaboration-ledger">
      <div className="panel-heading compact">
        <h2>Collaboration Ledger</h2>
        <MessageSquare size={18} />
      </div>
      <div className="compact-list">
        {comments.length > 0 ? comments.map((item) => (
          <div key={item.id}>
            <strong>{item.actor}</strong>
            <span>{item.note}</span>
            <small>{item.time}</small>
          </div>
        )) : <p className="empty-copy">No department comments for this MOA yet.</p>}
      </div>
      {canComment ? (
        <div className="comment-composer">
          <textarea
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add revision notes, clarifications, or department coordination comments..."
            value={draft}
          />
          <button className="solid-mini" onClick={submitComment} type="button">
            <Send size={16} />
            Post Comment
          </button>
        </div>
      ) : (
        <div className="read-only-note">
          <LockKeyhole size={18} />
          <span>Commenting is limited to SCS and SAS Department Staff.</span>
        </div>
      )}
    </article>
  );
}

function WorkflowStrip({ roleKey, status }) {
  const steps = isWorkflowRole(roleKey) ? workflowSteps : ["Department", "IRO Staff", "IRO Admin", "Legal", "President", "Repository"];
  const activeMap = {
    "department-staff": 0,
    "scs-department-staff": 0,
    "sas-department-staff": 1,
    "department-reads": 0,
    "iro-staff": isWorkflowRole(roleKey) ? 3 : 1,
    "iro-admin": isWorkflowRole(roleKey) ? 4 : 2,
    "iro-reads": 2,
    legal: isWorkflowRole(roleKey) ? 2 : 3,
    president: isWorkflowRole(roleKey) ? 5 : 4,
    "super-admin": 5,
    "department-admin": 0,
  };
  const activeIndex = isWorkflowRole(roleKey) ? getWorkflowStepIndex(status) : activeMap[roleKey];

  return (
    <div className="workflow-strip">
      {steps.map((step, index) => (
        <span className={index <= activeIndex ? "active" : ""} key={step}>
          {step}
        </span>
      ))}
    </div>
  );
}

function getRouteLine(roleKey) {
  if (roleConfigs[roleKey]?.readOnly) {
    return "READS roles monitor authorized records, statuses, comments, history, and reports without write actions.";
  }
  if (roleKey === "super-admin") {
    return "System governance manages users, settings, security policies, maintenance, and audit integrity without confidential document access.";
  }
  if (roleKey === "scs-department-staff" || roleKey === "sas-department-staff") {
    return "SCS Department Staff to SAS Department Staff to Legal to IRO Staff to IRO Admin to President's Office.";
  }
  if (isWorkflowRole(roleKey)) {
    return "Demo MOA route: SCS Department Staff to SAS Department Staff to Legal to IRO Staff to IRO Admin to President's Office.";
  }
  return "Department to IRO Staff to IRO Admin to Legal Counsel to President's Office to protected repository.";
}

function ModalHost({ modal, navigate, onClose, onWorkflowAction, selectedRecord, currentRoleKey, workflowState }) {
  const isWorkflowModal = modal && typeof modal === "object" && modal.type === "workflowDecision";
  const workflowAction = isWorkflowModal ? workflowActionDefinitions[modal.actionId] : null;
  const isNotificationModal = modal === "notificationDetail";
  const config = isWorkflowModal && workflowAction
    ? {
        title: workflowAction.modalTitle,
        tone: workflowAction.tone,
        body: `${workflowAction.label} for ${selectedRecord.id}. Current assignee: ${selectedRecord.assignee}.`,
        fields: ["Decision", "Reason / comment"],
        primary: workflowAction.primary,
      }
    : isNotificationModal
      ? {
          ...modalRegistry.notificationDetail,
          body: `Notifications for ${roleConfigs[currentRoleKey]?.label ?? "this role"} on ${selectedRecord.id}.`,
        }
      : modal ? modalRegistry[modal] : null;
  const [workflowNote, setWorkflowNote] = useState("");
  const visibleNotifications = isNotificationModal
    ? getVisibleNotifications(workflowState.notifications, currentRoleKey, selectedRecord.id)
    : [];

  useEffect(() => {
    setWorkflowNote("");
  }, [modal]);

  if (!config) return null;

  const complete = () => {
    if (workflowAction) {
      onWorkflowAction(modal.actionId, workflowNote || `${workflowAction.label} completed.`);
      return;
    }
    const next = config.next;
    onClose();
    if (next) navigate(next);
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <section className={`modal-card ${config.tone}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header>
          <div>
            <span>{config.tone === "red" ? "Action Required" : "Workflow Action"}</span>
            <h2 id="modal-title">{config.title}</h2>
          </div>
          <button aria-label="Close modal" onClick={onClose} type="button">
            <X size={22} />
          </button>
        </header>
        <p>{config.body}</p>
        {isNotificationModal ? (
          <NotificationList notifications={visibleNotifications} selectedRecord={selectedRecord} />
        ) : (
          <div className="modal-fields">
            {config.fields.map((field) => (
              <label key={field}>
                <span>{field}</span>
                <ModalField
                  field={field}
                  workflowAction={workflowAction}
                  workflowNote={workflowNote}
                  setWorkflowNote={setWorkflowNote}
                />
              </label>
            ))}
          </div>
        )}
        <footer>
          <button className="plain-mini" onClick={onClose} type="button">Cancel</button>
          <button className="solid-mini" onClick={complete} type="button">{config.primary}</button>
        </footer>
      </section>
    </div>
  );
}

function NotificationList({ notifications, selectedRecord }) {
  return (
    <div className="modal-notification-list">
      {notifications.length > 0 ? notifications.map((notification) => (
        <article key={notification.id}>
          <div>
            <strong>{notification.actor}</strong>
            <small>{notification.time}</small>
          </div>
          <p>{notification.note}</p>
          <span>{notification.recordId}</span>
        </article>
      )) : (
        <div className="modal-static-note">
          No notifications for {selectedRecord.id} in this role view.
        </div>
      )}
    </div>
  );
}

function ModalField({ field, workflowAction, workflowNote, setWorkflowNote }) {
  if (field === "Decision" && workflowAction) {
    return (
      <select value={workflowAction.id} disabled>
        <option value={workflowAction.id}>{workflowAction.label}</option>
      </select>
    );
  }

  if (field === "Reason / comment") {
    return (
      <textarea
        onChange={(event) => setWorkflowNote(event.target.value)}
        placeholder="Add a mock reason, routing note, or reviewer comment"
        value={workflowNote}
      />
    );
  }

  if (field === "PDF file") {
    return <input type="file" accept="application/pdf" />;
  }

  if (field === "Memorandum type") {
    return (
      <select defaultValue="">
        <option value="" disabled>Select memorandum type</option>
        <option>MOA - Memorandum of Agreement</option>
        <option>MOU - Memorandum of Understanding</option>
        <option>MOF - Memorandum of Foundation</option>
      </select>
    );
  }

  if (field === "Organizing / partner department") {
    return (
      <select defaultValue="">
        <option value="" disabled>Select USJR department</option>
        {workflowDepartments.map((department) => (
          <option key={department}>{department}</option>
        ))}
      </select>
    );
  }

  return <input placeholder={`Mock ${field.toLowerCase()}`} />;
}

function getWorkflowActionIcon(actionId, tone) {
  if (actionId?.includes("Reject") || actionId?.includes("Return") || tone === "red") return TriangleAlert;
  if (actionId?.includes("Comment")) return MessageSquare;
  if (actionId?.includes("Review")) return ClipboardCheck;
  if (actionId?.includes("Edit") || actionId?.includes("revise")) return NotebookPen;
  if (actionId?.includes("send") || actionId?.includes("Forward") || actionId?.includes("Endorse")) return Send;
  if (actionId?.includes("Approve") || actionId?.includes("Clear")) return FileCheck2;
  return Workflow;
}

function getActorLabel(roleKey) {
  return roleConfigs[roleKey]?.label ?? "Conexia Workflow";
}

function getRoleKeyFromPath(path) {
  const [, roleKey] = path.split("/");
  return roleConfigs[roleKey] ? roleKey : "department-staff";
}

function getInvolvedEngagementRoles() {
  return ["scs-department-staff", "sas-department-staff", "legal", "iro-staff", "iro-admin", "president"];
}

function canAddWorkflowComment(roleKey) {
  return ["scs-department-staff", "sas-department-staff"].includes(roleKey);
}

function canViewWorkflowDetail(roleKey) {
  return isWorkflowRole(roleKey) || roleConfigs[roleKey]?.readOnly;
}

function getCommentRoute(roleKey) {
  const routes = {
    "scs-department-staff": "/scs-department-staff/collaboration",
    "sas-department-staff": "/sas-department-staff/comments-history",
  };
  return routes[roleKey] ?? getDetailRoute(roleKey);
}

function getVisibleNotifications(notifications, roleKey, recordId) {
  return notifications.filter((notification) => {
    const matchesRecord = notification.recordId === recordId;
    const audience = notification.audience ?? getInvolvedEngagementRoles();
    return matchesRecord && audience.includes(roleKey);
  });
}

function NotFound({ navigate, role }) {
  const home = role?.defaultRoute ?? "/";
  return (
    <main className="not-found">
      <section>
        <strong>CONEXIA</strong>
        <h1>Page Not Found</h1>
        <p>The requested workspace route is not part of the current frontend MVP.</p>
        <button className="gold-button" onClick={() => navigate(home)} type="button">
          Return
          <ArrowRight size={22} />
        </button>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
