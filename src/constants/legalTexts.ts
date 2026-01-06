// Centralized legal texts for Gambeta. Keep this as the single source of truth.

export const effectiveDate = 'Effective: January 1, 2026';

export const privacyPolicy = `
Gambeta Privacy Policy
${effectiveDate}

1. Overview
Gambeta ("we", "our", "us") is a soccer community platform that helps players find fields and games, join groups, chat, participate in tournaments, vote on MVPs, and track ratings. This Privacy Policy explains what we collect, how we use it, how it’s shared, and your choices.

By using Gambeta, you agree to the collection and use of information in accordance with this policy.

2. Information We Collect
A. Information You Provide
- Account details: email, password (hashed by our auth provider), display name, username, photo (optional), and profile details you add.
- Social sign-in: When you use Google or Apple Sign In, we receive basic profile info and an identity token from those providers.
- User-generated content: messages, reactions, images, group names, team info, and other content you submit in chats and groups.
- Tournament data: team membership, payment status flags, readiness states, and related tournament settings.
- Feedback and support: content of messages you send to support.

B. Information Collected Automatically
- Device and app info: device type, OS version, app version, language, time zone.
- Diagnostic data: basic error and crash logs (if available) to improve stability and security.
- Usage data: feature usage, screens viewed, time spent, generic interaction events.

C. Location and Sensors
- Location (foreground/background, if permitted): to show nearby fields/events, help with community features, provide map experiences, and optional heatmap-style activity views.
- Motion and heading: to power compass/map orientation features (if permitted).
You can disable permissions at the system level. Some features may not work without them.

D. Notifications
- Push token: we store your device token to send app notifications (e.g., messages, team updates, tournament reminders). You can disable notifications in system settings.

E. Payment Information
- Payment processing: When enabled, payments are handled by Stripe and/or Apple Pay. We do not store full card numbers. We may receive limited payment metadata (e.g., payment status, amounts, last four digits within processor token response, and transaction identifiers) required to confirm payments.

3. How We Use Information
We use information to:
- Authenticate users and maintain accounts.
- Provide core features: chat, groups, friend connections, events, tournaments, player ratings, matchmaking, notifications, and profile experiences.
- Operate and improve the app (e.g., performance, reliability, usability, and safety).
- Enforce our Terms, prevent fraud and abuse, and protect the community.
- Communicate with you about updates, security alerts, and support.
- Comply with legal obligations.

Legal bases (where applicable): performance of a contract, legitimate interests (e.g., platform operation and safety), consent (e.g., optional permissions), and compliance with legal obligations.

4. How We Share Information
A. With Other Users
- Public profile: Your display name, username, and photo may be visible to others. Group members see messages and shared content within that group. Team participants may see team rosters and basic progress states.
- Ratings and achievements: Certain community-facing stats (e.g., rating tiers or performance indicators) may be visible in the app where relevant.

B. Service Providers and Partners
- Firebase (Auth, Firestore, Cloud Messaging), Google Sign-In, Apple Sign In, Google Maps/Places, Stripe, Apple Pay: to enable authentication, hosting, push notifications, maps, and payments.
- These providers process data on our behalf and under their own terms.

C. Legal, Safety, and Compliance
- We may disclose information to comply with applicable laws, regulations, legal processes, or enforceable government requests, and to protect rights, property, safety, and the integrity of our services.

We do not sell your personal information.

5. Data Retention
We retain information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce agreements. We may retain certain logs and security records for a reasonable period.

6. Your Choices and Rights
- Access, update, delete: You can request access, correction, or deletion of your data. Some data is required to maintain an account.
- Permissions: You can adjust location and notifications in system settings.
- Marketing: We currently do not use invasive advertising or cross-app tracking.
- Region-specific rights: Depending on your jurisdiction (e.g., EEA/UK, California), you may have additional rights such as data portability and the right to object or limit certain processing. Contact us to exercise these rights.

7. Children’s Privacy
Gambeta is not intended for individuals under 13. If we learn we collected personal information from a child under 13, we will take steps to delete it.

8. Security
We use reasonable administrative, technical, and organizational measures to protect your information (e.g., encryption in transit, role-based access). No method of transmission or storage is 100% secure.

9. International Transfers
Your data may be processed in countries with different data protection laws than your own. We take steps to ensure appropriate safeguards when transferring data internationally.

10. Changes to This Policy
We may update this Privacy Policy. If we make material changes, we will provide notice in the app or by other reasonable means. Your continued use after the effective date constitutes acceptance.

11. Contact
If you have questions or requests regarding privacy, contact: support@gambeta.app
`;

