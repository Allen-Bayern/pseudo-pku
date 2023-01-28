import { useState } from 'react';

export default () => {
    const [count, setCount] = useState<number>(0);

    return (
        <div className="App">
            <p className="number">{ count }</p>
            <button onClick={() => {setCount(count + 1);}}>Click here to add</button>
        </div>
    );
}
