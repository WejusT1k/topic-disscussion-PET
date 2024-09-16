import CommentCreateForm from '@/components/comments/CommentCreateForm';
import CommentList from '@/components/comments/CommentList';
import PostShow from '@/components/posts/PostShow';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import paths from '@/paths';
import Link from 'next/link';

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
		<PostShow postId={params.postId}/>
		<CommentCreateForm postId={params.postId}/>
		<CommentList fetchData={() => fetchCommentsByPostId(params.postId)}/>
	</div>
}