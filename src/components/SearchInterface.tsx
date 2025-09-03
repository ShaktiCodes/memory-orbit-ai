import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, Camera, Brain, Loader2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { searchMemoriesWithGemini, generateMemoryInsight, type SearchResult } from '@/services/geminiApi';
import { useToast } from '@/hooks/use-toast';

export function SearchInterface() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'text' | 'voice' | 'image' | 'concept'>('text');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [insight, setInsight] = useState<string>('');
  const { toast } = useToast();

  const searchTypes = [
    { type: 'text' as const, icon: Search, label: 'Text Search', description: 'Find by keywords' },
    { type: 'voice' as const, icon: Mic, label: 'Voice Search', description: 'Speak your query' },
    { type: 'image' as const, icon: Camera, label: 'Visual Search', description: 'Find similar images' },
    { type: 'concept' as const, icon: Brain, label: 'Concept Search', description: 'Search by meaning' },
  ];

  const suggestions = [
    'Show me notes about project ideas from last summer',
    'Find all pictures of my dog, Max',
    'Find memories that feel inspiring',
    'Photos from my Tokyo trip',
    'Voice memos about dreams',
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty Search",
        description: "Please enter a search query",
      });
      return;
    }

    setIsSearching(true);
    setInsight('');
    
    try {
      const searchResults = await searchMemoriesWithGemini({
        query: query.trim(),
        searchType
      });
      
      setResults(searchResults);
      
      if (searchResults.length > 0) {
        const generatedInsight = await generateMemoryInsight(searchResults);
        setInsight(generatedInsight);
        
        toast({
          title: "Search Complete",
          description: `Found ${searchResults.length} relevant memories`,
        });
      } else {
        toast({
          title: "No Results",
          description: "No memories found for your search query",
        });
      }
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        title: "Search Error",
        description: "Unable to search memories. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    // Auto-search when clicking suggestion
    setTimeout(() => handleSearch(), 100);
  };

  return (
    <motion.div 
      className="glass rounded-2xl p-8 shadow-glass border border-border/20"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="space-y-6">
        {/* Search Type Selector */}
        <div className="flex gap-2 flex-wrap">
          {searchTypes.map((type) => (
            <Button
              key={type.type}
              variant={searchType === type.type ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setSearchType(type.type)}
              className="flex items-center gap-2"
            >
              <type.icon className="h-4 w-4" />
              {type.label}
            </Button>
          ))}
        </div>

        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search your memories with AI-powered understanding..."
            className="pl-12 py-6 text-lg bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20"
            disabled={isSearching}
          />
          <Button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            size="sm"
            onClick={handleSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Search'
            )}
          </Button>
        </div>

        {/* Search Suggestions */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="cursor-pointer hover:bg-secondary/80 transition-colors px-3 py-1"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>

        {/* Current Search Type Info */}
        <motion.div 
          className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
          key={searchType}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {(() => {
            const currentType = searchTypes.find(t => t.type === searchType);
            const Icon = currentType?.icon || Search;
            return (
              <>
                <Icon className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground">{currentType?.label}</h4>
                  <p className="text-sm text-muted-foreground">{currentType?.description}</p>
                </div>
              </>
            );
          })()}
        </motion.div>

        {/* Search Results */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* AI Insight */}
            {insight && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Insight
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{insight}</p>
                </CardContent>
              </Card>
            )}

            {/* Results Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer glass border-border/10">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-medium line-clamp-1">
                          {result.title}
                        </CardTitle>
                        <Badge 
                          variant="outline" 
                          className="ml-2 text-xs"
                        >
                          {Math.round(result.relevance * 100)}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground line-clamp-2">
                        {result.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {result.tags.slice(0, 3).map((tag, idx) => (
                            <Badge 
                              key={idx}
                              variant="secondary" 
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(result.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}