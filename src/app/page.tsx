import SearchBar from "@/components/SearchBar";
import VideoList from "@/components/VideoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <SearchBar />
      <div className="mt-14">
        <VideoList />
      </div>
    </main>
  );
}
