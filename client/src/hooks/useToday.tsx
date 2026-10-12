import { useState, useEffect } from "react";

const getToday = () => new Date().toLocaleDateString("fi-FI");

export function useToday() {
    const [today, setToday] = useState(getToday);

    useEffect(() => {
        const id = setInterval(() => setToday(getToday()), 60_000);
        return () => clearInterval(id);
    }, []);

    return today;
}