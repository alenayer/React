
import { useState } from "react";
import { decrement, increment, incrementByAmount } from "../store/counterSlice";
import { useAppDispatch, useAppSelector } from "../store/store";



const HomePage = () => {

    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<number>(0)

    return (
        <div className="home__page">
            <h2>Welcome to myApp!</h2>

            <p>Counter value is:{count}</p>

            <input type="text" value={value} onChange={(e) => setValue(+e.target.value)} />
            <div>

                <button onClick={() => dispatch(increment())}>Inc</button>
                <button onClick={() => dispatch(decrement())}>Dec</button>

                <button onClick={() => dispatch(incrementByAmount(value))}
                    disabled={!value}

                >Inc by amount</button>
            </div>


        </div>
    )
}

export default HomePage;