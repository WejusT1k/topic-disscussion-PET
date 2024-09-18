import { Skeleton } from '@nextui-org/react';

export default function PostShowSkeleton(){
	return <div className='m-4'>
		<div className='my-2'>
			<Skeleton className='h-8 w-48'/>
		</div>
		<div className='my-2'>
			<Skeleton className='h-20 w-32'/>
		</div>
	</div>
}