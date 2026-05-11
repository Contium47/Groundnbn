import { useOutletContext } from "react-router";
import { useForm } from "react-hook-form";
import ListingPrice from "../../../components/ListingPrice";
import AboutPricingPopup from "./AboutPricingPopup";

function WeekdayPriceStep() {
    const {isOpen, setIsOpen, listing} = useOutletContext();
    const {register, formState: {errors, isValid}} = useForm({
        mode: 'onChange',
        defaultValues: {
            weekdayPrice: listing.weekdayPrice || 8
        }
    })

    return (
        <>
            <ListingPrice 
                title={"Now, set a weekday base price"} 
                desc={"Tip: $80. You’ll set a weekend price next."} 
                minPrice={8}
                register={register}
                isValid={isValid}
                type={'weekdayPrice'}
                errors={errors}
            />
            <AboutPricingPopup 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}

export default WeekdayPriceStep;