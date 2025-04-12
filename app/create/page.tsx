import React from "react";

const Page = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <fieldset className="fieldset">
                <legend className="fieldset-legend">What is your name?</legend>
                <input type="text" className="input" placeholder="Type here" />
                <p className="fieldset-label">Optional</p>
            </fieldset>
        </div>

    );
};

export default Page;