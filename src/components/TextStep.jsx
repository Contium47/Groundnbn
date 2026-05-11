import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import './TextStep.css'

function TextStep({type, stepTitle, stepDescription, maxContentLength, register, errors, isValid, setIsStepValid}) {
    const {listing, setListing} = useOutletContext();
    const [textAreaLength, setTextAreaLength] = useState(listing[type].length || 0);

    function setText(e) {
        setTextAreaLength(e.target.value.length);
        setListing(prev => ({
            ...prev,
            [type]: e.target.value
        }))
    }

    useEffect(() => {
        setIsStepValid(isValid)
    }, [isValid])

    return (
        <div className="text-step">
            <div className="text-step__wrapper">
                <h1 className="text-step__title">{stepTitle}</h1>
                <p className="text-step__description">{stepDescription}</p>
                <textarea
                    className="text-step__textarea"
                    {...register(type, {
                        onChange: e => setText(e),
                        required: true,
                        maxLength: {
                            value: maxContentLength,
                            message: `The maximum number of characters allowed is ${maxContentLength}.`
                        },
                    })}
                    ></textarea>
                    <div className='text-step__hint'>
                        {type === 'title' && <span>{textAreaLength}/{maxContentLength}</span>}
                        {type === 'description' && <span>{textAreaLength}/{maxContentLength}</span>}
                    </div>

                <div className="text-step__footer">
                    {errors[type] && <small className='text-step__error'>{errors[type].message}</small>}
                </div>
            </div>
        </div>  
    )
}

export default TextStep;