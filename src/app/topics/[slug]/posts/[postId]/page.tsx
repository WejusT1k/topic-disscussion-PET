import CommentCreateForm from '@/components/comments/CommentCreateForm';
import CommentList from '@/components/comments/CommentList';
import PostShow from '@/components/posts/PostShow';
import PostShowSkeleton from '@/components/posts/PostShowSkeleton';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import paths from '@/paths';
import Link from 'next/link';
import { Suspense } from 'react';

interface PostShowPageProps {
	params: {
		slug: string
		postId: string
	}
}

export default function PostShowPage({ params }: PostShowPageProps){
	return <div className='space-y-3'>
		<Link href={paths.topicShowPath(params.slug)}>
			{'< '} Back to {params.slug}
		</Link>
		<Suspense fallback={<PostShowSkeleton />}>
			<PostShow postId={params.postId}/>
		</Suspense>
		<CommentCreateForm postId={params.postId}/>
		<CommentList postId={params.postId}/>
	</div>
}