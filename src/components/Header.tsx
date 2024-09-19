import Link from 'next/link';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react';
import { Suspense } from 'react';
import paths from '@/paths';
import HeaderAuth from './HeaderAuth';
import SearchInput from './SearchInput';

export default async function Header(){ 
	return (
		<Navbar className='shadow mb-6'>
			<NavbarBrand>
				<Link
					href={paths.homePath()}
					className='font-bold'>
					DissTopic
				</Link>
			</NavbarBrand>
			<NavbarContent justify='center'>
				<NavbarItem>
					<Suspense fallback={<>Loading...</>}>
						<SearchInput />
					</Suspense>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify='end'>
				<HeaderAuth />
			</NavbarContent>
		</Navbar>
	);
}