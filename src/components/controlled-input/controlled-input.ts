import { InputProps } from 'components/input /input';
import { ValidationRule, validationValue } from 'helpers/validation';
import Block from '../../core/Block';

import './controlled-input.scss';

interface ControlledInputProps extends InputProps {
	label: string;
	validationRule?: ValidationRule;
}

export default class ControlledInput extends Block {
	static componentName = 'ControlledInput';

	constructor({ label, validationRule, ...props }: ControlledInputProps) {
		super({
			...props,
			onFocus: (e: Event) => {
				const input = e.target as HTMLInputElement;
				const { value } = input;
				this.refs.error.setProps({ text: '' });
			},
			onBlur: (e: FocusEvent) => {
				const input = e.target as HTMLInputElement;
				const { value } = input;
				if (validationRule) {
					console.log(validationRule);
					const errorText = validationValue(validationRule, value);
					this.refs.error.setProps({ text: errorText });
				}
			},
		});
	}

	protected render(): string {
		// language=hbs
		return `
		<div class="controlled-input">
		{{{Input ref="input" 
		name=name 
		type=type 
		placeholder=placeholder 
		onFocus=onFocus 
		onBlur=onBlur 
		onChange=onChange 
		value=value}}}
		{{{Error ref="error"}}}
		</div>
    `;
	}
}
