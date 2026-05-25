import { useState } from "react";

import type { FriendProfile } from "./types";

type Props = {
  friends: FriendProfile[];
  onAddFriend: () => void;
  onRemoveFriend: (
    username: string
  ) => void;
};

export default function Sidebar({
  friends,
  onAddFriend,
  onRemoveFriend,

}: Props) {

  const [open, setOpen] = useState(false);

  return (
    <>

      {!open && (

        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: "120px",
            right: "30px",

            width: "48px",
            height: "48px",

            borderRadius: "8px",

            border: "none",

            background: "#2a2a2a",

            color: "#ffa116",

            fontWeight: 700,

            fontSize: "12px",

            cursor: "pointer",

            zIndex: 999999,

            boxShadow:
              "0 6px 18px rgba(0,0,0,0.3)",
          }}
        >
          LF
        </button>

      )}

      {open && (

        <div
          style={{
            position: "fixed",

            top: "0",
            right: "0",

            width: "430px",

            height: "100vh",

            background: "#1a1a1a",

            display: "flex",
            flexDirection: "column",

            borderLeft: "1px solid #333",

            zIndex: 999999,

            color: "white",

            boxShadow:
                "-4px 0 18px rgba(0,0,0,0.35)",

            fontFamily:
                "-apple-system, BlinkMacSystemFont, sans-serif",
            }}
        >

          <div
            style={{
              height: "42px",

              borderBottom:
                "1px solid #333",

              display: "flex",

              alignItems: "center",

              justifyContent:
                "space-between",

              padding: "0 16px",
            }}
          >

            <div
              style={{
                fontWeight: 700,
              }}
            >
              Friends
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >

              <button
                onClick={onAddFriend}
                style={{
                  background: "transparent",

                  border: "none",

                  color: "#ffa116",

                  padding:
                    "8px 14px",

                  borderRadius: "8px",

                  cursor: "pointer",

                  fontWeight: 600,
                }}
              >
                + Add Friend
              </button>

              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "transparent",

                  border: "none",

                  color: "#aaa",

                  cursor: "pointer",

                  fontSize: "18px",
                }}
              >
                ✕
              </button>

            </div>

          </div>

          <div
            style={{
              overflowY: "auto",

              height:
                "100%",
                paddingBottom: "20px",
            }}
          >

            {friends.map((friend) => {

                return (

                    <div
                    key={friend.username}
                    style={{
                        display: "flex",

                        gap: "16px",

                        padding: "18px",

                        borderBottom:
                        "1px solid #2a2a2a",

                        color: "white",
                    }}
                    >

                    <img
                        src={friend.avatar}
                        alt={friend.username}
                        style={{
                        width: "64px",

                        height: "64px",

                        borderRadius: "999px",

                        objectFit: "cover",

                        flexShrink: 0,
                        }}
                    />

                    <div
                        style={{
                        flex: 1,

                        display: "flex",

                        flexDirection: "column",

                        gap: "12px",
                        }}
                    >

                        <div
                        style={{
                            display: "flex",

                            justifyContent:
                            "space-between",

                            alignItems:
                            "flex-start",
                        }}
                        >

                        <div>

                            <a
                                href={`https://leetcode.com/u/${friend.username}/`}
                                target="_blank"

                                style={{
                                    fontSize: "18px",

                                    fontWeight: 700,

                                    color: "white",

                                    textDecoration: "none",

                                    cursor: "pointer",
                                }}

                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color =
                                    "#ffa116";
                                }}

                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color =
                                    "white";
                                }}
                                >
                                {friend.username}
                                </a>
                            
                            <div
                                style={{
                                    marginTop: "4px",
                                }}
                                >

                                <button
                                    onClick={() =>
                                    onRemoveFriend(
                                        friend.username
                                    )
                                    }

                                    style={{
                                    background: "transparent",

                                    border: "none",

                                    color: "#ff5c5c",

                                    cursor: "pointer",

                                    fontSize: "12px",

                                    padding: "0",
                                    }}
                                >
                                    Remove Friend
                                </button>

                                </div>

                            <div
                            style={{
                                color: "#888",

                                fontSize: "12px",

                                marginTop: "4px",
                            }}
                            >
                            Last Submit:
                            {" "}
                            {
                                friend.lastSubmittedTime
                                || "N/A"
                            }
                            </div>

                        </div>

                        <div
                            style={{
                            color: "#ffa116",

                            fontSize: "28px",

                            fontWeight: 700,
                            }}
                        >
                            {friend.solved}
                        </div>

                        </div>

                        <div
                        style={{
                            display: "grid",

                            gridTemplateColumns:
                            "repeat(4, 1fr)",

                            gap: "10px",
                        }}
                        >

                        <StatBox
                            label="Easy"
                            value={friend.easy}
                            color="#4ade80"
                        />

                        <StatBox
                            label="Medium"
                            value={friend.medium}
                            color="#facc15"
                        />

                        <StatBox
                            label="Hard"
                            value={friend.hard}
                            color="#f87171"
                        />

                        <StatBox
                            label="Acceptance"
                            value={`${friend.acceptanceRate}%`}
                            color="#60a5fa"
                        />

                        </div>

                        <div
                        style={{
                            display: "flex",

                            flexWrap: "wrap",

                            gap: "14px",

                            fontSize: "12px",

                            color: "#bbb",
                        }}
                        >

                        <div>
                            Rating:
                            {" "}
                            {
                            friend.rating
                                ? friend.rating.toFixed(0)
                                : "-"
                            }
                        </div>

                        <div>
                            Contests:
                            {" "}
                            {
                            friend.contestsAttended
                            }
                        </div>

                        <div>
                            ⭐ Reputation:
                            {" "}
                            {
                            friend.reputation
                            }
                        </div>

                        <div>
                            Ranking:
                            {" "}
                            {
                            friend.ranking
                            }
                        </div>

                        </div>

                        <div
                        style={{
                            background: "#222",

                            padding: "12px",

                            borderRadius: "10px",

                            fontSize: "12px",
                        }}
                        >

                        <div
                            style={{
                            fontWeight: 700,

                            marginBottom: "6px",
                            }}
                        >
                            Recent Submission
                        </div>

                        <div>
                            {
                            friend.recentSubmissionTitle
                            || "No recent submissions"
                            }
                        </div>

                        <div
                            style={{
                            marginTop: "6px",

                            color:
                                friend.recentSubmissionStatus ===
                                "Accepted"
                                ? "#4ade80"
                                : "#f87171",
                            }}
                        >
                            {
                            friend.recentSubmissionStatus
                            || "-"
                            }
                        </div>

                        </div>

                    </div>

                    </div>

                );

                })}

          </div>

        </div>

      )}

    </>
  );
}

type StatBoxProps = {
  label: string;
  value: string | number;
  color: string;
};

function StatBox({
  label,
  value,
  color,
}: StatBoxProps) {

  return (

    <div
      style={{
        background: "#222",

        padding: "10px",

        borderRadius: "10px",
      }}
    >

      <div
        style={{
          color,

          fontWeight: 700,

          fontSize: "12px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: "4px",

          fontSize: "16px",

          color: "white",
        }}
      >
        {value}
      </div>

    </div>

  );
}