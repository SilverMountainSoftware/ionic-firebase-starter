import { ListMasterPage } from './list-master/list-master';
import { SettingsPage } from './settings/settings';
import { TutorialPage } from './tutorial/tutorial';
import { MenuPage } from './menu/menu'

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = MenuPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = ListMasterPage;
export const Tab2Root = MenuPage;
export const Tab3Root = SettingsPage;
