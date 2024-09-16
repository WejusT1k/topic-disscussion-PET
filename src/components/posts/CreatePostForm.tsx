'use client';

import { Popover, PopoverContent, PopoverTrigger, Input, Textarea, Button } from '@nextui-org/react'
import * as actions from '@/actions';
import SubmitFormButton from '@/components/common/SubmitFormButton';
import { useFormState } from 'react-dom';

interface ICreatePostFormProps {
	slug: string
}

export default function CreatePostForm(props: ICreatePostFormProps){
	const [formState, action] = useFormState(actions.createPost, {
		errors: {}
	})
	return <Popover>
		<PopoverTrigger>
			<Button color='primary'>
				Create Post
			</Button>
		</PopoverTrigger>
		<PopoverContent>
			<form action={action}>
				<div className='flex flex-col gap-4 p-4 w-80'>
					<h1 className='text-lg'>Create a Post</h1>
					<Input
						isInvalid={!!formState.errors.title}
						errorMessage={formState.errors.title?.join(', ')}
						label="Title"
						name='title'
						labelPlacement='outside'
						placeholder='Title'
					/>

					<Textarea
						isInvalid={!!formState.errors.content}
						errorMessage={formState.errors.content?.join(', ')}
						label="Content"
						name='content'
						labelPlacement='outside'
						placeholder='Content'
					/>

					<Input 
						name='slug'
						type='hidden'
						defaultValue={props.slug}
					/>

					{formState.errors._form ? <div className="p-2 rounded border bg-red-200 border-red-50">
						{formState.errors._form.join(', ')}
					</div> : null}

					<SubmitFormButton>
						Create Post
					</SubmitFormButton>
				</div>
			</form>
		</PopoverContent>
	</Popover>
}