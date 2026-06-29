# Advalora Consulting — Landing Page

## Original Problem Statement
> I am an Oracle Licensing Expert, I have vast knowledge on Oracle Licensing. I am an EX oracle LMS employee. I need a simple and effective landing page where in I can ask my potential customer to meet and understand their pain point or get business from this page. It should be addressed to CIO and the CTOs

## User Choices
- **Brand**: Advalora Consulting (Founder: Amrith Pujarie, Ex-Oracle LMS)
- **Services**: Any software licensing challenge, especially Oracle (audit defense, optimisation, ULA negotiation, compliance, cloud BYOL)
- **Design vibe**: Simple professional, functional
- **Lead capture**: form + WhatsApp + email + LinkedIn
- **Contact**: amrith.pujarie@advaloraconuslting.com · +91 9820771922 · linkedin.com/in/amrith-pujarie

## Architecture
- **Frontend**: React (CRA + craco), Tailwind, shadcn/ui (Accordion, Input, Textarea, Button, Label, Sonner), Phosphor icons. Single-page scrolling landing at `/`.
- **Backend**: FastAPI on :8001, all routes under `/api`, Motor MongoDB driver.
- **Database**: MongoDB collection `leads`.

## Implemented (Dec 2025)
- Sticky header with brand + nav + CTAs (WhatsApp / Book Discovery Call), mobile hamburger menu
- Hero with By-the-Numbers stat block
- Marquee ticker of licensing platforms covered
- Pain Points grid (4 cards) — audit notice, ULA, cloud sprawl, ownership
- Services grid (6 cards) with bullet points
- Approach (4-step engagement model)
- Dark "Math of inaction" section with key metrics + CTA
- Founder section with portrait, bio, LinkedIn + email links
- FAQ accordion (5 Qs)
- Lead capture form → POST /api/leads (MongoDB) with success state
- Footer with all contact channels
- Cabinet Grotesk (headings) + IBM Plex Sans (body) via Fontshare + Google Fonts
- All interactive elements carry `data-testid`

## Endpoints
- `GET /api/` — health
- `POST /api/leads` — create lead (name, role, company, email, phone, challenge)
- `GET /api/leads` — list leads (sorted desc by created_at)

## Test status
- Backend: 7/7 pytest pass
- Frontend: 13/13 Playwright flows pass

## Prioritised Backlog
- **P0**: Confirm/fix domain typo in contact email — current value is `advaloraconuslting.com` (likely `advaloraconsulting.com`). Currently coded verbatim per user input.
- **P1**: Email notification on new lead (Resend integration) — currently leads stored in DB only.
- **P1**: hCaptcha / rate-limit on `/api/leads` to prevent spam before public launch.
- **P2**: Admin-protected `/api/leads` listing (basic JWT or HTTP basic auth).
- **P2**: Calendly embed for direct slot booking.
- **P2**: Case studies / outcomes section once anonymised references are available.
- **P3**: Blog / insights area for inbound SEO ("Oracle audit checklist", "ULA exit playbook").

## Next Actions
1. Confirm email-domain spelling with Amrith.
2. Decide on Resend vs SMTP for lead-notification email.
3. Provide 2–3 anonymised audit/optimisation outcomes for a case-studies strip.
