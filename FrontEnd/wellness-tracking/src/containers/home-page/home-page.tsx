import { useEffect, useRef } from "react"
import { userDetails$ } from "../../services/user.service"
import { CustomerLandingPage } from "../customer-landing-page/customer-landing-page";
import { ProfessionalLandingPage } from "../professional-landing-page/professional-landing-page";
export function Home() {

    const userDetails = useRef({ user_type: 'Customer' });

    useEffect(() => {
        userDetails$.subscribe(user => userDetails.current = user);
    }, [userDetails])

    return (
        <div className="home">

            {userDetails.current.user_type === 'Customer' && <CustomerLandingPage />}
            {userDetails.current.user_type === 'Professional' && <ProfessionalLandingPage />}
        </div>
    )
}