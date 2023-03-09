import React from "react";
import ReactImageAnnotate from "react-image-annotate";

async function fetcher(url, options) {
    const res = await fetch(url, options);
    return await res.json();
}

function useFetch(url, options) {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetcher(url, options);
                setResponse(data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);
    return {response, error};
}

const App = () => {
    const {response} = useFetch("/api/images");
    if (!response) return <div>Loading...</div>;

    function saveAnnotations(data) {
        console.log('saving annotations', data);
        fetcher("/api/images", {
            method: "POST",
            body: JSON.stringify(data.images),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return (
            <ReactImageAnnotate
                labelImages
                images={response}
                onExit={saveAnnotations}
                hideClone={true}
                enabledTools={['create-polygon']}
            />
    );
};

export default App;
