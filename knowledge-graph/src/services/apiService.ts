export const fetchArticles = async (query: string) => {
  const response = await fetch(`/api/search?term=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json();
};

export const exploreGraph = async (articleTitle: string, depth: number) => {
  const response = await fetch(`/api/explore/${articleTitle}?depth=${depth}`);
  if (!response.ok) {
    throw new Error('Failed to explore graph');
  }
  return response.json();
};

export const saveExploration = async (explorationData: any) => {
  const response = await fetch('/api/explorations', {
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

export const deleteExploration = async (explorationId: string) => {
  const response = await fetch(`/api/explorations/${explorationId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete exploration');
  }
  return response.json();
};
