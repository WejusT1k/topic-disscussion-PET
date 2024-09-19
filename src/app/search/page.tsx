import paths from '@/paths';
import { redirect } from 'next/navigation';
import PostList from '@/components/posts/PostList';
import { fetchPostsBySearchTerm } from '@/db/queries/posts';

interface SearchPageProps {
	searchParams: {
		term: string
	}
}

export default async function SearchPage({searchParams}: SearchPageProps){
	const { term } = searchParams;
	if(!term){
		redirect(paths.homePath())
	}

	return <PostList fetchData={() => fetchPostsBySearchTerm(term)}/>
}