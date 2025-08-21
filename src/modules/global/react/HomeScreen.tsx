import TextHighlightParser from "@root/modules/shared/react/components/TextHighlightParser/TextHighlightParser";

export default function HomeScreen() {


  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">
        <TextHighlightParser text="titre" />
      </h1>
      <h2 className="text-2xl font-medium mt-3 opacity-70">
        description
      </h2>
    </main>
  );
}
