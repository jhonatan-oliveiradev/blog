import Heading from "src/components/Heading/Heading";
import Bar from "../components/Bar/Bar";
import Footer from "src/components/Footer/Footer";

const MainLayout = ({ children }) => {
	return (
		<>
			<header>
				<Bar />
				<Heading />
			</header>
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default MainLayout;
