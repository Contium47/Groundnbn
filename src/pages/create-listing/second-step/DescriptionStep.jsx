import { useOutletContext } from "react-router";
import TextStep from "../../../components/TextStep"
import { useForm } from "react-hook-form";

function DescriptionStep() {
    const { setIsStepValid, listing } = useOutletContext();
    const {register, formState: {errors, isValid}} = useForm({
        mode: 'onChange',
        defaultValues: {
            description: listing.description || '',
        }
    })

    return (
        <>
            <TextStep
                type={"description"}
                stepTitle={"Create your description"} 
                stepDescription={"Share what makes your place special."} 
                maxContentLength={500}
                register={register}
                errors={errors}
                isValid={isValid}
                setIsStepValid={setIsStepValid}
                listing={listing}
            />
        </>
    )
}

export default DescriptionStep;