import { InputProps } from 'components/input /input';
import { ValidationRule, validationValue } from 'helpers/validation';
import Block from '../../core/Block';

import './controlled-input.scss';

interface ControlledInputProps extends InputProps {
	label: string;
	validationRule?: ValidationRule;
	styledControl?: string;
}

export default class ControlledInput extends Block {
	static componentName = 'ControlledInput';

	constructor({ label, styledControl, validationRule, ...props }: ControlledInputProps) {
		super({
			label,
			styledControl,
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
					const errorText = validationValue(validationRule, value);
					this.refs.error.setProps({ text: errorText });
				}
			},
		});
	}

	protected render(): string {
		// language=hbs
		return `
		<div class="controlled-input{{styledControl}}">
		{{#if label}}
		<div class="controlled-input__label">
		{{label}}
        </div>
		{{/if}}
		{{{
		Input ref="input" 
		name=name 
		type=type
		className=className
		placeholder=placeholder 
		onFocus=onFocus 
		onBlur=onBlur 
		onChange=onChange 
		value=value
		}}}
		{{{Error ref="error"}}}
		</div>
    `;
	}
}