// Additional analytics & hosting details inserted for the public privacy page
export const privacyPolicyAnalytics = `
Analytics & Hosting (added)

1. Analytics and Tracking
- We use analytics tools to understand how people use Gambeta so we can improve the product. These tools may collect anonymous usage data such as pages visited, clicks, time spent, device and browser information, and IP address (for coarse geolocation). We currently use or may use the following providers:
  - Google Analytics (GA4): a free analytics service by Google that uses cookies and identifiers to measure website activity. If enabled, we load the gtag.js script and may send page_view events from our single-page app on route changes. GA4 stores limited pseudonymous identifiers and aggregates usage data in the Google Analytics property we control.
  - Privacy-focused analytics (e.g., Umami or Plausible): these services collect simple pageview metrics and basic referrer data. Some are self-hosted and do not use cookies; others are hosted services with minimal data retention.

2. Why we use analytics
- To measure site health and performance, fix bugs, learn which pages and features are most used, and improve the product experience.

3. What we collect for analytics
- Typical analytics data includes: page path, referrer, event names, timestamps, device/browser type, and coarse location derived from IP. We do not use analytics to build user profiles or to sell data.

4. Cookies and client storage
- Some analytics providers set cookies or use local storage to persist anonymous identifiers. If you block cookies at the browser level, some analytics may be limited or disabled.

5. Opt-out and controls
- If you do not want to be tracked by Google Analytics, you can install the Google Analytics Opt-out Browser Add-on. For other analytics providers, consult their documentation for opt-out options.
- You can also disable tracking by turning off cookies in your browser or by using privacy extensions that block analytics scripts.

6. Hosting and third-party services
- Hosting: This website may be hosted on GitHub Pages or Firebase Hosting. Hosting providers store the site assets (HTML, CSS, JS, images) and serve them over HTTPS. Static hosting does not by itself collect form submissions or analytics; those are performed by separate services if enabled.
- Third-party services: We use third-party services to provide functionality (e.g., Google Sign-In, Firebase Auth/Firestore, Stripe for payments, Google Maps). Each third-party has its own data practices; we recommend reviewing their privacy policies.

7. Google Forms and Google Sheets
- If you use forms embedded from Google (Forms or Apps Script endpoints) those submissions go to Google. We do not control Google’s data handling for those services. If you submit data via an embedded form on our site, that data will be processed according to Google’s policies.

8. Data retention for analytics
- Analytics data may be retained by the analytics provider according to their retention policies. We generally keep aggregated metrics for product analysis; raw logs or identifiers are retained only as needed and subject to provider retention settings.

9. Contact and changes
- If you want analytics data deleted or have questions about analytics or hosting, contact support@gambeta.app. We will respond to reasonable requests to delete or restrict data where feasible and required by law.
`;

// To include these analytics/hosting details on the published privacy page,
// the `Privacy` route renders the `privacyPolicy` string. We'll append the
// analytics details at runtime so the page shows both sections.

