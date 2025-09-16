const BASE_URL = 'http://127.0.0.1:8000';

export const fetchArticles = async (query: string) => {
  const response = await fetch(`${BASE_URL}/api/search?term=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json();
};

export const exploreGraph = async (articleTitle: string, depth: number) => {
  const response = await fetch(`${BASE_URL}/api/explore/${articleTitle}?depth=${depth}`);
  if (!response.ok) {
    throw new Error('Failed to explore graph');
  }
  return response.json();
};

export const saveExploration = async (explorationData: any) => {
  const response = await fetch(`${BASE_URL}/api/explorations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(explorationData),
  });
  if (!response.ok) {
    throw new Error('Failed to save exploration');
  }
  return response.json();
};

export const fetchExplorations = async () => {
  const response = await fetch(`${BASE_URL}/api/explorations`);
  if (!response.ok) {
    throw new Error('Failed to fetch explorations');
  }
  return await response.json();
};

export const deleteExploration = async (explorationId: string) => {
  const response = await fetch(`${BASE_URL}/api/explorations/${explorationId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete exploration');
  }
  return response.json();
};
