export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  github: string;
  live?: string;
  liveLabel?: string;
  badge: string;
  // SEO / case-study fields
  seoTitle: string;
  seoDescription: string;
  role: string;
  timeline: string;
  clientType: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string[];
  results: string[];
};

export const EMAIL = "talatramadan10@gmail.com";
export const WHATSAPP = "https://wa.me/201126342642";
export const GITHUB = "https://github.com/ixtalaat";
export const LINKEDIN = "https://www.linkedin.com/in/ixtalaat/";
// Drop your file here later: public/Talaat-Ramadan-CV.pdf
export const CV_PATH = "/Talaat-Ramadan-CV.pdf";

export const projects: Project[] = [
  {
    slug: "tamayoz",
    name: "Tamayoz — أكاديمية التميز",
    tagline: "Training academy platform with admin control",
    description:
      "Arabic-first academy management system: Identity auth, Admin area for managing content/users, role-based access, deployed to production on RunASP.",
    stack: ["ASP.NET Core MVC", "C#", "Identity", "SQL Server", "Bootstrap", "Docker"],
    highlights: [
      "Admin dashboard + role management",
      "Secure admin seeding via user-secrets",
      "Deployed live — Docker-ready",
    ],
    github: "https://github.com/ixtalaat/Tamayoz",
    live: "https://tamayoz.runasp.net/",
    liveLabel: "Live Site",
    badge: "ASP.NET MVC • Live",
    seoTitle: "Tamayoz Academy — Arabic Training Platform (ASP.NET Core) | Talaat Ramadan",
    seoDescription:
      "Case study: Arabic-first training academy with Identity auth, admin area, role-based access. ASP.NET Core MVC deployed live on RunASP.",
    role: "Full-Stack Developer",
    timeline: "Built + deployed live",
    clientType: "Academies / coaches / course businesses (Arabic-first)",
    problem:
      "An Arabic academy needed a simple site to manage its programs and users with proper admin control — without leaking secrets or overcomplicating hosting.",
    solution:
      "Built an ASP.NET Core MVC app with Identity, Admin area, and user-secrets-based admin seeding. Dockerfile + RunASP deploy for low-cost production hosting. Arabic UI throughout.",
    features: [
      "Identity login + Admin role bootstrap via user-secrets",
      "Admin area (/Admin) for management",
      "Role-based authorization (Admin-gated pages)",
      "Arabic-first UI (RTL-ready views)",
      "Dockerfile for portable deploy",
    ],
    architecture: [
      "Controllers / Services / Models / ViewModels / Views",
      "Data layer with EF Core + Identity",
      "Middleware for auth/authorization",
      "appsettings + user-secrets for credentials (never in Git)",
    ],
    results: [
      "Live in production: tamayoz.runasp.net",
      "Secure admin setup documented in README",
      "Docker-ready for any VPS",
    ],
  },
  {
    slug: "hometech",
    name: "HomeTech",
    tagline: "Home maintenance lifecycle — request to invoice",
    description:
      "End-to-end service platform: customer request → admin review → technician assignment → scheduling → work order → extra-work approval → invoicing → payment → review. 147 Pest tests, 583 assertions.",
    stack: ["PHP 8.2", "Laravel 12", "MySQL", "Blade + Tailwind", "Pest"],
    highlights: [
      "12 guarded business rules server-side (skills match, no overlaps, no negative stock)",
      "Full billing: invoices, partial payments, cancellation fees",
      "Audit log + status history on every state change",
    ],
    github: "https://github.com/ixtalaat/HomeTech",
    badge: "Laravel • 147 Tests",
    seoTitle: "HomeTech — Home Maintenance Platform (Laravel 12) | Talaat Ramadan",
    seoDescription:
      "Case study: home maintenance lifecycle platform in Laravel 12 — assignment, scheduling, work orders, invoicing, payments. 147 Pest tests, 12 business rules enforced.",
    role: "Backend Developer (services, billing, testing)",
    timeline: "Personal project, 67 commits",
    clientType: "Field-service businesses: AC, plumbing, electrical, painting",
    problem:
      "Home-service companies juggle requests in WhatsApp: wrong technician assigned, overlapping appointments, missing parts, unbilled extra work, and no payment tracking.",
    solution:
      "Built HomeTech in Laravel 12 with thin controllers + service layer (RequestStatusService, TechnicianAssignmentService, SchedulingService, WorkOrderService, InventoryService, InvoiceService, PaymentService…). One guarded transition map for the whole job lifecycle; every state change writes history + audit logs.",
    features: [
      "Request → approve → assign (skill-matched) → schedule (overlap-safe)",
      "Work orders: diagnosis + labor + materials, row-locked inventory",
      "Additional-work flow: request → customer approve → perform → bill",
      "Invoices: generate → issue → partial/full payments (cash/card) → close",
      "Cancellation fees via config, one review per finished job",
      "Dashboard + revenue reports",
    ],
    architecture: [
      "app/Services/* — all domain logic, controllers are HTTP-only",
      "BR-001…BR-012 enforced server-side (skills, overlaps, stock, payments, locks)",
      "maintenance_request_status_histories + audit_logs on every change",
      "Pest feature tests per epic, shared fixtures in tests/Pest.php",
    ],
    results: [
      "147 tests, 583 assertions passing",
      "5-minute demo tour documented (AC repair scenario)",
      "Seeded demo accounts: admin / manager / 3 technicians / customer",
      "Per-epic architecture docs (EPIC_1…12) + PRD",
    ],
  },
  {
    slug: "tazkara",
    name: "Tazkara",
    tagline: "Event marketplace — discover, reserve, ticket",
    description:
      "Full-stack event platform with customer / organizer / admin roles. Browse events, reserve tickets, simulated checkout + printable voucher, organizer sales metrics.",
    stack: ["Angular 22", "ASP.NET Core 10", "EF Core", "SQL Server", "JWT", "Clean Architecture", "xUnit"],
    highlights: [
      "Role-based auth with JWT + Identity",
      "Duplicate-booking & availability protection",
      "Organizer sales dashboard + metrics",
    ],
    github: "https://github.com/ixtalaat/Tazkara",
    live: "https://tazkara-five.vercel.app/",
    liveLabel: "Live Demo",
    badge: "Full-Stack • Live",
    seoTitle: "Tazkara — Event Marketplace (Angular + ASP.NET Core) | Talaat Ramadan",
    seoDescription:
      "Case study: full-stack event marketplace with JWT roles, ticket reservation, simulated checkout, organizer metrics. Built with Angular 22 + ASP.NET Core 10 Clean Architecture.",
    role: "Full-Stack Developer (design → API → frontend → deploy)",
    timeline: "Personal project, actively maintained",
    clientType: "Marketplace / booking platform — ideal for event startups",
    problem:
      "Event organizers need a simple way to publish events, control seat availability, and track sales — without double-bookings or messy spreadsheets. Customers want fast discovery, reservation, and a ticket they can actually use.",
    solution:
      "Built Tazkara as a clean-architecture system: ASP.NET Core Web API (API / Application / Domain / Infrastructure layers) + Angular client. JWT + Identity for customer/organizer/admin roles, EF Core for relational modeling, availability checks at reservation time, simulated payment behind an abstraction so a real provider can plug in later.",
    features: [
      "Browse + search published events, event details",
      "Ticket reservation with availability + duplicate-booking protection",
      "Simulated checkout + printable ticket voucher",
      "Organizer: create/edit/publish/cancel events, sales + reservation metrics",
      "Admin: category management + event-review foundations",
      "Security headers, rate limiting, Serilog + health checks",
    ],
    architecture: [
      "Tazkara.API → controllers, middleware, JWT config",
      "Tazkara.Application → use cases, DTOs, validators, mappings",
      "Tazkara.Domain → entities + enums",
      "Tazkara.Infrastructure → EF Core, repositories, Identity, payment abstraction",
      "Tazkara.Web → Angular 22, Router, reactive forms",
      "Tests: xUnit + Moq + FluentAssertions, API auth integration tests",
    ],
    results: [
      "Core customer / organizer / admin workflows working end-to-end",
      "Live frontend deployed on Vercel",
      "Payment abstraction ready for Stripe/Paymob integration",
      "Documented roadmap: QR validation, emails, admin approvals",
    ],
  },
  {
    slug: "orderflow",
    name: "OrderFlow",
    tagline: "Order management backend that can't oversell",
    description:
      "Production-grade order API: customers, catalog, atomic inventory reservations, tiered pricing, coupons, order workflow, outbox + Hangfire emails, accounting sync with retries. 180+ automated tests, Docker + CI.",
    stack: ["ASP.NET Core 10", "C#", "MediatR CQRS", "EF Core", "Hangfire", "Serilog", "Docker", "GitHub Actions", "Angular 20"],
    highlights: [
      "Optimistic-concurrency inventory — parallel orders get 409, never negative stock",
      "Refresh-token rotation + theft detection + revocation",
      "Transactional outbox for emails & accounting sync",
    ],
    github: "https://github.com/ixtalaat/OrderFlow",
    badge: "Backend • 180+ Tests • Docker",
    seoTitle: "OrderFlow — Order Management API (ASP.NET Core CQRS) | Talaat Ramadan",
    seoDescription:
      "Case study: production-grade order backend with atomic inventory, tiered pricing, JWT rotation, outbox + Hangfire, 180+ tests, Docker + CI. ASP.NET Core 10 + MediatR.",
    role: "Backend Developer (architecture → implementation → CI/CD)",
    timeline: "Personal project, CI green on master",
    clientType: "E-commerce / retail / wholesale — anyone taking orders + stock",
    problem:
      "Small shops lose money to overselling, wrong prices, and lost order emails. They need inventory that stays correct under concurrency, customer-specific pricing, and reliable notifications + accounting sync.",
    solution:
      "Built OrderFlow with Clean Architecture + CQRS (MediatR + FluentValidation). Atomic stock reservation with optimistic concurrency, idempotent order creation, customer pricing rules with validity windows + snapshots, transactional outbox processed by Hangfire for emails and idempotent accounting sync with retries.",
    features: [
      "JWT auth: Admin / SalesEmployee / Customer, email confirmation, rotation + theft detection",
      "Customers: activation state, pricing tiers, audit trail, GDPR erasure",
      "Catalog: search, pagination, per-product inventory, low-stock alerts",
      "Orders: Submitted → Confirmed → Processing → Completed, coupons, cancellation",
      "Transactional outbox + Hangfire: emails + accounting sync with retries",
      "Correlation IDs, structured logs, readiness/liveness probes, Scalar docs",
    ],
    architecture: [
      "OrderFlow.Api / Application / Domain / Infrastructure / FakeAccountingApi",
      "CQRS: commands + queries via MediatR, FluentValidation pipeline",
      "EF Core (SQL Server prod / SQLite tests), Identity + JWT",
      "Outbox table → Hangfire jobs → MailKit + accounting client",
      "Docker Compose + GitHub Actions: build → test → containerize → smoke-deploy",
    ],
    results: [
      "180+ automated tests (unit + integration) green",
      "Parallel orders for last units cannot oversell — loser gets 409",
      "Postman collection + Scalar reference for every endpoint",
      "8 ADRs + full docs: auth matrix, ERD, test strategy, deployment",
    ],
  },
];

export const services = [
  {
    title: "Business Web Apps",
    desc: "Booking systems, marketplaces, dashboards, admin panels. From idea to deployed production app.",
    points: ["ASP.NET Core / Laravel / NestJS backend", "Angular / Next.js frontend", "Auth, roles, payments-ready"],
    price: "From $800",
  },
  {
    title: "Backend APIs",
    desc: "Clean, tested, documented APIs your frontend or mobile app can rely on.",
    points: ["REST + JWT + roles (Node/Nest, .NET, Laravel)", "SQL Server / MySQL design", "Docker + CI + Scalar docs"],
    price: "From $500",
  },
  {
    title: "Fix, Speed Up & Launch",
    desc: "Already have code? I fix bugs, add features, write tests, and get you deployed.",
    points: ["Bug fixes & features", "Tests (xUnit / Pest)", "Deploy to Vercel / VPS / RunASP"],
    price: "From $150",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
