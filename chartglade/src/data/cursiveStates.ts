import type { PageDef } from './pageTypes';

/**
 * #16 link-bait resource page: /states-that-require-cursive/.
 * Not a traffic page — the goal is citations (MyCursive's equivalent page is
 * referenced by EdWeek/Snopes/Fox). Accuracy is the product: their 2025-05
 * list mislabels Maine (a study resolve, not a requirement) and Indiana
 * (permission + reporting, not a requirement), and misses Idaho.
 *
 * Research file with full source URLs: docs/chartglade/CURSIVE-STATES-DATA.md
 * (cross-checked 2026-10-12 against EdWeek 2024-11 / MyCursive 2025-05 / NSEA
 * 2026-03 plus state government pages).
 */

export type StateTier = 'law' | 'standards' | 'none';

export interface StateCursiveStatus {
  name: string;
  tier: StateTier;
  /** Statute or standard citation; null for tier 'none'. */
  citation: string | null;
  /** Year signed / adopted (null when no requirement exists). */
  year: number | null;
  /** One-line scope summary — grade level and what the rule says. */
  note: string;
  /** Source links shown in the online tables (state gov preferred). */
  sources: string[];
  /** Notable in-progress legislation (the "watch list"). */
  watch?: string;
}

const LAW = 'law';
const STANDARDS = 'standards';
const NONE = 'none';

