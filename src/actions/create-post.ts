'use server';

import { z } from 'zod';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import type { Post } from '@prisma/client';
import paths from '@/paths';
import { redirect } from 'next/navigation';

const createPostSchema = z.object({
	title: z.string().min(3),
	content: z.string().min(10)
})

interface ICreatePostFormState {
	errors: {
		title?: string[],
		content?: string[],
		_form?: string[]
	}
}

export async function createPost(
	formState: ICreatePostFormState,
	formData: FormData
): Promise<ICreatePostFormState>{
	const slug = formData.get('slug') as string;
	const validationResult = createPostSchema.safeParse({
		title: formData.get('title'),
		content: formData.get('content')
	})

	if(!validationResult.success){
		return {
			errors: validationResult.error.flatten().fieldErrors
		}
	}

	const session = await auth();
	if(!session || !session.user?.id){
		return {
			errors: {
				_form: ['You must be signed in to do it']
			}
		}
	}

	const topic = await db.topic.findFirst({
		where: {slug: slug}
	})

	if(!topic){
		return {
			errors: {
				_form: ['Cannot find topic']
			}
		}
	}

	let post: Post;
	try {
		post = await db.post.create({
			data: {
				title: validationResult.data.title,
				content: validationResult.data.content,
				topicId: topic.id,
				userId: session.user.id
			}
		})
	}
	catch(e: unknown) {
		if(e instanceof Error){
			return {
				errors: {
					_form: [e.message]
				}
			}
		}
		else {
			return {
				errors: {
					_form: ['Failed to create post']
				}
			}
		}
	}

	revalidatePath(paths.topicShowPath(topic.slug));
	redirect(paths.postShowPath(topic.slug, post.id));
}