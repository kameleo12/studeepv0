export default function LolPage() {
  // Tu réutilises ton composant lol.tsx
  const Lol = require("@root/modules/lol/react/search/Searchlol").default;
  return <Lol />;
}
// (ou en ES import classique en haut de fichier si tu préfères)
