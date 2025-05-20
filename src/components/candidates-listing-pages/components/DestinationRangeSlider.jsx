import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addDestination } from "../../../features/filter/candidateFilterSlice";

const DestinationRangeSlider = () => {
    const { destination } = useSelector((state) => state.candidateFilter);
    const [getDestination, setDestination] = useState({
        min: destination.min,
        max: destination.max,
    });

    const dispatch = useDispatch();

    // destination handler
    const handleOnChange = (event, newValue) => {
        const value = {
            min: newValue[0],
            max: newValue[1]
        };
        dispatch(addDestination(value));
    };

    // destination dispatch
    useEffect(() => {
        setDestination(destination);
    }, [destination]);

    return (
        <div className="range-slider-one">
            <Slider
                value={[getDestination.min, getDestination.max]}
                onChange={handleOnChange}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                sx={{
                    color: '#1976d2',
                    '& .MuiSlider-thumb': {
                        height: 24,
                        width: 24,
                    },
                    '& .MuiSlider-track': {
                        height: 8,
                    },
                    '& .MuiSlider-rail': {
                        height: 8,
                    },
                }}
            />
            <div className="input-outer">
                <div className="amount-outer">
                    <span className="area-amount">{getDestination.max}</span>
                    km
                </div>
            </div>
        </div>
    );
};

export default DestinationRangeSlider;
