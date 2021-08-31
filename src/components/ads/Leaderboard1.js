import { useEffect, useRef } from "react";

export const Leaderboard1 = () => {
    const div = useRef(null);
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `atOptions = {
            'key' : 'e9e525fcb9df99bce127b9be7b16b177',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
        };
        document.write('<scr' + 'ipt type="text/javascript" src="http' + (location.protocol === 'https:' ? 's' : '') + '://www.highperformancedformats.com/e9e525fcb9df99bce127b9be7b16b177/invoke.js"></scr' + 'ipt>');
        `;
        div.current.appendChild(script);
    }, []);

    return <div ref={div} />;
};