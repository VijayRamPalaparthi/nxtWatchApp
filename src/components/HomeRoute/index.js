import SideNav from '../SideNav'
import Header from '../Header'
import AllViewSection from '../AllViewSection'
import './index.css'

const HomeRoute = () => (
  <div className="home-route-container" data-testid="home">
    <Header />
    <div className="body-container">
      <SideNav />
      <AllViewSection />
    </div>
  </div>
)

export default HomeRoute
