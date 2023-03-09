import React from "react";
import { CompressIcon, SyncIcon, SyncStoreIcon } from "../../index";
import "./index.css";

const ProgressStep = () => {
    return (
        <div className="progress-sync">
            <div className="progress-step">
                <div className="progress-step__icon progressed">
                    <SyncIcon color="#44B3CF" />
                </div>

                <div className="progress-step__text">Syncing</div>
            </div>
            <div className="progress-step__border"></div>
            <div className="progress-step">
                <div className="progress-step__icon">
                    <CompressIcon />
                </div>

                <div className="progress-step__text">Compress</div>
            </div>
            <div className="progress-step__border transform"></div>

            <div className="progress-step transform">
                <div className="progress-step__icon">
                    <SyncStoreIcon />
                </div>

                <div className="progress-step__text">Store on Shopify</div>
            </div>
        </div>
    );
};

export default ProgressStep;
