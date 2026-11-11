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
  { text: 'It is certain.', tone: 'yes', gloss: 'Stop double-checking. Commit the plan tonight and tell one person so it sticks.' },
  { text: 'It is decidedly so.', tone: 'yes', gloss: 'The evidence has been in for a while — you were just bracing for a plot twist. There is not one.' },
  { text: 'Without a doubt.', tone: 'yes', gloss: 'Move from deciding to scheduling. Doubt was the last real obstacle.' },
  { text: 'Yes — definitely.', tone: 'yes', gloss: 'Say the yes out loud today. Enthusiasm has a shelf life.' },
  { text: 'You may rely on it.', tone: 'yes', gloss: 'Trust it enough to build on: make one arrangement that assumes it works.' },
  { text: 'As I see it, yes.', tone: 'lean-yes', gloss: 'A yes with an asterisk: run it by one person whose judgment you trust.' },
  { text: 'Most likely.', tone: 'lean-yes', gloss: 'Likely is not locked. Do the one thing that would tip it from likely to done.' },
  { text: 'Outlook good.', tone: 'lean-yes', gloss: 'The trend is yours. Keep the streak boring and consistent for two more weeks.' },
  { text: 'Yes.', tone: 'yes', gloss: 'Shortest answer, clearest signal. Act like it is settled, because it is.' },
  { text: 'Signs point to yes.', tone: 'lean-yes', gloss: 'The signals are real but indirect. Ask the direct question you have been avoiding.' },
  { text: 'Reply hazy — try again.', tone: 'neutral', gloss: 'The fog is information: you are missing a fact. Go get the missing piece, not another opinion.' },
  { text: 'Ask again later.', tone: 'neutral', gloss: 'Not never — later. Set an actual date to revisit, then drop it from today’s worry budget.' },
  { text: 'Better not tell you now.', tone: 'neutral', gloss: 'Knowing early would change how you act — and not in a good way. Play your current hand well.' },
  { text: 'Cannot predict now.', tone: 'neutral', gloss: 'The situation is still moving. Wait for one more concrete development before betting.' },
  { text: 'Concentrate and ask again.', tone: 'neutral', gloss: 'The question is fuzzy. Rewrite it so a stranger could answer it — then you might not even need this ball.' },
  { text: 'Don’t count on it.', tone: 'lean-no', gloss: 'Not a verdict on you — on this path. Start a quiet Plan B this week; you will be glad you did.' },
  { text: 'My reply is no.', tone: 'no', gloss: 'A clean no now beats a slow maybe for months. Redirect that energy today.' },
  { text: 'My sources say no.', tone: 'no', gloss: 'The information you have been waiting to confirm is already confirmed. Move on gracefully.' },
  { text: 'Outlook not so good.', tone: 'lean-no', gloss: 'This specific door is sticky. The building has others — walk the hallway before you push harder.' },
  { text: 'Very doubtful.', tone: 'no', gloss: 'Free yourself from this one fully. The relief you will feel is the measure of how long you have been holding it.' },
];
