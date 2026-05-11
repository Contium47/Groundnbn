    import { useLocation, useOutletContext } from "react-router";
    import WeekdayPriceFooter from "../pages/create-listing/third-step/WeekdayPriceFooter";
    import WeekendPriceFooter from "../pages/create-listing/third-step/WeekendPriceFooter";

    import './ListingPrice.css'
    import { useEffect } from "react";

    function ListingPrice({title, desc, minPrice, register, isValid, type, errors}) {
        const location = useLocation();
        const currStep = location.pathname.split('/').pop();
        const {setIsStepValid, listing, setListing} = useOutletContext();

        useEffect(() => {
            setIsStepValid(isValid)
        }, [isValid])

        function setWeekdayPrice(e) {
            setListing(prev => ({
                ...prev,
                weekdayPrice: +e.target.value
            }))
        }

        function setWeekendPrice(e) {
            setListing(prev => ({
                ...prev,
                weekendPrice: +e.target.value
            }))
        }

        function calcPriceBeforeTaxes(basePrice) {
            const guestPriceBeforeTaxes = Math.round(basePrice * 1.15);
            return guestPriceBeforeTaxes;
        }


        return (
            <div className="price">
                <div className="price__header">
                    <h1 className="price__title">{title}</h1>
                    <span className="price__desc">{desc}</span>
                </div>
                <div className="price__input-block">
                    <div className="price__input-wrapper">
                        <span className="price__currency">$</span>
                        <input
                        onKeyDown={e => {
                            if (e.key === 'Backspace') {
                                return;
                            }

                            if (!/^\d$/.test(e.key)) {
                                e.preventDefault()
                            }
                        }}
                            type="text"
                            className="price__input"
                            {...register(type, {
                                required: true,
                                min: {
                                    value: minPrice,
                                    message: `Please set a base price between $${minPrice} and $7446`
                                },
                                max: {
                                    value: 7446,
                                    message: 'Please set a base price between $8 and $7446'
                                },
                                valueAsNumber: true,
                                onChange: e => {
                                    type === 'weekdayPrice' ? setWeekdayPrice(e) : setWeekendPrice(e)
                                },
                            })}
                        />
                    </div>
                    {errors[type] && <small className="text-step__error">{errors[type].message}</small>}
                </div>
                <div className="price__footer">
                    {currStep === 'price' && <WeekdayPriceFooter />}
                </div>
            </div>
        )
    }

    export default ListingPrice;