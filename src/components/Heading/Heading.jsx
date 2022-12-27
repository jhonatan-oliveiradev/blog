import Logo from "src/UI/Logo/Logo";
import styles from "./Heading.module.scss";
import { BiSearchAlt } from "react-icons/bi";

const Heading = () => {
	return (
		<section className={styles.heading}>
			<Logo />
			<div className={styles.search}>
				<form action="/">
					<label htmlFor="search">Buscar</label>
					<input
						type="text"
						name="search"
						id="search"
						placeholder="Buscar artigos"
					/>
					<button className={styles.button}>
						<BiSearchAlt />
					</button>
				</form>
			</div>
		</section>
	);
};

export default Heading;
