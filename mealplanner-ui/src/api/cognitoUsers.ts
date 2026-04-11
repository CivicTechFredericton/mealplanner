import { fetchAuthSession } from "aws-amplify/auth";

const getBackendBase = () => {
  const graphqlEndpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT || "/graphql";
  return graphqlEndpoint.replace(/\/graphql$/, "");
};

export async function fetchAllCognitoUsers(): Promise<{ uuid: string; displayName: string; slug: string }[]> {
  try {
    const response = await fetch(`${getBackendBase()}/cognito-users`, {
      credentials: "include",
    });
    if (!response.ok) {
      console.error("Failed to fetch all Cognito users:", response.status);
      return [];
    }
    return response.json();
  } catch (err) {
    console.error("Failed to fetch all Cognito users:", err);
    return [];
  }
}

export async function fetchCognitoUserNames(uuids: string[]): Promise<Record<string, string>> {
  if (uuids.length === 0) return {};

  const headers: Record<string, string> = { "Content-Type": "application/json" };

  try {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString();
    if (idToken) {
      headers["Authorization"] = `Bearer ${idToken}`;
    }
  } catch (_) {}

  const response = await fetch(`${getBackendBase()}/cognito-users`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({ uuids }),
  });

  if (!response.ok) {
    console.error("Failed to fetch Cognito user names:", response.status);
    return {};
  }

  return response.json();
}
