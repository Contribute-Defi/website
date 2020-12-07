import React from 'react';
import { Carousel } from 'react-bootstrap';

import Slide1 from '../../assets/carousel/slide1.png';

export function SectionHowItWorks() {
	return (
		<section className="section-how-it-works">
			<h2>How It Works</h2>
			<Carousel>
				<Carousel.Item>
					<img src={Slide1} alt="Slide 1" />
				</Carousel.Item>
				<Carousel.Item>
					<img src={Slide1} alt="Slide 1" />
				</Carousel.Item>
			</Carousel>
		</section>
	);
}
