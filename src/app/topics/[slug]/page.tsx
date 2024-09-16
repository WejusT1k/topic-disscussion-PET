import CreatePostForm from '@/components/posts/CreatePostForm';
import { db } from '@/db';
import type { Topic } from '@prisma/client';
import PostList from '@/components/posts/PostList';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';

interface ITopicShowPageProps {
	params: {
		slug: string
	}
}

export default async function TopicShowPage(props: ITopicShowPageProps){
	const { params } = props;
	return <div className='grid grid-cols-4 gap-4 p-4'>
		<div className='col-span-3'>
			<h1 className='text-2xl font-bold mb-2'>{params.slug}</h1>
			<PostList fetchData={() => fetchPostsByTopicSlug(params.slug)}
			/>
		</div>
		<div>
			<CreatePostForm slug={params.slug}/>
		</div>
	</div>
}