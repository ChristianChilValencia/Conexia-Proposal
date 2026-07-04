import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
  Filter,
  Gavel,
  Home,
  LayoutDashboard,
  MessageSquareText,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";
import "./styles.css";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "SCS Reviews", icon: ClipboardCheck },
  { label: "Legal Memos", icon: Gavel },
  { label: "IRO Staff", icon: UsersRound },
  { label: "Institutions", icon: Building2 },
  { label: "Approvals", icon: FileCheck2 },
  { label: "Messages", icon: MessageSquareText },
];

const pageSubtitles = {
  Dashboard: "IRO Staff",
  "SCS Reviews": "SCS Review Queue",
  "Legal Memos": "Legal Counsel",
  "IRO Staff": "Staff Review",
  Institutions: "Institution Registry",
  Approvals: "Approval Board",
  Messages: "Engagement Notifications",
};

const stats = [
  { label: "Open reviews", value: "24", tone: "green", detail: "7 due today" },
  { label: "Awaiting legal", value: "8", tone: "gold", detail: "3 escalated" },
  { label: "Approved memos", value: "142", tone: "blue", detail: "+18 this month" },
  { label: "SLA health", value: "96%", tone: "mint", detail: "On target" },
];

const reviews = [
  {
    title: "Inter-Institutional Intelligence",
    owner: "BPI Compliance",
    stage: "Legal review",
    status: "Priority",
    due: "Today",
    progress: 72,
  },
  {
    title: "Quarterly Data Sharing Memo",
    owner: "UnionBank",
    stage: "SCS assessment",
    status: "In review",
    due: "Jul 7",
    progress: 48,
  },
  {
    title: "Customer Consent Addendum",
    owner: "Metro Finance",
    stage: "IRO approval",
    status: "Approved",
    due: "Jul 10",
    progress: 100,
  },
];

const queue = [
  ["Memo ID", "Entity", "Role", "Status", "Reviewer"],
  ["CNX-1048", "BPI Compliance", "Legal", "Rejected", "A. Santos"],
  ["CNX-1049", "UnionBank", "SCS", "Pending", "M. Cruz"],
  ["CNX-1050", "Rural Trust", "IRO", "Approved", "J. Reyes"],
  ["CNX-1051", "Metro Finance", "Legal", "Reviewing", "L. Tan"],
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">C</div>
          <div>
            <strong>Conexia</strong>
            <span>Review Portal</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Primary">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              className={activePage === label ? "nav-item active" : "nav-item"}
              key={label}
              onClick={() => setActivePage(label)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <section className="sidebar-panel">
          <ShieldCheck size={20} />
          <h2>Compliance SLA</h2>
          <p>All priority cases must receive first review within 24 hours.</p>
          <button>View policy</button>
        </section>
      </aside>

      <section className="main-workspace">
        <header className="topbar">
          <div className="breadcrumb">
            <Home size={16} />
            <span>{pageSubtitles[activePage]}</span>
            <ChevronDown size={16} />
          </div>
          <div className="top-actions">
            <label className="search">
              <Search size={17} />
              <input placeholder="Search memos, entities, reviewers" />
            </label>
            <button className="icon-btn" aria-label="Filter">
              <Filter size={18} />
            </button>
            <button className="icon-btn" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <div className="user-chip">
              <UserRound size={17} />
              <span>IRO Admin</span>
            </div>
          </div>
        </header>

        <Workspace page={activePage} />
      </section>
    </main>
  );
}

function Workspace({ page }) {
  if (page === "SCS Reviews") return <SCSReviews />;
  if (page === "Legal Memos") return <LegalMemos />;
  if (page === "IRO Staff") return <IROStaff />;
  if (page === "Institutions") return <Institutions />;
  if (page === "Approvals") return <Approvals />;
  if (page === "Messages") return <Messages />;
  return <Dashboard />;
}

