const STORAGE_KEY = "friends";

export async function getFriends(): Promise<string[]> {

  const result =
    await chrome.storage.local.get(
      [STORAGE_KEY]
    );

  return result[STORAGE_KEY] as string[] || [];

}

export async function addFriend(
  username: string
) {

  const friends =
    await getFriends();

  const cleaned =
    username.trim();

  const exists =
    friends.some(
      (f) =>
        f.toLowerCase()
        ===
        cleaned.toLowerCase()
    );

  if (exists) {
    return;
  }

  friends.push(cleaned);

  await chrome.storage.local.set({
    [STORAGE_KEY]: friends,
  });

}

export async function removeFriend(
  username: string
) {

  const friends =
    await getFriends();

  const updated =
    friends.filter(
      (f) =>
        f.toLowerCase() !==
        username.toLowerCase()
    );

  await chrome.storage.local.set({
    [STORAGE_KEY]: updated,
  });

}