export const cursiveStates: StateCursiveStatus[] = [
  { name: 'Alabama', tier: LAW, citation: "Ala. Code § 16-6B-2 (Lexi's Law, HB 218)", year: 2016, note: 'Readable cursive documents by the end of grade 3.', sources: ['https://law.justia.com/codes/alabama/title-16/chapter-6b/section-16-6b-2/'] },
  { name: 'Alaska', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
  { name: 'Arizona', tier: STANDARDS, citation: 'State Board of Education ELA standards', year: 2016, note: 'Legible cursive by end of grade 5; a cursive bill (SB 1197) was vetoed in 2019.', sources: ['https://www.azed.gov/standards-practices/'], watch: 'SB 1197 vetoed — standards route instead' },
  { name: 'Arkansas', tier: LAW, citation: 'Ark. Code Ann. § 6-16-146 (Act 160 of 2015)', year: 2015, note: 'Taught in every public elementary school as part of ELA.', sources: ['https://law.justia.com/codes/arkansas/title-6/subtitle-2/chapter-16/subchapter-1/section-6-16-146/'] },
  { name: 'California', tier: LAW, citation: 'Educ. Code § 51210(a), as amended by AB 446', year: 2023, note: 'Grades 1–6 must include cursive or joined italics; effective Jan 1, 2024.', sources: ['https://www.cde.ca.gov/ci/rl/cf/'] },
  { name: 'Colorado', tier: NONE, citation: null, year: null, note: 'Local-control state; academic standards do not include handwriting.', sources: [] },
  { name: 'Connecticut', tier: NONE, citation: null, year: null, note: 'Bills introduced but none passed as of October 2026.', sources: [] },
  { name: 'Delaware', tier: LAW, citation: '14 Del. C. (HB 70, 149th General Assembly)', year: 2017, note: 'Cursive by end of grade 4, starting 2018–19.', sources: ['https://legis.delaware.gov/BillDetail?LegislationId=25706'] },
  { name: 'Florida', tier: STANDARDS, citation: 'B.E.S.T. ELA standards (ELA.3–5.C.1.1)', year: 2020, note: 'Grade-by-grade benchmarks, grades 3–5; HB 921 (2025) to hard-code it into law died in a Senate committee.', sources: ['https://www.fldoe.org/academics/standards/subject-areas/english-language-arts/'], watch: 'HB 921 passed the House, died in Senate rules (2025)' },
  { name: 'Georgia', tier: STANDARDS, citation: 'Georgia Standards of Excellence (2025 revision)', year: 2025, note: 'Read and write cursive, grades 3–5, from 2025–26; no statute.', sources: ['https://www.georgiastandards.org/'] },
  { name: 'Hawaii', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
  { name: 'Idaho', tier: LAW, citation: 'SB 1044', year: 2025, note: 'Reading and writing cursive by end of grade 5; effective July 1, 2025.', sources: ['https://www.sde.idaho.gov/academic/curriculum/cursive/'] },
  { name: 'Illinois', tier: LAW, citation: '105 ILCS 5/27-20.7 (PA 100-498)', year: 2017, note: 'At least one cursive unit in every public elementary school; veto overridden.', sources: ['https://www.ilga.gov/legislation/publicacts/100/100-0498.htm'] },
  { name: 'Indiana', tier: NONE, citation: '2018 and 2023 laws permit and track cursive; neither requires it', year: null, note: 'Schools may offer cursive and must report offerings to the DOE — not a requirement. Often mislabeled on other trackers.', sources: ['https://iga.in.gov/'], watch: 'SB 58 reintroduced again for 2026' },
  { name: 'Iowa', tier: STANDARDS, citation: 'Iowa Academic Standards (State Board adoption)', year: 2024, note: 'Begins grade 2, proficient by end of grade 3; not a statute.', sources: ['https://educate.iowa.gov/educator-effectiveness/standards'] },
  { name: 'Kansas', tier: STANDARDS, citation: 'State Board resolution + KSDE handwriting guidance', year: 2013, note: 'Encouraged by board policy; district practice varies widely.', sources: ['https://www.ksde.org/'] },
  { name: 'Kentucky', tier: LAW, citation: 'KRS 156.160, as amended by SB 167', year: 2024, note: 'Cursive proficiency by end of grade 5, from 2025–26.', sources: ['https://apps.legislature.ky.gov/record/24rs/sb167.html'] },
  { name: 'Louisiana', tier: LAW, citation: 'La. R.S. 17:266 (Act 346 of 2016)', year: 2016, note: 'Introduced by grade 3 and continued in later grades.', sources: ['https://www.legis.la.gov/legis/Law.aspx?d=101800'] },
  { name: 'Maine', tier: NONE, citation: 'LD 78 (2025) became a DOE data study, not a requirement', year: null, note: 'The 2025 bill was amended into a survey of cursive instruction — no mandate exists. Often mislabeled on other trackers.', sources: ['https://legislature.maine.gov/bills/display_ps.asp?LD=78&snum=132'] },
  { name: 'Maryland', tier: LAW, citation: 'Md. Code, Educ. § 7-502 (SB 961/HB 397)', year: 2019, note: 'Print and cursive in public elementary schools; effective July 1, 2019.', sources: ['https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/SB0961?ys=2019RS'] },
  { name: 'Massachusetts', tier: STANDARDS, citation: 'MA ELA Curriculum Framework (state-added strand)', year: 2017, note: 'Grade 4: "write legibly by hand, using cursive or manuscript" — a state addition beyond Common Core.', sources: ['https://www.doe.mass.edu/elr/'] },
  { name: 'Michigan', tier: NONE, citation: null, year: null, note: 'Legislation pending in the House; nothing enacted as of October 2026.', sources: [], watch: 'House bill advancing (2025–26 session)' },
  { name: 'Minnesota', tier: NONE, citation: 'Requirement removed in 2010; SF 173 not passed', year: null, note: 'A bill to restore cursive (grade 5) has not passed.', sources: ['https://www.revisor.mn.gov/bills/text.php?number=SF173&session_year=2025&session_number=0'], watch: 'SF 173 pending' },
  { name: 'Mississippi', tier: LAW, citation: 'Miss. Code Ann. § 37-13-10', year: 2012, note: 'Reading and writing cursive; readable documents by end of grade 5 (strengthened 2017).', sources: ['https://law.justia.com/codes/mississippi/title-37/chapter-13/section-37-13-10/'] },
  { name: 'Missouri', tier: NONE, citation: null, year: null, note: 'A 2023 bill stalled; no state requirement as of October 2026.', sources: [] },
  { name: 'Montana', tier: NONE, citation: null, year: null, note: 'Public discussion only; no legislation as of October 2026.', sources: [] },
  { name: 'Nebraska', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
  { name: 'Nevada', tier: NONE, citation: null, year: null, note: 'The state teachers association is pushing a grades 2–5 bill; nothing enacted.', sources: ['https://www.nsea-nv.org/'], watch: 'Grades 2–5 bill backed by NSEA (2026)' },
  { name: 'New Hampshire', tier: LAW, citation: 'RSA 189:11-c (HB 170)', year: 2023, note: 'Cursive and multiplication tables before end of grade 5.', sources: ['https://gc.nh.gov/'] },
  { name: 'New Jersey', tier: LAW, citation: 'P.L. 2025, c.284', year: 2026, note: 'Cursive required in grades 3–5; signed January 19, 2026.', sources: ['https://www.njleg.state.nj.us/'] },
  { name: 'New Mexico', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
  { name: 'New York', tier: NONE, citation: null, year: null, note: 'Bills under review; nothing enacted as of October 2026.', sources: [], watch: 'Bills in committee' },
  { name: 'North Carolina', tier: LAW, citation: 'S.L. 2013-71 ("Back to Basics")', year: 2013, note: 'Cursive in the standard course of study; legible writing by grade 5.', sources: ['https://www.ncleg.gov/'] },
  { name: 'North Dakota', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
  { name: 'Ohio', tier: LAW, citation: 'ORC § 3301.0726 (HB 58)', year: 2018, note: 'State model curriculum materials must include cursive instruction.', sources: ['https://codes.ohio.gov/ohio-revised-code/section-3301.0726'] },
  { name: 'Oklahoma', tier: LAW, citation: 'HB 3727', year: 2024, note: 'Public and charter schools, grades 3–5; signed April 22, 2024.', sources: ['https://www.oksenate.gov/'] },
  { name: 'Oregon', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
  { name: 'Pennsylvania', tier: LAW, citation: 'Act 2 of 2026 (HB 17, amending the Public School Code of 1949)', year: 2026, note: 'Writing curriculum must include print, joined italics and cursive — public and private schools; signed February 2026.', sources: ['https://www.legis.state.pa.us/'] },
  { name: 'Rhode Island', tier: NONE, citation: null, year: null, note: 'Left to local districts; no state requirement as of October 2026.', sources: [] },
  { name: 'South Carolina', tier: LAW, citation: 'S.C. Code § 59-29-15', year: 2014, note: 'Cursive and multiplication tables; readable documents by end of grade 5.', sources: ['https://www.scstatehouse.gov/code/t59c029.php'] },
  { name: 'South Dakota', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
  { name: 'Tennessee', tier: LAW, citation: 'T.C.A. § 49-6-1034', year: 2014, note: 'Cursive in the state course of study, completed by grade 3.', sources: ['https://law.justia.com/codes/tennessee/title-49/chapter-6/part-10/section-49-6-1034/'] },
  { name: 'Texas', tier: STANDARDS, citation: 'TEKS ELAR §110.5 (SBOE adoption)', year: 2017, note: 'Cursive words and sentences from grade 3, developed and maintained in grades 4–5; administrative code, not a standalone statute.', sources: ['https://tea.texas.gov/academics/curriculum-standards/'] },
  { name: 'Utah', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
  { name: 'Vermont', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
  { name: 'Virginia', tier: STANDARDS, citation: '2024 English Standards of Learning', year: 2024, note: 'Cursive letters from grade 2, legible cursive maintained by grade 4.', sources: ['https://www.doe.virginia.gov/teaching-learning-assessment/instruction/english-standards-of-learning'] },
  { name: 'Washington', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
  { name: 'West Virginia', tier: LAW, citation: 'W. Va. Code § 18-2-7d', year: 2020, note: 'Cursive required in elementary school; extended into middle grades from 2020.', sources: ['https://code.wvlegislature.gov/18-2-7d/'] },
  { name: 'Wisconsin', tier: NONE, citation: null, year: null, note: 'Assembly bill passed the chamber but not the Senate; watch 2026.', sources: ['https://docs.legis.wisconsin.gov/'], watch: 'AB 3 passed Assembly, awaiting Senate' },
  { name: 'Wyoming', tier: NONE, citation: null, year: null, note: 'No state requirement as of October 2026.', sources: [] },
];

export const TIER_LABEL: Record<StateTier, string> = {
  law: 'Required by state law',
  standards: 'Required by state standards',
  none: 'No state requirement',
};

export const statesPage: PageDef = {
  slug: 'states-that-require-cursive',
  hub: 'cursive',
  h1: 'States That Require Cursive',
  metaTitle: 'Which States Require Cursive in School? 2026 50-State Tracker | ChartGlade',
  metaDescription:
    '50-state cursive law tracker: 19 states require cursive by statute, 8 more by standards — with bill numbers and sources. Updated October 2026.',
  lead:
    'A plain-English tracker of cursive handwriting requirements in all 50 states, current through October 2026. Nineteen states require cursive by law, eight more through state standards — and the lists you see online disagree because most of them mix the two. Each row below carries the bill or standard and a source.',
  introHeading: 'Why the counts you see online don’t agree',
  intro: [
    'Ask how many states require cursive and you will get answers from 21 to 27, all from sources published within the last two years. The gap is almost never an error of counting — it is an error of category. Some states pass an actual law (Alabama’s Lexi’s Law, Pennsylvania’s Act 2 of 2026); others fold cursive into their English standards (Florida’s B.E.S.T., Texas’ TEKS), which binds classrooms without a statute behind it. Trackers that merge the two categories look more current than they are.',
    'Two states get mislabeled over and over. Maine’s 2025 bill was amended into a Department of Education survey of cursive instruction — a study, not a mandate — yet still appears on "new requirement" lists. Indiana’s 2018 law permits schools to teach cursive and its 2023 law asks them to report whether they do; neither requires anything, but the state still shows up as required on several popular trackers. Idaho, which genuinely mandated cursive in 2025, is the one they tend to miss.',
    'The background in one paragraph: the Common Core standards adopted in 2010 left cursive out, and most states quietly dropped it. Since 2013 a bipartisan wave of state laws has brought it back — five new statutes in 2024–2026 alone (Oklahoma and Kentucky in 2024, Idaho in 2025, New Jersey and Pennsylvania in 2026).',
  ],
  extraSection: {
    heading: 'The newest laws, 2024–2026',
    paras: [
      'Five states have signed cursive requirements since 2024, and every one names grades: Oklahoma’s HB 3727 (April 2024, public and charter schools, grades 3–5), Kentucky’s SB 167 (2024, proficient by the end of grade 5 from the 2025–26 year), Idaho’s SB 1044 (effective July 2025, reading and writing by the end of grade 5), New Jersey’s P.L. 2025, c.284 (signed January 19, 2026, grades 3–5) and Pennsylvania’s Act 2 of 2026 (February 2026, public and private schools). Pennsylvania’s is the broadest — it names print, joined italics and cursive and reaches private schools.',
      'The near-misses matter too. Florida’s HB 921 passed the House in 2025 and died in a Senate rules committee — cursive there rests on the B.E.S.T. standards alone. Arizona’s SB 1197 was vetoed in 2019 before the state board wrote cursive into its standards. Wisconsin’s bill has passed the Assembly and waits on the Senate. If your state is on that list, the requirement may be one session away.',
    ],
  },
  printNote: 'Compact 50-state list fits one letter page, portrait.',
  tips: [
    {
      title: 'Check the tier, not just the list',
      body:
        'A statute binds every public school in the state; a standards requirement binds classrooms but usually leaves materials and pacing to districts. If your state is in the standards column, what cursive looks like can still vary by school.',
    },
    {
      title: 'Know the grade to expect it',
      body:
        'The most common window is grades 3–5: introduced around grade 3, legible by the end of grade 5. California starts earlier (grades 1–6); Tennessee finishes earlier (by grade 3). Match the row to your child’s grade before worrying about what the school "isn’t teaching."',
    },
    {
      title: 'Bring the printed list to the meeting',
      body:
        'The compact table above prints on one letter page — useful for PTA meetings, curriculum nights, or a quick check with a teacher. It carries each state’s tier and year, so the conversation starts from the same facts.',
    },
    {
      title: 'Practice doesn’t need the school',
      body:
        'Whether or not your state requires cursive, the printable chart and letter-by-letter worksheets in this section cover the whole alphabet. Ten focused minutes a week outperforms one long worksheet — and left-handed writers need a slanted page, not a different alphabet.',
    },
  ],
  faqs: [
    {
      q: 'How many states require cursive in 2026?',
      a:
        'Twenty-seven: 19 states by statute and 8 more through state English standards, as of October 2026. The distinction matters — see the two tables above for which is which in each state.',
    },
    {
      q: 'What is the difference between required by law and required by standards?',
      a:
        'A law (statute) is passed by the legislature and signed by the governor; it applies statewide and doesn’t depend on the next standards revision. A standards requirement comes from the state board of education and is just as real in the classroom, but it can be revised by the board without a new law. Florida and Texas are the big examples of standards-only states.',
    },
    {
      q: 'Which states passed cursive laws most recently?',
      a:
        'New Jersey (P.L. 2025, c.284, signed January 2026) and Pennsylvania (Act 2 of 2026, February 2026) are the newest, both covering grades 3–5. Before them: Idaho (SB 1044, 2025), Kentucky (SB 167, 2024) and Oklahoma (HB 3727, 2024).',
    },
    {
      q: 'I saw Maine and Indiana on a list of states that require cursive. Do they?',
      a:
        'No. Maine’s 2025 legislation became a Department of Education study of cursive instruction, not a requirement. Indiana’s laws allow schools to teach cursive and require them to report whether they do — permission plus paperwork, not a mandate. Both still appear on several widely-cited trackers, which is one reason the counts you see online disagree.',
    },
    {
      q: 'Do homeschool families have to teach cursive?',
      a:
        'Almost all of these laws name public schools; Pennsylvania’s Act 2 of 2026 is the rare one that reaches private schools too. Homeschool requirements in most states don’t specify handwriting style — but if you file under a state’s homeschool statute, it’s worth one look at your state’s language. Either way, the free chart and worksheets here cover it.',
    },
    {
      q: 'Why did cursive disappear from schools in the first place?',
      a:
        'The Common Core state standards, adopted by most states in 2010, require legible handwriting but do not name cursive — so when states rewrote their standards around Common Core, cursive mostly fell out. The state-law wave since 2013 has been the pushback, and it has continued through 2026.',
    },
    {
      q: 'Which states might require cursive next?',
      a:
        'Wisconsin’s bill has passed the Assembly; Florida’s HB 921 passed the House in 2025 before dying in a Senate committee; bills are also active in Michigan, Minnesota, Nevada and New York. This tracker is updated as laws are signed.',
    },
  ],
  related: [
    { href: '/cursive/', label: 'Cursive & Handwriting hub' },
    { href: '/cursive-alphabet/', label: 'Cursive Alphabet Chart (A–Z)' },
    { href: '/name-tracing/', label: 'Name Tracing Generator' },
    { href: '/alphabet-chart/', label: 'Alphabet Chart' },
  ],
};
