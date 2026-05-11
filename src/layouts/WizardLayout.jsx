import { useState } from "react";
import { Outlet } from "react-router";
import BecomeAHostHeader from "../components/BecomeAHostHeader";
import BecomeAHostFooter from "../components/BecomeAHostFooter";

import './WizardLayout.css'

function WizardLayout({listing, setListing}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isStepValid, setIsStepValid] = useState(false);

    return (
        <div className="wizard-layout">
            <BecomeAHostHeader />
            <main className="wizard-main">
                <Outlet context={{isOpen, setIsOpen, listing, setListing, setIsStepValid}} />
            </main>
            <BecomeAHostFooter isStepValid={isStepValid} setIsStepValid={setIsStepValid} listing={listing} setListing={setListing} />
        </div>
    )
}

export default WizardLayout;