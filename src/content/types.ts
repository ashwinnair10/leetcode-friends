export type FriendProfile = {

  username: string;

  avatar: string;

  solved: number;

  easy: number;

  medium: number;

  hard: number;

  rating: number | null;

  reputation: number;

  ranking: number;

  acceptanceRate: number;

  lastSubmittedTime: string | null;

  contestGlobalRank: number | null;

  contestsAttended: number;

  topPercentage: number | null;

  recentSubmissionTitle: string | null;

  recentSubmissionStatus: string | null;

  currentStreak: number;

  activeDays: number;
};