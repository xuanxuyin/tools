/**
 * Magic 8-Ball — the 20 classic answers, each with one coaching gloss
 * (our third layer: answer + why + what to do next).
 */
export type EightTone = 'yes' | 'lean-yes' | 'neutral' | 'lean-no' | 'no';

export interface EightAnswer {
  text: string;
  tone: EightTone;
  gloss: string;
}

export const EIGHT_BALL: EightAnswer[] = [
  { text: 'It is certain.', tone: 'yes', gloss: 'Stop double-checking. Commit tonight and tell one person so it actually sticks.' },
  { text: 'It is decidedly so.', tone: 'yes', gloss: 'The writing has been on the wall for a while — you were bracing for a plot twist. There isn’t one.' },
  { text: 'Without a doubt.', tone: 'yes', gloss: 'Move from deciding to scheduling. Doubt was the last real obstacle, and it just left the room.' },
  { text: 'Yes — definitely.', tone: 'yes', gloss: 'Say the yes out loud today. Enthusiasm has a shelf life, and this one is fresh.' },
  { text: 'You may rely on it.', tone: 'yes', gloss: 'Build on it: make one arrangement — a booking, a deadline, a text — that assumes it works.' },
  { text: 'As I see it, yes.', tone: 'lean-yes', gloss: 'A yes with an asterisk: run it by the one friend whose judgment you actually trust.' },
  { text: 'Most likely.', tone: 'lean-yes', gloss: 'Likely isn’t locked in. Do the one thing that tips it from “probably” to “done”.' },
  { text: 'Outlook good.', tone: 'lean-yes', gloss: 'The trend is yours. Keep the streak boring and consistent for two more weeks.' },
  { text: 'Yes.', tone: 'yes', gloss: 'Shortest answer, clearest signal. Act like it’s settled — because it is.' },
  { text: 'Signs point to yes.', tone: 'lean-yes', gloss: 'The signals are real but sideways. Ask the direct question you’ve been dodging.' },
  { text: 'Reply hazy — try again.', tone: 'neutral', gloss: 'The fog is information: you’re missing a fact. Go get the fact, not another opinion.' },
  { text: 'Ask again later.', tone: 'neutral', gloss: 'Not never — just not now. Put a date on it and take it off today’s worry budget.' },
  { text: 'Better not tell you now.', tone: 'neutral', gloss: 'Knowing early would change how you act, and not in a good way. Play the hand you’re holding.' },
  { text: 'Cannot predict now.', tone: 'neutral', gloss: 'The situation is still moving. Wait for one more concrete development before you bet.' },
  { text: 'Concentrate and ask again.', tone: 'neutral', gloss: 'The question is fuzzy. Rewrite it so a stranger could answer it — you might not need the ball.' },
  { text: 'Don’t count on it.', tone: 'lean-no', gloss: 'That’s a read on this path, not on you. Quietly start a Plan B this week; future you says thanks.' },
  { text: 'My reply is no.', tone: 'no', gloss: 'A clean no now beats a slow maybe for months. Redirect that energy today.' },
  { text: 'My sources say no.', tone: 'no', gloss: 'The thing you’ve been waiting to confirm is confirmed. Move on — gracefully, even.' },
  { text: 'Outlook not so good.', tone: 'lean-no', gloss: 'This one door is sticky. The hallway has others — walk it before you push harder.' },
  { text: 'Very doubtful.', tone: 'no', gloss: 'Let this one go all the way. The relief you’ll feel is a measure of how long you’ve been gripping it.' },
];
