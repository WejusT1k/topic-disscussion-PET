import type { Comment } from '@prisma/client';
import { db } from '@/db';

export type CommentWithAuthor = Awaited<
	ReturnType<typeof fetchCommentsByPostId>
>[number]

export async function fetchCommentsByPostId(postId: string){
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
}