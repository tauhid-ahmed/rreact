import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice";
import { type RootState } from "../../store";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(decrement())}>Decrement</button> {count}{" "}
      <button onClick={() => dispatch(increment())}>Increment</button>{" "}
      <button onClick={() => dispatch(incrementByAmount(10))}>
        increment by 10
      </button>
    </div>
  );
}
