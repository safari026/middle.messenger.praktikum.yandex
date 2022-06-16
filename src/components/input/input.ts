import Block from '../../core/Block';

import './input.scss';

interface InputProps {
  onChange?: (e:any) => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  name:string;
  value?: string;
  error?: string;
}

export class Input extends Block {
  constructor({onChange = () => {}, type = 'text', error, placeholder, value}: InputProps) {
    super({type, placeholder, value, error, events: {input: onChange}});
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="input">
        <input class="input__input" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}">
        <div class="input__error">{{#if error}}{{error}}{{/if}}</div>
      </div>
    `
  }
}