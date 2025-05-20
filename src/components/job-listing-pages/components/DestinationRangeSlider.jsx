import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addDestination } from "../../../features/filter/filterSlice";

const DestinationRangeSlider = () => {
    const { jobList } = useSelector((state) => state.filter);

    const [destination, setDestination] = useState({
        min: jobList.destination.min,
        max: jobList.destination.max,
    });

    const dispatch = useDispatch();

    // destination handler
    const handleOnChange = (event, newValue) => {
        dispatch(addDestination({
            min: newValue[0],
            max: newValue[1]
        }));
    };

    useEffect(() => {
        setDestination({
            min: jobList.destination.min,
            max: jobList.destination.max,
        });
    }, [jobList.destination]);

    return (
        <div className="range-slider-one">
            <Slider
                value={[destination.min, destination.max]}
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
                    <span className="area-amount">{destination.max}</span>
                    km
                </div>
            </div>
        </div>
    );
};

export default DestinationRangeSlider;
