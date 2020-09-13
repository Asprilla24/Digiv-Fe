import React from "react";
import ReactPlayer from "react-player";

export default function ScreenView() {
	return (
		<>
			<div
				className='screen-link screen-link__1'>
				<ReactPlayer
                            playing={true}
                            width="100%"
                            height="100%"
                            url="https://youtu.be/F3fkV8o6mjw"
                        />
			</div>
		</>
	);
}
