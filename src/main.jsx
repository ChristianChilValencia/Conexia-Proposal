import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Check,
  CheckCheck,
  ChevronRight,
  CircleAlert,
  Clock3,
  Download,
  Eye,
  FileArchive,
  FileCheck2,
  FileClock,
  FileSearch,
  FileText,
  Filter,
  FolderKanban,
  Gavel,
  Grid2X2,
  History,
  Landmark,
  LockKeyhole,
  LogOut,
  Menu,
  MessageSquare,
  NotebookPen,
  Plus,
  Search,
  Send,
  Settings,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  UsersRound,
} from "lucide-react";
import hallImage from "./assets/campus-hall.png";
import secureImage from "./assets/secure-folder.png";
import "./styles.css";

const roles = [
  {
    title: "IRO Admin",
    copy: "Full system oversight and partnership governance.",
    icon: Shield,
  },
  {
    title: "IRO Staff",
    copy: "Operational management and workflow facilitation.",
    icon: UsersRound,
  },
  {
    title: "Legal Counsel",
    copy: "Review memorandum compliance, verify legal signatures, and provide final institutional clearance.",
    icon: Gavel,
  },
  {
    title: "Department Staff",
    copy: "Localized departmental data and specific agreements.",
    icon: Landmark,
  },
];

const adminMetrics = [
  ["Total Engagements", "24", "+2 this month", "green"],
  ["Active Memos", "17", "71% Success Rate", "green"],
  ["Expiring (90d)", "3", "Action Required", "amber"],
  ["Expired", "4", "Needs Renewal", "red"],
  ["Pending", "4", "In Review", "gold"],
  ["Depts Covered", "6", "Institutional Reach", "green"],
];

const adminAlerts = [
  ["Global Health Inst.", "Expired 4 days ago", "Initiate Renewal", "red"],
  ["Tech-Edu Corp", "Expires in 12 days", "Send Notice", "gold"],
  ["Agri-Innovations", "Expires in 45 days", "Review Terms", "gold"],
];

const adminEngagements = [
  ["SM", "St. Mary's Hospital", "Last activity: 2h ago", "MOA", "College of Nursing", "Active"],
  ["BT", "BlueTech Solutions", "Last activity: 1d ago", "MOU", "Engineering & CS", "Pending"],
  ["UP", "Urban Planning Inc.", "Last activity: 1w ago", "MOA", "Architecture", "Expired"],
];

const staffMetrics = [
  { label: "Total Submissions", value: "1,248", detail: "+12% vs last week", tone: "green", icon: FileText },
  { label: "Pending Review", value: "42", detail: "8 Urgents Need Action", tone: "gold", icon: FileClock },
  { label: "MOAs Near Expiry", value: "07", detail: "Due within 30 days", tone: "green", icon: CalendarClock },
  { label: "Staff Efficiency", value: "94.8%", detail: "Above Target", tone: "soft", icon: ShieldCheck },
];

const staffSidebar = [
  ["Dashboard", Grid2X2],
  ["Review Submissions", FileCheck2],
  ["Submissions Detail", NotebookPen],
  ["Engagement List", Building2],
  ["Workflow Queue", FolderKanban],
  ["Document Repository", FileArchive],
  ["Expiry Monitoring", CalendarClock],
  ["Audit Logs", FileSearch],
  ["Remarks History", MessageSquare],
];

const departmentSidebar = [
  ["Dashboard", Grid2X2],
  ["Revision Workspace", MessageSquare],
  ["MOA Confirmation", FileCheck2],
  ["Document Archive", FileArchive],
  ["Settings", Settings],
];

const legalSidebar = [
  ["Dashboard", Grid2X2],
  ["Legal Review", Gavel],
  ["Approved Memorandums", FileCheck2],
  ["Document Repository", FileArchive],
  ["Audit Logs", History],
  ["Settings", Settings],
];

const adminSidebar = [
  ["Dashboard", Grid2X2],
  ["Document Repository", FileArchive],
  ["Approval Queue", FileCheck2],
  ["User Management", UsersRound],
  ["Archive", FileText],
  ["Audit Logs", SlidersHorizontal],
  ["Settings", ShieldCheck],
];

