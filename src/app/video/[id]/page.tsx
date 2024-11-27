import VideoPlayer from "@/components/VideoPlayer";
import VipPromotion from "@/components/VipPromotion";
import BackButton from "@/components/BackButton";

export default function VideoPage({ params }: { params: { id: string } }) {
  const video = {
    id: params.id,
    title: "示例视频1 - 这是一个较长的标题，用来测试多行显示效果",
    description: "这是示例视频1的描述",
    coverUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    views: 1234,
    duration: "3:45",
    createdAt: "2024-03-15",
    tags: ["娱乐", "音乐"]
  };

  const isVip = false;

  if (!video) {
    return <div>视频不存在</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center p-2">
          <BackButton fallbackPath="/" />
        </div>
      </div>

      <div className="pt-14">
        <VideoPlayer src={video.videoUrl} poster={video.coverUrl} isVip={isVip} />
        <div className="p-4 space-y-4">
          <h1 className="text-lg font-medium">{video.title}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{video.views}次观看</span>
            <span>•</span>
            <span>{video.createdAt}</span>
          </div>
          <p className="text-sm text-muted-foreground">{video.description}</p>
          <div className="flex gap-2">
            {video.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs rounded-full bg-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* VIP广告 */}
        <VipPromotion />
      </div>
    </div>
  );
}
