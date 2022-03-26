import { getUserDetails } from "../../services/user.service"
import { CustomerLandingPage } from "../customer-landing-page/customer-landing-page";
import { ProfessionalLandingPage } from "../professional-landing-page/professional-landing-page";
export function Home() {

    const userDetails = {user_type:'Customer'};

    
    return (
        <div className="home">

            {userDetails.user_type === 'Customer' && <CustomerLandingPage />}
            {userDetails.user_type === 'Professional' && <ProfessionalLandingPage />}
        </div>
    )
}