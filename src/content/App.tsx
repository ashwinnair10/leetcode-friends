import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";

import {
  addFriend,
  getFriends,
  removeFriend as removeFriendStorage
} from "./storage";

import { fetchProfile } from "./leetcode";

import type { FriendProfile } from "./types";

export default function App() {

  const [friends, setFriends] = useState<FriendProfile[]>([]);

  async function loadFriends() {

    const usernames = await getFriends();

    const profiles = await Promise.all(

      usernames.map((username) =>
        fetchProfile(username)
      )

    );

    setFriends(
      profiles.filter(
        (p): p is FriendProfile => p !== null
      )
    );
  }

  async function handleAddFriend() {

    const username = prompt(
      "Enter LeetCode username"
    );

    if (!username) {
      return;
    }

    const cleaned =
    username.trim();
    if (!cleaned.length) {
      alert("Invalid username");
      return;
    }

    const alreadyExists =
      friends.some(
        (f) =>
          f.username.toLowerCase()
          ===
          cleaned.toLowerCase()
      );

    if (alreadyExists) {

      alert(
        "Friend already added"
      );

      return;
    }

    const profile =
      await fetchProfile(
        cleaned
      );

    if (!profile) {

      alert(
        "LeetCode user not found"
      );

      return;
    }

    await addFriend(username);

    await loadFriends();
  }

  async function removeFriend(
    username: string
  ) {

    await removeFriendStorage(
      username
    );

    await loadFriends();

  }

  useEffect(() => {

    loadFriends();

    const interval =
      setInterval(() => {

        loadFriends();

      }, 60000);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <Sidebar
      friends={friends}
      onAddFriend={handleAddFriend}
      onRemoveFriend={removeFriend}
    />
  );
}