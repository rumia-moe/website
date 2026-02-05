import HomeContent from "@/markdown/home.md";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex-1">
        <HomeContent />
      </div>
      <div className="flex flex-col"></div>
    </div>
  );
}
