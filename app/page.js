"use client";
import { useState, useRef } from "react";
import { UploadCloud, Zap, FileText, CheckCircle2, LoaderCircle, Copy, Globe } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);
  const [blobId, setBlobId] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  
  const fileInputRef = useRef(null);

  const connectWallet = () => {
    if (!walletConnected) {
      setWalletAddress("APTOS...4F2A");
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
      setWalletAddress(null);
      resetState();
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleUploadPipeline = async () => {
    if (!file || !walletConnected) return alert("Please connect wallet first!");
    setIsUploading(true);
    setBlobId("");
    setShowMetrics(false);
    
    setCurrentStage('chunks');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setCurrentStage('fiber');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const mockBlobId = Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setBlobId(mockBlobId);

    setCurrentStage('aptos');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setCurrentStage(null);
    setIsUploading(false);
    setShowMetrics(true);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://shelbydrop.vercel.app/share/${blobId}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const resetState = () => {
    setFile(null);
    setIsUploading(false);
    setCurrentStage(null);
    setBlobId("");
    setShowMetrics(false);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#faf9f5] text-[#1e293b] font-mono">
      
      {/* Header Bar */}
      <header className="border-b border-[#e2e8f0] bg-white sticky top-0 z-50">
        <nav className="container mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ff4500] rounded-full animate-pulse" />
            <span className="font-bold tracking-tighter text-sm uppercase">SHELBY//DROP</span>
          </div>
          
          <div className="flex items-center gap-8 text-[11px] tracking-tight text-slate-500">
            <span className="hover:text-black cursor-pointer hidden sm:inline">NETWORK_LOGS</span>
            <span className="hover:text-black cursor-pointer hidden sm:inline">NODES</span>
            
            <button 
              onClick={connectWallet}
              className={`px-4 py-2 border rounded text-[11px] font-bold tracking-wider uppercase transition-all ${
                walletConnected 
                  ? 'bg-slate-100 border-black text-black' 
                  : 'bg-black text-white hover:bg-slate-800'
              }`}
            >
              {walletConnected ? walletAddress : "CONNECT_WALLET ↗"}
            </button>
          </div>
        </nav>
      </header>

      {/* Main Core Section */}
      <section className="flex-grow container mx-auto px-8 py-16 flex flex-col items-center justify-center">
        
        {/* Headline Box */}
        <div className="w-full max-w-xl mb-12 border-l-2 border-[#ff4500] pl-6">
          <h2 className="text-2xl font-bold tracking-tight text-black uppercase mb-2">Universal Namespace Pipeline</h2>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            Data segments pass through high-performance fiber optics directly to individual decentralized ledger indexes. Replicated instantly across regions with sub-second retrieval latency.
          </p>
        </div>

        {/* Minimal Alabaster Card Box */}
        <div className="w-full max-w-xl bg-white border border-[#e2e8f0] p-8 rounded-lg shadow-sm">
          
          {/* View 1: Upload Complete */}
          {blobId && !isUploading && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded text-center">
                <CheckCircle2 className="h-6 w-6 text-black mx-auto mb-2" />
                <p className="text-xs font-bold uppercase tracking-wider">Settlement Confirmed</p>
                <p className="text-[10px] text-slate-400 mt-1 font-mono break-all">{blobId}</p>
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Public Link:</span>
                <div className="flex gap-2 items-center p-2 bg-slate-50 border rounded">
                  <span className="text-xs font-mono text-black break-all flex-grow">shelbydrop.xyz/{blobId.slice(0,8)}</span>
                  <button onClick={copyLink} className="p-2 bg-black text-white hover:bg-slate-800 rounded">
                    <Copy className="w-3 h-3"/>
                  </button>
                </div>
                {linkCopied && <p className="text-[10px] text-emerald-600 font-bold text-right">Copied!</p>}
              </div>

              <button onClick={resetState} className="w-full py-2.5 bg-black text-white font-bold text-[11px] uppercase tracking-wider hover:bg-slate-800 transition-all">
                Push New Object
              </button>
            </div>
          )}

          {/* View 2: Minimal Pipeline Bar */}
          {isUploading && (
            <div className="py-6 space-y-4">
              <div className="flex justify-between text-[11px] font-bold text-slate-400">
                <span>SYSTEM_PIPELINE_ROUTING</span>
                <LoaderCircle className="w-4 h-4 text-black animate-spin" />
              </div>
              <div className="h-[2px] bg-slate-100 w-full overflow-hidden relative">
                <div className={`h-full bg-black transition-all duration-300 ${
                  currentStage === 'chunks' ? 'w-1/3' : currentStage === 'fiber' ? 'w-2/3' : 'w-full'
                }`} />
              </div>
              <p className="text-[10px] uppercase font-bold text-black tracking-wide text-center">
                {currentStage === 'chunks' && "↳ [01] generating erasure coding chunks"}
                {currentStage === 'fiber' && "↳ [02] broadcasting packet via hot fiber network"}
                {currentStage === 'aptos' && "↳ [03] locking metadata matrix into aptos block"}
              </p>
            </div>
          )}

          {/* View 3: Interaction Zone */}
          {!isUploading && !blobId && (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => !file && fileInputRef.current.click()}
              className={`border border-dashed rounded p-12 text-center cursor-pointer transition-all ${
                file ? 'border-black bg-slate-50' : 'border-slate-300 hover:border-black'
              }`}
            >
              <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} className="hidden" />

              {!file ? (
                <div className="space-y-2">
                  <UploadCloud className="h-8 w-8 text-slate-400 mx-auto" />
                  <p className="text-xs font-bold uppercase text-slate-600">Select file payload</p>
                  <p className="text-[10px] text-slate-400">S3-Compatible Protocol Object Pipeline</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <FileText className="h-6 w-6 text-black mx-auto" />
                  <p className="font-bold text-xs truncate max-w-xs mx-auto text-black font-mono">{file.name}</p>
                  
                  <div className="flex gap-2 justify-center">
                    <button onClick={(e) => {e.stopPropagation(); setFile(null)}} className="px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 text-[10px] uppercase font-bold">
                      Cancel
                    </button>
                    <button onClick={(e) => {e.stopPropagation(); handleUploadPipeline()}} className="px-4 py-1.5 bg-black text-white hover:bg-slate-800 text-[10px] uppercase font-bold shadow-sm">
                      Deploy Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Latency Metrics Panel */}
        {showMetrics && (
          <div className="w-full max-w-xl mt-4 p-4 bg-white border border-[#e2e8f0] rounded animate-fadeIn">
            <div className="flex items-center gap-1.5 mb-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
              <Globe className="w-3 h-3" />
              <span>Universal Namespace Latency Engine</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-50 border border-slate-100 rounded">
                <p className="text-[9px] text-slate-400">SAN_FRANCISCO</p>
                <p className="font-bold text-black mt-1">12 ms</p>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded">
                <p className="text-[9px] text-slate-400">SINGAPORE</p>
                <p className="font-bold text-[#ff4500] mt-1">14 ms</p>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded">
                <p className="text-[9px] text-slate-400">FRANKFURT</p>
                <p className="font-bold text-black mt-1">18 ms</p>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* Grid Footer Line */}
      <footer className="border-t border-[#e2e8f0] py-4 bg-white text-center text-[10px] text-slate-400 uppercase tracking-tight">
        <p>Operational Instance // Securely powered by Shelby Storage ecosystem nodes.</p>
      </footer>
    </main>
  );
}
