const GEMINI_API_KEY = 'AIzaSyCrFMLdygt8mu4dYFdGGJC4dMz9xNylmko';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'voice' | 'image' | 'concept';
  relevance: number;
  timestamp: string;
  tags: string[];
}

export interface MemorySearchRequest {
  query: string;
  searchType: 'text' | 'voice' | 'image' | 'concept';
}

export async function searchMemoriesWithGemini(request: MemorySearchRequest): Promise<SearchResult[]> {
  try {
    const searchPrompt = generateSearchPrompt(request);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: searchPrompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    return parseSearchResults(generatedText, request.searchType);
  } catch (error) {
    console.error('Search error:', error);
    return generateFallbackResults(request);
  }
}

function generateSearchPrompt(request: MemorySearchRequest): string {
  const { query, searchType } = request;
  
  const basePrompt = `You are Re:Collect, an AI-powered memory search assistant. Generate realistic search results for the query: "${query}"`;
  
  const typeSpecificPrompts = {
    text: `${basePrompt}
Search Type: Text-based memories (notes, documents, thoughts)
Generate 3-5 relevant text memory results that could exist in someone's personal digital archive.
Format each result as: TITLE: [title] | CONTENT: [preview] | TAGS: [tag1,tag2,tag3] | TIMESTAMP: [date]`,
    
    voice: `${basePrompt}
Search Type: Voice memos and audio recordings
Generate 3-5 relevant voice memo results with transcribed content.
Format each result as: TITLE: [title] | CONTENT: [transcription preview] | TAGS: [tag1,tag2,tag3] | TIMESTAMP: [date]`,
    
    image: `${basePrompt}
Search Type: Visual memories (photos, images, visual content)
Generate 3-5 relevant image/photo results with AI-generated descriptions.
Format each result as: TITLE: [title] | CONTENT: [image description] | TAGS: [tag1,tag2,tag3] | TIMESTAMP: [date]`,
    
    concept: `${basePrompt}
Search Type: Conceptual/emotional search (meaning, sentiment, themes)
Generate 3-5 relevant memories based on conceptual or emotional meaning.
Format each result as: TITLE: [title] | CONTENT: [content preview] | TAGS: [tag1,tag2,tag3] | TIMESTAMP: [date]`
  };

  return typeSpecificPrompts[searchType] || typeSpecificPrompts.text;
}

function parseSearchResults(generatedText: string, searchType: string): SearchResult[] {
  const results: SearchResult[] = [];
  const lines = generatedText.split('\n');
  
  for (const line of lines) {
    if (line.includes('TITLE:') && line.includes('CONTENT:')) {
      try {
        const titleMatch = line.match(/TITLE:\s*([^|]+)/);
        const contentMatch = line.match(/CONTENT:\s*([^|]+)/);
        const tagsMatch = line.match(/TAGS:\s*([^|]+)/);
        const timestampMatch = line.match(/TIMESTAMP:\s*([^|]+)/);
        
        if (titleMatch && contentMatch) {
          results.push({
            id: `result-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: titleMatch[1].trim(),
            content: contentMatch[1].trim(),
            type: searchType as any,
            relevance: Math.random() * 0.4 + 0.6, // 0.6-1.0 relevance
            timestamp: timestampMatch?.[1]?.trim() || new Date().toISOString(),
            tags: tagsMatch?.[1]?.split(',').map(tag => tag.trim()) || []
          });
        }
      } catch (error) {
        console.error('Error parsing result:', error);
      }
    }
  }
  
  // If no results parsed, return fallback
  return results.length > 0 ? results.slice(0, 5) : generateFallbackResults({ query: '', searchType: searchType as any });
}

function generateFallbackResults(request: MemorySearchRequest): SearchResult[] {
  const fallbackResults = {
    text: [
      {
        id: 'fallback-1',
        title: 'Project Ideas Brainstorm',
        content: 'Notes about potential app ideas and startup concepts...',
        type: 'text' as const,
        relevance: 0.85,
        timestamp: '2024-02-15T10:30:00Z',
        tags: ['ideas', 'brainstorm', 'startup']
      }
    ],
    voice: [
      {
        id: 'fallback-2',
        title: 'Morning Thoughts Recording',
        content: 'Voice memo about daily goals and reflections...',
        type: 'voice' as const,
        relevance: 0.78,
        timestamp: '2024-02-14T08:15:00Z',
        tags: ['thoughts', 'morning', 'goals']
      }
    ],
    image: [
      {
        id: 'fallback-3',
        title: 'Sunset at the Beach',
        content: 'Beautiful sunset photo with golden hues and calm waves...',
        type: 'image' as const,
        relevance: 0.92,
        timestamp: '2024-02-10T18:45:00Z',
        tags: ['sunset', 'beach', 'nature']
      }
    ],
    concept: [
      {
        id: 'fallback-4',
        title: 'Inspiring Conversation',
        content: 'Memory of an uplifting talk with a mentor about pursuing dreams...',
        type: 'concept' as const,
        relevance: 0.88,
        timestamp: '2024-02-12T14:20:00Z',
        tags: ['inspiration', 'mentor', 'dreams']
      }
    ]
  };

  return fallbackResults[request.searchType] || fallbackResults.text;
}

export async function generateMemoryInsight(memories: SearchResult[]): Promise<string> {
  try {
    const prompt = `Analyze these search results and provide a brief, insightful summary:
    ${memories.map(m => `${m.title}: ${m.content}`).join('\n')}
    
    Provide a 1-2 sentence insight about patterns, themes, or connections you notice.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No insights available.';
  } catch (error) {
    console.error('Insight generation error:', error);
    return 'Unable to generate insights at this time.';
  }
}