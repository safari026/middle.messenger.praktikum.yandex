import { Block } from 'core';
import './profile.scss';

export class ProfilePage extends Block {
	static componentName = 'ProfilePage';

	protected render(): string {
		return `
    <div>
    <nav class="side-nav">
        <div class="side-nav__button">
        {{{Link to="/chat" }}}
        </div>
    </nav>
        {{#Layout name="ProfilePage" fullScreen=true}}
      
        <div class="profile-screen">
        <div class="profile-screen__header user-profile">
          <div class="user-profile__avatar" ></div>
          <div class="user-profile__name">
           Иван Иванов
          </div>
        </div>
        <div class="profile-screen__content">
          <div class="profile-screen__title">
            Account Info
          </div>
          <div class="profile-screen__info-wrapper">
            <div class="profile-screen__info">
              <div class="profile-screen__label">
                Phone number
              </div>
              <div class="profile-screen__value">
               8(903)-275-75-68
              </div>
            </div>
            <div class="profile-screen__info">
              <div class="profile-screen__label">
                Username
              </div>
              <div class="profile-screen__value">
                Grasin
              </div>
            </div>
            <div class="profile-screen__info">
              <div class="profile-screen__label">
                Email
              </div>
              <div class="profile-screen__value">
                grasin_tweens@master.com
              </div>
            </div>
          </div>
          <div class="profile-screen__setting">
          {{{Link to="/edit-profile" text="Edit profile"}}}
          {{{Link to="/edit-password" text="Edit password"}}}
          {{{Button text="Logout" onClick=onLogout className="__button"}}}
          </div>
        </div>
      </div>
        {{/Layout}}
        </div>
        `;
	}
}
