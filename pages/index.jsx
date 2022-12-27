import CardPost from "src/components/CardPost/CardPost";
import styles from "styles/Home.module.scss";
import client from "src/sanity";
import { useRouter } from "next/router";
import Error from "src/UI/Error/Error";

export default function Home({ posts, author }) {
	const router = useRouter();

	// filter posts
	const searchFor = router.query.search || null;
	const foundPosts =
		posts?.filter((post) => post.title.toLowerCase().includes(searchFor)) || [];

	// pagination
	const numberOfPosts = searchFor === null ? posts.length : foundPosts.length;

	const postsPerPage = 6;
	const lastPage = Math.ceil(numberOfPosts / postsPerPage);

	let currentPage = +router.query.page || 1;

	if (currentPage < 1) currentPage = 1;
	if (currentPage > lastPage) currentPage = lastPage;

	const initialIndex = postsPerPage * (currentPage - 1);
	const finalIndex = postsPerPage * currentPage;

	const disableLeftButton = currentPage <= 1;
	const disableRightButton = currentPage >= lastPage;
	const disablePagination = numberOfPosts <= postsPerPage;

	//render posts
	const currentPostList = searchFor === null ? posts : foundPosts;

	const renderPosts = currentPostList
		.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
		.slice(initialIndex, finalIndex)
		.map((post) => <CardPost key={post._id} post={post} author={author} />);

	return (
		<section className={styles.page}>
			<h1>Últimos artigos</h1>
			<div>{renderPosts}</div>
			{searchFor !== null && renderPosts.length === 0 && (
				<Error text="Oops! Nenhum artigo encontrado..." />
			)}
			{!disablePagination && (
				<div className={styles.pagination}>
					<button
						className={styles.previous}
						onClick={() => router.push(`?page=${currentPage - 1}`)}
						disabled={disableLeftButton}
					>
						&larr;
					</button>
					<span>
						{currentPage} / {lastPage}
					</span>
					<button
						className={styles.next}
						onClick={() => router.push(`?page=${currentPage + 1}`)}
						disabled={disableRightButton}
					>
						&rarr;
					</button>
				</div>
			)}
		</section>
	);
}

export const getStaticProps = async () => {
	const posts = await client.fetch(`*[_type == "post"]`);
	const author = await client.fetch(`*[_type == "author"]`);

	return {
		props: {
			posts,
			author,
		},
	};
};
