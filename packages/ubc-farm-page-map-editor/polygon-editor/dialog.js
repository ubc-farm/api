/** @jsx r */
import {createElement as r, Component, PropTypes} from 'react';
import * as style from './style.js';
import PolygonEditor, {defaultGrid} from './editor.js'

import AngleIndicator from '';
import IconButton from '';
import NumberField from '';

export default class EditorDialog extends Component {
	render() {
		const buttonProps = (mode) => {return {
			className: this.state.mode === mode ? 'hover-toggle' : null,
			onClick: this.changed[mode]
		}};

		return (
			<div>
				<header className='buttons-half'>

					<IconButton {...buttonProps('add')} icon='add'>
						Add Field
					</IconButton>
					<IconButton {...buttonProps('select')} icon='edit'>
						Select
					</IconButton>

				</header> 
				<form ref={f => this._form = f} className='form-divided'>
					<IconButton {...buttonProps('resize')} icon='transform'
						className='colored' disabled={this.state.id}>
						Resize Outline
					</IconButton>
					<section id='grid-config' className='footer-button'>

						<section id='grid-angle'>
							<NumberField min={0} max={360} step={5} 
								onChange={this.changed.angle}
								value={this.state.angle} className='angle-field'
								suffix='°' id='grid-config-angle'
								error='Angle must be between 0 and 360'>
								Grid Angle
							</NumberField>
							<AngleIndicator angle={this.state.angle}/>
						</section>

						<section id='grid-size'>
							<NumberField min={0} id='grid-config-width' suffix='m' 
								value={this.state.width} onChange={this.changed.width}>
								Grid Width
							</NumberField>

							<NumberField min={0} id='grid-config-height' suffix='m'
								value={this.state.height} onChange={this.changed.height}>
								Grid Height
							</NumberField>
						</section>

						<LoadingIndicator hidden={!this.state.loading} className='left'/>
						<IconButton type='submit' icon='done' className='right colored'
							disabled={this.state.gridUpdated}>Update grid</IconButton>
					</section>
				</form>
			</div>
		);
	}

	/**
	 * Callback function for text fields and buttons
	 * @param {string} field - identifier for the field
	 * @param {any} newValue - the new value to use
	 */
	valueChanged(field, newValue) {
		switch(field) {
			case 'add':
			case 'select':
			case 'resize':
				this.setState({mode: field});
				this.props.onSwitch(field);
				break;
			case 'angle':
			case 'width': 
			case 'height':
				this.setState({
					gridUpdated: false,
					[field]: parseFloat(newValue)
				});
				break;
		}
	}

	get gridSpec() {
		const {angle, width, height} = this.state;
		return {angle, width, height};
	}

	set gridSpec({angle, width, height}) {
		this.setState({angle, width, height});
	}

	get id() {return this.state.id}
	set id(value) {this.setState({id: value})}
	set mode(value) {this.setState({mode: value})}

	constructor(props) {
		super(props);

		const {width, height, angle} = defaultGrid;
		this.state = {
			width, height, angle,
			mode: 'select',
			id: '',
			loading: false,
			gridUpdated: true
		}

		this.changed = {};
		for (let field in ['angle', 'width', 'height', 'add', 'select', 'resize']) {
			this.changed[field] = this.valueChanged.bind(this, field);
		}
	}
	componentDidMount() {this._form.addEventListener('submit', e => {
		e.preventDefault();
		this.submit();
	})}
	submit() {
		this.setState({gridUpdated: true, loading: true});
		Promise.resolve(this.props.onSubmit(this.id, this.gridSpec))
		.then(() => this.setState({loading: false}))
		.catch(err => {
			this.setState({loading: false});
			console.error(err);
			/** @todo */
		})
	}
	get propTypes() {return {
		onSubmit: PropTypes.func,
		onSwitch: PropTypes.func
	}}
}