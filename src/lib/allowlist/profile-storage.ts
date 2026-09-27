export type CyborgPunkLocalProfile = {
  walletAddress: string;
  xUsername: string;
  xProfileUrl: string;
  followCompleted: boolean;
  engagementCompleted: boolean;
};

const storageKey = (walletAddress: string) =>
  `cyborgpunk-profile:${walletAddress.toLowerCase()}`;

export function loadCyborgPunkProfile(
  walletAddress: string,
): CyborgPunkLocalProfile | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(storageKey(walletAddress));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CyborgPunkLocalProfile;
  } catch {
    return null;
  }
}

export function saveCyborgPunkProfile(profile: CyborgPunkLocalProfile) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    storageKey(profile.walletAddress),
    JSON.stringify(profile),
  );
}
