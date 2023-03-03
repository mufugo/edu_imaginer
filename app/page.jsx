import { HomePageContainer } from "@/containers/home-page-container";
import { HomepageProvider } from "@/containers/home-page-container/useHomepage";
function HomePage() {
  return (
    <HomepageProvider>
      <HomePageContainer />
    </HomepageProvider>
  );
}

export default HomePage;
