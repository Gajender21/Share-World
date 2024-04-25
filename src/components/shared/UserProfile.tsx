import { useUserContext } from '@/context/AuthContext';
import { useGetFollowersById } from '@/lib/react-query/queriesAndMutations';

const UserProfile = (UserID : string ) => {
    // const{user} = useUserContext();
    // console.log(user);
    // const { data : followersList} = useGetFollowersById(UserID|| "")
    // console.log(followersList);
    
   

  return (
    <div>UserProfile</div>
  )
}

export default UserProfile