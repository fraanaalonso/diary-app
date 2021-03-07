import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://ichef.bbci.co.uk/news/800/cpsprodpb/12274/production/_96065347_gettyimages-482855185.jpg)'
                }}

            >

            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Est magna magna veniam nulla.
                </p>

                <p className="journal__entry-content">
                   Labore duis dolore occaecat do magna eiusmod. Consectetur aliqua est ad occaecat aute consectetur sit enim esse exercitation aute cillum. Quis reprehenderit pariatur elit culpa reprehenderit elit culpa quis. Et dolor non velit ullamco consequat sit amet aute non velit sunt. Id irure veniam incididunt non sunt magna anim ut qui do commodo laborum eiusmod. Nulla veniam tempor mollit labore labore nulla tempor mollit Lorem qui labore aute tempor.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
