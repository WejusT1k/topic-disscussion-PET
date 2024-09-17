import { cache } from 'react';
import { db } from '@/db';

export type CommentWithAuthor = Awaited<
	ReturnType<typeof fetchCommentsByPostId>
>[number]

export const fetchCommentsByPostId = cache((postId: string) => {
	console.log('request');
	return db.comment.findMany({
		where: { postId },
		include: {
			user: {
				select: { 
					name: true,
					image: true
				 }
			}
		}
	})
});
