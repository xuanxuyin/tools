/**
 * Guide long-copy assembly for the client i18n switch (scripts/i18n.ts).
 *
 * Pure merge of the hand-written dictionary halves — scenario pages (gw.*),
 * outfit pages (ow.*) and mix additiveNote prose (mn.*) for 中文 and 한국어.
 * No data dependencies here: importing scenarios.ts / outfitPalettes.ts /
 * mixes.ts would drag page data into the island bundle. The matching ENGLISH
 * key set is generated programmatically on the test side (i18n.test.ts
 * guideEn()); a guard test fails if either side drifts, so en text never
 * ships in the client bundle while every gw./ow./mn. key the templates emit
 * still resolves.
 */
import { SCENARIO_ZH_A } from './guideZhA';
import { SCENARIO_ZH_B } from './guideZhB';
import { OUTFIT_ZH_A } from './guideOutfitZhA';
import { OUTFIT_ZH_B } from './guideOutfitZhB';
import { SCENARIO_KO_A } from './guideKoA';
import { SCENARIO_KO_B } from './guideKoB';
import { OUTFIT_KO_A } from './guideOutfitKoA';
import { OUTFIT_KO_B } from './guideOutfitKoB';
import { MIX_NOTES } from './mixNotesI18n';

export const GUIDE_TEXTS: Record<'zh' | 'ko', Record<string, string>> = {
  zh: { ...SCENARIO_ZH_A, ...SCENARIO_ZH_B, ...OUTFIT_ZH_A, ...OUTFIT_ZH_B, ...MIX_NOTES.zh },
  ko: { ...SCENARIO_KO_A, ...SCENARIO_KO_B, ...OUTFIT_KO_A, ...OUTFIT_KO_B, ...MIX_NOTES.ko },
};
