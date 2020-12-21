import React, {useState, useEffect} from 'react'

const ProgressLoader = (props) => {

	const [style, setStyle] = useState({
		width: '0%',
		transition:` width linear  ${props.time}s`
	})

	useEffect(() => {
		setStyle({
			width: '100%',
			transition:` width linear  ${props.time}s`
		})
	}, [props.time])


	return (
		<div className="progress">
			<div className="determinate" style={style}/>
		</div>
	)
}

export default ProgressLoader
