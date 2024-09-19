import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = (
	Post & {
		topic: { slug: string }
		user: { name: string | null }
		_count: { comments: number }
	}
)

/** 
 * @param slug - slug of topic
 */

// alternative way to define complex type of query result
//export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number]

export function fetchPostsByTopicSlug(slug?: string): Promise<PostWithData[]> {
	return db.post.findMany({
		where: { topic: { slug } },
		orderBy: [{
			comments: {
				_count: 'desc'
			}
		}],
		include: {
			topic: { select: { slug: true } },
			user: { select: { name: true } },
			_count: { select: { comments: true } }
		}
	})
}

export function fetchPostsBySearchTerm(term: string): Promise<PostWithData[]>{
	return db.post.findMany({
		include: {
			topic: { select: { slug: true } },
			user: { select: { name: true, image: true } },
			_count: { select: { comments: true } }
		},
		where: {
			OR: [{title: { contains: term }}, { content: { contains: term } }]
		}
	})
}