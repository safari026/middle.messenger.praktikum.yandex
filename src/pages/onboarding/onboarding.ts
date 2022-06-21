import { Block } from 'core';
import './onboarding.scss';

export default class OnboardingPage extends Block {
	static componentName = 'OnboardingPage';

	protected render(): string {
		return `
        {{#Layout name="Onboarding" }}
        <div class="onboard-page">
        <h1 class="onboard-page__title">Temporary project navigation</h1>
        {{{Link text="Login" to="/login"}}}
        {{{Link text="Sign in" to="/sign-in"}}}
        {{{Link text="Profile" to="/profile"}}}
        {{{Link text="Chats" to="/chat"}}}
        {{{Link text="404" to="/404"}}}
        {{{Link text="500" to="/500"}}}
        {{{Link text="Edit profile" to="/edit-profile"}}}
        {{{Link text="Edit password" to="/edit-password"}}}
        </div>
        {{/Layout}}
        `;
	}
}
