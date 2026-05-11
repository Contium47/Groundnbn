import { useOutletContext } from "react-router";
import ListingStepIntro from "../../../components/ListingStepIntro"

function FinishSetup() {
    const {setIsStepValid} = useOutletContext();
    return (
        <>
            <ListingStepIntro 
                step={'Step 3'}
                title={'Finish up and publish'}
                description={'Finally, you’ll let us know the location, set up pricing and publish your listing.'}
                vidLink={'https://stream.media.muscache.com/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4?v_q=high'}
            />
        </>
    )
}

export default FinishSetup;