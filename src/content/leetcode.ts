import type { FriendProfile } from "./types";

export async function fetchProfile(
  username: string
): Promise<FriendProfile | null> {

  const query = `
    query userProfile($username: String!) {

      matchedUser(username: $username) {

        username

        profile {
          userAvatar
          reputation
          ranking
          realName
          aboutMe
          starRating
        }

        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }

        badges {
          displayName
          icon
        }

        upcomingBadges {
          name
          icon
        }

        activeBadge {
          displayName
          icon
        }

        userCalendar {
          activeYears
          streak
          totalActiveDays
        }
      }

      recentSubmissionList(username: $username) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
      }

      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage

        badge {
          name
        }
      }

      userContestRankingHistory(username: $username) {
        attended
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking

        contest {
          title
          startTime
        }
      }
    }
  `;

  try {

    const response = await fetch(
      "https://leetcode.com/graphql",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          query,
          variables: {
            username,
          },
        }),
      }
    );

    const json = await response.json();

    if (json.errors) {
      console.error(json.errors);
      return null;
    }

    const user =
      json.data?.matchedUser;

    if (!user) {
      return null;
    }

    const stats =
      user.submitStats
        .acSubmissionNum;

    const getStat = (
      difficulty: string
    ) => {

      return (
        stats.find(
          (s: any) =>
            s.difficulty ===
            difficulty
        ) || null
      );

    };

    const allStats =
      getStat("All");

    const easyStats =
      getStat("Easy");

    const mediumStats =
      getStat("Medium");

    const hardStats =
      getStat("Hard");

    const totalSubmissions =
      allStats?.submissions || 0;

    const acceptedSubmissions =
      allStats?.count || 0;

    const acceptanceRate =
      totalSubmissions > 0
        ? (
            acceptedSubmissions /
            totalSubmissions
          ) * 100
        : 0;

    const recentSubmission =
      json.data
        ?.recentSubmissionList?.[0];

    const lastSubmittedTime =
      recentSubmission?.timestamp
        ? new Date(
            Number(
              recentSubmission.timestamp
            ) * 1000
          ).toLocaleString()
        : null;

    const contestData =
      json.data
        ?.userContestRanking;

    return {

      username,

      avatar:
        user.profile.userAvatar,

      solved:
        allStats?.count || 0,

      easy:
        easyStats?.count || 0,

      medium:
        mediumStats?.count || 0,

      hard:
        hardStats?.count || 0,

      rating:
        contestData?.rating || null,

      reputation:
        user.profile.reputation,

      ranking:
        user.profile.ranking,

      acceptanceRate:
        Number(
          acceptanceRate.toFixed(1)
        ),

      lastSubmittedTime,

      contestGlobalRank:
        contestData?.globalRanking
        || null,

      contestsAttended:
        contestData
          ?.attendedContestsCount
        || 0,

      topPercentage:
        contestData
          ?.topPercentage || null,

      recentSubmissionTitle:
        recentSubmission?.title
        || null,

      recentSubmissionStatus:
        recentSubmission
          ?.statusDisplay || null,

      currentStreak:
        user.userCalendar
          ?.streak || 0,

      activeDays:
        user.userCalendar
          ?.totalActiveDays || 0,
    };

  } catch (err) {

    console.error(err);

    return null;
  }
}