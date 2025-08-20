interface AuthorDataProps {
  username: string;
  followersCount: string;
}

const AuthorData = ({ username, followersCount }: AuthorDataProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Auteur</h2>
      <p className="m-3">{username}</p>
      <span className="font-semibold text-gray-600 text-sm">Followers :</span>
      <p className="mt-3 text-sm">{followersCount} Follows</p>
    </div>
  );
};

export default AuthorData;
