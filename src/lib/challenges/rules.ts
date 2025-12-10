// Canonical counts and thresholds for camo unlock flow.
export const MILITARY_CAMO_COUNT = 9;
export const SPECIAL_CAMO_COUNT = 3;
export const MASTERY_CAMO_COUNT = 4;

// Number of weapons in each category that must have Mastery 1 unlocked
// to start unlocking Mastery 2 within that category.
export const MASTERY2_CLASS_REQUIREMENTS: Record<string, number> = {
  SMG: 6,
  "Assault Rifle": 7,
  Shotgun: 3,
  LMG: 2,
  "Marksman Rifle": 3,
  "Sniper Rifle": 3,
  Pistol: 3,
  Launcher: 2,
  Special: 2,
  Melee: 2,
};

// Global thresholds to open later mastery tracks.
export const MASTERY3_GLOBAL_REQUIREMENT = 30; // weapons with Mastery 2
export const MASTERY4_GLOBAL_REQUIREMENT = 30; // weapons with Mastery 3

// Shared gating rules:
// - Military 1-9 must be completed in order to start Special camos.
// - All Special camos must be completed to unlock Mastery 1 on a weapon.
// - Later mastery tiers unlock only after the above class/global thresholds.