export const termsOfService = `
Gambeta Terms of Service
${effectiveDate}

1. Agreement to Terms
These Terms of Service ("Terms") govern your use of Gambeta ("we", "our", "us") and our mobile applications, services, and features (collectively, the "Service"). By creating an account or using the Service, you agree to these Terms.

2. Eligibility
You must be at least 13 years old to use the Service. If you are under the age of majority in your jurisdiction, you must have parental or guardian consent. You represent that you have the authority to accept these Terms.

3. Account and Security
You are responsible for:
- Providing accurate registration information and keeping it up to date.
- Maintaining the confidentiality of your credentials.
- All activities under your account.
Notify us immediately of any unauthorized use of your account.

You may sign in using email/password or supported social identity providers (e.g., Google, Apple). Use of social sign-in is subject to their terms.

4. License and Use
We grant you a limited, revocable, non-exclusive, non-transferable license to use the Service for personal, non-commercial purposes in accordance with these Terms. You agree not to:
- Copy, modify, distribute, sell, or lease any part of the Service.
- Reverse engineer or attempt to extract source code except where permitted by law.
- Circumvent or interfere with security-related features.

5. User Content and Conduct
A. Content
"User Content" includes messages, media, usernames, team names, group names, ratings, and any other content you submit. You retain ownership of your User Content. You grant us a worldwide, non-exclusive, royalty-free license to host, store, reproduce, modify, display, perform, and distribute your User Content as necessary to operate and improve the Service.

B. Community Guidelines
You agree not to post or share content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, hateful, discriminatory, violent, or infringes intellectual property or privacy rights. No spam, scams, or attempts to impersonate others. We may remove content, restrict access, or suspend accounts for violations.

C. Visibility
Content shared in groups or teams may be visible to members of those spaces. Certain profile elements (e.g., display name, username, photo) may be visible to other users.

6. Tournaments, Ratings, and Matchmaking
- Tournament features may include team creation, membership, readiness states, and related data.
- Ratings and matchmaking are informational only and provided "as is". They are based on user input and algorithms and may not reflect actual skill or performance.
- We may change features, visibility, and algorithms at any time to improve fairness and integrity.

7. Payments
When enabled:
- Payments may be processed by Stripe and/or Apple Pay. You agree to their terms and applicable fees.
- Unless stated otherwise or required by law, payments are final and non-refundable.
- You are responsible for taxes and charges imposed by your payment provider.
- Payment disputes should first be directed to support@gambeta.app. We may provide transaction information that our processor shares with us.

8. Safety and Prohibited Activities
You agree not to:
- Use the Service for any unlawful purpose or in violation of any applicable law.
- Upload malware, exploit vulnerabilities, or interfere with the Service’s operation.
- Scrape, index, or harvest data outside the functionality we provide.
- Engage in behavior that threatens others’ safety (online or offline).
Report abuse to support@gambeta.app.

9. Termination
We may suspend or terminate access to the Service at any time for any reason, including violations of these Terms, suspected fraud or abuse, or harm to the community. You may stop using the Service at any time. Certain provisions will survive termination (e.g., ownership, disclaimers, limitations of liability).

10. Intellectual Property
The Service, including software, designs, trademarks, and content (excluding User Content), is owned by or licensed to us and is protected by intellectual property laws. You may not use our branding without prior written permission.

11. Third-Party Services
The Service may rely on or link to third-party services (e.g., Firebase, Google Maps, Google Sign-In, Apple Sign In, Stripe, Apple Pay). Your use of those services may be subject to their terms and policies. We are not responsible for third-party services.

12. Disclaimers
THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.

13. Limitation of Liability
TO THE MAXIMUM EXTENT PERMITTED BY LAW, GAMBETA AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE. OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US, IF ANY, IN THE 12 MONTHS PRECEDING THE CLAIM; OR (B) USD $50.

Some jurisdictions do not allow certain limitations; in those cases, some limitations may not apply to you.

14. Indemnification
You agree to defend, indemnify, and hold harmless Gambeta and its affiliates, officers, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorneys’ fees) arising out of or in any way connected with your use of the Service, your User Content, or your violation of these Terms.

15. Changes to the Service and Terms
We may modify or discontinue the Service (in whole or in part) at any time. We may update these Terms, and if we make material changes, we will provide reasonable notice (e.g., in-app message). Your continued use after changes become effective constitutes acceptance.

16. Governing Law and Dispute Resolution
These Terms apply to the extent permitted by applicable law. If any portion is held invalid or unenforceable, the remaining portions remain in full force and effect. Any disputes arising under these Terms will be resolved in a court of competent jurisdiction, unless local law provides otherwise.

17. Contact
Questions about these Terms: support@gambeta.app
`;

export const LegalTexts = {
  effectiveDate,
  privacyPolicy,
  termsOfService,
};