function App() {
  const [page, setPage] = useState("landing");
  const [selectedRole, setSelectedRole] = useState("IRO Admin");

  const openRoles = () => {
    setSelectedRole("IRO Admin");
    setPage("roles");
  };

  if (page === "roles") {
    return (
      <RoleSelection
        selectedRole={selectedRole}
        onSelectRole={setSelectedRole}
        onContinue={() => setPage("dashboard")}
      />
    );
  }

  if (page === "dashboard") {
    return <RoleDashboard role={selectedRole} onHome={() => setPage("landing")} />;
  }

  return <Landing onStart={openRoles} onDashboard={() => setPage("dashboard")} />;
}

function Landing({ onStart, onDashboard }) {
  return (
    <main className="landing-page">
      <header className="landing-nav">
        <button className="brand-lockup" onClick={onStart} aria-label="Open role selection">
          <span className="seal">USJR</span>
          <span>
            <strong>CONEXIA</strong>
            <small>International Relations Office</small>
          </span>
        </button>
        <nav aria-label="Landing navigation">
          <button>Portal Access</button>
          <button>Support</button>
          <span />
          <button className="pill-button" onClick={onStart}>
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
            Conexia streamlines the end-to-end lifecycle of institutional agreements. Securely
            manage, track, and archive MOA, MOU, and MOF submissions with real-time compliance
            monitoring.
          </p>
          <div className="hero-buttons">
            <button className="gold-button" onClick={onStart}>
              Get Started
              <ArrowRight size={24} />
            </button>
            <button className="outline-button" onClick={onDashboard}>
              <FileArchive size={24} />
              Public Repository
            </button>
          </div>
          <div className="landing-stats">
            <MetricMini value="2.5k+" label="Stored Agreements" />
            <MetricMini value="100%" label="Secure Encryption" />
            <MetricMini value="99.9%" label="Uptime Reliability" />
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="status-card pending">
            <FileCheck2 size={28} />
            <div>
              <strong>Pending Approval</strong>
              <span>Ref: MOU-2024-082</span>
            </div>
            <i />
          </div>
          <div className="orbit">
            <img src={secureImage} alt="" />
          </div>
          <div className="status-card encrypted">
            <ShieldCheck size={30} />
            <div>
              <strong>Document Encrypted</strong>
              <span>AES-256 Standard</span>
            </div>
            <div className="signatories">
              <b />
              <b />
              <b />
              <span>+12 signatories</span>
            </div>
          </div>
        </div>
      </section>

      <section className="partner-strip" aria-label="Partner institutions">
        <strong>Partner Institutions</strong>
        <span />
        <span />
        <span />
        <span />
      </section>

      <footer className="landing-footer">
        <p>
          <Shield size={22} />
          Internal access only. Unauthorized use of this system is strictly prohibited.
        </p>
        <nav>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
          <a href="#security">Security</a>
        </nav>
        <span>© 2024 University of San Jose-Recoletos. All rights reserved.</span>
      </footer>
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

function RoleSelection({ selectedRole, onSelectRole, onContinue }) {
  const activeRole = roles.find((role) => role.title === selectedRole) ?? roles[0];

  return (
    <main className="role-page">
      <header className="role-header">
        <strong>CONEXIA</strong>
        <button className="gateway-button">
          <Shield size={25} />
          Institutional Gateway
        </button>
      </header>

      <section className="role-main">
        <div className="role-visual">
          <div className="tile-grid" aria-hidden="true">
            <span style={{ backgroundImage: `url(${hallImage})` }} />
            <span style={{ backgroundImage: `url(${hallImage})` }} />
            <span style={{ backgroundImage: `url(${hallImage})` }} />
            <span style={{ backgroundImage: `url(${hallImage})` }} />
          </div>
          <div className="role-copy">
            <h1>
              Inter-Institutional <strong>Intelligence</strong>
            </h1>
            <p>
              Manage global partnerships with precision and professional rigor. CONEXIA provides
              the fortified environment required for modern university administration.
            </p>
            <div className="trust-row">
              <span />
              <span />
              <span />
              <strong>Trusted by 200+ Global Institutions</strong>
            </div>
          </div>
        </div>

        <aside className="role-panel">
          <div className="role-panel-copy">
            <h2>Select Your Role</h2>
            <p>Choose your administrative access level to continue to the dashboard.</p>
          </div>
          <div className="role-options">
            {roles.map(({ title, copy, icon: Icon }) => (
              <button
                className={title === selectedRole ? "role-card selected" : "role-card"}
                key={title}
                onClick={() => onSelectRole(title)}
              >
                <span className="role-icon">
                  <Icon size={26} />
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </span>
              </button>
            ))}
          </div>
          <button className="continue-button" onClick={onContinue}>
            Continue as {activeRole.title}
            <ArrowRight size={25} />
          </button>
          <p className="support-line">
            Need assistance? <a href="#support">Contact Institutional Support</a>
          </p>
        </aside>
      </section>

      <footer className="role-footer">
        <div>
          <strong>CONEXIA</strong>
          <span>© 2024 CONEXIA. Secured with AES-256 Encryption & ISO 27001 Certified Protocols.</span>
        </div>
        <nav>
          <a href="#privacy">Privacy Policy</a>
          <a href="#security">Security Standards</a>
          <a href="#terms">Terms of Service</a>
        </nav>
      </footer>
    </main>
  );
}

function RoleDashboard({ role, onHome }) {
  if (role === "IRO Staff") {
    return <IroStaffDashboard onHome={onHome} />;
  }

  if (role === "Department Staff") {
    return <DepartmentDashboard onHome={onHome} />;
  }

  if (role === "Legal Counsel") {
    return <LegalDashboard onHome={onHome} />;
  }

  return <AdminDashboard onHome={onHome} />;
}

function PortalSidebar({ brand, subtitle, navItems, user, onHome, footerButtons, profileBadge, brandSeal }) {
  return (
    <aside className="portal-sidebar">
      <button className="mobile-menu" aria-label="Menu" type="button">
        <Menu size={24} />
      </button>
      <div className="portal-brand">
        {brandSeal ? <div className="portal-brand-seal">{brandSeal}</div> : null}
        <div>
          <strong>{brand}</strong>
          <span>{subtitle}</span>
        </div>
      </div>
      <nav aria-label={`${brand} navigation`}>
        {navItems.map(([label, Icon], index) => (
          <button className={index === 0 ? "active" : ""} key={label} type="button">
            <Icon size={21} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="portal-sidebar-spacer" />
      {user ? (
        <div className="portal-profile-card">
          {profileBadge ? <b>{profileBadge}</b> : null}
          <span>
            <strong>{user}</strong>
            <small>{footerButtons?.roleLabel}</small>
          </span>
        </div>
      ) : null}
      <div className="sidebar-bottom">
        {(footerButtons?.items ?? []).map(({ label, icon: Icon, action }) => (
          <button key={label} onClick={action ? () => action() : undefined} type="button">
            <Icon size={22} />
            <span>{label}</span>
          </button>
        ))}
        {!footerButtons ? (
          <>
            <button type="button">
              <UsersRound size={22} />
              <span>User Profile</span>
            </button>
            <button onClick={onHome} type="button">
              <LogOut size={22} />
              <span>Logout</span>
            </button>
          </>
        ) : null}
      </div>
    </aside>
  );
}

function IroStaffDashboard({ onHome }) {
  return (
    <main className="portal-layout">
      <PortalSidebar
        brand="CONEXIA"
        subtitle="IRO Staff Portal"
        navItems={staffSidebar}
        user={null}
        onHome={onHome}
        footerButtons={{
          items: [
            { label: "User Profile", icon: UsersRound },
            { label: "Logout", icon: LogOut, action: onHome },
          ],
          roleLabel: "",
        }}
      />

      <section className="portal-workspace">
        <header className="portal-topbar">
          <label className="topbar-search wide">
            <Search size={20} />
            <input placeholder="Search documents, staff, or MOAs..." />
          </label>
          <button className="filter-chip">
            All Departments
            <ChevronRight size={18} />
          </button>
          <div className="topbar-actions">
            <button aria-label="Notifications">
              <Bell size={20} />
              <i />
            </button>
            <button aria-label="Settings">
              <Settings size={20} />
            </button>
            <button aria-label="Help">
              <CircleAlert size={20} />
            </button>
          </div>
          <div className="topbar-user">
            <span>
              <strong>Maria J. Santos</strong>
              <small>IRO Head Administrator</small>
            </span>
            <b>MS</b>
          </div>
        </header>

        <div className="portal-content">
          <section className="staff-metric-row">
            {staffMetrics.map(({ label, value, detail, tone, icon: Icon }) => (
              <article className={`staff-metric ${tone}`} key={label}>
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

          <section className="staff-main-grid">
            <div className="staff-center-stack">
              <article className="panel-card">
                <div className="panel-heading">
                  <h2>Notification & Action Center</h2>
                  <span className="tiny-alert">3 Urgent Actions</span>
                </div>
                <div className="action-grid">
                  <article className="action-card red">
                    <small>Compliance Alert</small>
                    <strong>Nursing Dept. MOA Missing Signatures</strong>
                    <a href="#resolve">Resolve Now</a>
                  </article>
                  <article className="action-card gold">
                    <small>System Update</small>
                    <strong>New IRO Guidelines Published</strong>
                    <a href="#view">View Document</a>
                  </article>
                </div>
              </article>

              <article className="panel-card">
                <h2>MOA Summary Dashboard</h2>
                <div className="staff-summary-grid">
                  <div className="donut small">
                    <span>
                      <strong>24</strong>
                      <small>Total</small>
                    </span>
                  </div>
                  <div className="memo-breakdown compact">
                    <MemoCard title="Memorandum of Agreement (MOA)" value="14" detail="58% of Total" tone="green" />
                    <MemoCard title="Memorandum of Understanding (MOU)" value="6" detail="25% of Total" tone="gold" />
                    <MemoCard title="Memorandum of Foundation (MOF)" value="4" detail="17% of Total" tone="gray" />
                    <button className="export-box">
                      <Download size={22} />
                      Export Full Breakdown
                    </button>
                  </div>
                </div>
              </article>

              <article className="panel-card">
                <div className="panel-heading">
                  <h2>Pending Staff Queue</h2>
                  <div className="queue-tools">
                    <label className="table-search">
                      <Search size={18} />
                      <input placeholder="Filter by name..." />
                    </label>
                    <button className="solid-mini">
                      <Download size={16} />
                      Export List
                    </button>
                  </div>
                </div>
                <div className="simple-table staff-queue">
                  <div className="simple-head">
                    <span>Reference ID</span>
                    <span>Partner Name</span>
                    <span>Department</span>
                    <span>Stage</span>
                    <span>Action</span>
                  </div>
                  <div className="simple-row">
                    <span>#IRO-2023-9912</span>
                    <span>Cebu General Hospital</span>
                    <span>Nursing & Allied Health</span>
                    <b className="status-pill pending">Pending Approval</b>
                    <span>Assign</span>
                  </div>
                  <div className="simple-row">
                    <span>#IRO-2023-9945</span>
                    <span>Innovation Labs Ltd.</span>
                    <span>Computer Studies</span>
                    <b className="status-pill review">In Legal Review</b>
                    <span>Track</span>
                  </div>
                  <div className="simple-row">
                    <span>#IRO-2023-9888</span>
                    <span>BuildSmart Constructions</span>
                    <span>Engineering</span>
                    <b className="status-pill active">Drafted</b>
                    <span>Open</span>
                  </div>
                </div>
              </article>
            </div>

            <aside className="staff-right-stack">
              <article className="compliance-card">
                <div className="compliance-header">
                  <h2>Compliance Alert</h2>
                  <TriangleAlert size={20} />
                </div>
                <p>MOAs nearing critical expiry dates (30 Days)</p>
                <div className="compliance-list">
                  <article className="compliance-item danger">
                    <div>
                      <strong>TechSolutions Inc.</strong>
                      <span>Expires in 3 days</span>
                    </div>
                    <Send size={18} />
                  </article>
                  <article className="compliance-item">
                    <div>
                      <strong>GreenGrow Agriculture</strong>
                      <span>Expires in 14 days</span>
                    </div>
                    <NotebookPen size={18} />
                  </article>
                  <article className="compliance-item muted">
                    <div>
                      <strong>BlueWave Logistics</strong>
                      <span>Expires in 28 days</span>
                    </div>
                    <Eye size={18} />
                  </article>
                </div>
                <button className="light-button">Generate Compliance Report</button>
              </article>

              <article className="activity-card">
                <div className="panel-heading">
                  <h2>Recent Activity</h2>
                  <button aria-label="More activity">
                    <SlidersHorizontal size={18} />
                  </button>
                </div>
                <div className="activity-list">
                  <article>
                    <i className="success" />
                    <div>
                      <strong>Confirmation Sent</strong>
                      <span>To: Dept. of Industrial Engineering for MOA #8872</span>
                      <small>Just now</small>
                    </div>
                  </article>
                  <article>
                    <i className="gold" />
                    <div>
                      <strong>New Remark Added</strong>
                      <span>Staff "R. Lopez" requested clarification on Annex B.</span>
                      <small>45 mins ago</small>
                    </div>
                  </article>
                  <article>
                    <i className="danger" />
                    <div>
                      <strong>Submission Rejected</strong>
                      <span>Sub#4429: Incorrect digital signature format detected.</span>
                      <small>2 hrs ago</small>
                    </div>
                  </article>
                  <article>
                    <i className="info" />
                    <div>
                      <strong>System Update</strong>
                      <span>Integrated 12 new partner databases into registry.</span>
                      <small>5 hrs ago</small>
                    </div>
                  </article>
                </div>
                <button className="floating-add">
                  <Plus size={24} />
                </button>
              </article>
            </aside>
          </section>
        </div>
      </section>
    </main>
  );
}

function DepartmentDashboard({ onHome }) {
  return (
    <main className="portal-layout">
      <PortalSidebar
        brand="CONEXIA"
        subtitle="School of Computer Studies"
        navItems={departmentSidebar}
        user={null}
        onHome={onHome}
        footerButtons={{
          items: [
            { label: "Support", icon: CircleAlert },
            { label: "Sign Out", icon: LogOut, action: onHome },
          ],
          roleLabel: "",
        }}
      />

      <section className="portal-workspace">
        <header className="portal-topbar">
          <div className="department-lockup">
            <strong>CONEXIA | SCS Portal</strong>
          </div>
          <label className="topbar-search">
            <Search size={20} />
            <input placeholder="Search memorandums..." />
          </label>
          <div className="topbar-actions">
            <button aria-label="Notifications">
              <Bell size={20} />
              <i />
            </button>
            <button aria-label="History">
              <History size={20} />
            </button>
          </div>
          <div className="topbar-user">
            <span>
              <strong>Dr. Maria Santos</strong>
              <small>SCS Reviewer</small>
            </span>
            <b>DS</b>
          </div>
        </header>

        <div className="portal-content department-page">
          <section className="department-metric-row">
            <MetricStat value="1,284" label="Total Engagements" icon={FileArchive} tone="green" />
            <MetricStat value="42" label="Pending My Review" icon={BriefcaseBusiness} tone="gold" />
            <MetricStat value="156" label="Approved (MTD)" icon={CheckCheck} tone="green" />
            <MetricStat value="3.2d" label="Avg. Processing Time" icon={Clock3} tone="soft" />
          </section>

          <section className="department-grid">
            <div className="department-center">
              <article className="panel-card">
                <div className="panel-heading">
                  <div>
                    <h2>Recent Submissions</h2>
                    <p className="subtle-copy">Latest department-wide documentation status</p>
                  </div>
                  <div className="queue-tools">
                    <button className="plain-mini">Filter</button>
                    <button className="solid-mini">Export Report</button>
                  </div>
                </div>
                <div className="simple-table submissions">
                  <div className="simple-head">
                    <span>Submission ID</span>
                    <span>Originating Dept</span>
                    <span>Partner Institution</span>
                    <span>Status</span>
                    <span>Actions</span>
                  </div>
                  <div className="simple-row">
                    <span className="strong-green">SCS-2023-0842</span>
                    <span>Partnership</span>
                    <span>TechGlobal Solutions Inc.</span>
                    <b className="status-pill pending">Pending Review</b>
                    <span className="row-icons"><Eye size={18} /><MessageSquare size={18} /></span>
                  </div>
                  <div className="simple-row">
                    <span className="strong-green">SCS-2023-0911</span>
                    <span>MOU</span>
                    <span>University of Pleasant Valley</span>
                    <b className="status-pill returned">Returned</b>
                    <span className="row-icons"><Eye size={18} /><MessageSquare size={18} /></span>
                  </div>
                  <div className="simple-row">
                    <span className="strong-green">SCS-2023-1002</span>
                    <span>MOA</span>
                    <span>Axiom Systems Research</span>
                    <b className="status-pill active">Approved</b>
                    <span className="row-icons"><Eye size={18} /><MessageSquare size={18} /></span>
                  </div>
                </div>
                <a className="table-link" href="#collaborators">
                  View all collaborators
                  <ArrowRight size={20} />
                </a>
              </article>

              <article className="wave-card" style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 55, 34, 0.8), rgba(0, 55, 34, 0.5)), url(${secureImage})` }}>
                <div>
                  <h2>Annual Compliance Review</h2>
                  <p>
                    You have 12 memorandums approaching their one-year anniversary. Begin the
                    renewal assessment process today.
                  </p>
                  <button className="gold-button compact">Start Review</button>
                </div>
              </article>
            </div>

            <div className="department-right">
              <article className="panel-card narrow">
                <h2>Department Activity</h2>
                <div className="activity-feed">
                  <article className="feed-card gold-bar">
                    <strong>SAS-2023-0842</strong>
                    <p>"The intellectual property clause in Section 4.2 needs more specific..."</p>
                    <span>Dr. Emily Thorne (SCS)</span>
                  </article>
                  <article className="feed-card green-bar">
                    <strong>SAS-2023-0911</strong>
                    <p>"Approved the revised financial annex. Please proceed to the final step."</p>
                    <span>Atty. Ricardo Gomez</span>
                  </article>
                  <article className="feed-card red-bar">
                    <strong>SAS-2023-0102</strong>
                    <p>"The partner institution's license has expired. We cannot proceed..."</p>
                    <span>Luzviminda Cruz</span>
                  </article>
                </div>
                <button className="light-button">View All Activity</button>
              </article>

              <article className="panel-card narrow deadlines-card">
                <h2>Upcoming Deadlines</h2>
                <div className="deadline-list">
                  <article>
                    <div>
                      <strong>Accreditation Prep</strong>
                      <span>Due in 2 days • SCS-2023-0842</span>
                    </div>
                    <b>24 OCT</b>
                  </article>
                  <article>
                    <div>
                      <strong>NVIDIA Partnership Review</strong>
                      <span>Due in 5 days • SCS-2023-1002</span>
                    </div>
                    <b>27 OCT</b>
                  </article>
                </div>
              </article>

              <article className="toolkit-card">
                <h2>Review Toolkit</h2>
                <div className="toolkit-grid">
                  <button><Gavel size={22} /><span>Legal Prep</span></button>
                  <button><FileArchive size={22} /><span>Templates</span></button>
                  <button><UsersRound size={22} /><span>Collab</span></button>
                  <button><BookOpen size={22} /><span>Guidelines</span></button>
                </div>
              </article>
            </div>
          </section>

          <button className="department-create">
            <Plus size={20} />
            New Agreement
          </button>
        </div>
      </section>
    </main>
  );
}

function LegalDashboard({ onHome }) {
  return (
    <main className="portal-layout">
      <PortalSidebar
        brand="CONEXIA"
        subtitle="Legal Counsel"
        navItems={legalSidebar}
        user="Atty. Elena Santos"
        onHome={onHome}
        footerButtons={{
          items: [{ label: "Logout", icon: LogOut, action: onHome }],
          roleLabel: "Senior Counsel",
        }}
        profileBadge="ES"
        brandSeal={<span>CX</span>}
      />

      <section className="portal-workspace">
        <header className="portal-topbar">
          <label className="topbar-search wide">
            <Search size={20} />
            <input placeholder="Search memorandums, cases, or audit logs..." />
          </label>
          <div className="topbar-actions">
            <button aria-label="Notifications">
              <Bell size={20} />
              <i />
            </button>
            <button aria-label="Help">
              <CircleAlert size={20} />
            </button>
          </div>
          <div className="topbar-user access">
            <span>
              <strong>Institutional Access</strong>
              <small>Level 4 Secure</small>
            </span>
            <b>IA</b>
          </div>
        </header>

        <div className="portal-content legal-page">
          <section className="legal-hero">
            <div>
              <span className="eyebrow">Dashboard Overview</span>
              <h1>Welcome back, Atty. Elena Santos</h1>
              <p>Your legal queue has 8 urgent items requiring immediate signature today.</p>
            </div>
            <div className="queue-tools">
              <button className="plain-mini">Generate Report</button>
              <button className="solid-mini wide">New Review</button>
            </div>
          </section>

          <section className="department-metric-row legal-metrics">
            <MetricStat value="24" label="Active Legal Reviews" icon={NotebookPen} tone="green" />
            <MetricStat value="08" label="Pending Signatures" icon={BriefcaseBusiness} tone="gold" />
            <MetricStat value="48" label="Avg. Clearance Time" icon={Clock3} tone="green" suffix="hrs" />
            <MetricStat value="1,482" label="Verified Agreements" icon={ShieldCheck} tone="green" />
          </section>

          <section className="legal-grid">
            <article className="panel-card legal-map">
              <div className="panel-heading">
                <h2>Compliance Risk Map</h2>
                <div className="legend">
                  <span className="moa">Low</span>
                  <span className="mou">Mid</span>
                  <span className="risk">High</span>
                </div>
              </div>
              <div className="risk-grid">
                <RiskCard title="SCS" value="92%" tone="low" />
                <RiskCard title="SAM" value="68%" tone="mid" />
                <RiskCard title="SED" value="42%" tone="high" />
                <RiskCard title="CAS" value="88%" tone="low" />
              </div>
              <div className="feed-placeholder">Aggregated Departmental Security Feed (Real-time)</div>
            </article>

            <article className="panel-card legal-signatures">
              <h2>Recent Signatures</h2>
              <div className="signature-list">
                <SignatureItem title="MOA - Ayala Tech Solutions" time="14:20 • 12 Oct 2023" />
                <SignatureItem title="Service Agreement: PL" time="11:05 • 12 Oct 2023" />
                <SignatureItem title="Academic Partnership" time="09:45 • 12 Oct 2023" />
              </div>
              <button className="light-button">View All Audit Logs</button>
            </article>
          </section>

          <section className="legal-lower">
            <article className="panel-card legal-queue">
              <div className="panel-heading">
                <h2>Urgent Review Queue</h2>
                <span className="danger-chip">8 Items Pending</span>
              </div>
              <div className="simple-table submissions">
                <div className="simple-head">
                  <span>Submission ID</span>
                  <span>Department</span>
                  <span>Partner Entity</span>
                  <span>Days in Queue</span>
                  <span>Action</span>
                </div>
                <div className="simple-row">
                  <span className="strong-green">#LEG-2023-0892</span>
                  <span>SCS (School of Comp. Studies)</span>
                  <span>Microsoft Philippines</span>
                  <span className="danger-text">! 5 Days</span>
                  <span className="cta-link">Review Now</span>
                </div>
                <div className="simple-row">
                  <span className="strong-green">#LEG-2023-0901</span>
                  <span>SED (School of Education)</span>
                  <span>DepEd Regional VII</span>
                  <span className="warning-text">3 Days</span>
                  <span className="cta-link">Review Now</span>
                </div>
                <div className="simple-row">
                  <span className="strong-green">#LEG-2023-0915</span>
                  <span>SAM (School of Arts & Mgmt)</span>
                  <span>Globe Telecom</span>
                  <span className="success-text">1 Day</span>
                  <span className="cta-link">Review Now</span>
                </div>
              </div>
            </article>

            <article className="legal-tip-card">
              <h2>Legal Tip</h2>
              <p>
                "For all Memorandum of Agreement (MOA) documents involving international partners,
                ensure the Governing Law clause explicitly cites Philippine jurisdiction unless a
                reciprocal arbitration agreement is vetted."
              </p>
              <div>
                <strong>Latest Update</strong>
                <span>Memo Series 2023 - Clause 4.2 Revision</span>
              </div>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}

function AdminDashboard({ onHome }) {
  return (
    <main className="dashboard-page">
      <PortalSidebar brand="CONEXIA" subtitle="IRO Admin" navItems={adminSidebar} user={null} onHome={onHome} />

      <section className="dashboard-workspace">
        <header className="dashboard-topbar">
          <label className="dashboard-search">
            <Search size={24} />
            <input placeholder="Search repository..." />
          </label>
          <div className="topbar-right">
            <span className="encrypted-label">
              <LockKeyhole size={23} />
              Encrypted at Rest
            </span>
            <button className="bell-button" aria-label="Notifications">
              <Bell size={24} />
              <i />
            </button>
            <div className="admin-chip">
              <span>
                <strong>Admin User</strong>
                <small>Registrar Office</small>
              </span>
              <b>CV</b>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-title">
            <div>
              <h1>Internal Relations Dashboard</h1>
              <p>Welcome back, Administrator. Here is the latest institutional engagement overview.</p>
            </div>
            <button className="new-button">
              <Plus size={23} />
              New Engagement
            </button>
          </section>

          <section className="metric-row" aria-label="Dashboard metrics">
            {adminMetrics.map(([label, value, detail, tone]) => (
              <article className={`dashboard-metric ${tone}`} key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{detail}</small>
              </article>
            ))}
          </section>

          <section className="dashboard-grid">
            <article className="summary-card">
              <div className="card-heading">
                <h2>MOA Summary Dashboard</h2>
                <div className="legend">
                  <span className="moa">MOA</span>
                  <span className="mou">MOU</span>
                  <span className="mof">MOF</span>
                </div>
              </div>
              <div className="summary-body">
                <div className="donut" aria-label="24 total agreements">
                  <span>
                    <strong>24</strong>
                    <small>Total</small>
                  </span>
                </div>
                <div className="memo-breakdown">
                  <MemoCard title="Memorandum of Agreement (MOA)" value="14" detail="58% of Total" tone="green" />
                  <MemoCard title="Memorandum of Understanding (MOU)" value="6" detail="25% of Total" tone="gold" />
                  <MemoCard title="Memorandum of Foundation (MOF)" value="4" detail="17% of Total" tone="gray" />
                  <button className="export-box">
                    <Download size={24} />
                    Export Full Breakdown
                  </button>
                </div>
              </div>
            </article>

            <aside className="alerts-card">
              <h2>
                <Shield size={26} />
                Expiry Alerts
              </h2>
              <div className="alert-list">
                {adminAlerts.map(([title, due, action, tone]) => (
                  <article className={`alert-item ${tone}`} key={title}>
                    <strong>{title}</strong>
                    <span>{due}</span>
                    <a href="#alert">{action}</a>
                  </article>
                ))}
              </div>
              <button>View All Alerts</button>
            </aside>
          </section>

          <section className="engagement-card">
            <div className="engagement-heading">
              <h2>Recent Engagements</h2>
              <div>
                <button>
                  <Filter size={18} />
                  Filter
                </button>
                <button>
                  <SlidersHorizontal size={18} />
                  Sort
                </button>
              </div>
            </div>
            <div className="engagement-table">
              <div className="table-head">
                <span>Partner Entity</span>
                <span>Type</span>
                <span>Department</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {adminEngagements.map(([initials, name, activity, type, department, status]) => (
                <div className="table-row" key={name}>
                  <div className="entity-cell">
                    <b>{initials}</b>
                    <span>
                      <strong>{name}</strong>
                      <small>{activity}</small>
                    </span>
                  </div>
                  <span className="type-pill">{type}</span>
                  <span>{department}</span>
                  <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>
                  <div className="actions">
                    <button aria-label={`View ${name}`}>
                      <Eye size={22} />
                    </button>
                    <button aria-label={`Edit ${name}`}>
                      <NotebookPen size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <footer>
              <strong>Showing 3 of 24 engagements</strong>
              <span>
                <button aria-label="Previous page">‹</button>
                <button aria-label="Next page">›</button>
              </span>
            </footer>
          </section>
        </div>
        <button className="floating-doc" aria-label="Open documents">
          <FileText size={30} />
        </button>
      </section>
    </main>
  );
}

function MetricStat({ value, label, icon: Icon, tone, suffix }) {
  return (
    <article className={`metric-stat ${tone}`}>
      <span className="metric-icon">
        <Icon size={22} />
      </span>
      <div>
        <small>{label}</small>
        <strong>
          {value}
          {suffix ? <em>{suffix}</em> : null}
        </strong>
      </div>
    </article>
  );
}

function RiskCard({ title, value, tone }) {
  return (
    <article className={`risk-card ${tone}`}>
      <strong>{title}</strong>
      <span>{value}</span>
      <small>Compliance</small>
      <i />
    </article>
  );
}

function SignatureItem({ title, time }) {
  return (
    <article className="signature-item">
      <span><Check size={18} /></span>
      <div>
        <strong>{title}</strong>
        <small>{time}</small>
      </div>
    </article>
  );
}

function MemoCard({ title, value, detail, tone }) {
  return (
    <article className={`memo-card ${tone}`}>
      <strong>{title}</strong>
      <div>
        <span>{value}</span>
        <small>{detail}</small>
      </div>
      <i />
    </article>
  );
}

createRoot(document.getElementById("root")).render(<App />);
