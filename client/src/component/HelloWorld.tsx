import { useEffect, useState } from "react"


export default function HelloWorld() {
    const [data, setData] = useState('')

    useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(res => setData(res.message))
    }, [])

    return (
        <>
            <h1>{data}</h1>
        </>
    )
}