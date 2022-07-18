import { Block } from 'core';
import { EventsProps } from 'components/user-avatar/user-avatar';
import './input-file.scss';

interface InputFileProps {
	onChange?: () => void;
}

export default class InputFile extends Block<InputFileProps & EventsProps> {
	public static componentName = 'InputFile';

	constructor({ onChange, ...rest }: InputFileProps) {
		super({
			events: { change: onChange },
			...rest,
		});
	}

	protected getStateFromProps() {
		this.state = {};
	}

	protected render(): string {
		return `
      <label 
        class="input-file-label"
        for="input-file"
      >
       <input
        class="input-file"
        type="file"
        id="input-file"
       />
      </label>
    `;
	}
}
