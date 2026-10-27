import { render } from 'preact';
import './design/tokens.css';
import './design/base.css';
import { App } from './App';
import { onLink } from './data/router';
import { applyScheme, store } from './data/store';

applyScheme(store.get().prefs.scheme);
document.addEventListener('click', onLink);
render(<App />, document.getElementById('app')!);
