import Loader from '@/components/shared/Loader';
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations';
import GridPostList from './GridPostList';

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();
    if (!currentUser) {
      return <Loader />
    } 
    return (
      <ul className="w-full flex justify-center max-w-5xl gap-9">
        {currentUser.liked.length === 0 ? (
          <p className="text-light-4">No available posts</p>
        ) : (
          <GridPostList posts={currentUser.liked} showStats={false} />
        )}
      </ul>
    )
}

export default LikedPosts