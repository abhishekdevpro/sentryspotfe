import { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addFoundationDate } from "../../../features/filter/employerFilterSlice";

const FoundationDate = () => {
    const { foundationDate: getGoundationDate } =
        useSelector((state) => state.employerFilter) || {};
    const [foundationDate, setFoundationDate] = useState({
        min: getGoundationDate.min,
        max: getGoundationDate.max,
    });

    const dispatch = useDispatch();

    const handleOnChange = (event, newValue) => {
        dispatch(addFoundationDate({
            min: newValue[0],
            max: newValue[1]
        }));
    };

    useEffect(() => {
        setFoundationDate(getGoundationDate);
    }, [getGoundationDate]);

    return (
        <div className="range-slider-one salary-range">
            <Slider
                value={[foundationDate.min, foundationDate.max]}
                onChange={handleOnChange}
                valueLabelDisplay="auto"
                min={1900}
                max={2028}
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
                    <span className="d-inline-flex align-items-center">
                        <span className="min">{foundationDate.min}</span>
                        <span className="max ms-2">{foundationDate.max}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FoundationDate;
