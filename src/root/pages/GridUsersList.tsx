import { Button } from "@/components/ui/button";
import {
  addFollower,
  followUser,
  removeFollower,
  unFollowUser,
} from "@/lib/appwrite/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GridUsersList = ({
  name,
  username,
  imageUrl,
  userId,
  currentUserId,
  currentUserFollowing,
}: {
  name: string;
  username?: string;
  imageUrl: string;
  userId: string;
  currentUserId: string;
  currentUserFollowing: string[];
}) => {
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  useEffect(() => {
    return setAlreadyFollowed(currentUserFollowing.includes(userId));
  }, [currentUserFollowing]);
  function onCLickHandler() {
    if (alreadyFollowed == true) {
      const result = currentUserFollowing.filter((id) => id !== userId);
      unFollowUser(currentUserId, result);
      removeFollower(currentUserId, userId);
      setAlreadyFollowed(false);
    } else if (alreadyFollowed == false) {
      currentUserFollowing.push(userId);
      followUser(currentUserId, currentUserFollowing);
      addFollower(currentUserId, userId);
      setAlreadyFollowed(true);
    }
  }

  return (
    <div className="flex flex-col border-solid border-[1.5px] border-light-4 rounded-xl min-w-[165.6px] mt-5 ">
      <div className="p-5 flex flex-col items-center">
        <img
          className="rounded-full"
          src={imageUrl}
          alt="profile-picture"
          height={52}
          width={52}
        />

        <p className="mt-2">
          <Link to={`/profile/${userId}`}> {name} </Link>
        </p>
        <p className="text-light-3">{username}</p>
        <Button
          className="shad-button_primary whitespace-nowrap mt-5 "
          onClick={onCLickHandler}
        >
          {alreadyFollowed ? "Followed" : "Follow"}
        </Button>
      </div>
    </div>
  );
};

export default GridUsersList;
