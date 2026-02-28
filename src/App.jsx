/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGame = () => {
    setSelectedGame(null);
    setIsFullscreen(false);
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-panel px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setSelectedGame(null)}
        >
          <div className="bg-emerald-500 p-2 rounded-lg">
            <Gamepad2 className="w-6 h-6 text-black" />
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block">
            UNBLOCKED<span className="text-emerald-500">GAMES</span>
          </h1>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-zinc-800/50 border border-white/5 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden md:block">
            v1.0.0
          </span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={closeGame}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Library
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <a
                    href={selectedGame.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                    title="Open in New Tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={closeGame}
                    className="p-2 rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div 
                className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
                  isFullscreen ? 'fixed inset-0 z-[100] rounded-none' : 'aspect-video w-full'
                }`}
              >
                {isFullscreen && (
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 z-[110] p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-0"
                  allow="fullscreen"
                  title={selectedGame.title}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
                <div>
                  <h2 className="text-3xl font-bold">{selectedGame.title}</h2>
                  <p className="text-zinc-500 mt-1">Playing on Unblocked Games Hub</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider">
                    Instant Play
                  </span>
                  <span className="px-3 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs font-bold uppercase tracking-wider">
                    Web
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <header className="mb-12">
                <h2 className="text-4xl font-bold tracking-tight mb-2">Game Library</h2>
                <p className="text-zinc-500">Discover and play your favorite unblocked games.</p>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer"
                    onClick={() => handleGameSelect(game)}
                  >
                    <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-3 bg-zinc-900">
                      <img
                        src={game.thumbnail}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="bg-emerald-500 text-black px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                          <Gamepad2 className="w-4 h-4" />
                          Play Now
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-emerald-500 transition-colors">
                      {game.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                        Category: Arcade
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-20">
                  <div className="bg-zinc-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-zinc-700" />
                  </div>
                  <h3 className="text-xl font-bold">No games found</h3>
                  <p className="text-zinc-500 mt-2">Try searching for something else.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-emerald-500 hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-20 border-t border-white/5 py-12 px-6 text-center text-zinc-600">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gamepad2 className="w-5 h-5" />
          <span className="font-bold text-zinc-400">Unblocked Games Hub</span>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Built for fun. No tracking, no ads.</p>
      </footer>
    </div>
  );
}
