import { motion } from 'framer-motion';
import { Brain, Sparkles, Search, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroGalaxy from '@/assets/hero-galaxy.jpg';
import aiBrain from '@/assets/ai-brain.jpg';

export function HeroSection() {
  const features = [
    {
      icon: Brain,
      title: '3D Memory Galaxy',
      description: 'Navigate your memories in an immersive 3D space where related memories orbit together'
    },
    {
      icon: Search,
      title: 'AI-Powered Search',
      description: 'Find memories by concept, emotion, or visual similarity - not just keywords'
    },
    {
      icon: MessageCircle,
      title: 'Memory Assistant',
      description: 'Chat with AI to explore patterns, generate insights, and rediscover connections'
    },
    {
      icon: Calendar,
      title: 'Time Capsules',
      description: 'Explore "On This Day" memories in interactive 3D time capsules'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Hero Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroGalaxy})` }}
      >
        <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Sparkles className="h-8 w-8 text-primary animate-pulse-glow" />
            <h1 className="text-6xl font-bold bg-cosmic-gradient bg-clip-text text-transparent">
              Re:Collect
            </h1>
            <Sparkles className="h-8 w-8 text-accent animate-pulse-glow" />
          </motion.div>

          <motion.h2
            className="text-2xl text-accent font-medium mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your AI-Powered Second Brain
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            A private, intelligent digital archive that automatically organizes your life's memories—photos, 
            notes, voice memos, and links—making them instantly searchable and meaningful through immersive 
            3D visualization and AI insights.
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Button size="lg" className="bg-cosmic-gradient hover:shadow-cosmic transition-all duration-300">
              <Brain className="mr-2 h-5 w-5" />
              Enter Your Galaxy
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass rounded-xl p-6 text-center hover:shadow-memory transition-all duration-300 memory-node"
              whileHover={{ y: -5 }}
              style={{ animationDelay: `${index * 1.5}s` }}
            >
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-cosmic-gradient flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating AI Brain */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-24 opacity-20"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src={aiBrain} 
          alt="AI Brain" 
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>
    </div>
  );
}