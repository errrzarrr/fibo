import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
	return(
		<div>
			In some other page
			<p>
				<Link to="/"><span role="img" aria-label="Home">🏠</span> Take me back home</Link>
			</p>
		</div>
	);
};
