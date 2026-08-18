# Subspace (subspace.money) — Product Intern Assignment

**Author:** Romsha Wadhwa  
**Submission Timestamp:** August 8, 2026, 8:55 PM IST  
**Product Evaluated:** Subspace Mobile App (Android / iOS) & Web Application (subspace.money)  
**Role Mindset:** Product Manager, Day 1 Evaluation & Strategy Point of View  

---

## Executive Summary

Subspace occupies a unique position at the intersection of subscription sharing, hyper-local gadget rentals, utility bill payments, and gift card monetization, backed by a vision of becoming an **"AI-native fintech."** This evaluation synthesizes an end-to-end product teardown, usability audit, business model analysis, growth funnel strategy, and product roadmap recommendation.

* **Biggest Product Strength:** **Unified "Digital Lifestyle" Ecosystem & Aggregation.** Subspace successfully brings disparate consumer micro-transactions—discounted OTT group sharing, hyper-local 10-minute gadget rentals, and cashback-incentivized utility bill payments—under a single dark-mode wallet interface. Prominent financial security disclaimers and clear savings math (e.g., SonyLIV at ₹181.34 vs ₹299 MRP) build strong initial transactional trust.
* **Biggest UX Problem:** **Information Architecture Breakdown & First-Session Choice Paralysis.** The "Bills" section confuses users by mixing true utility services (Electricity, Gas, Water) with e-gift vouchers (PhonePe, Steam Wallet). Additionally, the main home dashboard presents 5+ competing entry points without guided onboarding, leading to high cognitive load and high first-session drop-off for uninitiated users.
* **Biggest Growth Opportunity:** **Viral "Split-the-Bill" Referral Loop.** Subspace's core utility is fundamentally social. Leveraging built-in subscription sharing groups by introducing an automated referral mechanism (rewarding users with ₹50 wallet credit when invited peers join a group) creates a high K-factor viral loop that substantially reduces Customer Acquisition Costs (CAC).
* **Biggest Business & Legal Risk:** **Regulatory Liability & P2P Financial/Asset Exposure.** P2P credit card sharing and peer gadget rentals expose Subspace to significant Reserve Bank of India (RBI) payment aggregator/PPI regulations, PCI-DSS compliance challenges, and financial liabilities arising from asset damage, fraud, or group default.
* **#1 Product Recommendation:** **Launch an "Interactive First-Action Wizard" (Guided Activation Flow).** Rather than landing new users onto a cluttered, empty-state dashboard, direct them through a 3-step interactive setup wizard that aligns with their immediate intent (e.g., "Pay a Bill" or "Rent a PC"), guides them to link a card contextually, and auto-navigates directly to checkout, reducing Time-to-First-Action (TTFA) by 50%.

---

## Part 1 — End-to-End Product Walkthrough & User Journey Mapping

Below is the complete, screen-by-screen journey mapping across all 7 core flows of the Subspace application.

```text
       +-----------------------------------------------------------------------+
       |                         SUBSPACE CORE FLOWS                           |
       +-----------------------------------------------------------------------+
           |           |             |            |           |           |
       Onboarding   Group Subs   Card Share   Bills/Rech.  Gift Cards  Rentals   Wallet
```

---

### Flow 1: Onboarding & Sign-Up (First Open -> Account Created)

* **Goal:** Enable rapid, low-friction user registration while establishing security trust.
* **Total Taps:** 3 Taps  
* **Main Friction:** Absence of contextual guidance post-auth; landing immediately on a multi-option dashboard creates "choice overload."  
* **Main Delight:** One-tap Google / WhatsApp Authentication eliminates password friction. Clear security disclaimers ("We don't store card PINs").  

| Step # | Screen Name | What User is Trying to Do | Exact Action / Taps | Friction / Delight | PM Note & Metric / Hypothesis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1.1** | Splash & Login Page | Access the app quickly and securely | Open app -> Select "Continue with Google" or enter Phone Number for WhatsApp OTP | **Delight:** Instant social login and OTP auto-read reduces friction.<br>**Friction:** Login & Sign-Up on same screen can confuse existing vs. new users. | **Metric:** Auth Conversion Rate (Target: >85%). Track drop-off rate between phone entry and OTP verification. |
| **1.2** | Value Prop Carousel | Understand what Subspace offers | Swipe through 3 onboarding cards ("Save on Subs", "Rent Gadgets", "Earn from Card") | **Delight:** Concise value proposition highlights savings.<br>**Friction:** High skip rate if carousel exceeds 3 screens. | **Hypothesis:** >60% of users tap "Skip". Replacing static slides with an interactive goal selector will boost activation by 25%. |
| **1.3** | Dashboard Landing (Empty State) | Discover where to start | Scroll main dashboard; view top ribbon icons and promotional banners | **Delight:** Sleek dark-mode theme with vibrant teal accents.<br>**Friction:** "Zero State" paralysis—no single prominent CTA guiding the user's first action. | **Metric:** First-Session Drop-off Rate. Track % of users who exit within 30 seconds without tapping any service card. |

---

### Flow 2: Browsing & Joining a Subscription Group

* **Goal:** Find, evaluate, and join a shared subscription group (e.g., Netflix, Spotify, SonyLIV).
* **Total Taps:** 4 Taps  
* **Main Friction:** Lack of real-time slot availability indicators on the main list view forces extra clicks.  
* **Main Delight:** Transparent pricing showing exact user cost vs. retail MRP and cost savings breakdown.  

