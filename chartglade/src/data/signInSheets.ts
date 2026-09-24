/**
 * V1.8 sign-in sheet family (PLAN §2: ≈10.7K/mo combined, KD 4~31,
 * measured 2026-09-06). Five teacher-scene variants + the hub. Copy is the
 * anti-thin-content layer — every page carries its own teaching-record
 * expertise, not a reworded template.
 */
import type { PageDef } from './pageTypes';

/** Physical layout per page — column sets are the actual product. */
export interface SheetLayout {
  columns: string[];
  metaFields: string[];
  rows: number;
  dense?: boolean;
}

export const SHEET_LAYOUTS: Record<string, SheetLayout> = {
  'sign-in-sheet': {
    columns: ['Name', 'Time in', 'Time out', 'Signature'],
    metaFields: ['Teacher', 'Date', 'Room / event'],
    rows: 22,
  },
  'open-house-sign-in-sheet': {
    columns: ['Parent / guardian', 'Student(s)', 'Email', 'Phone'],
    metaFields: ['Teacher / team', 'Grade / room', 'Date'],
    rows: 18,
  },
  'parent-teacher-conference-sign-in-sheet': {
    columns: ['Time', 'Parent / guardian', 'Student', 'Signature'],
    metaFields: ['Teacher', 'Room', 'Date'],
    rows: 16,
  },
  'field-trip-sign-in-sheet': {
    columns: ['Student', 'Room / grade', 'Emergency contact phone', 'Medication / notes'],
    metaFields: ['Destination', 'Date', 'Depart / return', 'Teacher'],
    rows: 26,
    dense: true,
  },
  'volunteer-sign-in-sheet': {
    columns: ['Date', 'Volunteer name', 'Time in', 'Time out', 'Total hours'],
    metaFields: ['School / program', 'Room', 'Coordinator'],
    rows: 20,
  },
};