export const tournamentParticipationAgreement = `
GAMBETA TOURNAMENT PARTICIPATION AGREEMENT,
ASSUMPTION OF RISK, WAIVER, AND RELEASE OF LIABILITY

Effective Date: [EFFECTIVE_DATE]

1. Parties
This Agreement (“Agreement”) is entered into by and between:
- Organizer: Gambeta (“Organizer”, “we”, “us”, “our”)
- Participant: The undersigned player/parent or legal guardian (“Participant”, “you”, “your”)

2. Event Details
- Tournament Name: [TOURNAMENT_NAME]
- Date(s): [EVENT_DATES]
- Venue/Location: [VENUE_NAME_AND_ADDRESS]
- Format: [FORMAT_E.G._5V5_7V7_11V11_GROUP_STAGE_ELIMINATION]
- Playing Surface: [SURFACE_E.G._TURF_GRASS_INDOOR]
- Match Rules Summary: [HALF_LENGTHS_OVERTIME_PENALTIES_SLIDE_TACKLE_RULE_ETC.]
- Organizer Contact: support@gambeta.app

3. Eligibility and Conduct
3.1 Eligibility. You represent you are at least 18 years old, or a parent/legal guardian is signing for a minor Participant. You are physically fit and able to participate.
3.2 Code of Conduct. You agree to follow tournament rules, referee instructions, venue policies, and applicable laws. Unsportsmanlike conduct, harassment, abuse, violence, use of banned substances, or alcohol/drug impairment is prohibited and may result in removal without refund.
3.3 Equipment and Safety. You are responsible for wearing appropriate gear (e.g., shin guards, proper footwear) and ensuring equipment is safe and compliant with rules.

4. Assumption of Risk
Soccer and related athletic activities involve inherent risks, including but not limited to slips, falls, collisions, sprains, strains, fractures, concussions, heat/cold exposure, and, in rare cases, serious injury or death. Risks may arise from your own actions, the actions/omissions of others, field conditions, weather, equipment, and facility conditions. You understand and voluntarily accept all risks, known and unknown, associated with participation, warmups, spectating, and related activities.

5. Waiver and Release of Liability
To the fullest extent permitted by law, you release and discharge the Organizer, its affiliates, owners, officers, directors, employees, volunteers, agents, sponsors, venue owners/managers, and vendors (“Released Parties”) from any and all claims, demands, causes of action, damages, losses, costs, or liabilities of any kind (including attorneys’ fees) arising out of or related to injury, illness, property damage, or death connected to your participation, except to the extent caused by the Released Parties’ willful misconduct or gross negligence where such exclusion is not permitted by law.

6. Indemnification
You agree to defend, indemnify, and hold harmless the Released Parties from any third-party claims, damages, losses, and expenses (including reasonable attorneys’ fees) arising from your (or the minor Participant’s) acts, omissions, or violation of this Agreement or tournament rules.

7. Medical Authorization and Emergency Care
You authorize the Organizer and medical personnel to secure and/or provide first aid and emergency medical treatment deemed necessary for you (or the minor Participant). You are responsible for all related costs. You certify you have no medical condition that would make participation unsafe and acknowledge it is your responsibility to consult a physician before participating.

8. Insurance
Organizer does not provide personal health or accident insurance for Participants. You are encouraged to maintain adequate medical and personal liability insurance.

9. Weather, Facility, and Force Majeure
Events may be delayed, modified, or canceled due to weather, facility issues, safety concerns, or circumstances beyond the Organizer’s reasonable control (including acts of God, public health directives, strikes, or governmental actions). Reasonable efforts will be made to communicate changes and, where possible, provide rescheduling options as set out in Section 12.

10. Photo, Audio, and Video Consent
You grant Organizer a worldwide, royalty-free license to capture, use, reproduce, and display photographs, video, and audio of the event that may include your likeness for legitimate promotional and operational purposes in any media, without additional compensation. If you object, notify support@gambeta.app prior to the event; Organizer will use reasonable efforts to accommodate, subject to operational feasibility.

11. Data and Communications
Organizer may process personal data (e.g., name, email, team info, participation status, and payment metadata) to operate the tournament, communicate updates, and ensure safety and compliance. See our Privacy Policy at https://gambetaapp.com/privacy.

12. Payments, Fees, Refunds, and Cancellations
12.1 Entry Fees. Entry fees and any applicable taxes or processing charges will be displayed at checkout. You are responsible for ensuring accurate payment details.
12.2 Confirmation Window. A team is “Confirmed” when minimum roster and any tournament compliance requirements are met and validated by Organizer. Unless otherwise stated, the team registration confirmation window is five (5) days from initial registration (“Confirmation Window”).
12.3 Refunds and Cancellations.
  a) If a team is not Confirmed within the Confirmation Window, the pending payment authorization will be released/canceled (see Section 13 for Stripe timing details).
  b) If Organizer cancels the tournament in full prior to commencement, entry fees for impacted teams will be refunded or the authorization will be released.
  c) If an event is postponed, Organizer may offer rescheduling or refund/authorization release; details will be communicated at the time of the change.
  d) Once a team is Confirmed and the authorization is captured, fees are generally non-refundable except where required by law or if Organizer cancels the event without reschedule.
  e) Individual withdrawals after team Confirmation are handled by the team representative; Organizer does not split or prorate team fees unless explicitly stated.

13. Stripe Payment Authorization and Holds
13.1 Processor. Payments are processed by Stripe, Inc. (“Stripe”). Organizer does not store full card numbers. Stripe may retain tokens and limited metadata necessary to process transactions.
13.2 Authorization. At registration, your payment method may be authorized for the entry fee amount (and applicable taxes/fees). This is a pending charge/hold, not a final capture.
13.3 Capture on Confirmation. Upon team Confirmation, Organizer may capture the authorized amount. If the team is not Confirmed by the end of the Confirmation Window, Organizer will instruct Stripe to cancel/release the authorization.
13.4 Release Timing. Bank release times vary. Your bank may take several business days to reflect the release. Organizer is not responsible for banking delays.
13.5 Declines and Chargebacks. If a payment is declined or later disputed/charged back, Organizer may remove the team/Participant and pursue remedies consistent with tournament rules and applicable law.

14. Rules of Play and Discipline
You acknowledge receipt of and agree to follow the official tournament rules, including but not limited to: match duration, tiebreakers, roster limits, identification checks, substitution rules, equipment requirements, and discipline protocols (yellow/red cards, suspensions). Referee and Organizer decisions are final.

15. No Warranties; Limitation of Liability
The event and facilities are provided “AS IS” and “AS AVAILABLE.” To the maximum extent permitted by law, Released Parties disclaim all warranties (express or implied) and limit total liability for any claims to the amount actually paid for your entry fee or USD $50, whichever is greater. Some jurisdictions do not allow certain limitations; such limitations shall apply to the fullest extent permitted.

16. Governing Law and Dispute Resolution
This Agreement is governed by the laws of [GOVERNING_JURISDICTION]. Any disputes shall be brought in the courts located in [VENUE_FOR_DISPUTES], unless local law provides otherwise. If any provision is held invalid, the remaining provisions remain in full force and effect.

17. Minors
If the Participant is under 18, a parent or legal guardian must sign. The parent/guardian accepts and agrees to this Agreement on behalf of the minor, including the assumption of risk, waiver, release, and indemnification provisions.

18. Electronic Signatures and Consent
You consent to transact electronically and to use electronic signatures. By checking the acknowledgment boxes and signing below within the Gambeta app, you agree your electronic signature has the same force and effect as a handwritten signature.

19. Entire Agreement
This Agreement, together with tournament rules and posted policies, constitutes the entire understanding regarding participation and supersedes prior oral or written statements on the subject.

ACKNOWLEDGMENTS (REQUIRED)
[ ] I have read and agree to the Assumption of Risk, Waiver, and Release of Liability.
[ ] I have read and agree to the Code of Conduct and Rules of Play.
[ ] I consent to emergency medical treatment if needed.
[ ] I understand the Payments, Refunds, and Stripe Authorization terms, including the five-day Confirmation Window.
[ ] (Optional) I consent to Photo/Media use as described.

Participant Name: __________________________   Team Name: __________________________
Email: ____________________________________   Phone: _____________________________
Signature: _________________________________   Date: ______________________________

If Participant is a Minor:
Parent/Guardian Name: _______________________  Relationship: ________________________
Parent/Guardian Signature: ___________________  Date: ______________________________
Emergency Contact Name: _____________________  Phone:
`;
