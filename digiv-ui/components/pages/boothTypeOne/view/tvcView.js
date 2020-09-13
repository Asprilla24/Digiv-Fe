import React from "react";

export default function TvcView({onClickProgram}) {
	return (
		<>
			<div
				className='car-link car-program__1'
				onClick={() => onClickProgram("avanza")}>
				{/* <img src={carAvanxa}></img> */}
			</div>
			<div
				className='car-link car-program__2'
				onClick={() => onClickProgram("avanza")}>
				{/* <img src={carAvanxa}></img> */}
			</div>
			<div className='car-link car-tvc' onClick={() => onClickProgram("avanza")}>
				{/* <img src={carAvanxa}></img> */}
			</div>
		</>
	);
}
