"use client";

import SearchNavbar from "@root/modules/search/react/search/components/SearchNavbar";
import { useParams, useSearchParams } from "next/navigation";
import { useLibraryMediaById } from "./use-library-media-by-id.hook";
import MediaPreview from "../../../search/react/media/components/MediaPreview";
import MediaData from "../../../search/react/media/components/MediaData";
import AuthorData from "../../../search/react/media/components/AuthorData";
import AdditionalData from "../../../search/react/media/components/AdditionalData";

export default function LibraryMedia() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const libraryId = searchParams.get("libraryId");
  const { currentMedia, loading } = useLibraryMediaById(id, libraryId!);

  if (loading) {
    return <p>Loading library media...</p>;
  }

  if (!currentMedia) {
    return <p>Media not found. Please try refreshing or return to library.</p>;
  }

  return (
    <section className="container mx-auto bg-gray-50">
      <SearchNavbar />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-5">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <MediaPreview
              author={currentMedia.author}
              id={currentMedia.id}
              thumbnail={currentMedia.thumbnailUrl}
              playUrl={currentMedia.playUrl}
              title={currentMedia.description}
              searchId={""}
            />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-lg shadow-lg p-5">
              <MediaData
                viewsCount={currentMedia.viewsCount}
                likesCount={currentMedia.likesCount}
                viralScore={currentMedia.viralScore}
                uploadedAt={currentMedia.uploadedAt}
                viralScoreColor={currentMedia.viralScoreColor}
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-5">
              <AuthorData
                username={currentMedia.author}
                followersCount={currentMedia.followersCount}
              />
            </div>
          </div>
          <div className="space-y-5">
            <div className="bg-white rounded-lg shadow-lg p-5">
              <AdditionalData viewCount={currentMedia.viewsCount} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
