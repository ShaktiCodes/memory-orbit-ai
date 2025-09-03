import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, Camera, Brain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function SearchInterface() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'text' | 'voice' | 'image' | 'concept'>('text');

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
            placeholder="Search your memories with AI-powered understanding..."
            className="pl-12 py-6 text-lg bg-input/50 border-border/30 focus:border-primary/50 focus:ring-primary/20"
          />
          <Button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            size="sm"
          >
            Search
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
                onClick={() => setQuery(suggestion)}
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
      </div>
    </motion.div>
  );
}