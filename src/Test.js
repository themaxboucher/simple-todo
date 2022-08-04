import { useState } from "react";

export function Test(){
    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>{count}</button>
        </div>
    );
}