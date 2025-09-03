import { HeroSection } from '@/components/HeroSection';
import { MemoryGalaxy } from '@/components/MemoryGalaxy';
import { SearchInterface } from '@/components/SearchInterface';
import { AIAssistant } from '@/components/AIAssistant';
import { motion } from 'framer-motion';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Search Interface */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-cosmic-gradient bg-clip-text text-transparent">
              Multimodal Lifeline Search
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Search your memories with AI understanding - find by concept, emotion, or visual similarity
            </p>
          </div>
          <SearchInterface />
        </motion.section>

        {/* 3D Memory Galaxy */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-cosmic-gradient bg-clip-text text-transparent">
              Your Memory Galaxy
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Navigate your memories in 3D space where semantically related memories orbit closer together
            </p>
          </div>
          <div className="glass rounded-2xl overflow-hidden shadow-glass border border-border/20">
            <MemoryGalaxy className="h-[600px] w-full" />
          </div>
        </motion.section>

        {/* AI Features Preview */}
        <motion.section
          className="text-center py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 bg-cosmic-gradient bg-clip-text text-transparent">
            Powered by Advanced AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-2 text-foreground">Auto-Processing</h3>
              <p className="text-sm text-muted-foreground">
                Every memory is automatically tagged, transcribed, and summarized by Gemini AI
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-2 text-foreground">Smart Clustering</h3>
              <p className="text-sm text-muted-foreground">
                AI groups related memories into storylines and thematic collections
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold mb-2 text-foreground">Natural Queries</h3>
              <p className="text-sm text-muted-foreground">
                Ask questions about your memories in natural language and get insights
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Index;
