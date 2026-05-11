import { useOutletContext } from 'react-router';

import PrivacyTypeCard from './PrivacyTypeCard';

import entirePlace from '../../../imgs/privacy-types/entire.svg'
import room from '../../../imgs/privacy-types/room.svg'
import sharedRoom from '../../../imgs/privacy-types/sharedRoom.svg'

import './PrivacyTypeStep.css'
import { useEffect } from 'react';

function PrivacyTypeStep() {
  const { setIsStepValid } = useOutletContext();

  useEffect(() => {
    setIsStepValid(true);
  }, [])

  const privacyTypes = [
    {
      id: 1,
      title: "An entire place",
      description: "Guests have the whole place to themselves.",
      icon: entirePlace
    },
    {
      id: 2,
      title: "A room",
      description: "Guests have their own room in a home, plus access to shared spaces.",
      icon: room
    },
    {
      id: 3,
      title: "A shared room in a hostel",
      description: "Guests sleep in a shared room in a professionally managed hostel with staff on-site 24/7.",
      icon: sharedRoom
    },
  ];

  return (
    <div className='privacy'>
      <h1 className='privacy__title'>What type of place will guests have?</h1>

      <div className='privacy__grid'>
        {privacyTypes.map(privacyType => <PrivacyTypeCard key={privacyType.id} privacyType={privacyType} />)}
      </div>
    </div>
  );
}

export default PrivacyTypeStep;
