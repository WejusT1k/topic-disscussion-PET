import PostList from '@/components/posts/PostList';
import TopicCreateForm from '@/components/topics/TopicCreateForm';
import TopicList from '@/components/topics/TopicList';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';
import { Divider } from '@nextui-org/react';

export default async function Home() {
	return (
		<div className='grid grid-cols-4 gap-4 p-4'>
			<div className='col-span-3'>
				<h1 className='text-xl m-2'>Top Posts</h1>
				<PostList fetchData={fetchPostsByTopicSlug}/>
			</div>
			<div className='shadow bordered py-3 px-2'>
				<TopicCreateForm />
				<Divider className='my-2'/>
				<TopicList />
			</div>
		</div>
	);
}
