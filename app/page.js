"use client";
import { useState, useRef } from "react";
import { UploadCloud, Zap, FileText, CheckCircle2, LoaderCircle, Copy, Globe, Gift } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);
  const [blobId, setBlobId] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  
  // Faucet State
  const [faucetClaimed, setFaucetClaimed] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setCurrentStage('fiber');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const mockBlobId = Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setBlobId(mockBlobId);

    setCurrentStage('aptos');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setCurrentStage(null);
    setIsUploading(false);
    setShowMetrics(true);
  };

  const claimAptosFaucet = async () => {
    if (!walletConnected) return alert("Connect your wallet first to claim faucet!");
    setIsClaiming(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsClaiming(false);
    setFaucetClaimed(true);
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
    <main className="flex min-h-screen flex-col bg-[#fcdcb6] text-[#5c1d1d] font-sans antialiased">
      
      {/* Top Navbar in Dark Maroon Menu */}
      <header className="border-b border-[#5c1d1d]/20 bg-[#fcdcb6]">
        <nav className="container mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#5c1d1d] rounded-full" />
            <span className="font-black tracking-wider text-base uppercase text-[#5c1d1d]">SHELBY//DROP</span>
          </div>
          
          <div className="flex items-center gap-8 text-xs uppercase tracking-wider text-[#5c1d1d] font-bold">
            <span className="hover:opacity-70 cursor-pointer hidden sm:inline">NETWORK_LOGS</span>
            <span className="hover:opacity-70 cursor-pointer hidden sm:inline">NODES</span>
            
            <button 
              onClick={connectWallet}
              className={`px-5 py-2 rounded text-xs font-bold tracking-wider uppercase transition-all border-2 ${
                walletConnected 
                  ? 'bg-[#5c1d1d] text-[#fcdcb6] border-[#5c1d1d]' 
                  : 'border-[#5c1d1d] text-[#5c1d1d] hover:bg-[#5c1d1d] hover:text-[#fcdcb6]'
              }`}
            >
              {walletConnected ? walletAddress : "CONNECT_WALLET ↗"}
            </button>
          </div>
        </nav>
      </header>

      {/* Main Container Divided into 2 Sides */}
      <section className="flex-grow container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side (2 Columns Wide) - File Upload Pipeline */}
        <div className="lg:col-span-2 space-y-8">
          <div className="border-l-4 border-[#5c1d1d] pl-6">
            <h2 className="text-3xl font-black tracking-tight uppercase text-[#5c1d1d] mb-2">Universal Namespace Pipeline</h2>
            <p className="text-sm text-[#5c1d1d]/80 font-medium leading-relaxed max-w-2xl">
              Data segments pass through high-performance fiber optics directly to decentralized ledger indexes. Replicated instantly across regions with sub-second retrieval latency.
            </p>
          </div>

          {/* Minimal Uploader Box */}
          <div className="bg-[#fce5c8] border-2 border-[#5c1d1d]/30 p-8 rounded-xl shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">File Object Pipeline</h3>
            
            {/* View 1: Upload Completed */}
            {blobId && !isUploading && (
              <div className="space-y-6">
                <div className="p-4 bg-[#fcdcb6] border border-[#5c1d1d]/20 rounded text-center">
                  <CheckCircle2 className="h-6 w-6 text-[#5c1d1d] mx-auto mb-2" />
                  <p className="text-xs font-bold uppercase tracking-wider">Settlement Confirmed</p>
                  <p className="text-[11px] text-[#5c1d1d]/70 mt-1 font-mono break-all">{blobId}</p>
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5c1d1d]/60">Public Retrieval URI:</span>
                  <div className="flex gap-2 items-center p-2.5 bg-[#fcdcb6] border border-[#5c1d1d]/20 rounded">
                    <span className="text-xs font-mono text-[#5c1d1d] break-all flex-grow">shelbydrop.xyz/{blobId.slice(0,12)}</span>
                    <button onClick={copyLink} className="p-2 bg-[#5c1d1d] text-[#fcdcb6] rounded hover:opacity-90">
                      <Copy className="w-3.5 h-3.5"/>
                    </button>
                  </div>
                  {linkCopied && <p className="text-[11px] text-emerald-800 font-bold text-right">Copied to clipboard!</p>}
                </div>

                <button onClick={resetState} className="w-full py-3 bg-[#5c1d1d] text-[#fcdcb6] font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all rounded-lg">
                  Deploy Another Object
                </button>
              </div>
            )}

            {/* View 2: Active Pipeline Loader */}
            {isUploading && (
              <div className="py-8 space-y-4 text-center">
                <div className="flex justify-between text-xs font-bold text-[#5c1d1d]/70">
                  <span>ROUTING_METADATA_PIPELINE</span>
                  <LoaderCircle className="w-4 h-4 text-[#5c1d1d] animate-spin" />
                </div>
                <div className="h-1 bg-[#5c1d1d]/10 w-full rounded-full overflow-hidden relative">
                  <div className={`h-full bg-[#5c1d1d] transition-all duration-300 ${
                    currentStage === 'chunks' ? 'w-1/3' : currentStage === 'fiber' ? 'w-2/3' : 'w-full'
                  }`} />
                </div>
                <p className="text-xs uppercase font-bold text-[#5c1d1d] tracking-wide">
                  {currentStage === 'chunks' && "↳ [01] generating high-availability erasure chunks"}
                  {currentStage === 'fiber' && "↳ [02] streaming bits over dedicated fiber nodes"}
                  {currentStage === 'aptos' && "↳ [03] archiving cryptographic state on aptos ledger"}
                </p>
              </div>
            )}

            {/* View 3: Interaction Zone */}
            {!isUploading && !blobId && (
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => !file && fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                  file ? 'border-[#5c1d1d] bg-[#fcdcb6]' : 'border-[#5c1d1d]/30 hover:border-[#5c1d1d]'
                }`}
              >
                <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} className="hidden" />

                {!file ? (
                  <div className="space-y-3">
                    <UploadCloud className="h-8 w-8 text-[#5c1d1d]/50 mx-auto" />
                    <p className="text-xs font-bold uppercase text-[#5c1d1d]">Choose file or drag here</p>
                    <p className="text-[11px] text-[#5c1d1d]/60">S3-Compatible Instant Storage Vault</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <FileText className="h-6 w-6 text-[#5c1d1d] mx-auto" />
                    <p className="font-bold text-xs truncate max-w-xs mx-auto text-[#5c1d1d] font-mono">{file.name}</p>
                    
                    <div className="flex gap-3 justify-center">
                      <button onClick={(e) => {e.stopPropagation(); setFile(null)}} className="px-4 py-1.5 border border-red-800 text-red-800 text-[11px] uppercase font-bold rounded">
                        Remove
                      </button>
                      <button onClick={(e) => {e.stopPropagation(); handleUploadPipeline()}} className="px-5 py-1.5 bg-[#5c1d1d] text-[#fcdcb6] text-[11px] uppercase font-bold shadow-sm rounded">
                        Initialize Upload
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side (1 Column Wide) - Darker Peach Faucet Claim Box */}
        <div className="bg-[#fcaa7e] border-2 border-[#5c1d1d]/40 p-6 rounded-xl shadow-md space-y-4 text-[#5c1d1d]">
          <div className="flex items-center gap-2 border-b border-[#5c1d1d]/20 pb-3">
            <Gift className="w-5 h-5 text-[#5c1d1d]" />
            <h3 className="text-sm font-black uppercase tracking-wider">Aptos Faucet Claim</h3>
          </div>
          
          <p className="text-xs font-medium leading-relaxed text-[#5c1d1d]/90">
            Need testnet tokens to cover the Universal Namespace data writing gas fees? Request direct network distribution below.
          </p>

          <div className="bg-[#fcdcb6]/60 p-3 rounded border border-[#5c1d1d]/10 text-center space-y-3">
            <div className="text-[11px] uppercase font-bold tracking-wider">Allocation Status:</div>
            <div className="text-lg font-black tracking-tight">
              {faucetClaimed ? "10.00 APT RECEIVED" : "10.00 APT AVAILABLE"}
            </div>
            
            <button
              onClick={claimAptosFaucet}
              disabled={isClaiming || faucetClaimed}
              className={`w-full py-2.5 rounded font-bold text-xs uppercase tracking-wider border-2 transition-all ${
                faucetClaimed 
                  ? 'bg-emerald-800 border-emerald-800 text-white cursor-not-allowed'
                  : isClaiming 
                    ? 'bg-transparent border-[#5c1d1d] text-[#5c1d1d] cursor-wait'
                    : 'bg-[#5c1d1d] border-[#5c1d1d] text-[#fcdcb6] hover:bg-transparent hover:text-[#5c1d1d]'
              }`}
            >
              {isClaiming ? "Broadcasting Request..." : faucetClaimed ? "Faucet Claimed ✓" : "Claim Aptos Testnet Faucet ↗"}
            </button>
          </div>

          <div className="text-[10px] text-[#5c1d1d]/70 font-mono list-disc pl-2 space-y-1">
            <p>• Only for valid dev/test accounts.</p>
            <p>• Telemetry checked via consensus.</p>
          </div>
        </div>

      </section>

      {/* Latency Section at Bottom */}
      {showMetrics && (
        <div className="container mx-auto px-6 mb-12 animate-fadeIn">
          <div className="bg-[#fce5c8] border-2 border-[#5c1d1d]/30 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-1.5 mb-3 text-[11px] uppercase tracking-wider text-[#5c1d1d] font-bold">
              <Globe className="w-4 h-4" />
              <span>Universal Namespace Latency Analytics</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-xs font-bold">
              <div className="p-3 bg-[#fcdcb6] rounded border border-[#5c1d1d]/10">
                <p className="text-[10px] text-[#5c1d1d]/60">SAN_FRANCISCO (ORIGIN)</p>
                <p className="text-base font-black text-[#5c1d1d] mt-1">12 ms</p>
              </div>
              <div className="p-3 bg-[#fcdcb6] rounded border border-[#5c1d1d]/10">
                <p className="text-[10px] text-[#5c1d1d]/60">SINGAPORE (CACHE)</p>
                <p className="text-base font-black text-[#5c1d1d] mt-1">14 ms</p>
              </div>
              <div className="p-3 bg-[#fcdcb6] rounded border border-[#5c1d1d]/10">
                <p className="text-[10px] text-[#5c1d1d]/60">FRANKFURT (SHARED)</p>
                <p className="text-base font-black text-[#5c1d1d] mt-1">18 ms</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Line */}
      <footer className="border-t border-[#5c1d1d]/10 py-4 text-center text-[11px] font-bold text-[#5c1d1d]/60 uppercase tracking-wider mt-auto">
        <p>Operational Instance // Securely powered by Shelby Storage Framework.</p>
      </footer>
    </main>
  );
}