export const signInSheetPages: PageDef[] = [
  {
    slug: 'sign-in-sheet',
    hub: 'sign-in-sheets',
    h1: 'Sign-In Sheet',
    metaTitle: 'Sign-In Sheet Template — Free Printable | ChartGlade',
    metaDescription:
      'Free printable sign-in sheet for classrooms — name, time in, time out, signature columns on one letter page. Print from your browser, no sign-up.',
    lead:
      'The plain classroom workhorse: who came, when, and a signature to prove it. Twenty-two rows on one letter page — print a stack, clip one to a clipboard, and the sheet runs tardy check-in, parent meetings, tutoring logs and library visits without a single app.',
    introHeading: 'What a classroom sign-in sheet is actually for',
    intro: [
      "A sign-in sheet is the paper interface between your room and the school's systems. Official attendance lives in the student information system, but half of what happens in a classroom is arrival-adjacent: the student who walks in twelve minutes late with a pass from the dentist, the parent who drops by during planning period, the tutoring group that meets Tuesdays after last bell. Each of those events wants a row — name, time in, time out, a signature — because in a school, if it isn't written down, it didn't happen.",
      "Paper wins at the classroom door for the same reasons it wins elsewhere on this site: it works while you're mid-sentence, it never needs a charged device handed across the room, and a substitute can run it without a login. The signature column earns its space on anything involving a parent or a visitor — it turns a list into a record.",
    ],
    printNote: 'One letter page, portrait. Rows are sized for adult handwriting.',
    tips: [
      {
        title: 'Keep it on a clipboard by the door',
        body: "The clipboard is the whole system: sheet, pen, fixed spot. Train the routine once — sign in, then sit — and tardy students self-process while you keep teaching.",
      },
      {
        title: 'Use time-in to find the pattern',
        body: 'Three weeks of time-in entries will show you that the same student is late after gym every Tuesday. One-off lateness is noise; a column full of 9:40s is a conversation with a schedule.',
      },
      {
        title: 'Leave a fresh sheet for substitutes',
        body: 'A blank sign-in sheet in the sub folder tells them you expect a record of the day, and gives you a true account of who came through when you return.',
      },
      {
        title: 'Reconcile with the office weekly',
        body: "Five minutes on Friday matching your sheet against the office's attendance list catches coding errors while they're still fixable. Classroom log plus office record is the audit trail.",
      },
    ],
    faqs: [
      {
        q: 'What columns should a sign-in sheet have?',
        a: 'Four is the working set: name, time in, time out, and a signature. Add a fifth only when the event needs it — a reason column for tardy check-in, a destination column for students leaving the room. More columns means slower lines.',
      },
      {
        q: 'Is a sign-in sheet the same as attendance?',
        a: "No — official attendance is recorded in the school's student information system, and that's the number the state counts. The sign-in sheet is the classroom-level paper trail underneath it: late arrivals, visitors, tutoring, meetings. Keep both; they back each other up.",
      },
      {
        q: 'Can I use this as a visitor sign-in sheet?',
        a: 'Yes — the same four columns run a front-office or classroom visitor log (name, time in, time out, signature). Many schools require visitors to sign in as a safety policy; this sheet does that job without asking anything of the visitor but a pen.',
      },
      {
        q: 'How long should I keep completed sheets?',
        a: 'At least the school year. Anything with parent signatures — meetings, conferences — is worth keeping a year beyond that. Check your district’s records policy; when in doubt, file rather than shred.',
      },
    ],
    related: [
      { href: '/open-house-sign-in-sheet/', label: 'Open house sign-in sheet' },
      { href: '/parent-teacher-conference-sign-in-sheet/', label: 'Parent-teacher conference sign-in sheet' },
      { href: '/volunteer-sign-in-sheet/', label: 'Volunteer sign-in sheet' },
      { href: '/sign-in-sheets/', label: 'All sign-in sheets' },
    ],
  },
  {
    slug: 'open-house-sign-in-sheet',
    hub: 'sign-in-sheets',
    h1: 'Open House Sign-In Sheet',
    metaTitle: 'Open House Sign-In Sheet (Free Printable) | ChartGlade',
    metaDescription:
      'Free printable open house sign-in sheet — parent, student, email and phone on one letter page. Build your class contact list on meet-the-teacher night.',
    lead:
      'Eighteen rows on one letter page: parent, student, email, phone. Put it on the table by the door with two pens, and by the end of the evening you have the beginnings of your class contact list — the one the room parent, the newsletter, and the November conference schedule all run on.',
    introHeading: 'The sheet that turns one evening into a year of communication',
    intro: [
      'Open house is the whole class in the room at once — families circulating, questions flying, no time to interview anyone. The sign-in sheet does the interviewing for you: as families sign in, you capture the two names that matter (who is the adult, who is the student) and the two channels that matter (email and phone) without a single form sent home and lost in a backpack.',
      'Email and phone on one sheet is deliberate. Districts send the official robo-calls, but teachers know the real channel mix: some families live in email, others answer calls and texts and never open inboxes. Capturing both on night one means October’s quick question about the field trip reaches everyone instead of the half who happened to sign up for the app.',
    ],
    printNote: 'One letter page, portrait. Eighteen rows, sized for parents writing in a crowd.',
    tips: [
      {
        title: 'Two pens, minimum',
        body: 'One pen at a sign-in table is a line. Two pens halve it; a cup of four ends it. Pens walk — the cheap ones walk slower.',
      },
      {
        title: 'Draw a winner from the sheet',
        body: 'A raffle at the end of the night — a book, classroom privileges — drawn from completed rows is the oldest trick for getting full columns instead of half-scrawled names.',
      },
      {
        title: 'Follow up within 48 hours',
        body: 'A short great-to-meet-you email to the addresses you just collected, while faces are still fresh. Families who get a personal note in week one answer in week forty.',
      },
      {
        title: 'Digitize the same week',
        body: 'Type the sheet into your contact group before the paper curls. An open house contact list entered in September is a November conference schedule that schedules itself.',
      },
    ],
    faqs: [
      {
        q: 'What columns does an open house sign-in sheet need?',
        a: 'Parent or guardian name, student name, email, phone. That set answers who came, whose adult they are, and how to reach them — in one row. Add a how-did-you-hear or room-parent-interest column only if you will actually use the answers.',
      },
      {
        q: 'How is open house different from parent-teacher conferences?',
        a: 'Open house is the whole-class open door at the start of the year: everyone at once, a few minutes per family, no grades on the table. Conferences are scheduled one-on-ones, usually mid-fall and spring, with real progress to discuss. The sheets differ too: open house captures contacts; a conference sheet tracks arrivals and time slots.',
      },
      {
        q: 'Should students come to open house?',
        a: 'Elementary open houses are family events — students typically attend and tour their families around the room. The sign-in sheet still records the adult, because the adult is the one your classroom communication runs through.',
      },
      {
        q: 'How do I use the contact information afterward?',
        a: 'For class communication only: newsletters, conference scheduling, room-parent recruitment. Follow your district’s policy on storing parent contacts, and keep the completed sheet out of student hands — it carries names, emails and phone numbers on one page.',
      },
    ],
    related: [
      { href: '/sign-in-sheet/', label: 'Plain sign-in sheet template' },
      { href: '/parent-teacher-conference-sign-in-sheet/', label: 'Parent-teacher conference sign-in sheet' },
      { href: '/volunteer-sign-in-sheet/', label: 'Volunteer sign-in sheet' },
      { href: '/sign-in-sheets/', label: 'All sign-in sheets' },
    ],
  },
  {
    slug: 'parent-teacher-conference-sign-in-sheet',
    hub: 'sign-in-sheets',
    h1: 'Parent-Teacher Conference Sign-In Sheet',
    metaTitle: 'Parent-Teacher Conference Sign-In Sheet | ChartGlade',
    metaDescription:
      'Free printable parent-teacher conference sign-in sheet — time slots, parent and student names on one letter page for conference night. No sign-up.',
    lead:
      'Conference night runs on time slots and hallway order. Sixteen rows — time, parent, student, signature — so you can see at a glance who arrived, who is waiting, and who needs a follow-up slot.',
    introHeading: 'Conference night, kept honest by a clipboard',
    intro: [
      'Parent-teacher conferences compress twenty-five conversations into an evening, and the first casualty is the schedule. The sign-in sheet is the referee: parents sign in on arrival, the time column shows whether the 3:40 slot is in the room or still in the hallway, and a signature row per conference quietly settles later questions about who met with whom and when.',
      'The sheet also earns its keep after the night ends. Which families came is one of the most-requested numbers in fall data — schools pull conference participation for Title I documentation and improvement plans, and a signed, dated sheet is the record that survives staff turnover. Mark the no-shows in the margin, and the follow-up list writes itself.',
    ],
    printNote: 'One letter page, portrait. Sixteen rows fits an evening of 15-minute slots.',
    tips: [
      {
        title: 'Pre-fill the time column',
        body: 'If conferences are scheduled in advance, write the slot times down the left column before the night starts. Arrival becomes a checkmark instead of a conversation, and parents can see their place in the queue.',
      },
      {
        title: 'Keep the table outside the room',
        body: 'A desk in the hallway with the sheet — staffed by a volunteer from the volunteer log — keeps the line out of your doorway and gives waiting parents somewhere to be.',
      },
      {
        title: 'Mark no-shows for the follow-up list',
        body: 'A dash through an empty row at 8pm is tomorrow’s email: sorry we missed each other, here are three new times. No-shows who get a fast, warm reschedule usually become shows.',
      },
      {
        title: 'Star the rows that need an interpreter',
        body: 'A pencil star next to families who requested interpretation lets you match interpreters to slots before the night instead of scrambling in the hallway.',
      },
    ],
    faqs: [
      {
        q: 'What columns does a conference sign-in sheet need?',
        a: 'Time, parent or guardian name, student name, and a signature. The time column is the working one — it aligns the hallway queue with your schedule. A notes margin in pencil absorbs real conference nights: needs interpreter, came at 5:10, squeezed in.',
      },
      {
        q: 'How do walk-ins work?',
        a: 'Give them the first open slot and write it in; if the night is full, take a name and number on the same sheet and schedule from it. A walk-in with a name and phone number on paper is a conference that will happen.',
      },
      {
        q: 'Does this work for virtual conferences?',
        a: 'Yes, repurposed: keep the same columns and log completed video calls as rows — time held, parent, student, and your initials where the signature goes. The record-keeping value is identical even when the hallway isn’t there.',
      },
      {
        q: 'Who keeps the sheet afterward?',
        a: 'You do, with a copy to the office if your school tracks conference participation for Title I or improvement-plan documentation. Filed with your conference notes, it is the attendance record for the entire night.',
      },
    ],
    related: [
      { href: '/open-house-sign-in-sheet/', label: 'Open house sign-in sheet' },
      { href: '/sign-in-sheet/', label: 'Plain sign-in sheet template' },
      { href: '/volunteer-sign-in-sheet/', label: 'Volunteer sign-in sheet' },
      { href: '/sign-in-sheets/', label: 'All sign-in sheets' },
    ],
  },
  {
    slug: 'field-trip-sign-in-sheet',
    hub: 'sign-in-sheets',
    h1: 'Field Trip Sign-In Sheet',
    metaTitle: 'Field Trip Sign-In Sheet (Free Printable Roster) | ChartGlade',
    metaDescription:
      'Free printable field trip sign-in sheet — student roster with emergency contacts and medication notes, one letter page to carry on the clipboard.',
    lead:
      'The roster that rides the clipboard: twenty-six student rows with emergency contacts and medication notes, so the count, the contacts and the health flags travel wherever the class does.',
    introHeading: 'A sign-in sheet built to leave the building',
    intro: [
      'A field trip sheet has a harder job than its classroom cousins. It leaves the building, it gets read in a noisy bus line and a museum lobby, and the emergency-contact column is not decorative — it is the fastest phone number on the trip. Students down the left, room or grade beside them, contact phone and medication notes across the row: one page answers who, from where, call whom, and watch for what.',
      'It doubles as the count. Head counts at every transition — bus, gate, lunch, bus home — are checked against the roster, not against memory. Twenty-six rows covers a typical class; print two sheets and a chaperone group list rides the same clipboard.',
    ],
    printNote: 'One letter page, portrait. Twenty-six rows — a full class roster.',
    tips: [
      {
        title: 'Count against the sheet, not from memory',
        body: 'Every transition gets a count checked against the roster: on the bus, off the bus, through the gate, at lunch, back on. We had twenty-six is a memory; the roster with checkmarks is a count.',
      },
      {
        title: 'Keep medication notes discreet',
        body: "Use initials or your own shorthand for health flags rather than full details — the sheet gets handled by chaperones and shown to venue staff. The nurse's official action plan stays with the first-aid kit; the roster just says who has one.",
      },
      {
        title: 'Chaperones sign a row too',
        body: 'Add your chaperones at the bottom of the roster or on a second sheet with the same columns. On the return count, adults are heads too — and a chaperone row is how you know the group is complete.',
      },
      {
        title: 'Print two copies before departure',
        body: 'One rides the clipboard, one stays at school with the office. If the clipboard is lost on the bus, the roster — and every phone number on it — still exists.',
      },
    ],
    faqs: [
      {
        q: 'What columns does a field trip sign-in sheet need?',
        a: 'Student name, room or grade, emergency contact phone, and a notes column for medication and health flags. Teacher and destination go in the header fields so the sheet identifies itself if it is ever separated from you.',
      },
      {
        q: 'Does this replace permission slips?',
        a: 'No — permission slips are the legal consent to travel and to treat, collected before the trip and filed at the office. The sign-in sheet is the day-of roster: who actually rode the bus, who to call, what to watch for. Trips need both papers.',
      },
      {
        q: 'How do I run check-in on the day?',
        a: 'Attendance before departure against the roster, a count at every transition, and a final count walking back into the building. Mark each check in the margin beside the name — pencil, because the bus is bumpy.',
      },
      {
        q: 'What about chaperone groups?',
        a: 'Split the roster into chaperone groups before the trip and write group numbers next to names; each chaperone then counts against their slice of the sheet. Same roster, distributed ownership.',
      },
    ],
    related: [
      { href: '/sign-in-sheet/', label: 'Plain sign-in sheet template' },
      { href: '/volunteer-sign-in-sheet/', label: 'Volunteer sign-in sheet (chaperone hours)' },
      { href: '/parent-teacher-conference-sign-in-sheet/', label: 'Parent-teacher conference sign-in sheet' },
      { href: '/sign-in-sheets/', label: 'All sign-in sheets' },
    ],
  },
  {
    slug: 'volunteer-sign-in-sheet',
    hub: 'sign-in-sheets',
    h1: 'Volunteer Sign-In Sheet',
    metaTitle: 'Volunteer Sign-In Sheet (Free Printable Log) | ChartGlade',
    metaDescription:
      'Free printable volunteer sign-in sheet — date, time in, time out and total hours columns to track school volunteer hours all year. No sign-up.',
    lead:
      'Twenty rows, one per visit: date, volunteer name, time in, time out, total hours. The unglamorous log that turns a year of helping into a number the school can report.',
    introHeading: 'Why volunteer hours are worth writing down',
    intro: [
      'Schools report volunteer hours because hours are the currency of credibility: grant applications ask for the number, district and PTA award programs count it, and a parent group arguing for a program’s budget is stronger with 1,400 logged hours behind it than with lots of parents help out. None of that works retroactively — nobody reconstructs a year of Thursday-morning reading buddies from memory. One line per visit, and the number assembles itself.',
      'The total-hours column is the quiet workhorse. In-and-out times capture the visit; the running total spares someone a spreadsheet session in June. A coordinator who can say you gave 62 hours this year in a thank-you note keeps volunteers coming back — being counted is most of the recognition.',
    ],
    printNote: 'One letter page, portrait. Twenty rows — one per visit, all year.',
    tips: [
      {
        title: 'One sheet, one fixed spot, all year',
        body: 'The log works only if it is where the volunteers are: the front office, the classroom shelf, the media center desk. A sheet that moves is a sheet nobody signs.',
      },
      {
        title: 'Let volunteers do the math',
        body: 'The total-hours column is theirs to fill, and they are better at remembering their in-time at 2:30 than you are. Your job is the pen and the thank-you note.',
      },
      {
        title: 'Tally monthly, not yearly',
        body: 'Ten minutes at month’s end keeps the year’s number current and catches reporting deadlines — grant and award applications have a way of arriving with a one-week fuse.',
      },
      {
        title: 'Treat it like the record it is',
        body: 'The sheet has names and patterns of presence; store it clipped inside a folder, not face-up on a counter. When the year closes, hand the totals to whoever reports them and start a fresh sheet.',
      },
    ],
    faqs: [
      {
        q: 'Why do schools track volunteer hours?',
        a: 'Three reasons, all real: grant applications and Title I family-engagement documentation ask for the number, state and PTA award programs are calculated from it, and the total is the evidence behind budget conversations. The log is where the number comes from.',
      },
      {
        q: 'What columns does a volunteer sign-in sheet need?',
        a: 'Date, volunteer name, time in, time out, total hours. That is the whole working set. Add a role or task column only if your program reports by activity — reading buddy versus field trip chaperone, say.',
      },
      {
        q: 'Does one sheet work for room parents and one-time event helpers?',
        a: 'Yes — one row per visit handles both. The room parent who comes weekly fills twenty rows; the field-day helper fills one. Same sheet, same math, and the mix itself is useful to see.',
      },
      {
        q: 'How long should we keep volunteer logs?',
        a: 'The school year plus one, matched to your district’s records policy — hours tied to grants may need to survive an audit window. The June handoff is the natural moment: totals reported, sheet filed, fresh sheet in the folder.',
      },
    ],
    related: [
      { href: '/sign-in-sheet/', label: 'Plain sign-in sheet template' },
      { href: '/open-house-sign-in-sheet/', label: 'Open house sign-in sheet' },
      { href: '/field-trip-sign-in-sheet/', label: 'Field trip sign-in sheet' },
      { href: '/sign-in-sheets/', label: 'All sign-in sheets' },
    ],
  },
];