function Dashboard() {
  return (
    <>
        <section className="hero-band">
          <div>
            <span className="eyebrow">Legal Dashboard</span>
            <h1>Review, approve, and route institutional memos</h1>
            <p>
              Centralized case tracking for SCS, IRO staff, legal counsel, and
              approvers.
            </p>
          </div>
          <div className="hero-actions">
            <button className="primary-btn">
              <Sparkles size={18} />
              New review
            </button>
            <button className="secondary-btn">
              <FileText size={18} />
              Export report
            </button>
          </div>
        </section>

        <section className="stats-grid" aria-label="Review metrics">
          {stats.map((item) => (
            <article className={`metric ${item.tone}`} key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.detail}</small>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <div className="review-column">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Work queue</span>
                <h2>Priority submissions</h2>
              </div>
              <button className="ghost-btn">See all</button>
            </div>

            {reviews.map((review) => (
              <article className="review-card" key={review.title}>
                <div className="review-header">
                  <div>
                    <h3>{review.title}</h3>
                    <p>{review.owner}</p>
                  </div>
                  <button className="icon-btn compact" aria-label="More options">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div className="review-meta">
                  <span>{review.stage}</span>
                  <StatusPill status={review.status} />
                  <span className="due">
                    <Clock3 size={14} />
                    {review.due}
                  </span>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${review.progress}%` }} />
                </div>
              </article>
            ))}
          </div>

          <aside className="canvas-panel">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Main content canvas</span>
                <h2>Case summary</h2>
              </div>
              <CheckCircle2 size={22} />
            </div>
            <div className="case-preview">
              <div className="memo-cover">
                <BriefcaseBusiness size={34} />
                <strong>Inter-Institutional Intelligence</strong>
                <span>Memo CNX-1048</span>
              </div>
              <div className="decision-box reject">
                <span>Legal Review</span>
                <strong>Rejected</strong>
                <p>Missing clause references and supporting risk declaration.</p>
              </div>
              <div className="timeline">
                <span className="done">Submitted</span>
                <span className="done">SCS checked</span>
                <span className="current">Legal review</span>
                <span>IRO approval</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="table-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SCS and legal handoff</span>
              <h2>Submission tracker</h2>
            </div>
            <button className="secondary-btn small">Manage columns</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>{queue[0].map((head) => <th key={head}>{head}</th>)}</tr>
              </thead>
              <tbody>
                {queue.slice(1).map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td><StatusPill status={row[3]} /></td>
                    <td>{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    </>
  );
}

function SCSReviews() {
  return (
    <section className="page-stack">
      <PageBanner
        eyebrow="SCS Review"
        title="Screen, score, and return submissions"
        copy="Review business context, supporting files, and risk declarations before routing to legal."
      />
      <section className="split-workspace">
        <article className="review-column">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Checklist</span>
              <h2>Submission completeness</h2>
            </div>
            <StatusPill status="In review" />
          </div>
          {["Entity profile verified", "Consent basis attached", "Risk declaration complete", "Supporting files uploaded"].map((item, index) => (
            <label className="check-row" key={item}>
              <input type="checkbox" defaultChecked={index < 2} />
              <span>{item}</span>
            </label>
          ))}
          <div className="note-box">
            <strong>Reviewer note</strong>
            <p>Request updated data retention language before legal handoff.</p>
          </div>
        </article>
        <article className="canvas-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Attached memo</span>
              <h2>CNX-1049</h2>
            </div>
            <FileText size={22} />
          </div>
          <div className="document-preview">
            <span />
            <span />
            <span />
            <span className="short" />
            <div className="stamp">SCS</div>
          </div>
        </article>
      </section>
    </section>
  );
}

function LegalMemos() {
  return (
    <section className="page-stack">
      <PageBanner
        eyebrow="Legal Counsel"
        title="Resolve rejected clauses and approved memo decisions"
        copy="A focused legal workspace for clause comments, rejection reasons, and final memo approval."
      />
      <section className="decision-grid">
        {["Rejected", "Reviewing", "Approved"].map((status) => (
          <article className="decision-card" key={status}>
            <StatusPill status={status} />
            <h2>{status === "Rejected" ? "Missing risk clause" : status === "Reviewing" ? "Consent addendum" : "Approved memo"}</h2>
            <p>{status === "Rejected" ? "Return to SCS with clause references." : status === "Reviewing" ? "Legal counsel is validating updated text." : "Ready for IRO final approval."}</p>
          </article>
        ))}
      </section>
      <section className="table-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Clause tracker</span>
            <h2>Legal review comments</h2>
          </div>
        </div>
        <div className="comment-list">
          {["Add lawful basis reference", "Clarify data retention window", "Attach approver authority"].map((text, index) => (
            <div className="comment-row" key={text}>
              <span>{index + 1}</span>
              <p>{text}</p>
              <StatusPill status={index === 0 ? "Rejected" : "Pending"} />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function IROStaff() {
  return (
    <section className="page-stack">
      <PageBanner
        eyebrow="IRO Staff"
        title="Review approvals, rejections, and engagement notices"
        copy="A staff cockpit for assigning reviewers and preparing notifications to institutions."
      />
      <section className="staff-grid">
        {["A. Santos", "M. Cruz", "J. Reyes", "L. Tan"].map((name, index) => (
          <article className="staff-card" key={name}>
            <div className="avatar">{name[0]}</div>
            <h2>{name}</h2>
            <p>{index + 3} active submissions</p>
            <StatusPill status={index === 2 ? "Approved" : "In review"} />
          </article>
        ))}
      </section>
    </section>
  );
}

function Institutions() {
  return (
    <section className="page-stack">
      <PageBanner
        eyebrow="Institution Registry"
        title="Track participating entities and memo volume"
        copy="Profile cards surface role, assigned reviewer, and the current review state for each institution."
      />
      <section className="institution-grid">
        {["BPI Compliance", "UnionBank", "Rural Trust", "Metro Finance", "Civic Credit", "Northstar Bank"].map((name, index) => (
          <article className="institution-card" key={name}>
            <Building2 size={22} />
            <h2>{name}</h2>
            <p>{12 + index * 3} submissions this year</p>
            <StatusPill status={index % 3 === 0 ? "Priority" : index % 2 ? "Pending" : "Approved"} />
          </article>
        ))}
      </section>
    </section>
  );
}

function Approvals() {
  return (
    <section className="page-stack">
      <PageBanner
        eyebrow="Approvals"
        title="Move reviewed memos into final disposition"
        copy="Approve, reject, or send cases back for revision with one clear decision record."
      />
      <section className="approval-board">
        {["SCS checked", "Legal reviewed", "IRO approval", "Institution notified"].map((stage, index) => (
          <article className="approval-step" key={stage}>
            <span>{index + 1}</span>
            <h2>{stage}</h2>
            <p>{index < 2 ? "Completed" : index === 2 ? "Active" : "Waiting"}</p>
          </article>
        ))}
      </section>
    </section>
  );
}

function Messages() {
  return (
    <section className="page-stack">
      <PageBanner
        eyebrow="Notifications"
        title="Send engagement updates to institutions"
        copy="Compose structured notices for approvals, rejections, and missing document requests."
      />
      <section className="message-composer">
        <div>
          <span className="eyebrow">Template</span>
          <h2>Legal rejection notice</h2>
          <p>CNX-1048 requires additional clause references before it can proceed.</p>
        </div>
        <button className="primary-btn">
          <MessageSquareText size={18} />
          Send notice
        </button>
      </section>
    </section>
  );
}

function PageBanner({ eyebrow, title, copy }) {
  return (
    <section className="hero-band compact-hero">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

function StatusPill({ status }) {
  const key = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`status ${key}`}>{status}</span>;
}

createRoot(document.getElementById("root")).render(<App />);
