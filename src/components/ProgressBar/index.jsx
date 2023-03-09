import { Row } from 'antd'
import './index.css'

export function ProgressBar({ 
    percent,
    style,
    detail,
    hidePercent
}) {
    return (
        (
            <Row
                className="progress" 
                style={{
                    height: 22,
                    position: 'relative',
                    ...style
                }}
            >
                <div
                    className="progress-bar progress-bar-striped active"
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{
                        width: percent + "%",
                    }}
                >
                    {
                        hidePercent ? "" : `${percent}%`
                    }
                    
                </div>
                {
                    detail ? (
                        <span style={{fontSize: 12, color: '#96A2BA', lineHeight:'22px', position: 'absolute', right: 7}}>
                            {detail}
                        </span>
                    ) : ''
                }
            </Row>
        )
    )
} 
