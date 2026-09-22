export const CYBORGPUNK_ADMIN_WALLET =
  "0x62E9F0Aa55Bfdc58A7C34A144C2FE199Bf6Da5Dc" as const;

export const CYBORGPUNK_PROFILE_LABEL = "CYBORGPUNK PROFILE";

export type AllowlistStatus = "not_registered" | "pending" | "eligible";

export type AllowlistProfile = {
  walletAddress: string;
  xUsername: string;
  followCompleted: boolean;
  engagementCompleted: boolean;
  status: AllowlistStatus;
  createdAt: string;
  updatedAt: string;
};
