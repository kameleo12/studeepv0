import EstimatedFollowers from "./EstimatedFollowers";
import AuthorMostViral from "./AuthorMostViral";

interface AdditionalDataProps {
  viewCount: number;
}

const AdditionalData = ({ viewCount }: AdditionalDataProps) => {
  return (
    <div className="p-5 space-y-5">
      <EstimatedFollowers viewCount={viewCount} />
      <AuthorMostViral />
    </div>
  );
};

export default AdditionalData;
