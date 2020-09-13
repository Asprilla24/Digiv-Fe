import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

export default function headerNav(props) {
	const { breadcumb } = props;
	const [navbarOpen, setNavbarOpen] = useState(false);

	return (
		<div className='w-auto w-full'>
			<nav className=' flex items-center justify-between flex-wrap bg-yellow-500 p-6 '>
				<div className='flex items-center flex-shrink-0 text-white mr-6'>
					<img className='w-24 ' src='/logo/adira_logo.svg'></img>
				</div>
				<div className='block lg:hidden'>
					<button
						onClick={() => setNavbarOpen(!navbarOpen)}
						className='flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'>
						<svg
							className='fill-current h-3 w-3'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'>
							<title>Menu</title>
							<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
						</svg>
					</button>
				</div>
				<div
					className={classnames(
						"w-full  flex-grow lg:flex lg:items-center lg:w-auto",
						navbarOpen ? " block" : " hidden",
					)}>
					<div className='text-sm lg:flex-grow'>
						{breadcumb &&
							breadcumb.map((item, index) => (
								<a
									key={index}
									href={item.url}
									className='block mt-4 lg:inline-block lg:mt-0 text-yellow-200 hover:text-white mr-4'>
									{item.name}
									{index + 1 !== breadcumb.length && (
										<FontAwesomeIcon
											className='text-white text-6xl ml-3'
											icon={faChevronRight}
											size='1x'
										/>
									)}
								</a>
							))}
					</div>
					{/* <div>
						<a
							href='#'
							className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0'>
							Download
						</a>
					</div> */}
				</div>
			</nav>
		</div>
	);
}
