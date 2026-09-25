export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "prevent-overselling-order-systems",
    title: "How I prevent overselling in order systems (even under parallel requests)",
    excerpt:
      "Two customers order the last item at the same second. Without concurrency control you oversell. Here's the optimistic-concurrency pattern I use in OrderFlow — and why it matters for your store.",
    date: "2026-09-20",
    readTime: "5 min read",
    tags: ["ASP.NET Core", "E-commerce", "Inventory"],
    body: [
      "Overselling is silent revenue loss: a customer pays for an item you don't have, you cancel, refund, apologize — and lose them. It happens when two orders read the same stock value at the same time and both succeed.",
      "The fix I use is optimistic concurrency: every inventory row carries a version token. When an order reserves stock, the update succeeds only if the version hasn't changed since it was read. The loser gets a clear 409 Conflict instead of creating a phantom sale.",
      "In OrderFlow (ASP.NET Core + EF Core) this is enforced at the database level, not just in application code — so it holds even with multiple app instances. Reservations are atomic: stock decrement and order creation happen in one transaction.",
      "On top of that, order creation is idempotent: if a client retries a request because of a network hiccup, it can't create a duplicate order. And every pricing decision is snapshotted, so the invoice never changes after the fact.",
      "If you run a store, pharmacy, or restaurant supplier — ask your developer how they handle two simultaneous orders for the last unit. If the answer is vague, that's a risk. If you want it built correctly, message me.",
    ],
  },
  {
    slug: "what-booking-platform-really-needs",
    title: "What a booking platform really needs (beyond pretty pages)",
    excerpt:
      "Most booking sites fail on the unsexy parts: availability checks, double-booking protection, roles, and tickets people can actually use. Lessons from building Tazkara.",
    date: "2026-09-12",
    readTime: "4 min read",
    tags: ["Booking", "Angular", "ASP.NET Core"],
    body: [
      "Anyone can build an event listing page in a weekend. The hard part starts at reservation time: is the seat really free? Can the same user book twice? What happens when the organizer cancels?",
      "In Tazkara I check availability at reservation time in the database — not in the UI — so double bookings are impossible no matter how many people click at once. Payments sit behind an abstraction, so a simulated checkout today becomes Paymob or Stripe tomorrow without touching business logic.",
      "Roles matter more than founders expect. Customers, organizers, and admins need strictly separated powers: organizers manage only their events, admins review the catalog, customers see only their tickets. JWT + Identity enforces this on every request.",
      "Finally, the ticket itself: a printable voucher the customer can present. A booking without a usable ticket is just a database row.",
      "Planning an events, courses, or appointments platform? Start from these four pillars and you'll avoid the rewrites most founders pay for twice.",
    ],
  },
  {
    slug: "why-business-needs-admin-panel",
    title: "Why your business needs an admin panel (not just a website)",
    excerpt:
      "A website shows. An admin panel controls. If every price change or new program needs a developer, you're renting your own business. Here's what proper admin tooling looks like.",
    date: "2026-09-05",
    readTime: "4 min read",
    tags: ["Admin dashboards", "Laravel", "Business systems"],
    body: [
      "I see it constantly: a business pays for a website, then pays again every time they need to change a price, add a program, or block a user. That's not ownership — that's rent.",
      "An admin panel flips this. In Tamayoz (academy platform) the owner manages users, content, and roles without touching code. In HomeTech (service company) the manager reviews requests, assigns the right technician, and tracks invoices and payments from one dashboard.",
      "What makes an admin panel actually usable? Role-based access (staff see only what they need), audit logs (who changed what), and guardrails (the system refuses illegal actions instead of corrupting data). These are exactly the 12 business rules I enforce server-side in HomeTech.",
      "Rule of thumb: if updating your business data requires a developer more than twice a month, an admin panel pays for itself within a quarter.",
      "Need one for your academy, clinic, or service company? I build them with secure auth, Arabic RTL interfaces, and low-cost hosting.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
