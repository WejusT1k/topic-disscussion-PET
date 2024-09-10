import Link from 'next/link';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Input,
} from '@nextui-org/react';
import paths from '@/paths';
import HeaderAuth from './HeaderAuth';

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
					<Input placeholder='Search...'/>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify='end'>
				<HeaderAuth />
			</NavbarContent>
		</Navbar>
	);
}