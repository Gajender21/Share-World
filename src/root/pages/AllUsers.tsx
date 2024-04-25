import { useGetPeople } from "@/lib/react-query/queriesAndMutations";
import { Loader } from "lucide-react";
import GridUsersList from "./GridUsersList";
import { useUserContext } from "@/context/AuthContext";

const AllUsers = () => {
  const { data: users, isFetching: isSearchFetching } = useGetPeople();
  const { user: currentUser } = useUserContext();

  if (!users && isSearchFetching) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">People</h2>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {users?.documents.map((user, index) => {
          if (currentUser.id !== user.$id) {
            return (
              <GridUsersList
                key={index}
                name={user.name}
                username={user.username}
                imageUrl={user.imageUrl}
                userId={user.$id}
                currentUserId={currentUser.id}
                currentUserFollowing={currentUser.following}
                
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default AllUsers;
