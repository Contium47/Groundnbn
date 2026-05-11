import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router";
import ListingPrice from "../../../components/ListingPrice";

function WeekendPriceStep() {
  const { listing } = useOutletContext();
  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      weekendPrice: listing.weekendPrice
    }
  });
  return (
    <ListingPrice
      title={"Set a weekend price"}
      desc={"Add a premium for Fridays and Saturdays."}
      minPrice={listing.weekdayPrice}
      register={register}
      isValid={isValid}
      type={"weekendPrice"}
      errors={errors}
    />
  );
}

export default WeekendPriceStep;
