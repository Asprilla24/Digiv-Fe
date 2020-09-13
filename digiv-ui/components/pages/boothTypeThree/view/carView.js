import React from "react";
import carAvanxa from "@assets/images/car/car-avanza.png";

export default function CarView({onClickBoot}) {
	return (
		<>
			<div
				className='car-link car-link__1'
				onClick={() => onClickBoot("avanza")}>
				<img src={carAvanxa}></img>
			</div>
			<div
				className='car-link car-link__2'
				onClick={() => onClickBoot("avanza")}>
				<img src={carAvanxa}></img>
			</div>
			<div
				className='car-link car-link__3 '
				onClick={() => onClickBoot("avanza")}>
				<img src={carAvanxa}></img>
			</div>
			<div
				className='car-link car-link__4'
				onClick={() => onClickBoot("avanza")}>
				<img src={carAvanxa}></img>
			</div>
			<div
				className='car-link car-link__5'
				onClick={() => onClickBoot("avanza")}>
				<img src={carAvanxa}></img>
			</div>
		</>
	);
}
