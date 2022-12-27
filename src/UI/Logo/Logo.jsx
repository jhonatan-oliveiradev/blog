import Image from "next/image";
import Link from "next/link";

const Logo = () => {
	return (
		<Link href="/">
			<Image src="/logo.svg" alt="minimal blog" width={209} height={48} />
		</Link>
	);
};

export default Logo;
