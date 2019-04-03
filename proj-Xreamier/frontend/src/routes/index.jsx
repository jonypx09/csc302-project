import App from 'containers/App/App.jsx';
import LoginApp from 'containers/App/LoginApp.js';

const indexRoutes = [
    { path: "/login", component: LoginApp },
    { path: "/", component: App }
];

export default indexRoutes;
