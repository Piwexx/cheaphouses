create table faqs (
  id          serial primary key,
  question    text not null,
  answer      text not null,
  link_text   text,
  link_href   text,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz default now()
);

alter table faqs enable row level security;
create policy "faqs public read" on faqs for select using (true);

insert into faqs (question, answer, link_text, link_href, sort_order) values
  ('What is Cheap Houses?', 'A curated selection of underpriced properties from across the USA. We review 200+ listings every week and publish only the ones worth a second look — with direct seller contact info and renovation estimates where available.', null, null, 1),
  ('What states do you cover?', 'All 50 states. We focus on rural and small-town properties across every region — Appalachia, the Deep South, the Great Plains, the Midwest, New England, and the Mountain West. More listings are added every Friday.', null, null, 2),
  ('What''s the price ceiling?', '$199K is the hard ceiling. Most listings are well below that — often under $50K. The point is finding properties that are genuinely underpriced relative to their condition, location, or potential.', null, null, 3),
  ('Why are these properties so cheap?', 'Different reasons every time — and we always explain which one. Common reasons: location (rural, remote), condition (needs work, rewiring), legal complexity (probate, agricultural classification), or a motivated seller who wants to close fast. The catch is always in the note.', null, null, 4),
  ('Is it free?', 'Browsing is free — you can see listings and prices. Full access, including direct seller contacts, renovation estimates, and the complete archive, requires a Membership. $10/month billed annually, or $12/month month-to-month.', null, null, 5),
  ('What does membership include exactly?', 'Full access to every listing in the archive, direct seller and municipal contact info, renovation estimates where available, and search by state, budget, and condition. No ads, no agents, no commission. Cancel anytime.', null, null, 6),
  ('How do I cancel?', 'One click in your account settings. No retention flow, no confirmation screen, no guilt-trip. Cancel anytime and you keep access until the end of your billing period.', 'Go to account', '#', 7),
  ('Can foreigners buy property in the USA?', 'Yes. The US has no restriction on foreign property ownership. The process is straightforward: you can close in 30–60 days, financing is available for foreign buyers (though at higher rates and stricter requirements), and title insurance protects the purchase. An LLC structure is common for tax and liability reasons.', null, null, 8),
  ('How much does it really cost to buy?', 'The asking price is only part of it. US closings add 2–5% in transaction costs: title insurance, recording fees, transfer taxes (varies by state). For rural and distressed properties, budget separately for a general inspection ($300–600), well/septic inspection if applicable ($200–400), and title search. On a $30K property, total acquisition overhead is typically $2–5K.', null, null, 9);
