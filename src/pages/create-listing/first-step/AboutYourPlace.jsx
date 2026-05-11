import ListingStepIntro from "../../../components/ListingStepIntro";

function AboutYourPlace() {
  return (
    <>
      <ListingStepIntro
        step={"Step 1"}
        title={"Tell us about your place"}
        description={
          "In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know how many guests can stay."
        }
        vidLink={
          "https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high"
        }
      />
    </>
  );
}

export default AboutYourPlace;
