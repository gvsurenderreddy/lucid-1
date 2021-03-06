import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';
import { transformFromCenter } from '../../util/chart-helpers';

const cx = lucidClassNames.bind('&-Point');

const {
	number,
	bool,
	string,
} = React.PropTypes;

// These were originally built in a 12x12 grid, except triangles which were
// 14x12 cause triangles are poo.
const PATHS = [
	'M6,12 C2.686,12 0,9.314 0,6 C0,2.686 2.686,0 6,0 C9.314,-0 12,2.686 12,6 C12,9.314 9.314,12 6,12 z',
	'M6,12 C0,12 0,12 0,6 C0,0 -0,0 6,0 C12,0 12,0 12,6 C12,12 12,12 6,12 z',
	'M6.034,1.656 C7,0 7,0 7.966,1.656 L13.034,10.344 C14,12 13,12 12,12 L2,12 C1,12 0,12 0.966,10.344 L6.034,1.656 z',
	'M7.966,10.344 C7,12 7,12 6.034,10.344 L0.966,1.656 C-0,0 1,0 2,0 L12,0 C13,0 14,0 13.034,1.656 L7.966,10.344 z',
	'M2.594,9.406 C-0.812,6 -0.812,6 2.594,2.594 C6,-0.812 6,-0.812 9.406,2.594 C12.812,6 12.812,6 9.406,9.406 C6,12.812 6,12.812 2.594,9.406 z',
];

/**
 * {"categories": ["visualizations", "geoms"]}
 *
 * Points are typically used for scatter plots. Did I get the point across?
 *
 */
const Point = createClass({
	displayName: 'Point',

	_lucidIsPrivate: true,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Determines if the point has a white stroke around it.
		 */
		hasStroke: bool,
		/**
		 * x coordinate
		 */
		x: number,
		/**
		 * y coordinate
		 */
		y: number,
		/**
		 * Zero-based set of shapes. It's recommended that you pass the index of
		 * your array for shapes.
		 */
		kind: number,
		/**
		 * Zero-based set of colors. It's recommended that you pass the index of
		 * your array for colors.
		 */
		color: number,
		/**
		 * Scale up the size of the symbol. 2 would be double the original size.
		 */
		scale: number,
	},

	getDefaultProps() {
		return {
			x: 0,
			y: 0,
			kind: 0,
			color: 0,
			hasStroke: false,
			scale: 1,
		};
	},

	render() {
		const {
			className,
			color,
			hasStroke,
			kind,
			x,
			y,
			scale,
			...passThroughs,
		} = this.props;

		const kindIndex = kind % 5;
		const colorIndex = color % 6;

		const classes = cx(className, '&', `&-color-${colorIndex}`, {
			'&-has-stroke': hasStroke,
		});

		// These transforms are used to center the icon on the x y coordinate
		// provided.
		const transforms = [
			transformFromCenter(x, y, 6, 6, scale),
			transformFromCenter(x, y, 6, 6, scale),
			transformFromCenter(x, y, 7, 6, scale), // triangle
			transformFromCenter(x, y, 7, 6, scale), // triangle
			transformFromCenter(x, y, 6, 6, scale),
		];

		return (
			<path
				{...passThroughs}
				className={classes}
				transform={transforms[kindIndex]}
				d={PATHS[kindIndex]}
			/>
		);
	},
});

export default Point;
