'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import type { Topic } from '@prisma/client';
import paths from '@/paths';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
	name: z.string().min(3).regex(/^[a-z-]+$/, {
		message: 'Must be lower case letters or dashes without spaces'
	}),
	description: z.string().min(10)
})

interface ICreateTopicFormState {
	errors: {
		name?: string[],
		description?: string[],
		_form?: string[]
	}
}

export async function createTopic(
	formState: ICreateTopicFormState, 
	formData: FormData
): Promise<ICreateTopicFormState>{
	const name = formData.get('name');
	const description = formData.get('description')

	const result = createTopicSchema.safeParse({
		name,
		description
	})

	if(!result.success){
		return {
			errors: result.error?.flatten().fieldErrors
		}
	}

	const session = await auth();
	if(!session){
		return {
			errors: {
				_form: ['You shoule be authorized to perform this action']
			}
		}
	}

	let topic: Topic;

	try {
		topic = await db.topic.create({
			data: {
				slug: result.data.name,
				description: result.data.description
			}
		})
	}
	catch(err: unknown){
		if(err instanceof Error){
			return {
				errors: {
					_form: [err.message]
				}
			}
		}
		else {
			return {
				errors: {
					_form: ['Unexpected error']
				}
			}
		}
	}

	revalidatePath(paths.homePath())

	// Redirect thorws error, it is expected behavior
	redirect(paths.topicShowPath(topic.slug))
}