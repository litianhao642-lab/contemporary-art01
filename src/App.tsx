/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Play, Pause, Upload, Video as VideoIcon, Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [statementImg, setStatementImg] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [galleryImg, setGalleryImg] = useState<string | null>(null);
  const [extraImg, setExtraImg] = useState<string | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStatementUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setStatementImg(URL.createObjectURL(file));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideoSrc(URL.createObjectURL(file));
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setGalleryImg(URL.createObjectURL(file));
  };

  const handleExtraUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setExtraImg(URL.createObjectURL(file));
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlayingMusic(!isPlayingMusic);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F9F9F9] text-[#1A1A1A] font-sans overflow-hidden flex flex-col p-10 grid-background">
      <div className="noise-overlay" />
      
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        className="hidden"
      />

      {/* Header Section */}
      <header className="flex justify-between items-baseline mb-12 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-black uppercase tracking-[0.4em] leading-none text-black"
        >
          Contemporary Art
        </motion.h1>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Live Portfolio</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Design Studio v.2.0</span>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-12 gap-12 items-stretch relative z-10 overflow-hidden">
        
        {/* LEFT: A4 Landscape Artist Statement & Secondary Image */}
        <section className="col-span-8 flex flex-col gap-8 h-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="relative group flex-1"
          >
            <div className="aspect-[1.414/1] w-full max-h-[70vh] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col overflow-hidden transition-all duration-500 group-hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.15)] mx-auto relative cursor-default">
              {statementImg ? (
                <img 
                  src={statementImg} 
                  alt="Artist Statement" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex-1 flex flex-col p-12">
                  <div className="w-16 h-[3px] bg-black mb-8"></div>
                  <h2 className="text-4xl font-serif italic mb-6 tracking-tight text-gray-800">Artist Statement</h2>
                  <div className="space-y-4 max-w-xl opacity-40 text-sm">
                    <p className="leading-relaxed tracking-wide">
                      Upload your horizontal (A4) statement image here. This layout is designed to mirror professional gallery documentation.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center backdrop-blur-sm">
                <label className="cursor-pointer px-10 py-4 border-2 border-black text-[12px] uppercase tracking-widest font-black hover:bg-black hover:text-white transition-all transform group-hover:scale-105">
                  {statementImg ? 'Change Statement' : 'Upload A4 Statement'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleStatementUpload} />
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-black opacity-20 px-2">
              <span>Primary Exhibit 01</span>
              <span>Metric Ratio 210 : 297</span>
            </div>
          </motion.div>

          {/* Bottom Left: New Secondary Image Slot */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-32 border border-gray-100 rounded-sm flex items-center justify-center group overflow-hidden bg-white shadow-sm relative"
          >
            {extraImg ? (
              <img src={extraImg} className="w-full h-full object-cover" alt="Detail" referrerPolicy="no-referrer" />
            ) : (
              <div className="text-center">
                 <div className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-200 group-hover:text-black transition-colors">
                   Additional Detail View
                 </div>
              </div>
            )}
            <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <label className="cursor-pointer px-5 py-2 border border-black text-[9px] uppercase tracking-widest font-black transition-all">
                {extraImg ? 'Change' : 'Insert Detail Image'}
                <input type="file" className="hidden" accept="image/*" onChange={handleExtraUpload} />
              </label>
            </div>
          </motion.div>
        </section>

        {/* RIGHT: Video & Image Slots */}
        <section className="col-span-4 flex flex-col gap-10 h-full justify-start py-4">
          
          {/* Top: Video Slot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative group h-[45%]"
          >
            <div className="aspect-video w-full h-full bg-[#111] overflow-hidden flex items-center justify-center border border-black/5 shadow-2xl transition-all group-hover:scale-[1.02]">
              {videoSrc ? (
                <video 
                  src={videoSrc} 
                  className="w-full h-full object-cover"
                  controls
                  loop
                />
              ) : (
                <div className="w-16 h-16 border-2 border-white/10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white/20 border-b-[10px] border-b-transparent ml-2"></div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <label className="cursor-pointer px-8 py-3 bg-white text-black text-[11px] uppercase tracking-widest font-black shadow-lg">
                  {videoSrc ? 'Embed New Video' : 'Insert Portfolio Video'}
                  <input type="file" className="hidden" accept="video/*" onChange={handleVideoUpload} />
                </label>
              </div>
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.3em] font-black opacity-20">Motion Study / MP4</div>
          </motion.div>

          {/* Bottom Right: Exhibition Board Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex-1 min-h-[160px] border border-gray-100 rounded-sm flex items-center justify-center group overflow-hidden bg-white shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] relative"
          >
            {galleryImg ? (
              <img 
                src={galleryImg} 
                className="w-full h-full object-cover" 
                alt="Selected Artwork"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="text-center p-8 transition-all group-hover:scale-105">
                 <div className="text-[12px] uppercase tracking-[0.3em] font-black text-gray-300 group-hover:text-black transition-colors duration-500">
                   Exhibition Board
                 </div>
                 <div className="text-[10px] mt-2 text-gray-200 font-mono tracking-widest italic">[NULL_STATE]</div>
              </div>
            )}

            <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <label className="cursor-pointer px-6 py-2 bg-black text-white text-[10px] uppercase tracking-widest font-black shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                {galleryImg ? 'Change Board' : 'Insert Board Image'}
                <input type="file" className="hidden" accept="image/*" onChange={handleGalleryUpload} />
              </label>
            </div>
          </motion.div>

        </section>
      </main>

      {/* Footer & Audio Control */}
      <footer className="flex justify-between items-end border-t border-black/[0.03] pt-10 relative z-10">
        <div className="text-[11px] text-gray-400 font-medium tracking-wide max-w-sm leading-relaxed">
          ARCHIVAL INTERFACE DESIGN. LIGHTWEIGHT FLAT-SURFACE ARCHITECTURE. <br/>
          BUILT FOR SINGULAR EXHIBITION FLOW.
        </div>
        
        {/* Audio Player UI */}
        <div className="flex items-center gap-8">
           <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase font-black tracking-[0.3em] mb-1.5 text-black">Ambient Audio</span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono tracking-widest ${isPlayingMusic ? 'text-black font-bold' : 'text-gray-300'}`}>
                  {isPlayingMusic ? 'Now Playing: SoundHelix' : 'Audio Suspended'}
                </span>
                <AnimatePresence>
                  {isPlayingMusic && (
                    <motion.div 
                      key="bars"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-end gap-1 h-3 mb-0.5"
                    >
                      {[1, 2, 3, 4, 3, 2, 4].map((h, i) => (
                        <motion.div 
                          key={i}
                          animate={{ height: isPlayingMusic ? [`0%`, `${h * 20}%`, `20%`] : '2px' }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          className="w-0.5 bg-black"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
           </div>

           <button 
             onClick={toggleMusic}
             className={`w-14 h-14 border-2 transition-all duration-500 flex items-center justify-center rounded-sm ${
               isPlayingMusic 
               ? 'bg-black border-black text-white' 
               : 'bg-transparent border-black/10 text-black hover:border-black'
             }`}
           >
              {isPlayingMusic ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-1" />}
           </button>
        </div>
      </footer>
    </div>
  );
}
