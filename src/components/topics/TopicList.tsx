import { db } from '@/db';
import paths from '@/paths';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';

export default async function TopicList(){
	const result = await db.topic.findMany();

	const renderedTopics = result.map(topic => {
		return (
			<div key={topic.id}>
				<Link href={paths.topicShowPath(topic.slug)}>
					<Chip
						variant='shadow'
						color="warning"
					>
						{topic.slug}
					</Chip>
				</Link>
			</div>
		)
	})

	return <div className='flex flex-row flex-wrap gap-2'>
		{renderedTopics}
	</div>
}