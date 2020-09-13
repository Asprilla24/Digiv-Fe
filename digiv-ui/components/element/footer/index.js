import React from "react";
import  "./footer.scss";

export default function footer() {
	return (
		<footer className="footer">
			<a
				href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
				target='_blank'
				className="footer_link"
				rel='noopener noreferrer'>
				Digital Innovation
				<img
					src='/logo/digital-innovation.png'
					alt='Vercel Logo'
					className="footer_logo"
				/>
			</a>
		</footer>
	);
}
