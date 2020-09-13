import React from "react";

export default function TvcView({onClickProgram}) {
	return (
		<>
			<div
				className='program-link type-3 program-item__1'
				onClick={() => onClickProgram("avanza")}>
				{/* <img src={carAvanxa}></img> */}
			</div>
			<div
				className='program-link type-3 program-item__2'
				onClick={() => onClickProgram("avanza")}>
				{/* <img src={carAvanxa}></img> */}
			</div>
			<div
				className='program-link type-3 program-item__3'
				onClick={() => onClickProgram("avanza")}>
				{/* <img src={carAvanxa}></img> */}
			</div>
			<div
				className='program-link type-3 program-item__4'
				onClick={() => onClickProgram("avanza")}>
				{/* <img src={carAvanxa}></img> */}
			</div>
			<div
				className='program-link type-3 program_tvc'
				onClick={() => onClickProgram("avanza")}>
				{/* <img src={carAvanxa}></img> */}
			</div>
			
		</>
	);
}
