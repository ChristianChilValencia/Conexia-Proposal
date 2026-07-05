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
import "./styles.css";

const roleConfigs = {
  "department-staff": {
    label: "Department Staff",
    shortLabel: "Dept Staff",
    subtitle: "Engagement creator workspace",
    user: "Dr. Andrea Lim",
    initials: "AL",
    defaultRoute: "/department-staff/dashboard",
    permissions: ["create", "submit", "revise"],
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
  "iro-staff": {
    label: "IRO Staff",
    shortLabel: "IRO Staff",
    subtitle: "First-level reviewer portal",
    user: "Maria J. Santos",
    initials: "MS",
    defaultRoute: "/iro-staff/dashboard",
    permissions: ["review", "return", "forward"],
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
    subtitle: "System controller and IRO approval",
    user: "Admin User",
    initials: "CV",
    defaultRoute: "/iro-admin/dashboard",
    permissions: ["approve", "reject", "route", "manage"],
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
  legal: {
    label: "Legal Counsel",
    shortLabel: "Legal",
    subtitle: "Legal validation authority",
    user: "Atty. Elena Santos",
    initials: "ES",
    defaultRoute: "/legal/dashboard",
    permissions: ["legal-review", "legal-clearance"],
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
    subtitle: "Executive approval workspace",
    user: "Office of the President",
    initials: "OP",
    defaultRoute: "/president/executive-dashboard",
    permissions: ["executive-approval", "read-all"],
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
    subtitle: "Governance and security control",
    user: "Security Administrator",
    initials: "SA",
    defaultRoute: "/super-admin/system-dashboard",
    permissions: ["governance", "security", "read-only-workflow"],
    restricted: ["approve", "reject", "modify-submission"],
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
    subtitle: "Department-level system manager",
    user: "Dean Rafael Cruz",
    initials: "RC",
    defaultRoute: "/department-admin/department-dashboard",
    permissions: ["department-manage", "department-report"],
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
};

const modalRegistry = {
  createEngagement: {
    title: "Create Engagement",
    tone: "green",
    body: "Start a new MOA, MOU, or MOF record with partner, department, budget, and routing details.",
    fields: ["Partner institution", "Memorandum type", "Originating department"],
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

  return (
    <>
      <Router path={path} navigate={navigate} openModal={openModal} />
      <ModalHost modal={modal} navigate={navigate} onClose={closeModal} />
    </>
  );
}

function getPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function Router({ path, navigate, openModal }) {
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
    />
  );
}

function Landing({ navigate }) {
  return (
    <main className="landing-page">
      <header className="landing-nav">
        <button className="brand-lockup" onClick={() => navigate("/roles")} type="button">
          <span className="seal">USJR</span>
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
            <MetricMini value="7" label="Role Workspaces" />
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

function PortalShell({ roleKey, role, pageKey, navigate, openModal }) {
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
        <div className="portal-profile-card">
          <b>{role.initials}</b>
          <span>
            <strong>{role.user}</strong>
            <small>{role.label}</small>
          </span>
        </div>
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
        />
      </section>
    </main>
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

function PageView({ roleKey, role, pageKey, pageTitle, navigate, openModal }) {
  const isSuperAdmin = roleKey === "super-admin";
  const metrics = getMetrics(roleKey, pageKey);
  const quickActions = getQuickActions(roleKey, pageKey, isSuperAdmin);

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
              onClick={() => (action.route ? navigate(action.route) : openModal(action.modal))}
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

      <section className="workspace-grid">
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
          <RecordTable roleKey={roleKey} pageKey={pageKey} navigate={navigate} openModal={openModal} />
        </article>

        <aside className="side-stack">
          <ActionCenter roleKey={roleKey} isSuperAdmin={isSuperAdmin} navigate={navigate} openModal={openModal} />
          <ActivityPanel openModal={openModal} />
        </aside>
      </section>

      <section className="route-map">
        <div>
          <h2>Workflow Routing</h2>
          <p>{getRouteLine(roleKey)}</p>
        </div>
        <WorkflowStrip roleKey={roleKey} />
      </section>
    </div>
  );
}

function getMetrics(roleKey, pageKey) {
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

function getQuickActions(roleKey, pageKey, isSuperAdmin) {
  if (isSuperAdmin) {
    return [
      { label: "User Account", modal: "userAccount", icon: UserCog, primary: true },
      { label: "Audit Detail", modal: "auditDetail", icon: FileSearch },
      { label: "Export", modal: "exportReport", icon: Download },
    ];
  }

  if (roleKey === "department-staff") {
    return [
      { label: "New Engagement", modal: "createEngagement", icon: Plus, primary: true },
      { label: "Upload PDF", modal: "uploadPdf", icon: FileText },
      { label: "Submit", modal: "submitReview", icon: Send },
    ];
  }

  if (roleKey === "legal") {
    return [
      { label: "Legal Clearance", modal: "legalClearance", icon: Gavel, primary: true },
      { label: "Remarks", modal: "remarks", icon: MessageSquare },
      { label: "Checklist", modal: "checklist", icon: ClipboardCheck },
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
  if (roleKey === "super-admin") {
    return `Monitor ${readable} across system governance and security scope.`;
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

function RecordTable({ roleKey, pageKey, navigate, openModal }) {
  const detailRoute = getDetailRoute(roleKey);
  const isSuperAdmin = roleKey === "super-admin";

  return (
    <div className="record-table">
      <div className="record-head">
        <span>Reference</span>
        <span>Partner / Item</span>
        <span>Department</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      {records.map((record) => (
        <div className="record-row" key={`${pageKey}-${record.id}`}>
          <span className="reference">{record.id}</span>
          <span>
            <strong>{record.partner}</strong>
            <small>{record.type} by {record.owner}</small>
          </span>
          <span>{record.department}</span>
          <span className={`status-pill ${statusClass(record.status)}`}>{record.status}</span>
          <span className="row-actions">
            <button aria-label={`View ${record.id}`} onClick={() => navigate(detailRoute)} type="button">
              <Eye size={18} />
            </button>
            <button aria-label={`Add remarks to ${record.id}`} onClick={() => openModal("remarks")} type="button">
              <MessageSquare size={18} />
            </button>
            {!isSuperAdmin ? (
              <button aria-label={`Edit ${record.id}`} onClick={() => openModal("editEngagement")} type="button">
                <NotebookPen size={18} />
              </button>
            ) : null}
            {!isSuperAdmin ? (
              <button aria-label={`Review ${record.id}`} onClick={() => openModal("checklist")} type="button">
                <ClipboardCheck size={18} />
              </button>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}

function statusClass(status) {
  if (status.includes("Returned")) return "returned";
  if (status.includes("Legal")) return "review";
  if (status.includes("Pending")) return "pending";
  if (status.includes("Approved")) return "active";
  return "neutral";
}

function getDetailRoute(roleKey) {
  const routes = {
    "department-staff": "/department-staff/submission-detail",
    "iro-staff": "/iro-staff/review-detail",
    "iro-admin": "/iro-admin/approval-queue",
    legal: "/legal/legal-review-detail",
    president: "/president/submission-review-detail",
    "super-admin": "/super-admin/audit-logs",
    "department-admin": "/department-admin/submissions-monitor",
  };
  return routes[roleKey] ?? "/";
}

function ActionCenter({ roleKey, isSuperAdmin, navigate, openModal }) {
  const actions = isSuperAdmin
    ? [
        ["Manage users", "userAccount", UserCog],
        ["Review access", "accessRequest", ShieldCheck],
        ["Inspect audit event", "auditDetail", FileSearch],
      ]
    : [
        ["Assign permissions", "assignPermissions", KeyRound],
        ["Return for revision", "returnRevision", TriangleAlert],
        ["Reset document password", "resetPassword", LockKeyhole],
      ];

  return (
    <article className="panel-card action-center">
      <div className="panel-heading compact">
        <h2>Action Center</h2>
        <button onClick={() => openModal("notificationDetail")} type="button">
          <Bell size={18} />
        </button>
      </div>
      <div className="action-list">
        {actions.map(([label, modal, Icon]) => (
          <button key={label} onClick={() => openModal(modal)} type="button">
            <Icon size={19} />
            <span>{label}</span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
      <button className="wide-link" onClick={() => navigate(roleConfigs[roleKey].defaultRoute)} type="button">
        Open {roleConfigs[roleKey].shortLabel} dashboard
      </button>
    </article>
  );
}

function ActivityPanel({ openModal }) {
  return (
    <article className="panel-card">
      <div className="panel-heading compact">
        <h2>Recent Activity</h2>
        <button onClick={() => openModal("auditDetail")} type="button">
          <History size={18} />
        </button>
      </div>
      <div className="activity-feed">
        {activity.map(([actor, event, time]) => (
          <button key={`${actor}-${event}`} onClick={() => openModal("auditDetail")} type="button">
            <strong>{actor}</strong>
            <span>{event}</span>
            <small>{time}</small>
          </button>
        ))}
      </div>
    </article>
  );
}

function WorkflowStrip({ roleKey }) {
  const steps = ["Department", "IRO Staff", "IRO Admin", "Legal", "President", "Repository"];
  const activeMap = {
    "department-staff": 0,
    "iro-staff": 1,
    "iro-admin": 2,
    legal: 3,
    president: 4,
    "super-admin": 5,
    "department-admin": 0,
  };

  return (
    <div className="workflow-strip">
      {steps.map((step, index) => (
        <span className={index <= activeMap[roleKey] ? "active" : ""} key={step}>
          {step}
        </span>
      ))}
    </div>
  );
}

function getRouteLine(roleKey) {
  if (roleKey === "super-admin") {
    return "System governance monitors activity, access, reports, and audit integrity across role scopes.";
  }
  return "Department to IRO Staff to IRO Admin to Legal Counsel to President's Office to protected repository.";
}

function ModalHost({ modal, navigate, onClose }) {
  const config = modal ? modalRegistry[modal] : null;

  if (!config) return null;

  const complete = () => {
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
        <div className="modal-fields">
          {config.fields.map((field) => (
            <label key={field}>
              <span>{field}</span>
              {field === "PDF file" ? <input type="file" accept="application/pdf" /> : <input placeholder={`Mock ${field.toLowerCase()}`} />}
            </label>
          ))}
        </div>
        <footer>
          <button className="plain-mini" onClick={onClose} type="button">Cancel</button>
          <button className="solid-mini" onClick={complete} type="button">{config.primary}</button>
        </footer>
      </section>
    </div>
  );
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