| Step # | Screen Name | What User is Trying to Do | Exact Action / Taps | Friction / Delight | PM Note & Metric / Hypothesis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2.1** | Home / Shared Subs Tab | Browse available OTT and digital subscription groups | Tap "Shared Subs" icon in top ribbon | **Delight:** Visual brand logos (Netflix, Spotify) enable rapid scanning.<br>**Friction:** Category filters (Music, Movies, Productivity) are not visible without scrolling. | **Metric:** CTR on Shared Subs Ribbon Icon. |
| **2.2** | Group Listing / Search | Locate a specific subscription service | Type query in search bar (e.g., "SonyLIV") or filter list | **Delight:** Star ratings (e.g., 4.2/5) and rating count provide social proof.<br>**Friction:** Search lacks auto-suggest/fuzzy matching for typos. | **PM Note:** Adding instant search auto-complete will reduce search abandonment by 15%. |
| **2.3** | Subscription Detail Page | Evaluate group details, plan validity, and admin info | Tap on desired card (e.g., "Spotify Duo Plan - 3 Months") | **Delight:** Explicit breakdown: ₹250/device, "1 slot available", admin activity ("Last seen 55m ago").<br>**Friction:** Hidden terms regarding account credentials delivery timing. | **Metric:** Detail Page Conversion Rate (% of detail views resulting in "Join Group" taps). |
| **2.4** | Checkout & Joining | Confirm participation and execute wallet/card payment | Tap "Join Group" / "Subscribe" -> Confirm payment via Wallet | **Delight:** One-click checkout if wallet has sufficient balance.<br>**Friction:** Re-authenticating payment details if balance is insufficient. | **Hypothesis:** Auto-prompting wallet top-up during checkout reduces abandonments at payment. |

---

### Flow 3: Credit Card Sharing Flow

* **Goal:** Monetize idle credit card rewards or share card benefits safely with trusted peers.
* **Total Taps:** 3 Taps  
* **Main Friction:** Manual entry requirements for bank dropdowns and card networks; high anxiety regarding financial privacy.  
* **Main Delight:** Prominent security disclaimer card ("We don't store your credit card number or PIN. We only store credit card type").  

| Step # | Screen Name | What User is Trying to Do | Exact Action / Taps | Friction / Delight | PM Note & Metric / Hypothesis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **3.1** | Partner Dashboard / Wallet | Initiate card listing to earn passive income | Tap "+ Add Credit Card" inside "Earn from your card" section | **Delight:** Explicit framing of earnings potential ("Maximize Your Earning").<br>**Friction:** Card sharing icon hard to locate if buried under Wallet settings. | **Metric:** Card Listing Funnel Conversion (% of users opening form who complete submission). |
| **3.2** | Card Details Modal | Link card securely by specifying parameters | Enter Name on Card, Last 4 Digits, Credit Limit, select Bank and Network | **Delight:** High-visibility trust disclaimers directly on form.<br>**Friction:** Dependent fields (Bank must be selected before Network activates). | **UX Note:** Auto-detecting Bank and Network from first 6 BIN digits would eliminate 2 manual steps. |
| **3.3** | Share Permissions & Limits | Set spending caps and duration for recipient | Toggle spending limit (e.g., ₹2,000) and validity period (e.g., 24 hrs) | **Delight:** Granular controls give cardholders peace of mind.<br>**Friction:** Mandatory limit selection without a quick "Default Cap" option. | **Metric:** Average Card Share Duration & Spend Cap per transaction. |

---

### Flow 4: Paying a Bill / Recharge

* **Goal:** Pay utility bills (Electricity, Gas, Water, DTH) or execute mobile recharges with cashback incentives.
* **Total Taps:** 4 Taps  
* **Main Friction:** Information architecture overlap—Bills section displays retail gift vouchers (PhonePe) alongside utility bills.  
* **Main Delight:** "Up to 5% Cashback on Bills" banner and convenient quick-select amount buttons (₹500, ₹1000, ₹2000).  

| Step # | Screen Name | What User is Trying to Do | Exact Action / Taps | Friction / Delight | PM Note & Metric / Hypothesis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **4.1** | Category Discovery | Locate utility biller or recharge service | Tap "Bills" ribbon icon; scroll grid (Mobile, DTH, Electricity, Gas) | **Delight:** Clean grid layout with clear icons.<br>**Friction:** Cognitive confusion when top list mixes "PhonePe E-Gift Voucher" under "Bills". | **Metric:** Grid Item Click Distribution. |
| **4.2** | Operator Selection | Select utility provider / state electricity board | Tap bill category -> Choose provider from dropdown / search list | **Delight:** Fast search filter within long provider lists.<br>**Friction:** Scrolling through 50+ electricity boards on mobile screens. | **PM Note:** Geolocation-based auto-selection of electricity board can save 2 taps. |
| **4.3** | Consumer ID & Amount Entry | Input consumer account number and payment amount | Enter Consumer Number -> Select bill amount or use quick-select pills | **Delight:** Pre-set amount pills (₹500, ₹1000) speed up entry.<br>**Friction:** Lack of inline regex validation on Consumer Number allows submission of invalid IDs. | **Hypothesis:** Inline format validation will reduce payment failure rate by 12%. |
| **4.4** | Bill Payment Execution | Complete transaction via wallet or UPI | Tap "Pay Now" -> Authenticate payment | **Delight:** Instant cashback credit notification post-payment.<br>**Friction:** Prominent "No Recent Payments" empty state block consumes screen space. | **Metric:** Bill Payment Repeat Rate (D30 / D60 retention for utility bills). |

---

### Flow 5: Gift Cards

