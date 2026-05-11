import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { api } from "../../../api/api";

import StructureTypeCard from "./StructureTypeCard";

import './StructureStep.css'

function StructureStep() {
    const [structureTypes, setStructureTypes] = useState([]);

    const {listing, setListing} = useOutletContext();

    useEffect(() => {
        async function fetchStructures() {
            const response = await api.get('/meta/structures');
            setStructureTypes(response.data)
        }

        fetchStructures()
    }, [])


    return (
        <div className="structure-step">
            <h1 className="structure-step__title">Which of these best describes your place?</h1>
            <div className="structure-step__grid" >
            {structureTypes.map(structureType => <StructureTypeCard key={structureType.id} structureType={structureType} listing={listing} setListing={setListing} />)}
            </div>
        </div>
    )
}

export default StructureStep;