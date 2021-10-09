import React, { useState } from "react"

interface IProps {
  video: any
}

const VideoCard: React.FC<IProps> = (
  { video }
) => {
  return (
    <div className={"card shadow-sm"}>
      <div className="card-body">
        <strong>{video.title}</strong>
        <p>{video.description}</p>
      </div>
    </div>
  )
}

export default VideoCard
