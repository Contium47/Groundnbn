import { useOutletContext } from "react-router";
import TextStep from "../../../components/TextStep"
import { useForm } from "react-hook-form";

function TitleStep() {
    const {setIsStepValid, listing} = useOutletContext();
    const {register, formState: {errors, isValid}} = useForm({
        mode: 'onChange',
        defaultValues: {
            title: listing.title || ''
        }
    })

    return (
        <>
            <TextStep
                type={"title"}
                stepTitle={`Now, let's give your ${listing.structure.toLowerCase()} a title`} 
                stepDescription={"Short titles work best. Have fun with it – you can always change it later."} 
                maxContentLength={50}
                register={register}
                errors={errors}
                isValid={isValid}
                setIsStepValid={setIsStepValid}
                listing={listing}
            />
        </>
    )
}

export default TitleStep;