import { useAuthorMostViral } from "../hooks/use-author-most-viral.hook";
import ViralItem from "@root/modules/search/react/media/components/ViralItem";
import { ViralScoreColor } from "@root/modules/search/core/utils/viral-score-color.utils";

const AuthorMostViral = () => {
  const { medias } = useAuthorMostViral();

  if (!medias || medias.length === 0) {
    return <p>No viral media available for this author.</p>;
  }

  return (
    <section className=" rounded-xl max-w-4xl mx-auto">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 items-start">
          <h2 className="text-xl font-bold text-gray-700">
            Médias les plus viraux de l&apos;auteur
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {medias.slice(0, 6).map((media) => (
            <ViralItem
              key={media.id}
              id={media.id}
              imgUrl={media.thumbnailUrl}
              title={media.description}
              viralScoreColor={media.viralScoreColor as ViralScoreColor}
              viralScore={media.viralScore}
              likes={media.likesCount}
              createdAt={media.uploadedAt}
              author={media.author}
              duration={media.duration}
              viewsCount={media.viewsCount}
              playUrl={media.playUrl}
              blobUrl={media.blobUrl}
              cookie={media.cookie}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorMostViral;
