import React from 'react';
import { ExpanderDumb as Expander } from '../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<Expander>
					<Expander.Label>Show More</Expander.Label>
					<p>This won't show up no matter how many times you click that icon!</p>
				</Expander>
			</div>
		);
	},
});
