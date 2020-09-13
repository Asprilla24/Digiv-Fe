import React, { useState } from "react";
import FormRegister from "./formRegisration";
import FormLogin from "./formLogin";
import ListRudown from "@assets/images/list-rundown.png";
import className from "classnames"
export default function Tabs(props) {
	const {
		onLoginSubmit,
		errorLogin,
		onSubmitRegistration,
		errorRegistration,
	} = props;
	const [openTab, setOpenTab] = React.useState(1);
	const [color, setColor] = useState("yellow");

	return (
		<div className=' w-10/12 md:w-8/12 lg:w-6/12 xl:w-6/2 xl:ml-64 content-login'>
			<div className='mx-auto w-full '>
				<div className=' mx-auto w-full'>
					<>
						<div className='flex flex-wrap'>
							<div className='w-full'>
								<ul
									className='flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row'
									role='tablist'>
									<li className='-mb-px mr-2  my-2  last:mr-0 flex-auto text-center'>
										<a
											className={
												"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
												(openTab === 1
													? "text-black bg-" + color + "-500"
													: "text-" + color + "-500 bg-white")
											}
											onClick={(e) => {
												e.preventDefault();
												setOpenTab(1);
											}}
											data-toggle='tab'
											href='#link1'
											role='tablist'>
											Login
										</a>
									</li>
									<li className='-mb-px  my-2 mr-2 last:mr-0 flex-auto text-center'>
										<a
											className={
												"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
												(openTab === 2
													? "text-black bg-" + color + "-500"
													: "text-" + color + "-500 bg-white")
											}
											onClick={(e) => {
												e.preventDefault();
												setOpenTab(2);
											}}
											data-toggle='tab'
											href='#link2'
											role='tablist'>
											Register
										</a>
									</li>
									<li className='-mb-px my-2 mr-2 last:mr-0 flex-auto text-center'>
										<a
											className={
												"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
												(openTab === 3
													? "text-black bg-" + color + "-500"
													: "text-" + color + "-500 bg-white")
											}
											onClick={(e) => {
												e.preventDefault();
												setOpenTab(3);
											}}
											data-toggle='tab'
											href='#link3'
											role='tablist'>
											Program 
										</a>
									</li>
								</ul>
								<div className='relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded'>
									<div className='px-2 py-5 flex-auto'>
										<div className='tab-content tab-space'>
											<div
												className={openTab === 1 ? "block" : "hidden"}
												id='link1'>
												<FormLogin onLoginSubmit={onLoginSubmit} errorLogin={errorLogin}/>
											</div>
											<div
												className={openTab === 2 ? "block" : "hidden"}
												id='link2'>
												<FormRegister onSubmitRegistration={onSubmitRegistration} errorRegistration={errorRegistration} />
											</div>
											<div
												className={className("login-tab-rundown flex justify-center",openTab === 3 ? "block" : "hidden")}
												id='link3'>
												<img src={ListRudown}></img>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				</div>
			</div>
		</div>
	);
}
