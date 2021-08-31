import { useEffect } from "react";

export const Leaderboard1 = () => {
    useEffect(() => {
        try {
            window._mNHandle.queue.push(function (){
                window._mNDetails.loadTag("345822648", "728x90", "345822648");
            });
        }
        catch (error) {}
    }, []);

    return <div id="345822648" />;
};