import styles from "./CardPost.module.scss";
import Author from "src/UI/Author/Author";
import Link from "next/link";
import Image from "next/image";
import client from "src/sanity";
import { useNextSanityImage } from "next-sanity-image";

const CardPost = ({ post, author }) => {
	const {
		author: authorRef,
		title,
		mainImage,
		publishedAt,
		short_text,
		slug,
	} = post || {};

	const imageProps = useNextSanityImage(client, mainImage);
	const getAuthor = author?.find((author) => author._id === authorRef._ref);

	return (
		<div className={styles.post}>
			<div className={styles.image}>
				<Image {...imageProps} alt={title} />
			</div>
			<div className={styles.content}>
				<h2 className="h3">{title}</h2>
				<p>{short_text}</p>
				<div className={styles.footer}>
					<Author author={getAuthor} date={publishedAt} />
					<Link href={`/post/${slug.current}`} className="h5">
						Continuar lendo &rarr;
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CardPost;