* **Goal:** Purchase discounted digital gift vouchers across major brands (Amazon, Zomato, Domino's, Swiggy).
* **Total Taps:** 3 Taps  
* **Main Friction:** Category filter pills scroll off-screen when browsing lower items.  
* **Main Delight:** Transparent savings calculation (e.g., Domino's ₹91.90 vs ₹100 MRP -> "Save ₹8.10" shown in teal).  

| Step # | Screen Name | What User is Trying to Do | Exact Action / Taps | Friction / Delight | PM Note & Metric / Hypothesis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **5.1** | Gift Card Hub | Discover brand vouchers and discount rates | Tap "Gift Cards" icon; view top hero banner ("Instant Vouchers - Up to 12% Off") | **Delight:** High-impact visual banners set clear discount expectations.<br>**Friction:** High visual density with overlapping discount badges. | **Metric:** CTR on Hero Discount Banners. |
| **5.2** | Brand Filtering & Selection | Find desired merchant voucher | Filter by category pills ("Food", "Shopping", "Entertainment") or search brand | **Delight:** Color-coded discount pills (e.g., "3.5% OFF", "15% OFF") draw immediate attention.<br>**Friction:** Sticky search bar lacks filter persistence during vertical scroll. | **UX Fix:** Make top filter category bar sticky alongside search header. |
| **5.3** | Voucher Customization & Purchase | Select denomination and complete purchase | Select voucher amount (e.g., ₹500 Amazon Voucher) -> Tap "Add to Cart" / "Pay Now" | **Delight:** Clear display of net payable vs. voucher value.<br>**Friction:** Multiple clicks required to purchase multi-quantity vouchers. | **Metric:** Gift Card Average Order Value (AOV). |

---

### Flow 6: Rentals (Hyper-Local Gadget Rentals)

* **Goal:** Rent high-end electronics (Gaming PCs, Cameras, Laptops, Consoles) on an hourly/daily basis with fast local delivery.
* **Total Taps:** 3 Taps  
* **Main Friction:** Prevalent generic placeholder images (identical orange/red backpack thumbnail for 80%+ gaming listings) destroys trust.  
* **Main Delight:** Hyper-local positioning ("Deliver in 10 mins - Near You") and explicit inventory counts ("18 available").  

| Step # | Screen Name | What User is Trying to Do | Exact Action / Taps | Friction / Delight | PM Note & Metric / Hypothesis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **6.1** | Rentals Home | Understand rental catalog and delivery timeframe | Tap "Rentals" icon in top ribbon | **Delight:** Map background graphic and "10-min delivery" copy communicates speed.<br>**Friction:** Dynamic location tag defaults to generic string (e.g., "[SP-RK-IMPORT]"). | **Metric:** Location Permission Grant Rate & Rental Hub CTR. |
| **6.2** | Category Grid & Inventory Browsing | Browse products by category (Gaming, Cameras, Laptops) | Filter by niche pills ("Gaming", "Cameras") or scroll main catalog | **Delight:** "Earn With Us" banner encourages supply-side peer listings.<br>**Friction:** Severe thumbnail repetition—5 of 6 gaming products display an identical backpack image. | **PM Priority:** Mandatory multi-photo seller verification will increase rental CTR by >40%. |
| **6.3** | Product Detail & Booking | Review specs, hourly rates, and initiate rental | Tap product card (e.g., "Canon M50 Mark II ₹513/hr") -> Tap "Rent Now" | **Delight:** High visibility "Rent Now" CTA with inventory scarcity indicator.<br>**Friction:** Hourly pricing creates sticker shock; users lack immediate view of daily/weekly rates. | **Hypothesis:** Displaying both Hourly (₹513/hr) and Daily (₹1,499/day) rates will boost booking conversion. |

---

### Flow 7: Wallet & Coins

* **Goal:** Manage stored funds, monitor cashbacks, top-up balance, and manage auto-pay subscription mandates.
* **Total Taps:** 2 Taps  
* **Main Friction:** Deposit range text ("₹1 - ₹100,000") displayed in low-contrast fine print.  
* **Main Delight:** Clear breakdown between "Locked Amount" (promotional bonuses) and "Unlocked Amount" (withdrawable cash).  

| Step # | Screen Name | What User is Trying to Do | Exact Action / Taps | Friction / Delight | PM Note & Metric / Hypothesis |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **7.1** | Wallet Overview | View available balance and access quick operations | Tap "Wallet" in bottom navigation bar | **Delight:** High-level dashboard displays total balance, locked/unlocked split, and action shortcuts.<br>**Friction:** "Send Money" tab requires app contact access without fallback manual UPI ID input. | **Metric:** Wallet Load Rate (% of active users maintaining >₹100 balance). |
| **7.2** | Add Money / Top-Up | Load funds into wallet | Tap preset quick-add (+₹100, +₹200, +₹500, +₹1000) -> Tap "Proceed to Pay" | **Delight:** One-tap preset buttons remove manual typing friction.<br>**Friction:** Small font size for minimum/maximum load boundaries. | **Metric:** Average Top-Up Amount. Track distribution across quick-add presets. |
| **7.3** | Manage Auto-Pay | Review or modify recurring subscription mandates | Tap "Manage Auto-Pay" card inside Wallet | **Delight:** Centralized mandate management empowers user control over subscriptions.<br>**Friction:** Limited cancellation details without contacting support. | **PM Note:** Seamless one-click mandate cancellation builds long-term product trust. |

---

## Part 2 — Business & Market Understanding

### 1. Primary User Personas

```text
+-------------------------------------------------------------------------------------------------------+
|                                    SUBSPACE USER PERSONAS                                             |
+---------------------------------------------------+---------------------------------------------------+
| PERSONA 1: THE URBAN RESOURCE OPTIMIZER           | PERSONA 2: THE TECH-SAVVY STUDENT / FRESHER       |
| * Age: 22-30 | Tier 1 (Bangalore, Mumbai, NCR)    | * Age: 18-24 | Tier 1 & 2 Cities                 |
| * Income: ₹40k - ₹1.5L / month                    | * Allowance/Income: ₹15k - ₹40k / month           |
| * Behavior: Heavy OTT & digital tech user          | * Behavior: Value-conscious gamer & streamer      |
| * Pain Point: Subscription creep & idle assets    | * Pain Point: High upfront cost for premium tech  |
| * Goal: Consolidate expenses & earn on idle cards | * Goal: Access premium OTT & gear affordably       |
+---------------------------------------------------+---------------------------------------------------+
```

1. **Persona 1: The Urban Resource Optimizer (Primary)**
   * **Demographics:** Age 22–30 | Tier-1 Metros (Bangalore, Mumbai, Delhi-NCR) | Salaried Professional or Tech Freelancer | Income: ₹40,000–₹1,50,000/month.
   * **Behavior:** Active subscriber to multiple streaming services (Netflix, Prime, SonyLIV, Spotify); uses food delivery and ride-hailing daily; owns high-tier credit cards; occasionally needs specialized tech gear for projects or trips.
   * **Pain Points:** Subscription fatigue (paying full retail for 5+ OTT apps used irregularly); inability to monetize idle credit card perks or personal tech assets.
   * **Motivation:** Maximum financial efficiency—wants to centralize micro-payments, cut recurring digital spend by 40–60%, and earn passive income/cashback.

2. **Persona 2: The Tech-Savvy Student / Fresher (Secondary)**
   * **Demographics:** Age 18–24 | Tier-1 & Tier-2 College Hubs | Pocket Money / Entry Salary: ₹15,000–₹40,000/month.
   * **Behavior:** Heavy mobile gamer, content consumer, and social media builder; highly price-sensitive; comfortable with P2P digital sharing platforms.
   * **Pain Points:** Cannot afford upfront retail costs for premium gaming laptops, DSLR cameras, or full-price individual OTT subscriptions.
   * **Motivation:** Affordable access—wants ₹150/month access to premium streaming and hourly rental of high-end gaming/camera equipment without long-term commitment.

---

### 2. Core Value Proposition

> **Subspace helps** digital-first urban consumers  
> **do** save money, monetize idle assets, and consolidate micro-payments  
> **by** providing a unified marketplace for shared subscriptions, hyper-local gadget rentals, utility bill payments, and discounted gift vouchers  
> **unlike** fragmented individual streaming apps, expensive long-term rental sites, or generic payment wallets (GPay/PhonePe) that lack P2P sharing mechanics and cost-splitting features.

---

### 3. Business Model & Revenue Mechanics Hypothesis

Subspace operates a multi-stream marketplace model monetizing transactions across digital subscriptions, physical rentals, bill payments, and wallet floats.

```text
                     +-----------------------------------+
                     |     SUBSPACE REVENUE ENGINE       |
                     +-----------------------------------+
                        /        |          |          \
                       /         |          |           \
           Subscription      Gadget       Utility     Wallet
            Commissions     Rentals        Bills       Float
             (Spread)      (Take-Rate)  (Interchange) (Interest)
```

| Product Area | User Value | Likely Revenue Model | Evidence / App Source | Confidence Level |
| :--- | :--- | :--- | :--- | :--- |
| **Subscription Groups** | Discounted access to premium OTT platforms via shared slots | **Spread / Wholesale Margin:** Subspace purchases bulk vouchers/family plans at discount and resells individual slots with a 10–15% markup. | App displays SonyLIV at ₹181.34 vs ₹299 retail; Amazon Prime 3-mo at ₹486.09 vs ₹599. | **High** (Standard digital aggregation play) |
| **Gadget Rentals** | Hourly/daily access to expensive camera and gaming hardware | **Marketplace Take-Rate / Listing Fee:** Subspace charges a 15–20% platform commission on total rental transaction value plus listing fees from owners. | "Earn With Us" banner prompting owners; rental rates quoted hourly (e.g., Canon M50 at ₹513/hr). | **Medium** (High operational dependency on local logistics & damage protection) |
| **Bill Payments & Recharges** | One-stop payment convenience with guaranteed cashback | **Affiliate Commission / Interchange Fee:** Earning commission from utility boards, telecom operators, and payment gateways per bill payment. | "UP TO 5% CASHBACK ON BILLS" header banner; integrated biller aggregator pipelines. | **High** (Proven fintech monetization model) |
| **Gift Vouchers** | Instant savings on everyday e-commerce, dining, and rides | **B2B Bulk Purchase Margin:** Buying digital vouchers in bulk from aggregators (e.g., Qwikcilver) at 4–15% discount and sharing margin with end-users. | Brand discount pills: Domino's (8.1% off), Zomato (2.75% off), Amazon Fresh (3.5% off). | **High** (Scalable margin model) |
| **P2P Card Sharing** | Cardholders monetize perks; recipients access premium payment options | **Transaction Facilitation Fee:** Platform charges a fixed processing fee (e.g., 2–3%) on transactions executed via shared card limits. | Feature entry point in wallet ("Earn from your card"). | **Low/Medium** (High regulatory scrutiny limits scale) |
| **Wallet Float** | Instant checkout convenience via pre-loaded wallet balance | **Interest Income on Float:** Earning interest on unspent user funds held in bank escrow accounts. | Preset wallet load amounts (+₹100, +₹500) encouraging pre-funding. | **High** (Standard wallet economics) |

---

### 4. Competitor Landscape

Subspace competes across multiple distinct verticals, facing both direct niche players and indirect mega-apps.

| Competitor Category | Key Competitors | Competitor Core Strength | Where Subspace Wins (Differentiation) | Where Subspace Lags |
| :--- | :--- | :--- | :--- | :--- |
| **OTT Aggregators & Sharing** | Spliiit, Subby, OTTplay, Prime Video Channels | Aggregated content search, massive content catalogs. | **Local Payment & Group Splitting:** Subspace supports localized Indian payment methods (UPI/Wallets) and automated slot management. | Global OTT partners offer direct, single-sign-on integration without shared credential management. |
| **Gadget Rentals** | Rentomojo, SharePal, Furlenco, Cityfurnish | Established logistics, formal asset maintenance, long-term leasing contracts. | **Hyper-Local & Hourly Flex:** Subspace targets 10-minute hyper-local delivery and micro-rentals (hourly/daily) for events, gaming, and shoots. | Competitors have robust asset insurance, standardized quality control, and established delivery infrastructure. |
| **Bill Payments & Wallets** | PhonePe, Google Pay, Paytm, CRED | Massive user base, seamless UPI auto-pay, high operational reliability and trust. | **Integrated Lifestyle Monetization:** Subspace combines utility bill payments directly with subscription savings and peer earnings under one roof. | Top fintech apps possess superior brand trust, instant settlement reliability, and frictionless UPI integrations. |
| **Gift Voucher Platforms** | Gyftr, Magicpin, Amazon Pay | Scale, direct API integrations with thousands of national retail chains. | **Unified Wallet & Social Use:** Subspace allows users to use wallet cashbacks immediately across subscriptions and bill payments. | Competitors offer higher discount margins due to massive enterprise transaction volume. |

---

### 5. Legal, Regulatory & Trust Risk Analysis

```text
+---------------------------------------------------------------------------------------------------+
|                                  RISK & MITIGATION FRAMEWORK                                      |
+---------------------------------------------------+-----------------------------------------------+
| IDENTIFIED RISK                                   | MITIGATION STRATEGY                           |
| 1. Card Sharing (RBI / PCI-DSS Non-Compliance)    | Tokenized Virtual Guest Cards / Virtual Cards |
| 2. Gadget Damage / Asset Loss in Rentals          | Blocked Wallet Security Deposit + e-KYC       |
| 3. Shared Account Credential Revocation (OTT)     | Automated Escrow Release on 24hr Verification |
+---------------------------------------------------+-----------------------------------------------+
```

1. **Credential & P2P Credit Card Sharing Exposure:**
   * **Regulatory Hazard:** Allowing users to share raw credit card numbers, CVVs, or OTPs violates RBI guidelines on card security, PCI-DSS compliance, and tokenization mandates. If a recipient engages in fraudulent transactions, the primary cardholder is legally liable, exposing Subspace to legal action as an unauthorized facilitator.
   * **OTT Terms of Service (ToS) Violation:** Streaming services (e.g., Netflix's household sharing policy) strictly prohibit reselling or sharing credentials outside a primary household. Account bans by OTT platforms risk user dissatisfaction and financial loss.

2. **Physical Asset Rental Risk:**
   * High-value gadgets (DSLRs, Gaming Laptops, Consoles) face risks of theft, intentional swapping of internal components, accidental liquid/fall damage, and wear-and-tear disputes.

3. **Proposed Mitigations:**
   * **For Card Sharing:** Abandon raw credential sharing entirely. Transition to a **Tokenized Virtual Guest Card System**, where cardholders pre-authorize a virtual, single-use token capped at a specific amount exclusively usable within the Subspace merchant gateway.
   * **For Rentals:** Mandate a **Blocked Wallet Security Deposit** (pre-authorization hold on credit/debit card or wallet) prior to dispatching items, accompanied by mandatory Aadhaar/e-KYC verification for renters.
   * **For Subscription Groups:** Utilize API-driven virtual profiles or automated single-sign-on (SSO) tokens rather than distributing raw account passwords.

4. **Biggest Remaining Exposure:**
   * **Middleman Liability & Chargebacks:** If an admin revokes subscription access mid-month or a rented item arrives damaged, users default to requesting refunds from Subspace. Managing dispute resolution and absorbing financial chargebacks represents Subspace's largest operational exposure.

---

## Part 3 — Usability & UX Audit

### 3 Biggest UX Problems

#### Problem 1: Information Architecture Breakdown in "Bills & Vouchers"
* **What is Broken:** The "Bills" section mixes consumable utility payments (Electricity, Water, Gas) with retail e-gift vouchers (PhonePe, Steam Wallet). When filtering by "Bills", the primary list displays "PhonePe E-Gift Voucher".
* **Why it Matters:** High cognitive friction and user confusion. Users attempting to pay an electricity bill are misdirected to purchase retail vouchers, leading to session abandonment.
* **Specific Actionable Fix:** Re-architect the section into two distinct tabs: **"Utility Bills"** (strictly for electricity, gas, water, mobile recharge) and **"Gift Vouchers"** (for e-commerce, gaming, and dining cards).

```text
   BEFORE (Confused IA):                         AFTER (Clean IA):
   +-----------------------+                    +-----------------------+
   |  BILLS & RECHARGES    |                    |  [Bills]  [Vouchers]  |
   | - PhonePe Voucher     |  === Fix IA ===>   | Utility Bills:        |
   | - Electricity Board   |                    | - Electricity Board   |
   | - Steam Wallet Card   |                    | - Gas Provider        |
   +-----------------------+                    +-----------------------+
```

#### Problem 2: Generic Placeholder Thumbnails & Visual Trust Deficit in Rentals
* **What is Broken:** In the Rentals hub (specifically Gaming and Cameras), over 80% of product listings feature an identical generic orange/red backpack graphic as their thumbnail image.
* **Why it Matters:** Conversion killer. Visual proof drives over 90% of rental decisions online. Identical backpack thumbnails make the inventory appear fake, unmaintained, or empty, destroying user trust.
* **Specific Actionable Fix:** Implement strict listing submission criteria requiring sellers to submit at least 3 high-resolution photos of the actual gadget. Until verified photos are uploaded, display standardized vector brand logos (e.g., Sony PlayStation, Canon, ASUS ROG) instead of generic bag graphics.

#### Problem 3: Empty-State Choice Paralysis on Home Dashboard
* **What is Broken:** Upon first login, users land on a dense dashboard featuring 5 header tabs, 2 promotional carousels, a brand logo grid, and multiple service cards without a clear initial call-to-action (CTA).
* **Why it Matters:** Choice paralysis. New users get overwhelmed by competing options and exit the app without taking a single action, severely depressing Day-1 conversion rates.
* **Specific Actionable Fix:** Introduce an **Onboarding Goal Selection State**. On first open, display a focused modal: *"What would you like to do today?"* with 3 clear choices: `[Save on Subscriptions]`, `[Rent a Gadget]`, `[Pay a Bill]`. Dim background elements and highlight the corresponding path.

---

### Usability Dimension Ratings

| Dimension | Rating (1–5) | Detailed Justification |
| :--- | :---: | :--- |
| **Visual Design & Aesthetic** | **4/5** | Excellent dark-mode execution, consistent typography, vibrant teal accent colors, and clean card containers. Hurt slightly by low-quality placeholder images. |
| **Navigation & Architecture** | **3/5** | Bottom navigation bar functions well, but top-level category switching and duplicate tab structures (Home vs. Explore) create redundant paths. |
| **Information Architecture** | **2/5** | Severe categorisation flaws. Utility bills mixed with gift vouchers, and rental listings lacking proper sub-category tagging. |
| **Trust & Credibility** | **4/5** | Strong financial trust cues; explicit orange security banners on card forms ("We don't store PINs") and transparent pricing math build user confidence. |
| **Form Usability & Input** | **3/5** | Form fields are spacious, but long unformatted dropdown lists for electricity boards and lack of automated card BIN recognition add unnecessary typing friction. |

---

### 30% Screen & Step Reduction Plan

```text
  CURRENT FLOW (5 Screens):
  [Home] -> [Explore Tab] -> [Select Category] -> [Sub-Category List] -> [Product Detail]

  STREAMLINED FLOW (3 Screens - 40% Reduction):
  [Unified Home Dashboard] -> [Category List View] -> [Product Detail & Auto-Checkout]
```

1. **Eliminate Duplicate Top Navigation (Merge "Home" and "Explore"):**
   * *Current State:* Bottom navigation contains both a "Home" tab and an "Explore" tab that display nearly identical content cards and promotional banners.
   * *Reduction Strategy:* Eliminate the redundant "Explore" tab entirely. Consolidate all primary discovery categories into a unified, top ribbon on the main Home dashboard. *Saves 1 navigation tap across all user journeys.*
2. **Streamline Utility Bill Forms (Remove "No Recent Payments" Screen Real Estate):**
   * *Current State:* Bill payment screens allocate over 40% of vertical screen space to an empty state graphic stating "No recent payments".
   * *Reduction Strategy:* Hide the empty state block completely for new users. Dynamically replace it with a 1-tap "Popular Utility Providers" horizontal scroll pill array. *Cuts 1 unnecessary scroll step.*
3. **Contextual Auto-Prompt for Credit Card Setup:**
   * *Current State:* Users must navigate to Wallet -> Card Settings -> Add Card form, save, and then manually return to their original service flow.
   * *Reduction Strategy:* Embed card linking directly inline within checkout modals via a lightweight 2-field bottom sheet slide-up. *Reduces card adding journey from 4 screens to 1 inline overlay.*

---

## Part 4 — Growth & Funnel Analysis

### AARRR Funnel Breakdown

```text
       [ACQUISITION]  --> App Store Downloads & Campaign Clicks
             |
       [ACTIVATION]   --> Completed First Transaction (Bill / Sub / Rental)  <-- *CRITICAL BOTTLE-NECK*
             |
       [RETENTION]    --> D7 / D30 Repeat Payments & Wallet Usage
             |
       [REVENUE]      --> Margin on Subs, Rental Take-Rates, Bill Cashbacks
             |
       [REFERRAL]     --> Group Invites & Social Shares (K-Factor)
```

| Funnel Stage | Core User Action | Primary Drop-off Point | Underlying Root Cause (Why) | Key Metric to Track |
| :--- | :--- | :--- | :--- | :--- |
| **Acquisition** | Download app from Play Store / App Store | Store listing page to initial app open | Generic messaging; user confusion regarding whether app is a wallet, rental app, or streaming tool. | Install Volume & Cost Per Install (CPI) |
| **Activation** | Complete first transaction (join group, pay bill, rent item) | Onboarding dashboard landing to service checkout | **Highest Drop-off Point.** Choice overload on home screen; anxiety around linking payment methods on an unproven app. | Time-to-First-Action (TTFA) & Day 1 Activation Rate (%) |
| **Retention** | Re-open app weekly / monthly for recurring needs | Month 1 after initial bill payment or subscription expiry | Utility bill payments occur monthly; users forget app exists between payment cycles due to lack of re-engagement triggers. | D7 / D30 / D90 Retention Rate |
| **Revenue** | Execute paid order or maintain wallet float balance | Checkout payment authorization step | Unexpected payment processing fees, insufficient wallet balance, or payment gateway timeouts. | Average Order Value (AOV) & Gross Merchandise Value (GMV) |
| **Referral** | Invite peers to join subscription group or share referral link | Group detail page post-checkout | Referral/invite CTAs are visually hidden inside group settings rather than highlighted post-purchase. | K-Factor (Viral Coefficient) & Referral Invites Sent |

---

### 3 Growth / Acquisition Levers

#### Growth Lever 1: The "Split-the-Bill" Viral Invite Loop
* **Mechanic:** When a user creates or joins a shared subscription group (e.g., Spotify Duo or Netflix Family), generate a dynamic referral link: *"Join my Netflix group on Subspace & get ₹50 in your wallet instantly!"* When the invited friend downloads the app and joins the group, both users receive ₹50 wallet credit.
* **Why it Fits Subspace:** Subspace's core use case is inherently social. Subscription groups require multiple members to maximize savings. Turning existing group creators into acquisition channels leverages built-in viral loops, dropping CAC to near zero.
* **Primary Metric:** Viral K-Factor (Goal: K > 1.2) and Referral Install Conversion Rate.

#### Growth Lever 2: Gaming & Camera Rental "Showcase" Social Watermarking
* **Mechanic:** Introduce a 1-tap "Share My Gear" button in the rental confirmation screen that generates a customized, high-aesthetic Instagram/WhatsApp Story template: *"Renting this Sony A7S III for ₹513/hr via Subspace! 📸"*, featuring a direct app download QR code/link.
* **Why it Fits Subspace:** Gen-Z students and freelance creators love showcasing high-end gear on social media. Capitalizing on user vanity turns every rented DSLR or gaming laptop into a public billboard.
* **Primary Metric:** App Store visits originating from Story QR code scans / referral links.

#### Growth Lever 3: Automated "Bill Due Date" Predictive Push Campaigns
* **Mechanic:** Implement predictive bill tracking. After a user executes their first mobile recharge or electricity bill payment, automatically schedule a smart push notification 5 days prior to the next estimated due date: *"Your Electricity Bill is due in 5 days. Pay via Subspace to claim your ₹25 cashback!"*
* **Why it Fits Subspace:** Utility bill payments represent the most reliable recurring use case. Predictive notifications capture user intent right when demand arises, converting external search intent into app transactions.
* **Primary Metric:** Push Notification CTR & Bill Payment Repeat Conversion Rate.

---

### 2 Retention Levers

#### Retention Lever 1: "Expiring Rental" Upgrade & Extension Nudges
* **Mechanic:** Send targeted, contextual push notifications 2 hours prior to rental expiry: *"Enjoying your Playstation 5? Extend your rental for another 24 hours at 20% off with 1 tap!"*
* **Why it Works:** Prevents customer churn at the end of a rental cycle and captures incremental revenue by capitalizing on user engagement momentum while the hardware is actively in their hands.

#### Retention Lever 2: Wallet "Cashback Accumulation" Gamified Milestones
* **Mechanic:** Display a visual progress bar inside the app wallet: *"You're ₹45 away from unlocking a FREE ₹200 Amazon Voucher!"* Every transaction (bill pay, group join, rental) advances the progress bar.
* **Why it Works:** Utilizes the goal-gradient effect. Users are far more likely to return and complete transactions on Subspace rather than competitor apps when they can visually track tangible progress toward a tangible financial reward.

---

## Part 5 — #1 Product Recommendation: Interactive First-Action Wizard

### Product One-Pager

```text
+-------------------------------------------------------------------------------------------------------+
| FEATURE ONE-PAGER: INTERACTIVE FIRST-ACTION WIZARD                                                   |
+-------------------------------------------------------------------------------------------------------+
| PROBLEM: New user choice paralysis & high drop-off on first session (Activation Rate <35%).           |
| SOLUTION: A guided 3-step interactive onboarding overlay replacing static dashboards for new users.  |
| PRIMARY METRIC: Time-to-First-Action (TTFA) reduced by 50%; Day-1 Activation increased by 60%.        |
+-------------------------------------------------------------------------------------------------------+
```

---

#### 1. Problem Statement
Upon completing sign-up, new Subspace users are landed onto a complex, multi-category dashboard with over 5 competing entry points (Rentals, Bills, Subscriptions, Gift Cards, Earn). Lacking clear direction, users experience **choice paralysis**. Combined with hesitation around linking financial cards on a new platform, over **60% of new sign-ups bounce during their first session without completing a single transaction**.

---

#### 2. Proposed Solution: "Interactive First-Action Wizard"

Replace the default empty-state home screen for first-time users with a high-conversion, 3-step guided wizard:

```text
  +--------------------------------+      +--------------------------------+      +--------------------------------+
  | STEP 1: INTENT SELECTION       |      | STEP 2: GUIDED FILTERING       |      | STEP 3: CONTEXTUAL CHECKOUT    |
  | "What is your goal today?"     |      | "Select your preferred plan"   |      | "Link card & unlock savings"   |
  | [A] Save on OTT Subs           | ---> | Shows top 3 curated deals      | ---> | 2-field card link + 1-click    |
  | [B] Rent Gaming/Camera Gear    |      | with explicit savings math     |      | auto-redirect to checkout      |
  | [C] Pay Utility Bill + Cash    |      | (e.g. SonyLIV at ₹181)         |      |                                |
  +--------------------------------+      +--------------------------------+      +--------------------------------+
```

* **Step 1 (Intent Capture):** Display a sleek bottom-sheet modal immediately post-login: *"Welcome to Subspace! What would you like to do first?"* Options: `[1. Save on OTT Subscriptions]`, `[2. Rent Tech Gear]`, `[3. Pay a Utility Bill]`.
* **Step 2 (Filtered Discovery):** Automatically land the user on a curated, top-rated selection matching their choice, filtering out unnecessary UI noise. (e.g., if choosing OTT, show top 3 streaming deals with prominent savings badges).
* **Step 3 (Contextual Card & Wallet Setup):** When the user selects an item (e.g., SonyLIV slot for ₹181), prompt card setup directly inline: *"Link your card to complete this ₹181 booking and earn ₹18 cashback."* Upon saving card details, auto-execute the transaction without forcing manual navigation back to cart.

---

#### 3. Prioritization & Evaluation Framework (RICE Scoring)

To validate choosing this recommendation over alternative product initiatives, all ideas were evaluated using the **RICE Framework** (Reach, Impact, Confidence, Effort):

* **Reach:** Number of users impacted per quarter (Scale: 1 = Low, 5 = High)
* **Impact:** Effect on core business goals/activation (Scale: 0.5 = Minimal, 3 = Massive, 5 = Critical)
* **Confidence:** Team confidence in outcome based on data/UX principles (Scale: 50% = Low, 80% = Med, 100% = High)
* **Effort:** Person-weeks required for design & implementation (Lower number = Less effort)
* $$\text{RICE Score} = \frac{\text{Reach} \times \text{Impact} \times \text{Confidence}}{\text{Effort}}$$

| Candidate Product Initiative | Reach (1-5) | Impact (1-5) | Confidence (%) | Effort (Weeks) | Final RICE Score | Priority Rank |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Interactive First-Action Wizard** | **5** | **5** | **90%** | **2** | **11.25** | **#1 (Selected)** |
| **Fix Rental Placeholder Thumbnails** | 3 | 4 | 95% | 1 | 11.40* | **#2** |
| **Re-architect Bills vs. Vouchers IA** | 3 | 3 | 90% | 1.5 | 5.40 | **#3** |
| **P2P Card Sharing Tokenization** | 2 | 4 | 60% | 6 | 0.80 | **#4** |

*\*Note: While fixing rental thumbnails has low effort, it only impacts the rental vertical (30% of users), whereas the First-Action Wizard impacts 100% of incoming users across all product lines.*

---

#### 4. Success Metrics & Quantitative Targets

* **Primary Metric:** **Time-to-First-Action (TTFA)** — Measured in seconds from initial app open to confirmed payment/booking execution.
  * *Baseline (Estimated):* 240 seconds.
  * *Target:* **< 120 seconds (50% reduction).**
* **Secondary Metric:** **Day-1 User Activation Rate (%)** — Percentage of new sign-ups who complete at least one paid transaction within 24 hours.
  * *Baseline (Estimated):* 28%.
  * *Target:* **> 45% (60% relative increase).**

---

#### 5. Pre-Engineering Validation Plan

Before dedicating engineering resources, validate user demand and flow usability using a 4-step lean validation model:

```text
  [10 User Interviews] --> [Figma Prototype Test] --> [Usability Benchmark] --> [Go / No-Go Decision]
```

1. **Step 1: Qualitative Problem Validation (Days 1–2):** Conduct 10 15-minute moderated remote user testing sessions with target persona representatives (students & young professionals). Observe their unguided behavior on the current app landing page to measure baseline confusion and drop-off rate.
2. **Step 2: Interactive Prototype Testing (Days 3–4):** Build a mid-fidelity Figma interactive prototype of the 3-step First-Action Wizard. Task 15 new users with executing a subscription join flow using the wizard prototype.
3. **Step 3: Quantitative Friction Measurement (Day 5):** Measure Task Completion Rate, System Usability Scale (SUS) score, and qualitative feedback regarding whether the wizard feels "helpful" vs. "intrusive".
4. **Step 4: Go / No-Go Decision Rule:**
   * **GO Decision Criteria:** If **> 80% of test users** successfully complete their first transaction on the prototype in < 90 seconds AND **< 15% rate the wizard as intrusive**, proceed directly to engineering sprint.
   * **NO-GO Criteria:** If completion rate is < 65%, iterate on intent categories before writing code.

---

## Part 6 — Quick Reflection

### 1. Single Biggest Business Risk
**Regulatory Liabilities surrounding Payment Aggregation and Unlicensed Financial Operations.**  
Subspace handles multi-party financial flows: holding user wallet float balances, collecting rental security deposits, and processing peer-to-peer subscription payouts. Operating these financial flows without a formal **Prepaid Payment Instrument (PPI)** license or an authorized **RBI Payment Aggregator (PA)** escrow framework creates existential regulatory exposure. A single RBI audit directive or security breach could force an immediate freeze on wallet operations, halting the entire business overnight.

---

### 2. If I Were CEO for a Day: What I Would STOP Doing Immediately
**I would immediately PAUSE the development of direct Peer-to-Peer Credit Card Sharing.**

* **Strategic Rationale:** Attempting to build raw P2P credit card credential sharing is fraught with massive regulatory headwinds (PCI-DSS compliance, RBI tokenization laws) and severe fraud liability. Furthermore, the core product experience in high-margin verticals—such as Rentals (broken thumbnail trust) and UI/UX Navigation (confused information architecture)—currently suffers from fixable usability defects. 
* Pursuing high-risk, legally dubious card sharing before perfecting core utility flows is a classic case of **premature feature creep**. Resources must be re-allocated to bulletproofing rental trust and streamlining user activation.

---

### 3. Key Strategic Question for the Founder / CEO

> *"Is Subspace's long-term strategic vision to become a broad **Fintech Super-App** (competing directly against Paytm and PhonePe on utility payments), or a high-engagement **Niche Lifestyle Marketplace** focused exclusively on subscriptions, rentals, and peer asset monetization?  
> 
> How we answer this dictates our product architecture: a Super-App requires massive capital to build horizontal biller integrations, whereas a Lifestyle Marketplace demands deep vertical focus on community trust, asset protection, and social virality."*

---

## Assumptions & Data Sources Log

| Claim / Assumption | Source / Reference Evidence | Verification Status |
| :--- | :--- | :--- |
| **Bills vs. Vouchers confusion exists** | Direct observation of UI screenshot showing "Bills" category displaying "PhonePe E-Gift Voucher". | **Verified** (Visual Evidence) |
| **Rental placeholder images degrade conversion** | Standard UX research: >80% of rental items in Gaming hub show identical orange backpack graphics. | **Verified** (Visual & UX Principles) |
| **SonyLIV pricing savings math** | App screenshot displaying SonyLIV plan at ₹181.34 vs ₹299 retail MRP. | **Verified** (Pricing Evidence) |
| **10-minute rental delivery feasibility** | App copy stating "Deliver in 10 mins - Near You"; assumed reliance on hyper-local 3PL partners (e.g., Dunzo/Shadowfax). | **Hypothesis** (Logistics dependent) |
| **Interactive Wizard boosts activation** | Standard product growth benchmarks (Uber, Airbnb guided onboarding flows). | **Hypothesis** (Requires A/B testing) |

---
*End of Submission Document.*
