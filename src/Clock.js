import { useState, useEffect } from "react"

export function Clock() {
    const [clock, setClock] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const intervalID = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(intervalID);
    }, []);

    return (
        <h2>{clock}</h2>
    )
}
