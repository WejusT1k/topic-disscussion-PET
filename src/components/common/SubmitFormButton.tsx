'use client';

import { Button } from '@nextui-org/react';
import { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface ISubmitFormButtonProps {
	children: ReactNode
}

export default function SubmitFormButton(props: ISubmitFormButtonProps){
	const { children } = props;
	const { pending } = useFormStatus();
	return <Button
		isLoading={pending}
		type="submit"
	>
		{children}
	</Button>
}