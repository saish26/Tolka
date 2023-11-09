import CustomBadge from "@/components/common/form/CustomBadge";
import Logo from "@/components/partials/Logo";
import { Button, Header } from "@mantine/core";
import { useRouter } from "next/router";
import FooterPage from "@/components/partials/Footer";
import InstagramLogo from "../assets/images/instagram.png";
import TiktokLogo from "../assets/images/tiktok.png";
import Image from "next/image";
import notify from "@/utils/helpers/notify";
import AuthRoute from "@/hoc/AuthRoute";

const LandingLayout = ({ children }: { children: React.JSX.Element }) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("data");

    notify("success", "Logout Successfully...");
    router.push("/login");
  };

  return (
    <AuthRoute redirect="/login">
      <main>
        <Header
          height={70}
          p="md"
          className="flex items-center justify-between dynamic-x-padding"
        >
          <section
            className="hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Logo height={50} width={200} />
          </section>
          <section>
            <Button
              className="bg-[#164E99] hover:bg-[#164E99]"
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </section>
        </Header>

        {children}

        {/* <FooterPage /> */}
      </main>
    </AuthRoute>
  );
};

export default LandingLayout;
