import { useOutletContext } from 'react-router'

import OverviewItem from './OverviewItem'

import aboutImg from '../../imgs/steps-overview/step1.avif'
import standOutImg from '../../imgs/steps-overview/step2.avif'
import finishUpImg from '../../imgs/steps-overview/step3.avif'

import './Overview.css'
import { useEffect } from 'react'

function Overview() {
  const {setIsStepValid} = useOutletContext()
  
  useEffect(() => {
    setIsStepValid(true)
  }, [])

  return (
    <div className="overview">
      <div className="overview__header">
        <h1 className="overview__title">
          It’s easy to get started on Airbnb
        </h1>
      </div>

      <div className="overview__steps">

        <OverviewItem title={"1 Tell us about your place"} desc={"Share some basic info, such as which type of property you have and how many guests can stay."} img={aboutImg} />

        <div className="overview__step">
          <div className="overview__text">
            <h2 className="overview__step-title">2 Make it stand out</h2>
            <p className="overview__step-desc">
              Add 5 or more photos plus a title and description – we’ll help you out.
            </p>
          </div>
          <div className="overview__image-wrapper">
            <img src={standOutImg} alt="" className="overview__image" />
          </div>
        </div>

        <div className="overview__step">
          <div className="overview__text">
            <h2 className="overview__step-title">3 Finish up and publish</h2>
            <p className="overview__step-desc">
              Choose a price, where is your apartments located, then publish your listing.
            </p>
          </div>
          <div className="overview__image-wrapper">
            <img src={finishUpImg} alt="" className="overview__image" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Overview;