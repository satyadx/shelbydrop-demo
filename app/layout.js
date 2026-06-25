import "./globals.css";

export const metadata = {
  title: "ShelbyDrop — Minimal Storage Pipeline",
  description: "Aptos-powered decentralized file sharing infrastructure",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#faf9f5] text-[#1e293b] antialiased">
        {children}
      </body>
    </html>
  );
}
