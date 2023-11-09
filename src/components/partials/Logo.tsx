import Image from "next/image";
import logo from "../../assets/images/logo.svg";

const Logo = ({ height, width }: any) => {
  return (
    <Image src={logo} alt="Tolka" height={height} width={width} className="" />
  );
};

export default Logo;
