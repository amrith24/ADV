import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Printer, DownloadSimple } from "@phosphor-icons/react";
import { BRAND } from "@/lib/constants";

export default function NDA() {
  const handlePrint = () => window.print();
  return (
    <div className="min-h-screen bg-white text-zinc-950" data-testid="nda-page">
      {/* Top Bar — hidden in print */}
      <div className="print:hidden sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link
            to="/"
            data-testid="nda-back"
            className="inline-flex items-center gap-2 text-[13px] text-zinc-700 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft size={15} weight="bold" />
            Back to Advalora
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              data-testid="nda-print"
              className="inline-flex items-center gap-1.5 px-3 h-9 text-[13px] text-zinc-700 hover:text-zinc-950 border border-zinc-200 hover:border-zinc-950 transition-colors rounded-sm"
            >
              <Printer size={15} weight="regular" />
              Print
            </button>
            <a
              href="/Advalora-Mutual-NDA.txt"
              download
              data-testid="nda-download"
              className="inline-flex items-center gap-1.5 px-4 h-9 text-[13px] font-medium text-white bg-zinc-950 hover:bg-zinc-800 transition-colors rounded-sm"
            >
              <DownloadSimple size={15} weight="regular" />
              Download .txt
            </a>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-6 lg:px-10 py-12 md:py-16">
        {/* Letterhead */}
        <header className="flex items-start justify-between pb-8 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <img src={BRAND.logo} alt="Advalora Consulting" className="h-12 w-12 object-contain" />
            <div>
              <div className="font-display font-bold text-base tracking-tight leading-none">
                ADVALORA
                <span className="block text-[10px] tracking-[0.2em] font-mono font-normal text-zinc-500 mt-1">
                  CONSULTING
                </span>
              </div>
            </div>
          </div>
          <div className="text-right text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-500">
            Document · NDA / v1.0
            <br />
            Confidential
          </div>
        </header>

        <h1 className="mt-10 font-display text-3xl md:text-4xl font-bold tracking-tight">
          Mutual Non-Disclosure Agreement
        </h1>
        <p className="mt-4 text-[14px] text-zinc-600 leading-relaxed">
          This Mutual Non-Disclosure Agreement (this <strong>&ldquo;Agreement&rdquo;</strong>) is
          entered into as of <Blank w="120px" /> (the <strong>&ldquo;Effective Date&rdquo;</strong>)
          by and between:
        </p>

        <Section title="Parties">
          <p>
            <strong>Advalora Consulting</strong>, a proprietorship firm with its principal place
            of business at C 228 Shreyas Industrial Estate, Near Jay Coach, Goregaon East,
            Mumbai 400063, Maharashtra, India (<strong>&ldquo;Advalora&rdquo;</strong>); and
          </p>
          <p className="mt-3">
            <strong>
              <Blank w="260px" />
            </strong>
            , a <Blank w="120px" /> incorporated under the laws of{" "}
            <Blank w="120px" /> with its principal place of business at{" "}
            <Blank w="320px" /> (the <strong>&ldquo;Client&rdquo;</strong>).
          </p>
          <p className="mt-3">
            Advalora and the Client are each referred to as a <strong>&ldquo;Party&rdquo;</strong>{" "}
            and together as the <strong>&ldquo;Parties&rdquo;</strong>.
          </p>
        </Section>

        <Section n="1." title="Purpose">
          <p>
            The Parties wish to explore and/or undertake a business relationship in connection
            with software licensing advisory, software asset management (SAM), IT asset
            management (ITAM) advisory, vendor audit defense, contract review, optimisation and
            related professional services (the <strong>&ldquo;Purpose&rdquo;</strong>). To
            facilitate the Purpose, each Party may disclose to the other certain Confidential
            Information.
          </p>
        </Section>

        <Section n="2." title="Confidential Information">
          <p>
            <strong>&ldquo;Confidential Information&rdquo;</strong> means any non-public
            information, in any form or medium (oral, written, electronic, visual or otherwise)
            disclosed by or on behalf of one Party (the <strong>&ldquo;Disclosing Party&rdquo;</strong>)
            to the other (the <strong>&ldquo;Receiving Party&rdquo;</strong>) in connection with
            the Purpose, including without limitation:
          </p>
          <ol className="list-[lower-alpha] pl-6 mt-3 space-y-2">
            <li>
              business plans, strategies, financial and commercial information, customer and
              vendor lists, contracts, ordering documents, master agreements, statements of
              work, licence terms, audit notices and findings, internal correspondence and
              negotiation positions;
            </li>
            <li>
              technical, operational and architectural information, including deployment
              configurations, infrastructure inventories, source code, scripts, telemetry,
              measurement-tool outputs, effective licence positions, methodologies, models,
              work-products and deliverables;
            </li>
            <li>
              personal data and employee or contractor information disclosed in the course of
              the engagement;
            </li>
            <li>
              any information that, given its nature or the circumstances of disclosure, a
              reasonable person would understand to be confidential; and
            </li>
            <li>
              the existence, status and contents of any discussions, proposals or transactions
              between the Parties.
            </li>
          </ol>
        </Section>

        <Section n="3." title="Exclusions">
          <p>
            Confidential Information does not include information that the Receiving Party can
            demonstrate by written records:
          </p>
          <ol className="list-[lower-alpha] pl-6 mt-3 space-y-2">
            <li>
              was lawfully known to it, without confidentiality obligation, prior to disclosure
              by the Disclosing Party;
            </li>
            <li>
              is or becomes publicly available through no act or omission of the Receiving
              Party or its Representatives in breach of this Agreement;
            </li>
            <li>
              is rightfully received from a third party without restriction and without breach
              of any duty of confidentiality;
            </li>
            <li>
              is independently developed by the Receiving Party without reference to or use of
              the Disclosing Party&apos;s Confidential Information; or
            </li>
            <li>
              is required to be disclosed by applicable law, court order or competent regulatory
              authority, provided that the Receiving Party (where lawful) gives the Disclosing
              Party prompt written notice and cooperates reasonably in any effort to obtain
              protective relief.
            </li>
          </ol>
        </Section>

        <Section n="4." title="Use and Protection">
          <p>
            <strong>4.1</strong> The Receiving Party shall use Confidential Information solely
            for the Purpose and for no other commercial, competitive or personal benefit.
          </p>
          <p className="mt-2">
            <strong>4.2</strong> The Receiving Party shall protect Confidential Information with
            at least the same degree of care it uses to protect its own confidential information
            of a similar nature, and in no event with less than reasonable care, including the
            implementation of administrative, technical and physical safeguards appropriate to
            the sensitivity of the information.
          </p>
          <p className="mt-2">
            <strong>4.3</strong> The Receiving Party shall limit access to Confidential
            Information to its directors, officers, employees, contractors, professional
            advisors and affiliates (<strong>&ldquo;Representatives&rdquo;</strong>) who: (a)
            have a need to know for the Purpose; (b) have been informed of the confidential
            nature of the information; and (c) are bound by written confidentiality obligations
            no less protective than those of this Agreement. The Receiving Party shall remain
            responsible for any act or omission of its Representatives.
          </p>
        </Section>

        <Section n="5." title="Restrictions on Vendor Communication">
          <p>
            Without the Disclosing Party&apos;s prior written consent, the Receiving Party shall
            not contact, notify, share or otherwise disclose any Confidential Information to any
            software vendor, licensor, licensing audit body, original equipment manufacturer, or
            any of their employees, agents, affiliates or partners. This clause is intended to
            preserve the strategic and commercial position of the Disclosing Party and shall be
            strictly observed.
          </p>
        </Section>

        <Section n="6." title="No Licence; No Warranty">
          <p>
            <strong>6.1</strong> No licence, assignment, ownership interest or other right
            (express or implied) in or to any Confidential Information, intellectual property,
            trade mark, trade secret or deliverable is granted by this Agreement. All rights
            remain with the Disclosing Party.
          </p>
          <p className="mt-2">
            <strong>6.2</strong> All Confidential Information is provided <em>&ldquo;as is&rdquo;</em>.
            Neither Party makes any representation or warranty, express or implied, as to its
            accuracy, completeness, non-infringement or fitness for any particular purpose.
          </p>
        </Section>

        <Section n="7." title="Term and Survival">
          <p>
            <strong>7.1</strong> This Agreement shall commence on the Effective Date and remain
            in force for a period of two (2) years (the <strong>&ldquo;Term&rdquo;</strong>),
            unless extended or terminated earlier by mutual written agreement.
          </p>
          <p className="mt-2">
            <strong>7.2</strong> The obligations of confidentiality and non-use set out in this
            Agreement shall survive expiry or termination for a period of five (5) years from
            the date of disclosure of the relevant Confidential Information. Trade secrets shall
            be protected for so long as they retain such status under applicable law.
          </p>
        </Section>

        <Section n="8." title="Return or Destruction">
          <p>
            Upon written request of the Disclosing Party, or upon expiry or termination of this
            Agreement, the Receiving Party shall, at the Disclosing Party&apos;s election,
            promptly return or securely destroy all Confidential Information in its possession
            or control (including copies, summaries, extracts and derivatives), and certify such
            return or destruction in writing within fifteen (15) business days. The Receiving
            Party may retain one archival copy solely to evidence its compliance with this
            Agreement or to satisfy legal, regulatory or audit retention requirements, subject
            to continuing confidentiality obligations.
          </p>
        </Section>

        <Section n="9." title="Remedies">
          <p>
            The Parties acknowledge that any breach of this Agreement may cause irreparable harm
            for which monetary damages would be inadequate. The non-breaching Party shall
            therefore be entitled to seek equitable relief, including injunctive relief and
            specific performance, in addition to any other remedies available at law or in
            equity, without the requirement to post a bond or other security.
          </p>
        </Section>

        <Section n="10." title="Non-Solicitation">
          <p>
            During the Term and for a period of twelve (12) months thereafter, neither Party
            shall directly or indirectly solicit for employment any employee or contractor of
            the other Party with whom it has had material contact in connection with the
            Purpose. General advertising not specifically targeted at such persons, and the
            consideration of unsolicited applications, shall not constitute a breach of this
            clause.
          </p>
        </Section>

        <Section n="11." title="No Partnership; No Obligation to Proceed">
          <p>
            Nothing in this Agreement shall create any partnership, joint venture, agency,
            fiduciary or employment relationship between the Parties, nor shall it obligate
            either Party to enter into any further agreement, engagement or transaction. Each
            Party shall remain free to pursue similar discussions with third parties, provided
            no Confidential Information is used or disclosed in breach of this Agreement.
          </p>
        </Section>

        <Section n="12." title="Governing Law and Jurisdiction">
          <p>
            This Agreement shall be governed by and construed in accordance with the laws of the
            Republic of India, without regard to its conflict-of-law principles. The courts at
            Mumbai shall have exclusive jurisdiction in respect of any dispute arising out of or
            in connection with this Agreement, subject to either Party&apos;s right to seek
            interim or injunctive relief in any court of competent jurisdiction.
          </p>
        </Section>

        <Section n="13." title="Notices">
          <p>
            All notices under this Agreement shall be in writing and delivered by hand, courier,
            registered post or email with confirmation of receipt, to the addresses set out
            below the signature blocks (or such other address as a Party may notify in writing).
          </p>
        </Section>

        <Section n="14." title="General Provisions">
          <p>
            <strong>14.1 Entire Agreement.</strong> This Agreement constitutes the entire
            understanding between the Parties concerning its subject matter and supersedes all
            prior or contemporaneous communications.
          </p>
          <p className="mt-2">
            <strong>14.2 Amendment.</strong> Any amendment to this Agreement must be in writing
            and signed by authorised representatives of both Parties.
          </p>
          <p className="mt-2">
            <strong>14.3 No Waiver.</strong> No failure or delay by either Party in exercising
            any right shall operate as a waiver, nor shall any single or partial exercise
            preclude any other or further exercise thereof.
          </p>
          <p className="mt-2">
            <strong>14.4 Severability.</strong> If any provision of this Agreement is held to be
            invalid or unenforceable, the remaining provisions shall continue in full force, and
            the invalid provision shall be modified to the minimum extent necessary to render it
            enforceable while preserving its commercial intent.
          </p>
          <p className="mt-2">
            <strong>14.5 Assignment.</strong> Neither Party may assign this Agreement, in whole
            or in part, without the prior written consent of the other Party, save that either
            Party may assign to an affiliate, or in connection with a merger, acquisition or
            sale of substantially all of its assets, on notice to the other.
          </p>
          <p className="mt-2">
            <strong>14.6 Counterparts; Electronic Signatures.</strong> This Agreement may be
            executed in counterparts (including by electronic signature or scanned PDF), each of
            which shall be deemed an original, and which together shall constitute one and the
            same instrument.
          </p>
          <p className="mt-2">
            <strong>14.7 Headings.</strong> Section headings are for convenience only and shall
            not affect the interpretation of this Agreement.
          </p>
        </Section>

        {/* Signatures */}
        <div className="mt-14 pt-8 border-t border-zinc-200 grid md:grid-cols-2 gap-10">
          <SignatureBlock
            party="Advalora Consulting"
            name="Amrith Pujarie"
            title="Founder & Principal Advisor"
            address="C 228 Shreyas Industrial Estate, Near Jay Coach, Goregaon East, Mumbai 400063, India"
            email={BRAND.email}
          />
          <SignatureBlock party="Client" />
        </div>

        {/* Footer Note */}
        <div className="mt-14 pt-6 border-t border-zinc-200 text-[11px] leading-relaxed text-zinc-500">
          <strong className="font-mono uppercase tracking-[0.18em] text-zinc-600">
            Disclaimer.
          </strong>{" "}
          This template is provided for convenience and does not constitute legal advice. Each
          Party is encouraged to obtain independent legal counsel and to tailor this Agreement
          to its specific circumstances, jurisdiction and risk profile before signing. Advalora
          Consulting accepts no liability for any use of this template without legal review.
        </div>
      </article>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          article { padding: 0 !important; max-width: 100% !important; }
          h1, h2, h3 { page-break-after: avoid; }
          section, .signature-block { page-break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}

function Section({ n, title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-lg md:text-xl font-bold tracking-tight text-zinc-950 mb-3">
        {n && <span className="text-zinc-400 mr-2 font-mono font-normal">{n}</span>}
        {title}
      </h2>
      <div className="text-[14px] leading-relaxed text-zinc-700 space-y-2">{children}</div>
    </section>
  );
}

function Blank({ w = "160px" }) {
  return (
    <span
      className="inline-block border-b border-zinc-400 align-bottom mx-1"
      style={{ width: w, minWidth: w, height: "1em" }}
    />
  );
}

function SignatureBlock({ party, name, title, address, email }) {
  return (
    <div className="signature-block">
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-3">
        Signed for and on behalf of
      </div>
      <div className="font-display text-base font-bold tracking-tight">{party}</div>

      <div className="mt-6 space-y-5 text-[13px]">
        <Line label="Name">{name}</Line>
        <Line label="Title">{title}</Line>
        <Line label="Date" />
        <Line label="Signature" tall />
      </div>

      {(address || email) && (
        <div className="mt-6 pt-4 border-t border-zinc-200 text-[12px] text-zinc-600 space-y-1">
          {address && <div>{address}</div>}
          {email && <div>{email}</div>}
        </div>
      )}
    </div>
  );
}

function Line({ label, children, tall = false }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-500 mb-1">
        {label}
      </div>
      <div
        className={`border-b border-zinc-400 ${tall ? "h-12" : "h-6"} flex items-end pb-1 text-zinc-900`}
      >
        {children}
      </div>
    </div>
  );
}
