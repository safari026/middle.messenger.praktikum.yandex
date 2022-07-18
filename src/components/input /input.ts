import Block from '../../core/Block';

import './input.scss';

type InputType = 'text' | 'password' | 'email';
export interface InputProps {
	onChange?: (e: any) => void;
	type?: InputType;
	placeholder?: string;
	name: string;
	value?: string;
	error?: string;
	onBlur?: () => void;
	onFocus?: () => void;
	className?: string;
}

export default class Input extends Block {
	static componentName = 'Input';

	constructor({
		onChange = () => {},
		type = 'text',
		error,
		name,
		placeholder,
		className,
		value,
		onFocus,
		onBlur,
	}: InputProps) {
		super({
			type,
			placeholder,
			className,
			value,
			name,
			error,
			events: { input: onChange, blur: onBlur, focus: onFocus },
		});
	}

	protected render(): string {
		// language=hbs
		return `
        <input 
		class="input{{className}}"
		name={{name}}
		type="{{type}}" 
		placeholder="{{placeholder}}" 
		value="{{value}}"
		>
    `;
	}
}
